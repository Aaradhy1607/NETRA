import React, { useEffect, useState } from 'react';
import { 
  X, 
  History, 
  Shield, 
  Lock, 
  Hash, 
  CheckCircle2, 
  RefreshCw,
  Clock
} from 'lucide-react';
import { api } from '../services/api';
import { AuditLogItem } from '../types';

interface AuditLogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditLogDrawer: React.FC<AuditLogDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = () => {
    setLoading(true);
    api.getAuditLogs()
      .then(res => {
        setLogs(res.reverse());
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#090f1a] border-l border-slate-700 w-full max-w-xl h-full flex flex-col shadow-2xl font-sans text-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#060a12]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <span>Privacy & Cryptographic Audit Trail</span>
              </h2>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>TAMPER-RESISTANT LOGGING // TIER-3 RBAC</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={fetchLogs}
              title="Refresh Audit Log"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 font-mono text-xs">
          <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-300 font-sans">
            Every entity search, graph traversal, AI agent tool execution, and export action is timestamped and cryptographically hashed for chain-of-custody compliance.
          </div>

          {logs.map((log) => (
            <div
              key={log.id}
              className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1.5 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-bold text-sky-400">{log.id}</span>
                <span className="flex items-center space-x-1 text-slate-400">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{log.timestamp}</span>
                </span>
              </div>

              <div className="text-xs font-semibold text-white font-sans">
                {log.details}
              </div>

              <div className="flex items-center justify-between text-[10px] border-t border-slate-800/80 pt-1.5 mt-1">
                <span className="text-slate-400">
                  OP: <strong className="text-slate-200">{log.operator}</strong>
                </span>
                <span className="text-emerald-400 flex items-center space-x-1">
                  <Hash className="w-3 h-3 text-emerald-500" />
                  <span>{log.hash}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#060a12] flex items-center justify-between text-xs font-mono text-slate-400">
          <span>TOTAL LOG EVENTS: {logs.length}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer font-sans"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
