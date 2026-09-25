import React, { useState } from 'react';
import { 
  X, 
  GitMerge, 
  Check, 
  ShieldAlert, 
  HelpCircle, 
  Layers, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { EntityResolutionCandidate } from '../types';

interface EntityResolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: EntityResolutionCandidate[];
  onResolveCandidate: (pairId: string, action: 'MERGE' | 'KEEP_SEPARATE' | 'MARK_REVIEW', notes?: string) => void;
}

export const EntityResolutionModal: React.FC<EntityResolutionModalProps> = ({
  isOpen,
  onClose,
  candidates,
  onResolveCandidate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-[#090f1a] border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#060a12]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <GitMerge className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <span>Entity Resolution & Deduplication Hub</span>
                <span className="text-xs font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                  AI PROBABILISTIC MATCHING
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Review ambiguous synthetic records, shared identifiers, and alias co-occurrences.
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
          <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl text-xs text-slate-300 flex items-start space-x-3">
            <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Probabilistic Resolution Protocol:</strong> Rather than merging ambiguous identities with ungrounded certainty, NETRA calculates multi-factor similarity metrics (Levenshtein name distance, shared burner IMEI/MSISDN, spatial co-occurrence) and presents candidate pairs for human investigator verification.
            </div>
          </div>

          {/* Candidate Pairs List */}
          <div className="space-y-4">
            {candidates.map((cand) => {
              const isResolved = cand.status !== 'PENDING_REVIEW';

              return (
                <div 
                  key={cand.pair_id}
                  className={`p-4 rounded-xl border transition-all ${
                    isResolved 
                      ? 'bg-slate-900/40 border-slate-800 opacity-80' 
                      : 'bg-slate-900 border-indigo-500/30 shadow-lg'
                  }`}
                >
                  {/* Card Top */}
                  <div className="flex items-center justify-between mb-3 font-mono text-xs">
                    <span className="font-bold text-sky-400">{cand.pair_id}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-slate-400">
                        Match Confidence: <strong className="text-emerald-400 font-bold">{Math.round(cand.confidence * 100)}%</strong>
                      </span>
                      {isResolved ? (
                        <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold text-[11px] flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>RESOLVED: {cand.status}</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-semibold">
                          PENDING INVESTIGATOR ACTION
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Side by Side Entity Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    {/* Primary Entity */}
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>RECORD A (INDEXED)</span>
                        <span className="text-sky-300 font-bold">{cand.primary_entity.id}</span>
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {cand.primary_entity.name}
                      </div>
                      <div className="space-y-0.5 text-[11px] text-slate-400 font-mono pt-1">
                        {Object.entries(cand.primary_entity.attributes).map(([k, v]) => (
                          <div key={k} className="flex justify-between">
                            <span className="capitalize text-slate-500">{k}:</span>
                            <span className="text-slate-300">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Candidate Entity */}
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>RECORD B (INGESTED / AMBIGUOUS)</span>
                        <span className="text-indigo-300 font-bold">{cand.candidate_entity.id}</span>
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {cand.candidate_entity.name}
                      </div>
                      <div className="space-y-0.5 text-[11px] text-slate-400 font-mono pt-1">
                        {Object.entries(cand.candidate_entity.attributes).map(([k, v]) => (
                          <div key={k} className="flex justify-between">
                            <span className="capitalize text-slate-500">{k}:</span>
                            <span className="text-slate-300">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Match Justifications */}
                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 mb-3 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold block">
                      Corroborating Match Signals:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-300 font-sans">
                      {cand.match_reasons.map((r, i) => (
                        <div key={i} className="flex items-center space-x-1.5">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {!isResolved && (
                    <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => onResolveCandidate(cand.pair_id, 'KEEP_SEPARATE')}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-medium transition-colors cursor-pointer border border-slate-700"
                      >
                        Keep Separate
                      </button>
                      <button
                        onClick={() => onResolveCandidate(cand.pair_id, 'MARK_REVIEW')}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-mono font-medium transition-colors cursor-pointer border border-amber-500/40"
                      >
                        Mark for Field Review
                      </button>
                      <button
                        onClick={() => onResolveCandidate(cand.pair_id, 'MERGE')}
                        className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 text-xs font-mono font-bold transition-all cursor-pointer shadow-md"
                      >
                        Merge Entities (Confirm Alias)
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#060a12] flex items-center justify-between text-xs font-mono text-slate-400">
          <span>ALL AUDITABLE MERGE ACTIONS ARE CRYPTOGRAPHICALLY RECORDED</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer font-sans"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
