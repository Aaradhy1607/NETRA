import React, { useEffect, useState } from 'react';
import { 
  X, 
  FileText, 
  Printer, 
  Copy, 
  Download, 
  Check, 
  ShieldAlert, 
  Lock,
  Building2,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

interface InvestigationBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
}

export const InvestigationBriefModal: React.FC<InvestigationBriefModalProps> = ({
  isOpen,
  onClose,
  caseId
}) => {
  const [brief, setBrief] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      api.generateBrief(caseId)
        .then(res => {
          setBrief(res);
          setLoading(false);
          // Subtle brief generation effect
          try {
            confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
          } catch {}
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [isOpen, caseId]);

  const handleCopy = () => {
    if (!brief) return;
    const text = `
RESTRICTED INVESTIGATION BRIEF // NETRA INTELLIGENCE SYSTEM
============================================================
CASE: ${brief.case_name} (${brief.case_id})
CODENAME: ${brief.codename}
BRIEF ID: ${brief.brief_id}
GENERATED: ${brief.generated_at}
CLASSIFICATION: ${brief.classification}
LEAD AGENCY: ${brief.lead_agency}

EXECUTIVE SUMMARY:
${brief.executive_summary}

KEY TARGETS & RELEVANT ENTITIES:
${brief.key_entities.map((e: any) => `- [${e.id}] ${e.name} (${e.role}) | Priority: ${e.priority} | Connections: ${e.connections} | Rationale: ${e.rationale}`).join('\n')}

ANALYTICAL LIMITATIONS & DISCLAIMER:
${brief.disclaimer_limitations}

SIGNOFF: ${brief.analyst_signoff}
============================================================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-[#0b101c] border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#060a12]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <span>Restricted Investigation Brief</span>
                <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  OFFICIAL SYNTHETIC INTEL BRIEF
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Automated intelligence briefing with grounded evidence chains & metric justifications.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors cursor-pointer border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors cursor-pointer border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Brief</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Formal Document Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#080d17] text-slate-200 print:bg-white print:text-black">
          {loading && (
            <div className="py-16 text-center space-y-3 font-mono text-xs text-sky-400 animate-pulse">
              <Sparkles className="w-6 h-6 mx-auto animate-spin" />
              <span>Compiling Intelligence Briefing Matrix...</span>
            </div>
          )}

          {brief && !loading && (
            <div className="space-y-6">
              {/* Document Header Classification Box */}
              <div className="border border-amber-500/40 bg-amber-500/10 p-3 rounded-lg text-center font-mono text-xs font-bold text-amber-300 tracking-wider">
                RESTRICTED // LAW ENFORCEMENT & INVESTIGATION INTELLIGENCE USE ONLY
              </div>

              {/* Brief Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800 font-mono text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">CASE FILE</span>
                  <span className="font-bold text-white">{brief.case_name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">CASE ID / CODENAME</span>
                  <span className="font-bold text-sky-400">{brief.codename}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">BRIEF ID</span>
                  <span className="font-bold text-slate-300">{brief.brief_id}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">DATE GENERATED</span>
                  <span className="font-bold text-slate-300">{brief.generated_at}</span>
                </div>
              </div>

              {/* Section 1: Executive Summary */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center space-x-2 border-b border-slate-800 pb-1">
                  <span>1.0 Executive Intelligence Summary</span>
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {brief.executive_summary}
                </p>
              </div>

              {/* Section 2: Key Targets & Relevant Entities */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center space-x-2 border-b border-slate-800 pb-1">
                  <span>2.0 Prioritized Target Matrix</span>
                </h3>
                <div className="space-y-2">
                  {brief.key_entities.map((ent: any) => (
                    <div key={ent.id} className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-sky-300">{ent.id} - {ent.name}</span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                          {ent.priority}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 font-sans">
                        Role: <strong>{ent.role}</strong> | Direct Links: <strong className="text-sky-400">{ent.connections}</strong>
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans">
                        Rationale: {ent.rationale}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Bridge Node Analysis */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center space-x-2 border-b border-slate-800 pb-1">
                  <span>3.0 Structural Bridge & Conduit Analysis</span>
                </h3>
                <div className="space-y-2">
                  {brief.bridge_analysis.slice(0, 3).map((br: any) => (
                    <div key={br.id} className="bg-slate-900/80 p-3 rounded-lg border border-rose-500/30">
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="font-bold text-white">{br.id} ({br.label})</span>
                        <span className="text-rose-400 font-bold text-[11px]">Betweenness Centrality: {br.betweenness}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-sans">{br.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Analytical Limitations & Legal Disclaimer */}
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-400">
                  <ShieldAlert className="w-4 h-4" />
                  <span>4.0 Analytical Limitations & Evidentiary Disclaimer</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  {brief.disclaimer_limitations}
                </p>
                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>AUTHENTICATED BY: {brief.analyst_signoff}</span>
                  <span>SECURITY SEAL: SHA256-SYNTH-OK</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#060a12] flex items-center justify-between text-xs font-mono text-slate-400">
          <span>CLASSIFICATION TIER-3 SYNTHETIC INTEL BRIEF</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer font-sans"
          >
            Close Brief
          </button>
        </div>
      </div>
    </div>
  );
};
