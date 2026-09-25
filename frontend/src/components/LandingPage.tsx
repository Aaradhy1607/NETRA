import React, { useEffect, useRef } from 'react';
import { 
  Shield, 
  Network, 
  Cpu, 
  Layers, 
  GitMerge, 
  Clock, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Radio,
  Share2,
  Database
} from 'lucide-react';

interface LandingPageProps {
  onStartInvestigation: () => void;
  onLaunchGuidedDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartInvestigation,
  onLaunchGuidedDemo
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated background graph forming from disconnected nodes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Node types definition
    const nodeTypes = [
      { type: 'PERSON', label: 'PERSON-07', color: '#38bdf8' },
      { type: 'PHONE', label: 'PHONE-03', color: '#818cf8' },
      { type: 'VEHICLE', label: 'VEHICLE-04', color: '#fb923c' },
      { type: 'LOCATION', label: 'LOC-01 (Port)', color: '#4ade80' },
      { type: 'ORG', label: 'ORG-01 (Freight)', color: '#f43f5e' },
      { type: 'ACCOUNT', label: 'ACC-01 (Wire)', color: '#e879f9' },
      { type: 'CASE', label: 'CASE-TRIDENT', color: '#facc15' },
      { type: 'EVENT', label: 'EVENT-01', color: '#2dd4bf' }
    ];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      type: string;
      label: string;
      color: string;
      radius: number;
      clusterTargetX: number;
      clusterTargetY: number;
      formingProgress: number;
    }

    const particles: Particle[] = [];
    const numParticles = 42;

    for (let i = 0; i < numParticles; i++) {
      const t = nodeTypes[i % nodeTypes.length];
      const clusterIdx = i % 3;
      const angle = (clusterIdx * Math.PI * 2) / 3;
      const targetDist = 180 + (i % 6) * 35;
      
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        type: t.type,
        label: t.label,
        color: t.color,
        radius: 7 + (i % 3) * 2,
        clusterTargetX: width / 2 + Math.cos(angle) * targetDist,
        clusterTargetY: height / 2 + Math.sin(angle) * targetDist,
        formingProgress: 0
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(30, 44, 69, 0.25)';
      ctx.lineWidth = 1;
      const gridSize = 48;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update positions with gentle pull towards cluster forming
      particles.forEach((p, idx) => {
        // Slow formation pull
        const pullFactor = Math.min(0.012, 0.002 + Math.sin(time * 0.5) * 0.006 + 0.006);
        p.vx += (p.clusterTargetX - p.x) * pullFactor * 0.04;
        p.vy += (p.clusterTargetY - p.y) * pullFactor * 0.04;

        // Apply friction
        p.vx *= 0.96;
        p.vy *= 0.96;

        p.x += p.vx;
        p.y += p.vy;

        // Keep inside bounds
        if (p.x < 30) p.x = 30;
        if (p.x > width - 30) p.x = width - 30;
        if (p.y < 30) p.y = 30;
        if (p.y > height - 30) p.y = height - 30;
      });

      // Draw links between nearby particles
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.45;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();

            // Draw traveling pulse on selected edges
            if ((i + j) % 5 === 0) {
              const pulsePos = (time * 1.5 + (i * j)) % 1;
              const px = particles[i].x + (particles[j].x - particles[i].x) * pulsePos;
              const py = particles[i].y + (particles[j].y - particles[i].y) * pulsePos;
              ctx.fillStyle = '#38bdf8';
              ctx.beginPath();
              ctx.arc(px, py, 2.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Draw nodes
      particles.forEach((p) => {
        // Outer glow
        const gradient = ctx.createRadialGradient(p.x, p.y, p.radius * 0.2, p.x, p.y, p.radius * 2.2);
        gradient.addColorStop(0, p.color + '66');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Core circle
        ctx.fillStyle = '#0a101d';
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Inner pip
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#06090e] text-slate-100 flex flex-col justify-between overflow-y-auto">
      {/* Canvas Animated Network Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
      />

      {/* Security Classification Header Banner */}
      <div className="relative z-10 w-full bg-[#0a111e]/90 border-b border-cyan-950/80 px-6 py-2.5 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-medium tracking-wide">
            <Lock className="w-3 h-3" />
            <span>RESTRICTED // LAW ENFORCEMENT & INTEL USE ONLY</span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            CLASSIFICATION: TIER-3 SYNTHETIC BENCHMARK
          </span>
        </div>

        <div className="flex items-center space-x-4 text-xs font-mono text-slate-400">
          <span className="flex items-center space-x-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SYSTEM READY</span>
          </span>
          <span className="text-slate-500">|</span>
          <span>SIH26189 PROTOTYPE</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-16 flex flex-col items-center text-center my-auto">
        {/* Brand Tag */}
        <div className="inline-flex items-center space-x-2.5 bg-slate-900/90 border border-sky-500/30 px-4 py-1.5 rounded-full mb-8 shadow-lg shadow-sky-500/10">
          <Shield className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-semibold tracking-wider uppercase text-sky-300">
            NETRA Intelligence Engine // v2.0
          </span>
          <span className="text-[10px] bg-sky-500/20 text-sky-300 font-mono px-2 py-0.5 rounded">
            AI-POWERED
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          See the Network <br />
          <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
            Behind the Data.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-10">
          AI-assisted investigation intelligence for converting fragmented surveillance, communications, 
          and transaction data into an explainable relationship network.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            id="btn-open-investigation"
            onClick={onStartInvestigation}
            className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-semibold px-8 py-4 rounded-lg shadow-xl shadow-sky-500/25 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer text-base"
          >
            <Radio className="w-5 h-5 text-slate-950 animate-pulse" />
            <span>Open Investigation</span>
            <ArrowRight className="w-5 h-5 text-slate-950" />
          </button>

          <button
            id="btn-launch-guided-demo"
            onClick={onLaunchGuidedDemo}
            className="w-full sm:w-auto flex items-center justify-center space-x-2.5 bg-slate-900/90 hover:bg-slate-800/90 text-sky-300 border border-sky-500/40 hover:border-sky-400 font-medium px-7 py-4 rounded-lg shadow-lg transition-all duration-200 cursor-pointer text-base backdrop-blur-md"
          >
            <Sparkles className="w-5 h-5 text-sky-400" />
            <span>Launch 90s Guided Demo</span>
          </button>
        </div>

        {/* Node types showcase pill row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 max-w-3xl">
          <span className="text-xs text-slate-400 font-mono uppercase tracking-wider mr-2">
            Dynamic Node Types:
          </span>
          {[
            { name: 'Person', color: 'border-sky-500/40 text-sky-300 bg-sky-500/10' },
            { name: 'Phone Identifier', color: 'border-indigo-500/40 text-indigo-300 bg-indigo-500/10' },
            { name: 'Vehicle Asset', color: 'border-amber-500/40 text-amber-300 bg-amber-500/10' },
            { name: 'Location / Facility', color: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10' },
            { name: 'Organization Front', color: 'border-rose-500/40 text-rose-300 bg-rose-500/10' },
            { name: 'Financial Account', color: 'border-fuchsia-500/40 text-fuchsia-300 bg-fuchsia-500/10' },
            { name: 'Case / Event', color: 'border-teal-500/40 text-teal-300 bg-teal-500/10' }
          ].map((item, i) => (
            <span 
              key={i} 
              className={`text-xs font-mono px-3 py-1 rounded-md border ${item.color} backdrop-blur-sm`}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>

      {/* Feature Pillar Cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl backdrop-blur-md hover:border-sky-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">
              Explainable Knowledge Graph
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Computes degree & betweenness centrality, isolates modular sub-network communities, 
              and pinpoints critical bridge nodes linking disparate clusters.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl backdrop-blur-md hover:border-indigo-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">
              Agentic AI Reasoning Pipeline
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Natural language intelligence assistant with observable execution traces, 
              grounded multi-hop path extraction, and evidence chain corroboration.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl backdrop-blur-md hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">
              Timeline & Entity Resolution
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interactive timeline evolution scrubber paired with fuzzy entity deduplication, 
              cross-case bridge correlation, and one-click restricted brief generation.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-slate-800/80 bg-[#070b13] px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <Shield className="w-4 h-4 text-sky-400" />
          <span className="font-semibold text-slate-400">NETRA INTELLIGENCE SYSTEM</span>
          <span>// ALL DEMONSTRATION DATA IS STRICTLY SYNTHETIC & FICTIONAL</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>OPERATOR CLEARANCE: TIER-3 SIU</span>
          <span>AUDIT LOGGING: ENABLED</span>
        </div>
      </div>
    </div>
  );
};
