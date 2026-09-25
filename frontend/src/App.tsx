import React, { useState, useEffect, useCallback } from 'react';
import { LandingPage } from './components/LandingPage';
import { TopBar } from './components/TopBar';
import { LeftFilterPanel } from './components/LeftFilterPanel';
import { GraphCanvas } from './components/GraphCanvas';
import { RightIntelligencePanel } from './components/RightIntelligencePanel';
import { TimelineScrubber } from './components/TimelineScrubber';
import { EntityResolutionModal } from './components/EntityResolutionModal';
import { CaseComparisonModal } from './components/CaseComparisonModal';
import { InvestigationBriefModal } from './components/InvestigationBriefModal';
import { AuditLogDrawer } from './components/AuditLogDrawer';
import { GuidedDemoController, DEMO_STEPS } from './components/GuidedDemoController';

import { 
  CaseData, 
  GraphNode, 
  GraphEdge, 
  NodeType, 
  EdgeType, 
  Community, 
  BridgeEntity,
  AgentQueryResponse,
  EntityResolutionCandidate
} from './types';
import { api } from './services/api';

export function App() {
  // Main View Mode (Landing vs Workspace)
  const [viewMode, setViewMode] = useState<'landing' | 'workspace'>('landing');

  // Case Data State
  const [selectedCaseId, setSelectedCaseId] = useState<string>('CASE-TRIDENT-2026');
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [bridgeEntities, setBridgeEntities] = useState<BridgeEntity[]>([]);

  // Selection & Highlight State
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [highlightedNodeIds, setHighlightedNodeIds] = useState<string[]>([]);
  const [highlightedEdgeIds, setHighlightedEdgeIds] = useState<string[]>([]);

  // Filter States
  const [activeEntityTypes, setActiveEntityTypes] = useState<Set<NodeType>>(
    new Set(['PERSON', 'PHONE', 'VEHICLE', 'LOCATION', 'ORGANIZATION', 'ACCOUNT', 'EVENT'])
  );
  const [activeRelationshipTypes, setActiveRelationshipTypes] = useState<Set<EdgeType>>(
    new Set(['CALLED', 'VISITED', 'OWNED', 'ASSOCIATED_WITH', 'TRANSACTED_WITH', 'WORKED_WITH', 'OBSERVED_AT', 'INVOLVED_IN'])
  );
  const [isolatedClusterId, setIsolatedClusterId] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<'force' | 'cluster' | 'concentric'>('force');

  // Timeline State
  const [cutoffDate, setCutoffDate] = useState<string>('2026-05-25');

  // AI Agent State
  const [agentResponse, setAgentResponse] = useState<AgentQueryResponse | null>(null);
  const [isAgentLoading, setIsAgentLoading] = useState<boolean>(false);

  // Entity Resolution State
  const [resolutionCandidates, setResolutionCandidates] = useState<EntityResolutionCandidate[]>([]);
  const [isEntityResolutionOpen, setIsEntityResolutionOpen] = useState(false);

  // Modals & Drawers
  const [isCaseComparisonOpen, setIsCaseComparisonOpen] = useState(false);
  const [isBriefGeneratorOpen, setIsBriefGeneratorOpen] = useState(false);
  const [isAuditLogOpen, setIsAuditLogOpen] = useState(false);

  // Guided Demo Mode State
  const [isGuidedDemoActive, setIsGuidedDemoActive] = useState(false);

  // Load Case Graph Data
  const loadCase = useCallback((caseId: string) => {
    setSelectedCaseId(caseId);
    api.getCaseGraph(caseId)
      .then(data => {
        setCaseData(data);
        // Default select PERSON-07 if in Trident
        if (caseId === 'CASE-TRIDENT-2026') {
          const p7 = data.nodes.find(n => n.id === 'PERSON-07');
          if (p7) setSelectedNode(p7);
        }
      })
      .catch(console.error);

    api.getCommunities(caseId).then(setCommunities).catch(console.error);
    api.getBridges(caseId).then(setBridgeEntities).catch(console.error);
  }, []);

  useEffect(() => {
    loadCase(selectedCaseId);
    api.getEntityResolutionCandidates().then(setResolutionCandidates).catch(console.error);
  }, [loadCase, selectedCaseId]);

  // Handle entity resolution action
  const handleResolveCandidate = (pairId: string, action: 'MERGE' | 'KEEP_SEPARATE' | 'MARK_REVIEW', notes?: string) => {
    api.resolveEntityPair(pairId, action, notes)
      .then(() => {
        setResolutionCandidates(prev => prev.map(c => c.pair_id === pairId ? { ...c, status: action } : c));
        loadCase(selectedCaseId);
      })
      .catch(console.error);
  };

  // Run AI Agent Query
  const handleRunAgentQuery = (query: string) => {
    setIsAgentLoading(true);
    api.runAgentQuery(query, selectedCaseId)
      .then(res => {
        setAgentResponse(res);
        setIsAgentLoading(false);
        if (res.highlight_nodes && res.highlight_nodes.length > 0) {
          setHighlightedNodeIds(res.highlight_nodes);
        }
        if (res.highlight_edges && res.highlight_edges.length > 0) {
          setHighlightedEdgeIds(res.highlight_edges);
        }
      })
      .catch(err => {
        console.error(err);
        setIsAgentLoading(false);
      });
  };

  // Explain Entity Action
  const handleExplainEntity = (entityId: string) => {
    handleRunAgentQuery(`Explain why ${entityId} appears important to this investigation.`);
  };

  // Calculate Shortest Path
  const handleCalculateShortestPath = (src: string, tgt: string) => {
    handleRunAgentQuery(`Find the relationship path between ${src} and ${tgt}.`);
  };

  // Discover Connections Action
  const handleDiscoverConnections = () => {
    handleRunAgentQuery("Discover hidden connections, cross-cluster anomalies, and shared conduits in this case.");
  };

  // Node Selection Handler
  const handleSelectNode = (node: GraphNode | null) => {
    setSelectedNode(node);
    if (node) {
      api.logAuditEvent("SELECT_NODE", `Investigator selected node: ${node.id} (${node.label})`);
    }
  };

  const handleSelectNodeById = (nodeId: string) => {
    if (!caseData) return;
    const n = caseData.nodes.find(node => node.id === nodeId);
    if (n) {
      setSelectedNode(n);
    }
  };

  // 13-Step Automated Guided Demo Orchestration Handler
  const handleExecuteDemoStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        // Step 1: Open Operation Trident
        setSelectedCaseId('CASE-TRIDENT-2026');
        loadCase('CASE-TRIDENT-2026');
        setIsolatedClusterId(null);
        setLayoutMode('force');
        setCutoffDate('2026-05-25');
        break;

      case 2:
        // Step 2: Show raw investigation entities
        setActiveEntityTypes(new Set(['PERSON', 'PHONE', 'VEHICLE', 'LOCATION', 'ORGANIZATION', 'ACCOUNT', 'EVENT']));
        setHighlightedNodeIds(['PERSON-01', 'PHONE-01', 'VEHICLE-01', 'LOC-01', 'ORG-01', 'ACC-01']);
        break;

      case 3:
        // Step 3: Build & Cluster relationship graph
        setLayoutMode('cluster');
        setHighlightedNodeIds([]);
        break;

      case 4:
        // Step 4: Select PERSON-07
        handleSelectNodeById('PERSON-07');
        break;

      case 5:
        // Step 5: Show its connections
        if (caseData) {
          const p7Edges = caseData.edges.filter(e => {
            const s = typeof e.source === 'object' ? e.source.id : e.source;
            const t = typeof e.target === 'object' ? e.target.id : e.target;
            return s === 'PERSON-07' || t === 'PERSON-07';
          }).map(e => e.id);
          setHighlightedEdgeIds(p7Edges);
        }
        break;

      case 6:
        // Step 6: Ask "Which entities connect separate clusters?"
        handleRunAgentQuery("Which entities connect separate clusters?");
        break;

      case 7:
        // Step 7: AI runs graph analysis (state handled by handleRunAgentQuery)
        break;

      case 8:
        // Step 8: Highlight bridge entity
        setHighlightedNodeIds(['PERSON-07', 'PHONE-03', 'VEHICLE-04', 'PERSON-04', 'PERSON-19']);
        setHighlightedEdgeIds(['E11', 'E12', 'E13', 'E19', 'E21']);
        break;

      case 9:
        // Step 9: Ask "Show relationship path between PERSON-04 and PERSON-19"
        handleRunAgentQuery("Show the relationship path between PERSON-04 and PERSON-19.");
        break;

      case 10:
        // Step 10: Graph animates the path
        setHighlightedNodeIds(['PERSON-04', 'PHONE-01', 'PHONE-03', 'PERSON-19']);
        setHighlightedEdgeIds(['E07', 'E19', 'E21']);
        break;

      case 11:
        // Step 11: Open timeline
        setCutoffDate('2026-01-31');
        break;

      case 12:
        // Step 12: Show how relationship evolved over time (Scrub to full May)
        setCutoffDate('2026-05-25');
        break;

      case 13:
        // Step 13: Generate Investigation Brief
        setIsBriefGeneratorOpen(true);
        break;

      default:
        break;
    }
  };

  // Filter nodes & edges by timeline cutoff date
  const filteredNodes = (caseData?.nodes || []).filter(n => {
    if (!n.first_observed) return true;
    return n.first_observed <= cutoffDate;
  });

  const filteredEdges = (caseData?.edges || []).filter(e => {
    if (!e.timestamp) return true;
    return e.timestamp <= cutoffDate;
  });

  return (
    <div className="w-screen h-screen bg-[#070b12] text-slate-100 flex flex-col overflow-hidden select-none">
      {/* 1. LANDING PAGE VIEW */}
      {viewMode === 'landing' ? (
        <LandingPage
          onStartInvestigation={() => setViewMode('workspace')}
          onLaunchGuidedDemo={() => {
            setViewMode('workspace');
            setIsGuidedDemoActive(true);
          }}
        />
      ) : (
        /* 2. THREE-PANEL INTELLIGENCE WORKSPACE */
        <div className="flex flex-col w-full h-full">
          {/* TOP BAR */}
          <TopBar
            caseData={caseData}
            selectedCaseId={selectedCaseId}
            onSelectCase={loadCase}
            onSearchSelectEntity={handleSelectNodeById}
            onOpenEntityResolution={() => setIsEntityResolutionOpen(true)}
            onOpenCaseComparison={() => setIsCaseComparisonOpen(true)}
            onOpenBriefGenerator={() => setIsBriefGeneratorOpen(true)}
            onOpenAuditLog={() => setIsAuditLogOpen(true)}
            onToggleGuidedDemo={() => setIsGuidedDemoActive(!isGuidedDemoActive)}
            isGuidedDemoActive={isGuidedDemoActive}
            onResetView={() => {
              setHighlightedNodeIds([]);
              setHighlightedEdgeIds([]);
              setIsolatedClusterId(null);
              setLayoutMode('force');
              setCutoffDate('2026-05-25');
            }}
            onReturnToLanding={() => setViewMode('landing')}
          />

          {/* MAIN THREE-PANEL BODY */}
          <div className="flex-1 flex w-full overflow-hidden relative">
            {/* LEFT PANEL: Filters, Clusters, Analytics */}
            <LeftFilterPanel
              nodes={filteredNodes}
              edges={filteredEdges}
              communities={communities}
              bridgeEntities={bridgeEntities}
              activeEntityTypes={activeEntityTypes}
              onToggleEntityType={(type) => {
                const next = new Set(activeEntityTypes);
                if (next.has(type)) next.delete(type);
                else next.add(type);
                setActiveEntityTypes(next);
              }}
              activeRelationshipTypes={activeRelationshipTypes}
              onToggleRelationshipType={(type) => {
                const next = new Set(activeRelationshipTypes);
                if (next.has(type)) next.delete(type);
                else next.add(type);
                setActiveRelationshipTypes(next);
              }}
              isolatedClusterId={isolatedClusterId}
              onSelectCluster={setIsolatedClusterId}
              onSelectNodeById={handleSelectNodeById}
              onCalculateShortestPath={handleCalculateShortestPath}
              onDiscoverConnections={handleDiscoverConnections}
            />

            {/* CENTER PANEL: Hero Interactive Relationship Graph Canvas */}
            <div className="flex-1 h-full relative overflow-hidden bg-[#070c14]">
              <GraphCanvas
                nodes={filteredNodes}
                edges={filteredEdges}
                selectedNodeId={selectedNode?.id || null}
                highlightedNodeIds={highlightedNodeIds}
                highlightedEdgeIds={highlightedEdgeIds}
                onSelectNode={handleSelectNode}
                isolatedClusterId={isolatedClusterId}
                activeEntityTypes={activeEntityTypes}
                activeRelationshipTypes={activeRelationshipTypes}
                layoutMode={layoutMode}
                onChangeLayoutMode={setLayoutMode}
              />
            </div>

            {/* RIGHT PANEL: Entity Intelligence & AI Investigation Assistant */}
            <RightIntelligencePanel
              selectedNode={selectedNode}
              edges={filteredEdges}
              onSelectNodeById={handleSelectNodeById}
              onRunAgentQuery={handleRunAgentQuery}
              agentResponse={agentResponse}
              isAgentLoading={isAgentLoading}
              onExplainEntity={handleExplainEntity}
              onHighlightPath={(nIds, eIds) => {
                setHighlightedNodeIds(nIds);
                setHighlightedEdgeIds(eIds);
              }}
            />
          </div>

          {/* BOTTOM BAR: Interactive Timeline Evolution Scrubber */}
          <TimelineScrubber
            currentCutoffDate={cutoffDate}
            onCutoffDateChange={setCutoffDate}
            milestones={caseData ? (caseData as any).milestones || [] : []}
            activeEntityCount={filteredNodes.length}
            activeConnectionCount={filteredEdges.length}
          />

          {/* 90-SECOND GUIDED DEMO OVERLAY CONTROLLER */}
          <GuidedDemoController
            isActive={isGuidedDemoActive}
            onClose={() => setIsGuidedDemoActive(false)}
            onExecuteDemoStep={handleExecuteDemoStep}
          />

          {/* MODALS & DRAWERS */}
          <EntityResolutionModal
            isOpen={isEntityResolutionOpen}
            onClose={() => setIsEntityResolutionOpen(false)}
            candidates={resolutionCandidates}
            onResolveCandidate={handleResolveCandidate}
          />

          <CaseComparisonModal
            isOpen={isCaseComparisonOpen}
            onClose={() => setIsCaseComparisonOpen(false)}
            onSelectSharedEntity={(entId) => {
              handleSelectNodeById(entId);
            }}
          />

          <InvestigationBriefModal
            isOpen={isBriefGeneratorOpen}
            onClose={() => setIsBriefGeneratorOpen(false)}
            caseId={selectedCaseId}
          />

          <AuditLogDrawer
            isOpen={isAuditLogOpen}
            onClose={() => setIsAuditLogOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
