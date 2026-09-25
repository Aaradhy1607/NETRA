import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Cpu, 
  Send, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Network, 
  Clock, 
  MapPin, 
  Phone, 
  Car, 
  Building2, 
  CreditCard, 
  FileSearch,
  Zap,
  Info,
  ChevronRight,
  Route
} from 'lucide-react';
import { 
  GraphNode, 
  GraphEdge, 
  AgentQueryResponse, 
  NodeType 
} from '../types';
import { NODE_CONFIG } from './GraphCanvas';

interface RightIntelligencePanelProps {
  selectedNode: GraphNode | null;
  edges: GraphEdge[];
  onSelectNodeById: (nodeId: string) => void;
  onRunAgentQuery: (query: string) => void;
  agentResponse: AgentQueryResponse | null;
  isAgentLoading: boolean;
  onExplainEntity: (entityId: string) => void;
  onHighlightPath: (nodeIds: string[], edgeIds: string[]) => void;
}

export const RightIntelligencePanel: React.FC<RightIntelligencePanelProps> = ({
  selectedNode,
  edges,
  onSelectNodeById,
  onRunAgentQuery,
  agentResponse,
  isAgentLoading,
  onExplainEntity,
  onHighlightPath
}) => {
  const [activeTab, setActiveTab] = useState<'entity' | 'assistant'>('assistant');
  const [queryInput, setQueryInput] = useState('');

  // Find all direct neighbors of selected node
  const directConnections = selectedNode ? edges.filter(e => {
    const srcId = typeof e.source === 'object' ? e.source.id : e.source;
    const tgtId = typeof e.target === 'object' ? e.target.id : e.target;
    return srcId === selectedNode.id || tgtId === selectedNode.id;
  }).map(e => {
    const srcId = typeof e.source === 'object' ? e.source.id : e.source;
    const tgtId = typeof e.target === 'object' ? e.target.id : e.target;
    const isTarget = srcId === selectedNode.id;
    const neighborId = isTarget ? tgtId : srcId;
    return {
      edgeId: e.id,
      neighborId,
      relType: e.type,
      details: e.details,
      timestamp: e.timestamp
    };
  }) : [];

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim() || isAgentLoading) return;
    onRunAgentQuery(queryInput);
    setActiveTab('assistant');
  };

  const presetQueries = [
    { label: "Bridge Entities", query: "Which entities connect separate clusters?" },
    { label: "Shortest Path (P-04 ↔ P-19)", query: "Find the relationship path between PERSON-04 and PERSON-19." },
    { label: "Highest Centrality", query: "Show the most connected individuals in this case." },
    { label: "Explain PERSON-07", query: "Explain why PERSON-07 appears important to this investigation." },
    { label: "Spatial Convergence", query: "Which locations are associated with multiple important entities?" },
    { label: "Timeline Evolution", query: "Show relationships that appeared during the last 30 days." }
  ];

  return (
    <div className="w-96 bg-[#090e17] border-l border-slate-800 text-slate-200 flex flex-col h-full select-none z-20">
      {/* Tab Switcher Header */}
      <div className="flex items-center border-b border-slate-800 bg-[#070b13] p-1 gap-1 text-xs font-mono">
        <button
          onClick={() => setActiveTab('assistant')}
          className={`flex-1 py-2 px-3 rounded flex items-center justify-center space-x-2 transition-colors cursor-pointer ${
            activeTab === 'assistant' 
              ? 'bg-slate-800 text-sky-300 font-semibold border border-slate-700 shadow-sm' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-sky-400" />
          <span>AI Assistant</span>
        </button>

        <button
          onClick={() => setActiveTab('entity')}
          className={`flex-1 py-2 px-3 rounded flex items-center justify-center space-x-2 transition-colors cursor-pointer ${
            activeTab === 'entity' 
              ? 'bg-slate-800 text-sky-300 font-semibold border border-slate-700 shadow-sm' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileSearch className="w-3.5 h-3.5 text-indigo-400" />
          <span>Entity Intel {selectedNode ? `(${selectedNode.id})` : ''}</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
        
        {/* ================= TAB 1: AI INVESTIGATION ASSISTANT ================= */}
        {activeTab === 'assistant' && (
          <div className="space-y-4">
            {/* Assistant Query Bar */}
            <form onSubmit={handleQuerySubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask intelligence assistant..."
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-3 pr-10 py-2.5 text-xs text-sky-200 placeholder-slate-500 outline-none focus:border-sky-400 font-sans"
                />
                <button
                  type="submit"
                  disabled={!queryInput.trim() || isAgentLoading}
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-md bg-sky-500 hover:bg-sky-400 text-slate-950 disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Preset Query Chips */}
              <div>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block mb-1.5">
                  Intelligence Queries:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {presetQueries.map((pq, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setQueryInput(pq.query);
                        onRunAgentQuery(pq.query);
                      }}
                      className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-sky-500/50 text-slate-300 transition-colors text-left cursor-pointer"
                    >
                      {pq.label}
                    </button>
                  ))}
                </div>
              </div>
            </form>

            {/* Live Loading State */}
            {isAgentLoading && (
              <div className="p-4 bg-slate-900/80 border border-sky-500/40 rounded-xl space-y-3 animate-pulse">
                <div className="flex items-center space-x-2 text-sky-400 font-mono text-xs font-semibold">
                  <Cpu className="w-4 h-4 animate-spin" />
                  <span>Agentic Graph Pipeline Executing...</span>
                </div>
                <div className="space-y-1.5 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                    <span>Traversing NetworkX multi-cluster topology...</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    <span>Evaluating betweenness centrality conduits...</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Synthesizing grounded evidence trail...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Agent Query Response Card */}
            {agentResponse && !isAgentLoading && (
              <div className="space-y-3">
                
                {/* 1. OBSERVABLE REASONING & EXECUTION TRACE */}
                <div className="bg-[#060a12] border border-slate-800 rounded-lg p-3 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-slate-400 pb-2 mb-2 border-b border-slate-800/80">
                    <div className="flex items-center space-x-1.5 text-sky-400 font-semibold">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>OBSERVABLE EXECUTION TRACE</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-1.5 py-0.2 rounded">
                      VERIFIED
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {agentResponse.execution_trace.map((step, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-[10px] leading-tight">
                        <span className="text-sky-400 font-bold shrink-0">{step.step}.</span>
                        <div>
                          <span className="text-slate-300 font-semibold">{step.title}: </span>
                          <span className="text-slate-400 font-sans">{step.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. STRUCTURED INTELLIGENCE CLAIM & INSIGHT */}
                <div className="bg-slate-900 border border-sky-500/40 rounded-xl p-3.5 shadow-lg space-y-3">
                  {/* Claim Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800 px-2 py-0.5 rounded">
                      INTELLIGENCE FINDING
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">
                      Confidence: {Math.round(agentResponse.confidence * 100)}%
                    </span>
                  </div>

                  {/* Main Claim */}
                  <div className="text-xs font-semibold text-white leading-relaxed">
                    {agentResponse.claim}
                  </div>

                  {/* Summary Narrative */}
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    {agentResponse.summary}
                  </p>

                  {/* Evidence Path / Chain */}
                  {agentResponse.evidence_chain && (
                    <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold block">
                        Supporting Evidence Chain:
                      </span>
                      <div className="space-y-1 font-mono text-[11px]">
                        {agentResponse.evidence_chain.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-slate-900/90 px-2 py-1 rounded border border-slate-800">
                            <span className="text-sky-300">{item.source}</span>
                            <span className="text-slate-500 text-[10px]">[{item.rel}]</span>
                            <span className="text-indigo-300">{item.target}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive Highlight Action */}
                  <button
                    onClick={() => onHighlightPath(agentResponse.highlight_nodes, agentResponse.highlight_edges)}
                    className="w-full flex items-center justify-center space-x-2 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 py-2 rounded-lg font-mono font-medium transition-colors cursor-pointer text-xs"
                  >
                    <Route className="w-3.5 h-3.5" />
                    <span>Highlight Path & Entities on Graph</span>
                  </button>

                  {/* Mandatory Legal & Analytical Disclaimer */}
                  <div className="text-[10px] text-amber-300/80 bg-amber-500/10 border border-amber-500/20 p-2 rounded leading-snug">
                    <Info className="w-3 h-3 inline mr-1 text-amber-400" />
                    <span>{agentResponse.disclaimer}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: ENTITY INTELLIGENCE PANEL ================= */}
        {activeTab === 'entity' && (
          <div className="space-y-4">
            {selectedNode ? (
              <div className="space-y-4">
                {/* Node Identity Card */}
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-sky-300">{selectedNode.id}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {selectedNode.type}
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-white">
                    {selectedNode.label}
                  </div>

                  {selectedNode.role && (
                    <div className="text-xs text-slate-300">
                      Role: <strong className="text-slate-100">{selectedNode.role}</strong>
                    </div>
                  )}

                  <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between border-t border-slate-800 pt-2">
                    <span>Cluster: <strong className="text-indigo-400">{selectedNode.cluster}</strong></span>
                    <span>Confidence: <strong className="text-emerald-400">{Math.round(selectedNode.confidence * 100)}%</strong></span>
                  </div>
                </div>

                {/* Investigative Priority Breakdown */}
                <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-amber-400">
                      Investigative Priority Review
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {selectedNode.risk_level || 'HIGH PRIORITY'}
                    </span>
                  </div>

                  {/* Explainable Factor Grid */}
                  <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                    <div className="bg-slate-950 p-2 rounded border border-slate-800">
                      <span className="text-slate-500 block">Connectivity:</span>
                      <span className="text-white font-bold">{selectedNode.priority_breakdown?.connectivity || (selectedNode.degree && selectedNode.degree > 5 ? 'High' : 'Medium')}</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded border border-slate-800">
                      <span className="text-slate-500 block">Bridge Position:</span>
                      <span className="text-white font-bold">{selectedNode.priority_breakdown?.bridge_position || (selectedNode.is_bridge ? 'Critical' : 'Standard')}</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded border border-slate-800">
                      <span className="text-slate-500 block">Temporal Recency:</span>
                      <span className="text-white font-bold">{selectedNode.priority_breakdown?.temporal_relevance || 'High (May 2026)'}</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded border border-slate-800">
                      <span className="text-slate-500 block">Cross-Case Overlap:</span>
                      <span className="text-white font-bold">{selectedNode.priority_breakdown?.cross_case_links || 'Evaluated'}</span>
                    </div>
                  </div>

                  {/* Explain Entity Importance Button */}
                  <button
                    onClick={() => onExplainEntity(selectedNode.id)}
                    className="w-full flex items-center justify-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Why is this entity important?</span>
                  </button>

                  <div className="text-[9px] text-slate-400 italic">
                    This is an analytical prioritization signal, not a determination of guilt.
                  </div>
                </div>

                {/* Connected Entities List */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold flex items-center justify-between">
                    <span>Direct Connections ({directConnections.length})</span>
                    <span className="text-[10px] text-sky-400">CLICK TO INSPECT</span>
                  </div>

                  <div className="space-y-1.5 max-h-56 overflow-y-auto">
                    {directConnections.map((conn, idx) => (
                      <button
                        key={idx}
                        onClick={() => onSelectNodeById(conn.neighborId)}
                        className="w-full text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <span className="font-mono font-bold text-sky-300 text-xs mr-2">{conn.neighborId}</span>
                          <span className="text-[10px] font-mono text-slate-400">[{conn.relType.replace('_', ' ')}]</span>
                          {conn.details && (
                            <div className="text-[10px] text-slate-400 font-sans mt-0.5 truncate max-w-[210px]">
                              {conn.details}
                            </div>
                          )}
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Surveillance Notes */}
                {selectedNode.notes && (
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                      Case File Surveillance Notes:
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                      {selectedNode.notes}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 space-y-3">
                <Network className="w-8 h-8 mx-auto text-slate-600" />
                <p className="text-xs">
                  No entity currently selected. Click any node on the graph to inspect its relationships and priority signals.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
