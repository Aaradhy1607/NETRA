import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  GraphNode, 
  GraphEdge, 
  NodeType, 
  EdgeType 
} from '../types';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Play, 
  Pause, 
  Focus, 
  Layers, 
  Compass, 
  RefreshCw,
  Crosshair,
  Filter
} from 'lucide-react';

interface GraphCanvasProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNodeId: string | null;
  highlightedNodeIds: string[];
  highlightedEdgeIds: string[];
  onSelectNode: (node: GraphNode | null) => void;
  isolatedClusterId: string | null;
  activeEntityTypes: Set<NodeType>;
  activeRelationshipTypes: Set<EdgeType>;
  layoutMode: 'force' | 'cluster' | 'concentric';
  onChangeLayoutMode: (mode: 'force' | 'cluster' | 'concentric') => void;
}

// Color and styling map for node types
export const NODE_CONFIG: Record<NodeType, { color: string; bg: string; border: string; icon: string; shape: 'circle' | 'square' | 'diamond' | 'hexagon' }> = {
  PERSON: { color: '#38bdf8', bg: '#082f49', border: '#0284c7', icon: '👤', shape: 'circle' },
  PHONE: { color: '#818cf8', bg: '#1e1b4b', border: '#4f46e5', icon: '📱', shape: 'square' },
  VEHICLE: { color: '#fb923c', bg: '#431407', border: '#ea580c', icon: '🚗', shape: 'hexagon' },
  LOCATION: { color: '#4ade80', bg: '#052e16', border: '#16a34a', icon: '📍', shape: 'diamond' },
  ORGANIZATION: { color: '#f43f5e', bg: '#4c0519', border: '#e11d48', icon: '🏢', shape: 'square' },
  ACCOUNT: { color: '#e879f9', bg: '#4a044e', border: '#c026d3', icon: '💳', shape: 'circle' },
  CASE: { color: '#facc15', bg: '#422006', border: '#ca8a04', icon: '📁', shape: 'hexagon' },
  EVENT: { color: '#2dd4bf', bg: '#042f2e', border: '#0d9488', icon: '⚡', shape: 'diamond' }
};

export const EDGE_COLORS: Record<string, string> = {
  CALLED: '#818cf8',
  VISITED: '#4ade80',
  OWNED: '#fb923c',
  ASSOCIATED_WITH: '#38bdf8',
  TRANSACTED_WITH: '#e879f9',
  WORKED_WITH: '#f43f5e',
  OBSERVED_AT: '#facc15',
  CONNECTED_TO: '#94a3b8',
  INVOLVED_IN: '#2dd4bf'
};

export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  nodes,
  edges,
  selectedNodeId,
  highlightedNodeIds,
  highlightedEdgeIds,
  onSelectNode,
  isolatedClusterId,
  activeEntityTypes,
  activeRelationshipTypes,
  layoutMode,
  onChangeLayoutMode
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Transform & Camera State
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1.0 });
  const [isPhysicsRunning, setIsPhysicsRunning] = useState(true);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  // Dragging State
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const draggedNodeRef = useRef<GraphNode | null>(null);
  const simulationNodesRef = useRef<GraphNode[]>([]);
  const animationFrameRef = useRef<number>(0);
  const particleTimeRef = useRef<number>(0);

  // Initialize and synchronize simulation nodes
  useEffect(() => {
    const existingMap = new Map(simulationNodesRef.current.map(n => [n.id, n]));
    
    // Filter nodes by active types and isolated cluster
    const filteredNodes = nodes.filter(n => {
      if (!activeEntityTypes.has(n.type)) return false;
      if (isolatedClusterId && n.cluster !== isolatedClusterId && n.detected_community !== isolatedClusterId) {
        return false;
      }
      return true;
    });

    const canvas = canvasRef.current;
    const width = canvas ? canvas.width : 800;
    const height = canvas ? canvas.height : 600;

    simulationNodesRef.current = filteredNodes.map((n, i) => {
      const existing = existingMap.get(n.id);
      if (existing) {
        return { ...n, x: existing.x, y: existing.y, vx: existing.vx || 0, vy: existing.vy || 0 };
      }
      // Initial circular / randomized distribution
      const angle = (i / filteredNodes.length) * Math.PI * 2;
      const radius = 180 + (i % 4) * 40;
      return {
        ...n,
        x: width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 40,
        y: height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 40,
        vx: 0,
        vy: 0
      };
    });
  }, [nodes, activeEntityTypes, isolatedClusterId]);

  // Center camera to fit all nodes
  const fitToScreen = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || simulationNodesRef.current.length === 0) return;
    
    const width = canvas.width;
    const height = canvas.height;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    simulationNodesRef.current.forEach(n => {
      if (n.x !== undefined && n.y !== undefined) {
        if (n.x < minX) minX = n.x;
        if (n.x > maxX) maxX = n.x;
        if (n.y < minY) minY = n.y;
        if (n.y > maxY) maxY = n.y;
      }
    });

    const padding = 80;
    const dx = Math.max(maxX - minX, 100);
    const dy = Math.max(maxY - minY, 100);
    const scale = Math.min(
      Math.min((width - padding * 2) / dx, (height - padding * 2) / dy),
      1.5
    );

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    setTransform({
      x: width / 2 - centerX * scale,
      y: height / 2 - centerY * scale,
      k: Math.max(0.4, Math.min(scale, 1.3))
    });
  }, []);

  // Center on a specific node
  const centerOnNode = useCallback((nodeId: string) => {
    const canvas = canvasRef.current;
    const node = simulationNodesRef.current.find(n => n.id === nodeId);
    if (!canvas || !node || node.x === undefined || node.y === undefined) return;

    setTransform(prev => ({
      x: canvas.width / 2 - node.x! * 1.2,
      y: canvas.height / 2 - node.y! * 1.2,
      k: 1.2
    }));
  }, []);

  useEffect(() => {
    if (selectedNodeId) {
      centerOnNode(selectedNodeId);
    }
  }, [selectedNodeId, centerOnNode]);

  // Simulation step function
  const stepPhysics = useCallback(() => {
    const currentNodes = simulationNodesRef.current;
    if (!currentNodes.length) return;

    const nodeMap = new Map(currentNodes.map(n => [n.id, n]));
    const canvas = canvasRef.current;
    const cx = canvas ? canvas.width / 2 : 400;
    const cy = canvas ? canvas.height / 2 : 300;

    // Filter active edges
    const activeEdges = edges.filter(e => {
      const srcId = typeof e.source === 'object' ? e.source.id : e.source;
      const tgtId = typeof e.target === 'object' ? e.target.id : e.target;
      return nodeMap.has(srcId) && nodeMap.has(tgtId) && activeRelationshipTypes.has(e.type);
    });

    // 1. Repulsion between all node pairs
    for (let i = 0; i < currentNodes.length; i++) {
      const n1 = currentNodes[i];
      for (let j = i + 1; j < currentNodes.length; j++) {
        const n2 = currentNodes[j];
        if (n1.x === undefined || n1.y === undefined || n2.x === undefined || n2.y === undefined) continue;

        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const distSq = dx * dx + dy * dy + 1;
        const dist = Math.sqrt(distSq);

        // Repulsion force
        const repulsion = 4500 / distSq;
        const fx = (dx / dist) * repulsion;
        const fy = (dy / dist) * repulsion;

        if (n1 !== draggedNodeRef.current) {
          n1.vx = (n1.vx || 0) - fx;
          n1.vy = (n1.vy || 0) - fy;
        }
        if (n2 !== draggedNodeRef.current) {
          n2.vx = (n2.vx || 0) + fx;
          n2.vy = (n2.vy || 0) + fy;
        }
      }
    }

    // 2. Spring attraction along edges
    activeEdges.forEach(edge => {
      const srcId = typeof edge.source === 'object' ? edge.source.id : edge.source;
      const tgtId = typeof edge.target === 'object' ? edge.target.id : edge.target;
      const n1 = nodeMap.get(srcId);
      const n2 = nodeMap.get(tgtId);

      if (!n1 || !n2 || n1.x === undefined || n1.y === undefined || n2.x === undefined || n2.y === undefined) return;

      const dx = n2.x - n1.x;
      const dy = n2.y - n1.y;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;
      const targetDist = 110;
      const spring = (dist - targetDist) * 0.04;

      const fx = (dx / dist) * spring;
      const fy = (dy / dist) * spring;

      if (n1 !== draggedNodeRef.current) {
        n1.vx = (n1.vx || 0) + fx;
        n1.vy = (n1.vy || 0) + fy;
      }
      if (n2 !== draggedNodeRef.current) {
        n2.vx = (n2.vx || 0) - fx;
        n2.vy = (n2.vy || 0) - fy;
      }
    });

    // 3. Layout Specific Target Centering
    currentNodes.forEach(node => {
      if (node === draggedNodeRef.current || node.x === undefined || node.y === undefined) return;

      let targetX = cx;
      let targetY = cy;

      if (layoutMode === 'cluster') {
        // Group by cluster / community
        const clusterName = node.cluster || node.detected_community || 'Cluster-A';
        if (clusterName.includes('Finance') || clusterName.includes('Cluster-A') || clusterName.includes('Community 1')) {
          targetX = cx - 240;
          targetY = cy - 80;
        } else if (clusterName.includes('Field') || clusterName.includes('Cluster-B') || clusterName.includes('Community 2')) {
          targetX = cx + 240;
          targetY = cy - 80;
        } else if (clusterName.includes('Comms') || clusterName.includes('Cluster-C') || clusterName.includes('Community 3')) {
          targetX = cx;
          targetY = cy + 200;
        } else {
          // Bridge entities in the middle
          targetX = cx;
          targetY = cy - 40;
        }
      } else if (layoutMode === 'concentric') {
        // Concentric rings by degree / betweenness centrality
        const degree = node.degree || 1;
        const ringRadius = degree > 6 ? 60 : (degree > 3 ? 180 : 300);
        const curDist = Math.sqrt((node.x - cx) ** 2 + (node.y - cy) ** 2) || 1;
        targetX = cx + ((node.x - cx) / curDist) * ringRadius;
        targetY = cy + ((node.y - cy) / curDist) * ringRadius;
      }

      // Center gravity pull
      node.vx = (node.vx || 0) + (targetX - node.x) * 0.015;
      node.vy = (node.vy || 0) + (targetY - node.y) * 0.015;

      // Damping / Friction
      node.vx *= 0.88;
      node.vy *= 0.88;

      node.x += node.vx;
      node.y += node.vy;
    });
  }, [edges, activeRelationshipTypes, layoutMode]);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      if (isPhysicsRunning) {
        stepPhysics();
      }

      particleTimeRef.current += 0.02;
      const pTime = particleTimeRef.current;

      const width = (canvas.width = canvas.parentElement?.clientWidth || 800);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 600);

      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.k, transform.k);

      const currentNodes = simulationNodesRef.current;
      const nodeMap = new Map(currentNodes.map(n => [n.id, n]));

      // 1. Draw Cluster Background Boundaries in 'cluster' mode
      if (layoutMode === 'cluster') {
        const clusters = [
          { name: 'Cluster Alpha: Finance', x: width / 2 - 240, y: height / 2 - 80, r: 180, color: 'rgba(56, 189, 248, 0.05)' },
          { name: 'Cluster Bravo: Field Ops', x: width / 2 + 240, y: height / 2 - 80, r: 180, color: 'rgba(251, 146, 60, 0.05)' },
          { name: 'Cluster Charlie: Comms', x: width / 2, y: height / 2 + 200, r: 180, color: 'rgba(129, 140, 248, 0.05)' }
        ];

        clusters.forEach(c => {
          ctx.fillStyle = c.color;
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
          ctx.font = '11px JetBrains Mono, monospace';
          ctx.fillText(c.name, c.x - 70, c.y - c.r + 20);
        });
      }

      // 2. Draw Edges
      edges.forEach(edge => {
        const srcId = typeof edge.source === 'object' ? edge.source.id : edge.source;
        const tgtId = typeof edge.target === 'object' ? edge.target.id : edge.target;
        const n1 = nodeMap.get(srcId);
        const n2 = nodeMap.get(tgtId);

        if (!n1 || !n2 || n1.x === undefined || n1.y === undefined || n2.x === undefined || n2.y === undefined) return;
        if (!activeRelationshipTypes.has(edge.type)) return;

        const isHighlighted = highlightedEdgeIds.includes(edge.id) || 
          (highlightedNodeIds.includes(srcId) && highlightedNodeIds.includes(tgtId)) ||
          (selectedNodeId === srcId || selectedNodeId === tgtId);

        const edgeColor = EDGE_COLORS[edge.type] || '#64748b';

        ctx.strokeStyle = isHighlighted ? '#38bdf8' : (edgeColor + (isHighlighted ? 'ff' : '66'));
        ctx.lineWidth = isHighlighted ? 2.5 : 1.2;

        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();

        // Draw animated pulse particles along highlighted or active edges
        if (isHighlighted || edge.type === 'CALLED' || edge.type === 'TRANSACTED_WITH') {
          const particlePos = (pTime * 0.8 + (n1.x * 0.01)) % 1;
          const px = n1.x + (n2.x - n1.x) * particlePos;
          const py = n1.y + (n2.y - n1.y) * particlePos;

          ctx.fillStyle = isHighlighted ? '#38bdf8' : edgeColor;
          ctx.beginPath();
          ctx.arc(px, py, isHighlighted ? 3.5 : 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw edge relationship label if zoom level is high enough or edge is highlighted
        if (transform.k > 0.85 || isHighlighted) {
          const midX = (n1.x + n2.x) / 2;
          const midY = (n1.y + n2.y) / 2;

          ctx.fillStyle = isHighlighted ? '#38bdf8' : '#94a3b8';
          ctx.font = '9px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(edge.type.replace('_', ' '), midX, midY - 6);
        }
      });

      // 3. Draw Nodes
      currentNodes.forEach(node => {
        if (node.x === undefined || node.y === undefined) return;

        const config = NODE_CONFIG[node.type] || NODE_CONFIG.PERSON;
        const isSelected = selectedNodeId === node.id;
        const isHighlighted = highlightedNodeIds.includes(node.id);
        const isHovered = hoveredNode?.id === node.id;
        const isBridge = node.is_bridge || node.id === 'PERSON-07' || node.id === 'PHONE-03';

        const baseRadius = node.degree && node.degree > 6 ? 22 : (node.degree && node.degree > 3 ? 18 : 15);
        const radius = isSelected ? baseRadius + 4 : (isHovered ? baseRadius + 2 : baseRadius);

        // Bridge Node or Selection Pulsing Halo
        if (isBridge || isSelected || isHighlighted) {
          const glowColor = isSelected ? '#38bdf8' : (isBridge ? '#f43f5e' : '#818cf8');
          const glowGrad = ctx.createRadialGradient(node.x, node.y, radius * 0.4, node.x, node.y, radius * 2.2);
          glowGrad.addColorStop(0, glowColor + '88');
          glowGrad.addColorStop(1, 'transparent');

          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node Shape Rendering
        ctx.fillStyle = config.bg;
        ctx.strokeStyle = isSelected ? '#38bdf8' : (isHighlighted ? '#818cf8' : config.color);
        ctx.lineWidth = isSelected ? 3 : (isBridge ? 2.5 : 1.8);

        ctx.beginPath();
        if (config.shape === 'circle') {
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        } else if (config.shape === 'square') {
          ctx.rect(node.x - radius, node.y - radius, radius * 2, radius * 2);
        } else if (config.shape === 'diamond') {
          ctx.moveTo(node.x, node.y - radius * 1.2);
          ctx.lineTo(node.x + radius * 1.2, node.y);
          ctx.lineTo(node.x, node.y + radius * 1.2);
          ctx.lineTo(node.x - radius * 1.2, node.y);
          ctx.closePath();
        } else if (config.shape === 'hexagon') {
          for (let s = 0; s < 6; s++) {
            const hAngle = (s * Math.PI) / 3;
            const hx = node.x + radius * Math.cos(hAngle);
            const hy = node.y + radius * Math.sin(hAngle);
            if (s === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
        }
        ctx.fill();
        ctx.stroke();

        // Inner Icon
        ctx.font = `${Math.floor(radius * 0.9)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(config.icon, node.x, node.y);

        // Bridge Node Indicator Star / Badge
        if (isBridge) {
          ctx.fillStyle = '#f43f5e';
          ctx.beginPath();
          ctx.arc(node.x + radius - 2, node.y - radius + 2, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#06090e';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Node Label & ID (Rendered below node)
        ctx.fillStyle = isSelected ? '#38bdf8' : (isHighlighted ? '#e2e8f0' : '#cbd5e1');
        ctx.font = `${isSelected ? 'bold ' : ''}11px JetBrains Mono, monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(node.id, node.x, node.y + radius + 4);

        // Sub-label (Short label or alias)
        if (transform.k > 0.75 || isSelected || isHovered) {
          ctx.fillStyle = '#64748b';
          ctx.font = '9px Inter, sans-serif';
          const shortLabel = node.label.length > 20 ? node.label.substring(0, 18) + '...' : node.label;
          ctx.fillText(shortLabel, node.x, node.y + radius + 18);
        }
      });

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [edges, transform, isPhysicsRunning, stepPhysics, selectedNodeId, highlightedNodeIds, highlightedEdgeIds, hoveredNode, activeRelationshipTypes, layoutMode]);

  // Mouse / Touch Event Handlers for Dragging & Panning
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - transform.x) / transform.k;
    const mouseY = (e.clientY - rect.top - transform.y) / transform.k;

    // Check if clicked on a node
    const clickedNode = simulationNodesRef.current.find(node => {
      if (node.x === undefined || node.y === undefined) return false;
      const dist = Math.sqrt((node.x - mouseX) ** 2 + (node.y - mouseY) ** 2);
      return dist <= 24;
    });

    if (clickedNode) {
      draggedNodeRef.current = clickedNode;
      onSelectNode(clickedNode);
    } else {
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - transform.x) / transform.k;
    const mouseY = (e.clientY - rect.top - transform.y) / transform.k;

    if (draggedNodeRef.current) {
      draggedNodeRef.current.x = mouseX;
      draggedNodeRef.current.y = mouseY;
      draggedNodeRef.current.vx = 0;
      draggedNodeRef.current.vy = 0;
    } else if (isDraggingRef.current) {
      setTransform(prev => ({
        ...prev,
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y
      }));
    } else {
      // Hover detection
      const hovered = simulationNodesRef.current.find(node => {
        if (node.x === undefined || node.y === undefined) return false;
        const dist = Math.sqrt((node.x - mouseX) ** 2 + (node.y - mouseY) ** 2);
        return dist <= 24;
      });
      setHoveredNode(hovered || null);
    }
  };

  const handleMouseUp = () => {
    draggedNodeRef.current = null;
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setTransform(prev => {
      const newK = Math.max(0.3, Math.min(prev.k * zoomFactor, 2.5));
      return {
        x: mouseX - (mouseX - prev.x) * (newK / prev.k),
        y: mouseY - (mouseY - prev.y) * (newK / prev.k),
        k: newK
      };
    });
  };

  return (
    <div className="relative w-full h-full bg-[#070c14] overflow-hidden select-none bg-dot-pattern">
      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Floating Canvas HUD Overlay */}
      <div className="absolute top-3 left-3 flex items-center space-x-2 bg-slate-900/85 border border-slate-700/80 px-3 py-1.5 rounded-lg backdrop-blur-md text-xs font-mono shadow-lg text-slate-300">
        <div className="flex items-center space-x-1.5 text-sky-400 font-semibold">
          <Crosshair className="w-3.5 h-3.5" />
          <span>GRAPH EXPLORER</span>
        </div>
        <span className="text-slate-600">|</span>
        <span className="text-slate-400">
          NODES: <strong className="text-white">{simulationNodesRef.current.length}</strong>
        </span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-400">
          ZOOM: <strong className="text-white">{Math.round(transform.k * 100)}%</strong>
        </span>
      </div>

      {/* Floating Layout Selector */}
      <div className="absolute top-3 right-3 flex items-center space-x-1 bg-slate-900/85 border border-slate-700/80 p-1 rounded-lg backdrop-blur-md text-xs font-mono shadow-lg">
        <button
          onClick={() => onChangeLayoutMode('force')}
          className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
            layoutMode === 'force' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Force Dynamic
        </button>
        <button
          onClick={() => onChangeLayoutMode('cluster')}
          className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
            layoutMode === 'cluster' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Communities
        </button>
        <button
          onClick={() => onChangeLayoutMode('concentric')}
          className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
            layoutMode === 'concentric' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Centrality Rings
        </button>
      </div>

      {/* Floating Canvas Control Toolbar */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-1.5 bg-slate-900/90 border border-slate-700 p-1.5 rounded-lg shadow-xl backdrop-blur-md z-10">
        <button
          onClick={() => setTransform(prev => ({ ...prev, k: Math.min(prev.k * 1.2, 2.5) }))}
          title="Zoom In"
          className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setTransform(prev => ({ ...prev, k: Math.max(prev.k * 0.8, 0.3) }))}
          title="Zoom Out"
          className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={fitToScreen}
          title="Fit to Screen"
          className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsPhysicsRunning(!isPhysicsRunning)}
          title={isPhysicsRunning ? "Pause Physics Simulation" : "Resume Physics Simulation"}
          className={`p-2 rounded transition-colors cursor-pointer ${
            isPhysicsRunning ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          {isPhysicsRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>

      {/* Floating Node Hover Micro-Tooltip */}
      {hoveredNode && (
        <div 
          className="absolute bottom-4 left-4 bg-slate-900/95 border border-sky-500/40 p-3 rounded-lg shadow-2xl backdrop-blur-md font-mono text-xs max-w-sm pointer-events-none z-10 animate-fade-in"
        >
          <div className="flex items-center justify-between space-x-2 mb-1.5">
            <span className="font-bold text-sky-300 text-sm">{hoveredNode.id}</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
              {hoveredNode.type}
            </span>
          </div>
          <div className="text-slate-200 font-medium font-sans text-xs mb-1">
            {hoveredNode.label}
          </div>
          {hoveredNode.role && (
            <div className="text-slate-400 text-[11px] font-sans mb-1">
              Role: <strong className="text-slate-300">{hoveredNode.role}</strong>
            </div>
          )}
          <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800 pt-1.5 mt-1.5">
            <span>Connections: <strong className="text-sky-400">{hoveredNode.degree || 0}</strong></span>
            {hoveredNode.is_bridge && (
              <span className="text-rose-400 font-bold">BRIDGE CONDUIT</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
