import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  CheckCircle2, 
  ArrowRight,
  Bot,
  Route,
  Network,
  Clock,
  FileText
} from 'lucide-react';

interface GuidedDemoControllerProps {
  isActive: boolean;
  onClose: () => void;
  onExecuteDemoStep: (stepNumber: number) => void;
}

export const DEMO_STEPS = [
  {
    step: 1,
    title: "1. Open Operation Trident",
    description: "Initializing high-security case environment with 28 fragmented entities across 8 node types.",
    actionLabel: "Load Operation Trident Case"
  },
  {
    step: 2,
    title: "2. Inspect Raw Investigation Entities",
    description: "Fragmented intelligence: Financial Shells, Burner SIMs, Vehicle Fleets, and Port Facilities.",
    actionLabel: "Filter by Entity Types"
  },
  {
    step: 3,
    title: "3. Build & Cluster Relationship Graph",
    description: "Detect 3 distinct operational communities: Cluster Alpha (Finance), Cluster Bravo (Field Ops), Cluster Charlie (Comms).",
    actionLabel: "Partition Sub-Networks"
  },
  {
    step: 4,
    title: "4. Select Key Target PERSON-07",
    description: "Inspecting Karan Malhotra (Alias: 'Nexus-7') - analyzing multi-cluster topological prominence.",
    actionLabel: "Select PERSON-07"
  },
  {
    step: 5,
    title: "5. Examine Direct Connections & Priority",
    description: "PERSON-07 holds 14+ links across all 3 functional sub-networks with High Investigative Priority.",
    actionLabel: "Inspect Priority Breakdown"
  },
  {
    step: 6,
    title: "6. Ask AI: 'Which entities connect separate clusters?'",
    description: "Investigator queries natural language AI assistant for cross-cluster bridge detection.",
    actionLabel: "Submit Bridge Query"
  },
  {
    step: 7,
    title: "7. AI Graph Analytics Pipeline Execution",
    description: "Observable execution trace: Intent detected -> Betweenness Centrality tool -> Conduit identified.",
    actionLabel: "Inspect Reasoning Trace"
  },
  {
    step: 8,
    title: "8. Highlight Bridge Conduits on Graph",
    description: "Visualizing PERSON-07 and PHONE-03 as critical structural bridges linking finance and field operations.",
    actionLabel: "Highlight Bridge Nodes"
  },
  {
    step: 9,
    title: "9. Ask AI: 'Show relationship path between PERSON-04 and PERSON-19'",
    description: "Investigator analyzes indirect connection between Financial Coordinator and Regional Field Comms.",
    actionLabel: "Submit Shortest Path Query"
  },
  {
    step: 10,
    title: "10. Animate Multi-Hop Shortest Path",
    description: "Graph animates exact 3-hop traversal: PERSON-04 → PHONE-01 → PHONE-03 → PERSON-19.",
    actionLabel: "Animate Path Route"
  },
  {
    step: 11,
    title: "11. Activate Interactive Timeline Scrubber",
    description: "Observing network formation chronologically from January to May 2026.",
    actionLabel: "Scrub Timeline Window"
  },
  {
    step: 12,
    title: "12. Timeline Evolution & Interdiction Milestone",
    description: "Witnessing network restructuring following March Port Terminal 4B interdiction.",
    actionLabel: "Play Timeline Evolution"
  },
  {
    step: 13,
    title: "13. Generate Restricted Investigation Brief",
    description: "Compiling official intelligence report with grounded evidence chains & analytical limitations.",
    actionLabel: "Generate Intelligence Brief"
  }
];

export const GuidedDemoController: React.FC<GuidedDemoControllerProps> = ({
  isActive,
  onClose,
  onExecuteDemoStep
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    if (isActive) {
      onExecuteDemoStep(currentStep);
    }
  }, [isActive, currentStep]);

  // Auto-play timer (moves to next step every 6.5 seconds)
  useEffect(() => {
    let timer: any;
    if (isActive && isAutoPlaying) {
      timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= DEMO_STEPS.length) {
            setIsAutoPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 6500);
    }
    return () => clearInterval(timer);
  }, [isActive, isAutoPlaying]);

  if (!isActive) return null;

  const currentStepData = DEMO_STEPS[currentStep - 1];

  const handleNext = () => {
    if (currentStep < DEMO_STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl px-4 animate-fade-in select-none">
      <div className="bg-[#0b1220]/95 border-2 border-sky-500/60 rounded-2xl p-4 shadow-2xl backdrop-blur-xl font-sans text-slate-200">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-md bg-sky-500/20 text-sky-400">
              <Sparkles className="w-4 h-4 animate-spin" />
            </span>
            <span className="font-mono text-xs font-bold text-white tracking-wider">
              NETRA GUIDED DEMO SCENARIO // STEP {currentStep} OF {DEMO_STEPS.length}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-mono font-semibold transition-colors cursor-pointer ${
                isAutoPlaying 
                  ? 'bg-amber-500 text-slate-950 font-bold' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isAutoPlaying ? 'PAUSE AUTO' : 'AUTO-PLAY'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current Step Content */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-sky-300 font-mono flex items-center space-x-1.5">
              <span>{currentStepData.title}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              {currentStepData.description}
            </p>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center space-x-2 shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => onExecuteDemoStep(currentStep)}
              className="px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-md cursor-pointer flex items-center space-x-1"
            >
              <span>Execute Step</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentStep === DEMO_STEPS.length}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Progress Pill Row */}
        <div className="flex items-center space-x-1 mt-3 pt-2.5 border-t border-slate-800/80">
          {DEMO_STEPS.map((s) => (
            <button
              key={s.step}
              onClick={() => setCurrentStep(s.step)}
              className={`flex-1 h-1.5 rounded-full transition-all cursor-pointer ${
                s.step === currentStep
                  ? 'bg-sky-400 scale-y-125'
                  : (s.step < currentStep ? 'bg-sky-800' : 'bg-slate-800 hover:bg-slate-700')
              }`}
              title={s.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
