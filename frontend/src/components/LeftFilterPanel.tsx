import React, { useState } from 'react';
import { 
  Filter, 
  Layers, 
  Network, 
  GitCommit, 
  Sparkles, 
  ChevronRight, 
  ChevronDown, 
  Route, 
  Zap, 
  Check,
  Radio,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  GraphNode, 
  GraphEdge, 
  NodeType, 
  EdgeType, 
  Community, 
  BridgeEntity 
} from '../types';
import { NODE_CONFIG, EDGE_COLORS } from './GraphCanvas';

interface LeftFilterPanelProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  communities: Community[];
  bridgeEntities: BridgeEntity[];
  activeEntityTypes: Set<NodeType>;
  onToggleEntityType: (type: NodeType) => void;
  activeRelationshipTypes: Set<EdgeType>;
  onToggleRelationshipType: (type: EdgeType) => void;
  isolatedClusterId: string | null;
  onSelectCluster: (clusterId: string | null) => void;
  onSelectNodeById: (nodeId: string) => void;
  onCalculateShortestPath: (sourceId: string, targetId: string) => void;
  onDiscoverConnections: () => void;
}

export const LeftFilterPanel: React.FC<LeftFilterPanelProps> = ({
  nodes,
  edges,
  communities,
  bridgeEntities,
  activeEntityTypes,
  onToggleEntityType,
  activeRelationshipTypes,
  onToggleRelationshipType,
  isolatedClusterId,
  onSelectCluster,
  onSelectNodeById,
  onCalculateShortestPath,
  onDiscoverConnections
}) => {
  const [activeSection, setActiveSection] = useState<'filters' | 'clusters' | 'analytics' | 'path'>('filters');
  const [pathSource, setPathSource] = useState('PERSON-04');
  const [pathTarget, setPathTarget] = useState('PERSON-19');

  // Count nodes by type
  const nodeTypeCounts = nodes.reduce((acc, node) => {
    acc[node.type] = (acc[node.type] || 0) + 1;
    return acc;
  }, {} as Record<NodeType, number>);

  // Count edges by type
  const edgeTypeCounts = edges.reduce((acc, edge) => {
    acc[edge.type] = (acc[edge.type] || 0) + 1;
    return acc;
  }, {} as Record<EdgeType, number>);

  const allEntityTypes: NodeType[] = [
    'PERSON', 'PHONE', 'VEHICLE', 'LOCATION', 'ORGANIZATION', 'ACCOUNT', 'EVENT'
  ];

  const allEdgeTypes: EdgeType[] = [
    'CALLED', 'VISITED', 'OWNED', 'ASSOCIATED_WITH', 'TRANSACTED_WITH', 'WORKED_WITH', 'OBSERVED_AT', 'INVOLVED_IN'
  ];

  return (
    <div className="w-80 bg-[#090e17] border-r border-slate-800 text-slate-200 flex flex-col h-full select-none z-20">
      {/* Top Section Tabs */}
      <div className="flex items-center border-b border-slate-800 bg-[#070b13] p-1 gap-1 text-xs font-mono">
        <button
          onClick={() => setActiveSection('filters')}
          className={`flex-1 py-1.5 px-2 rounded text-center transition-colors cursor-pointer ${
            activeSection === 'filters' ? 'bg-slate-800 text-sky-300 font-semibold border border-slate-700' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Filters
        </button>
        <button
          onClick={() => setActiveSection('clusters')}
          className={`flex-1 py-1.5 px-2 rounded text-center transition-colors cursor-pointer ${
            activeSection === 'clusters' ? 'bg-slate-800 text-sky-300 font-semibold border border-slate-700' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Clusters
        </button>
        <button
          onClick={() => setActiveSection('analytics')}
          className={`flex-1 py-1.5 px-2 rounded text-center transition-colors cursor-pointer ${
            activeSection === 'analytics' ? 'bg-slate-800 text-sky-300 font-semibold border border-slate-700' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Metrics
        </button>
        <button
          onClick={() => setActiveSection('path')}
          className={`flex-1 py-1.5 px-2 rounded text-center transition-colors cursor-pointer ${
            activeSection === 'path' ? 'bg-slate-800 text-sky-300 font-semibold border border-slate-700' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Path
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 font-sans text-xs">
        
        {/* PROMINENT DISCOVER CONNECTIONS ACTION BUTTON */}
        <div className="bg-gradient-to-r from-sky-950/60 to-indigo-950/60 border border-sky-500/30 p-3 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span className="font-semibold text-white tracking-wide">Graph Intelligence Discovery</span>
          </div>
          <p className="text-[11px] text-slate-300 mb-2.5 leading-relaxed">
            Run automated anomaly scan for multi-hop bridges, shared identifiers, and cross-cluster conduits.
          </p>
          <button
            id="btn-discover-connections"
            onClick={onDiscoverConnections}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-semibold py-2 px-3 rounded text-xs shadow-md transition-all cursor-pointer font-mono"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Discover Connections</span>
          </button>
        </div>

        {/* 1. FILTERS TAB */}
        {activeSection === 'filters' && (
          <div className="space-y-4">
            {/* Entity Types Multi-Select */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                <span>Entity Types ({activeEntityTypes.size}/{allEntityTypes.length})</span>
              </div>
              <div className="space-y-1 font-mono text-xs">
                {allEntityTypes.map(type => {
                  const config = NODE_CONFIG[type];
                  const count = nodeTypeCounts[type] || 0;
                  const isActive = activeEntityTypes.has(type);

                  return (
                    <button
                      key={type}
                      onClick={() => onToggleEntityType(type)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded border transition-colors cursor-pointer ${
                        isActive 
                          ? 'bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-500' 
                          : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{config.icon}</span>
                        <span className="font-medium text-[11px]">{type}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                          {count}
                        </span>
                        {isActive ? (
                          <Eye className="w-3 h-3 text-sky-400" />
                        ) : (
                          <EyeOff className="w-3 h-3 text-slate-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Relationship Types Multi-Select */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                <span>Relationships ({activeRelationshipTypes.size}/{allEdgeTypes.length})</span>
              </div>
              <div className="space-y-1 font-mono text-xs">
                {allEdgeTypes.map(type => {
                  const color = EDGE_COLORS[type] || '#64748b';
                  const count = edgeTypeCounts[type] || 0;
                  const isActive = activeRelationshipTypes.has(type);

                  return (
                    <button
                      key={type}
                      onClick={() => onToggleRelationshipType(type)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded border transition-colors cursor-pointer ${
                        isActive 
                          ? 'bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-500' 
                          : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-full" 
                          style={{ backgroundColor: color }}
                        />
                        <span className="font-medium text-[11px]">{type.replace('_', ' ')}</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 2. CLUSTERS TAB */}
        {activeSection === 'clusters' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              <span>Detected Sub-Networks ({communities.length})</span>
              {isolatedClusterId && (
                <button
                  onClick={() => onSelectCluster(null)}
                  className="text-[10px] text-sky-400 hover:underline cursor-pointer"
                >
                  Reset Isolation
                </button>
              )}
            </div>

            <div className="space-y-2">
              {communities.map((comm) => {
                const isIsolated = isolatedClusterId === comm.name || isolatedClusterId === comm.id;
                return (
                  <div
                    key={comm.id}
                    className={`p-3 rounded-lg border transition-all ${
                      isIsolated 
                        ? 'bg-sky-950/40 border-sky-500 shadow-md shadow-sky-500/10' 
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-white font-mono text-xs">{comm.name}</span>
                      <span className="text-[10px] bg-slate-800 text-sky-300 font-mono px-2 py-0.5 rounded border border-slate-700">
                        {comm.size} entities
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mb-2">
                      {comm.summary}
                    </p>

                    {/* Type breakdown pills */}
                    <div className="flex flex-wrap gap-1 mb-2.5">
                      {Object.entries(comm.type_breakdown || {}).map(([t, count]) => (
                        <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                          {t}: {count}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => onSelectCluster(isIsolated ? null : comm.name)}
                      className={`w-full py-1 px-2 rounded text-[11px] font-mono font-medium transition-colors cursor-pointer ${
                        isIsolated
                          ? 'bg-sky-500 text-slate-950 font-bold'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      {isIsolated ? 'Isolating Cluster (Click to Reset)' : 'Isolate This Cluster'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. METRICS TAB */}
        {activeSection === 'analytics' && (
          <div className="space-y-4">
            {/* Bridge Entities */}
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 font-semibold flex items-center justify-between">
                <span>Bridge Entities ({bridgeEntities.length})</span>
                <span className="text-[10px] text-rose-400 font-bold">CRITICAL LINKS</span>
              </div>
              <div className="space-y-2">
                {bridgeEntities.map(bridge => (
                  <button
                    key={bridge.id}
                    onClick={() => onSelectNodeById(bridge.id)}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-900/90 border border-rose-500/30 hover:border-rose-400 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sky-300 font-mono text-xs">{bridge.id}</span>
                      <span className="text-[10px] text-rose-400 font-mono font-semibold">
                        Btw: {bridge.betweenness}
                      </span>
                    </div>
                    <div className="text-xs text-white font-medium mb-1 truncate">
                      {bridge.label}
                    </div>
                    <div className="text-[10px] text-slate-400 leading-snug">
                      {bridge.explanation}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Centrality Leaders */}
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                <span>Top Degree Centrality</span>
              </div>
              <div className="space-y-1 font-mono text-xs">
                {nodes
                  .filter(n => n.type === 'PERSON' || n.type === 'ORGANIZATION')
                  .sort((a, b) => (b.degree || 0) - (a.degree || 0))
                  .slice(0, 5)
                  .map((node) => (
                    <button
                      key={node.id}
                      onClick={() => onSelectNodeById(node.id)}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-left transition-colors cursor-pointer"
                    >
                      <div className="truncate pr-2">
                        <span className="text-sky-400 font-semibold mr-1.5">{node.id}</span>
                        <span className="text-slate-300 text-[11px]">{node.label}</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                        {node.degree} links
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. PATH CALCULATION TAB */}
        {activeSection === 'path' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Shortest Path Traverser
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Find shortest indirect relationship sequence and multi-hop chain between two entities.
            </p>

            <div className="space-y-2">
              <div>
                <label className="text-[10px] text-slate-400 uppercase block mb-1">Source Entity ID</label>
                <input
                  type="text"
                  value={pathSource}
                  onChange={(e) => setPathSource(e.target.value.toUpperCase())}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-sky-300 outline-none focus:border-sky-400"
                  placeholder="e.g. PERSON-04"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase block mb-1">Target Entity ID</label>
                <input
                  type="text"
                  value={pathTarget}
                  onChange={(e) => setPathTarget(e.target.value.toUpperCase())}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-sky-300 outline-none focus:border-sky-400"
                  placeholder="e.g. PERSON-19"
                />
              </div>

              <button
                onClick={() => onCalculateShortestPath(pathSource, pathTarget)}
                className="w-full flex items-center justify-center space-x-2 bg-sky-600 hover:bg-sky-500 text-slate-950 font-bold py-2 rounded transition-colors cursor-pointer mt-2"
              >
                <Route className="w-4 h-4" />
                <span>Calculate Path</span>
              </button>
            </div>

            {/* Preset Quick Pairs */}
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block mb-1.5">Preset Benchmark Pairs:</span>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setPathSource('PERSON-04');
                    setPathTarget('PERSON-19');
                    onCalculateShortestPath('PERSON-04', 'PERSON-19');
                  }}
                  className="w-full text-left px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] text-sky-300 transition-colors cursor-pointer"
                >
                  PERSON-04 (Finance) ↔ PERSON-19 (Regional Comms)
                </button>
                <button
                  onClick={() => {
                    setPathSource('PERSON-01');
                    setPathTarget('PERSON-12');
                    onCalculateShortestPath('PERSON-01', 'PERSON-12');
                  }}
                  className="w-full text-left px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] text-sky-300 transition-colors cursor-pointer"
                >
                  PERSON-01 (Broker) ↔ PERSON-12 (Ghost Courier)
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
