import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  GitCompare, 
  GitMerge, 
  FileText, 
  History, 
  Sparkles, 
  RefreshCw, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle,
  Radio,
  SlidersHorizontal,
  Home
} from 'lucide-react';
import { CaseData, GraphNode } from '../types';

interface TopBarProps {
  caseData: CaseData | null;
  selectedCaseId: string;
  onSelectCase: (caseId: string) => void;
  onSearchSelectEntity: (nodeId: string) => void;
  onOpenEntityResolution: () => void;
  onOpenCaseComparison: () => void;
  onOpenBriefGenerator: () => void;
  onOpenAuditLog: () => void;
  onToggleGuidedDemo: () => void;
  isGuidedDemoActive: boolean;
  onResetView: () => void;
  onReturnToLanding: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  caseData,
  selectedCaseId,
  onSelectCase,
  onSearchSelectEntity,
  onOpenEntityResolution,
  onOpenCaseComparison,
  onOpenBriefGenerator,
  onOpenAuditLog,
  onToggleGuidedDemo,
  isGuidedDemoActive,
  onResetView,
  onReturnToLanding
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCaseMenuOpen, setIsCaseMenuOpen] = useState(false);

  // Filter search results
  const searchResults = (caseData?.nodes || []).filter(node => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase();
    return (
      node.id.toLowerCase().includes(q) ||
      node.label.toLowerCase().includes(q) ||
      (node.role && node.role.toLowerCase().includes(q)) ||
      node.type.toLowerCase().includes(q)
    );
  }).slice(0, 8);

  return (
    <header className="w-full bg-[#080d16] border-b border-slate-800 text-slate-100 flex flex-col z-30 select-none">
      {/* Top Security & Classification Strip */}
      <div className="bg-[#05080e] border-b border-slate-800/80 px-4 py-1 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span>RESTRICTED // LAW ENFORCEMENT & INTEL USE ONLY</span>
          </span>
          <span className="hidden md:inline text-slate-500">•</span>
          <span className="hidden md:inline text-slate-400">
            OPERATOR: <strong className="text-slate-300">ANALYST-709</strong> // SIU COMMAND
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-xs text-sky-400 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            <span>INTEL ENGINE ONLINE</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 hidden sm:inline">SYNTHETIC BENCHMARK v2.0</span>
        </div>
      </div>

      {/* Main Action & HUD Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Branding & Case Selector */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={onReturnToLanding}
            title="Return to NETRA Home"
            className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-sky-400 text-sky-400 transition-colors cursor-pointer"
          >
            <Shield className="w-4 h-4 text-sky-400" />
            <span className="font-extrabold tracking-wider text-sm text-white">NETRA</span>
          </button>

          {/* Case Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCaseMenuOpen(!isCaseMenuOpen)}
              className="flex items-center space-x-2 bg-slate-900/90 border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-mono font-semibold text-sky-300">
                {selectedCaseId === 'CASE-TRIDENT-2026' ? 'Operation Trident' : 'Operation Meridian'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isCaseMenuOpen && (
              <div className="absolute left-0 mt-1.5 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl z-50 p-1 font-mono text-xs">
                <div className="px-3 py-1.5 text-[10px] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-800">
                  Select Investigation Case
                </div>
                <button
                  onClick={() => { onSelectCase('CASE-TRIDENT-2026'); setIsCaseMenuOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded flex flex-col space-y-0.5 cursor-pointer hover:bg-slate-800 transition-colors ${
                    selectedCaseId === 'CASE-TRIDENT-2026' ? 'bg-sky-950/50 text-sky-300 font-semibold' : 'text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Operation Trident</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 rounded">PRIMARY</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-sans">Hawala logistics & shell network</span>
                </button>

                <button
                  onClick={() => { onSelectCase('CASE-MERIDIAN-2026'); setIsCaseMenuOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded flex flex-col space-y-0.5 cursor-pointer hover:bg-slate-800 transition-colors ${
                    selectedCaseId === 'CASE-MERIDIAN-2026' ? 'bg-sky-950/50 text-sky-300 font-semibold' : 'text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Operation Meridian</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 rounded">TARGETING</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-sans">Cross-border freight & transit</span>
                </button>
              </div>
            )}
          </div>

          {/* Status Badge */}
          <div className="hidden lg:flex items-center space-x-1.5 bg-slate-900/60 border border-slate-800 px-2.5 py-1 rounded text-xs font-mono text-slate-300">
            <span className="text-slate-500">STATUS:</span>
            <span className="text-amber-400 font-medium">{caseData?.status || 'Active Surveillance'}</span>
          </div>
        </div>

        {/* Center: HUD Metrics Counter */}
        <div className="hidden md:flex items-center space-x-3 bg-slate-950/70 border border-slate-800/80 px-3.5 py-1 rounded-lg font-mono text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400">ENTITIES:</span>
            <span className="text-sky-400 font-bold">{caseData?.stats.total_entities || 28}</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400">CONNECTIONS:</span>
            <span className="text-indigo-400 font-bold">{caseData?.stats.total_connections || 49}</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400">CLUSTERS:</span>
            <span className="text-emerald-400 font-bold">{caseData?.stats.communities_count || 3}</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400">BRIDGES:</span>
            <span className="text-rose-400 font-bold">{caseData?.stats.bridge_nodes_count || 2}</span>
          </div>
        </div>

        {/* Right: Global Search & Tool Modal Buttons */}
        <div className="flex items-center space-x-2">
          {/* Global Fuzzy Search */}
          <div className="relative">
            <div className="flex items-center bg-slate-900 border border-slate-700 focus-within:border-sky-400 rounded-lg px-2.5 py-1.2 text-xs w-44 sm:w-56 transition-all">
              <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search entity, ID, phone..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="bg-transparent border-none outline-none text-slate-200 placeholder-slate-500 w-full text-xs font-mono"
              />
            </div>

            {/* Search Dropdown Results */}
            {isSearchOpen && searchResults.length > 0 && (
              <div 
                className="absolute right-0 mt-1.5 w-72 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl z-50 p-1 font-mono text-xs max-h-80 overflow-y-auto"
                onMouseLeave={() => setIsSearchOpen(false)}
              >
                <div className="px-3 py-1 text-[10px] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-800">
                  Search Matches ({searchResults.length})
                </div>
                {searchResults.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => {
                      onSearchSelectEntity(node.id);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-3 py-2 rounded hover:bg-slate-800 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-sky-300">{node.id}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[170px]">
                        {node.label}
                      </div>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {node.type}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Entity Resolution Button */}
          <button
            id="btn-entity-resolution"
            onClick={onOpenEntityResolution}
            title="Entity Resolution (Ambiguous / Duplicate Records)"
            className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-sky-500/50 text-slate-200 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <GitMerge className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden xl:inline">Entity Resolution</span>
          </button>

          {/* Case Comparison Button */}
          <button
            id="btn-case-comparison"
            onClick={onOpenCaseComparison}
            title="Cross-Case Overlap Comparison"
            className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-sky-500/50 text-slate-200 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <GitCompare className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xl:inline">Compare Cases</span>
          </button>

          {/* Investigation Brief Button */}
          <button
            id="btn-generate-brief"
            onClick={onOpenBriefGenerator}
            title="Generate Restricted Investigation Brief"
            className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 text-emerald-300 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden lg:inline">Investigation Brief</span>
          </button>

          {/* Audit Log Button */}
          <button
            id="btn-audit-log"
            onClick={onOpenAuditLog}
            title="Privacy & Cryptographic Audit Log"
            className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-medium px-2 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden 2xl:inline">Audit Log</span>
          </button>

          {/* 90s Guided Demo Mode Toggle */}
          <button
            id="btn-guided-demo-toggle"
            onClick={onToggleGuidedDemo}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isGuidedDemoActive
                ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/30 font-bold'
                : 'bg-sky-500/10 border border-sky-500/40 text-sky-300 hover:bg-sky-500/20'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>90s Demo Mode</span>
          </button>

          {/* Reset View Button */}
          <button
            onClick={onResetView}
            title="Reset Graph Zoom & Position"
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
