import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Calendar, 
  Clock, 
  Zap, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { TimelineMilestone } from '../types';

interface TimelineScrubberProps {
  currentCutoffDate: string;
  onCutoffDateChange: (date: string) => void;
  milestones: TimelineMilestone[];
  activeEntityCount: number;
  activeConnectionCount: number;
}

const TIMELINE_DATES = [
  { date: '2026-01-31', month: 'JAN', label: 'Network Establishment (Jan 2026)', desc: 'Shell entities & burner phones' },
  { date: '2026-02-28', month: 'FEB', label: 'Supply Route Activation (Feb 2026)', desc: 'Fleet deployment & staging safehouse' },
  { date: '2026-03-31', month: 'MAR', label: 'Port Interdiction (Mar 2026)', desc: 'Event-01 seizure & sat comms' },
  { date: '2026-04-30', month: 'APR', label: 'Apex Executive Summit (Apr 2026)', desc: 'Executive meetings & night handover' },
  { date: '2026-05-25', month: 'MAY', label: 'Multi-Cluster Surveillance (May 2026)', desc: 'Full network triangulation' }
];

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  currentCutoffDate,
  onCutoffDateChange,
  milestones,
  activeEntityCount,
  activeConnectionCount
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(4); // Default to full (May)

  // Find index corresponding to date
  useEffect(() => {
    const idx = TIMELINE_DATES.findIndex(d => d.date >= currentCutoffDate);
    if (idx !== -1) setCurrentIndex(idx);
    else setCurrentIndex(TIMELINE_DATES.length - 1);
  }, [currentCutoffDate]);

  // Auto-play interval
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex(prev => {
          const nextIdx = (prev + 1) % TIMELINE_DATES.length;
          onCutoffDateChange(TIMELINE_DATES[nextIdx].date);
          return nextIdx;
        });
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onCutoffDateChange]);

  const handleStepClick = (index: number) => {
    setCurrentIndex(index);
    onCutoffDateChange(TIMELINE_DATES[index].date);
  };

  const currentStepInfo = TIMELINE_DATES[currentIndex] || TIMELINE_DATES[4];

  return (
    <div className="w-full bg-[#080d16] border-t border-slate-800 px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs select-none z-20">
      {/* Play Controls & Active Window Indicator */}
      <div className="flex items-center space-x-3 shrink-0">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          title={isPlaying ? "Pause Evolution" : "Play Network Evolution"}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
            isPlaying 
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
              : 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold'
          }`}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'PAUSE' : 'PLAY EVOLUTION'}</span>
        </button>

        <button
          onClick={() => handleStepClick(0)}
          title="Reset to Genesis (Jan 2026)"
          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <div className="hidden md:flex flex-col font-mono text-[11px]">
          <span className="text-slate-400 font-semibold flex items-center space-x-1">
            <Clock className="w-3 h-3 text-sky-400" />
            <span>ACTIVE WINDOW: <strong className="text-sky-300">{currentStepInfo.date}</strong></span>
          </span>
          <span className="text-[10px] text-slate-500">{currentStepInfo.label}</span>
        </div>
      </div>

      {/* Interactive Timeline Stepper Bar */}
      <div className="flex-1 max-w-2xl w-full px-2">
        <div className="relative flex items-center justify-between">
          {/* Background Connecting Rail */}
          <div className="absolute left-0 right-0 h-1 bg-slate-800 rounded-full z-0" />
          
          {/* Active Fill Rail */}
          <div 
            className="absolute left-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full z-0 transition-all duration-300"
            style={{ width: `${(currentIndex / (TIMELINE_DATES.length - 1)) * 100}%` }}
          />

          {/* Stepper Nodes */}
          {TIMELINE_DATES.map((step, idx) => {
            const isActive = idx <= currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={step.date}
                onClick={() => handleStepClick(idx)}
                className="relative z-10 flex flex-col items-center group cursor-pointer"
              >
                {/* Node Pill */}
                <div 
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-all duration-200 ${
                    isCurrent 
                      ? 'bg-sky-400 text-slate-950 ring-4 ring-sky-500/30 scale-110 shadow-lg shadow-sky-500/40' 
                      : (isActive 
                          ? 'bg-sky-950 text-sky-300 border-2 border-sky-500' 
                          : 'bg-slate-900 text-slate-500 border border-slate-700 group-hover:border-slate-500')
                  }`}
                >
                  {step.month}
                </div>

                {/* Subtitle text */}
                <span className="hidden lg:inline text-[9px] font-mono text-slate-400 mt-1 max-w-[90px] text-center leading-tight">
                  {step.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Stats HUD */}
      <div className="flex items-center space-x-3 shrink-0 font-mono text-xs text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
        <div>
          ACTIVE: <strong className="text-sky-400">{activeEntityCount}</strong> ENTITIES
        </div>
        <span className="text-slate-700">|</span>
        <div>
          <strong className="text-indigo-400">{activeConnectionCount}</strong> CONNECTIONS
        </div>
      </div>
    </div>
  );
};
