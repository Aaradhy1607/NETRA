import React, { useEffect, useState } from 'react';
import { 
  X, 
  GitCompare, 
  ShieldAlert, 
  Sparkles, 
  Layers, 
  ArrowRight,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { api } from '../services/api';

interface CaseComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSharedEntity: (entityId: string) => void;
}

export const CaseComparisonModal: React.FC<CaseComparisonModalProps> = ({
  isOpen,
  onClose,
  onSelectSharedEntity
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      api.getCaseComparison()
        .then(res => {
          setData(res);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-[#090f1a] border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#060a12]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <span>Multi-Case Intelligence Comparison</span>
                <span className="text-xs font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  CROSS-CASE OVERLAP
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Correlating Operation Trident against Operation Meridian for shared conduits.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Comparison Cards Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Case A */}
            <div className="bg-slate-900/90 border border-sky-500/30 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-sky-400 font-bold">CASE FILE A</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  ACTIVE
                </span>
              </div>
              <div className="text-sm font-bold text-white">Operation Trident</div>
              <p className="text-xs text-slate-400">
                Hawala layering, shell corporations & maritime freight consignments.
              </p>
              <div className="text-xs font-mono text-slate-300 pt-1">
                Total Entities: <strong className="text-sky-300">28</strong> | Total Links: <strong className="text-sky-300">49</strong>
              </div>
            </div>

            {/* Case B */}
            <div className="bg-slate-900/90 border border-amber-500/30 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold">CASE FILE B</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  TARGETING
                </span>
              </div>
              <div className="text-sm font-bold text-white">Operation Meridian</div>
              <p className="text-xs text-slate-400">
                Cross-border transport corridors, frontier checkpoints & shadow logistics.
              </p>
              <div className="text-xs font-mono text-slate-300 pt-1">
                Total Entities: <strong className="text-amber-300">9</strong> | Total Links: <strong className="text-amber-300">8</strong>
              </div>
            </div>
          </div>

          {/* Analytical Correlation Summary */}
          {data && (
            <div className="bg-gradient-to-r from-slate-900 to-amber-950/30 border border-amber-500/30 p-4 rounded-xl space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-amber-300 font-semibold">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>CROSS-CASE TRIANGULATION SUMMARY</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {data.cross_case_summary}
              </p>
            </div>
          )}

          {/* Shared Entities Table */}
          {data && (
            <div className="space-y-3">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold flex items-center justify-between">
                <span>Shared High-Value Infrastructure & Conduits ({data.shared_entity_count})</span>
                <span className="text-rose-400 font-bold">CRITICAL BRIDGES</span>
              </div>

              <div className="space-y-2">
                {data.shared_entities.map((item: any) => (
                  <div
                    key={item.id}
                    className="bg-slate-900 border border-slate-700 hover:border-sky-500/50 p-3 rounded-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 font-mono text-xs">
                        <span className="font-bold text-sky-300">{item.id}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {item.type}
                        </span>
                        <span className="text-rose-400 text-[10px] font-bold">
                          {item.risk_level}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-white">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans">
                        Trident Role: <span className="text-slate-200">{item.role_in_trident}</span> | Meridian Role: <span className="text-slate-200">{item.role_in_meridian}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSelectSharedEntity(item.id);
                        onClose();
                      }}
                      className="shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-mono transition-colors cursor-pointer"
                    >
                      <span>Focus on Graph</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#060a12] flex items-center justify-between text-xs font-mono text-slate-400">
          <span>CORRELATED UNDER TIER-3 INVESTIGATIVE PRIVILEGE</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer font-sans"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
