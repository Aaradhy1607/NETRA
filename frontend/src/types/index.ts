export type NodeType = 
  | 'PERSON' 
  | 'PHONE' 
  | 'VEHICLE' 
  | 'LOCATION' 
  | 'ORGANIZATION' 
  | 'ACCOUNT' 
  | 'CASE' 
  | 'EVENT';

export type EdgeType = 
  | 'CALLED'
  | 'VISITED'
  | 'OWNED'
  | 'ASSOCIATED_WITH'
  | 'TRANSACTED_WITH'
  | 'WORKED_WITH'
  | 'OBSERVED_AT'
  | 'CONNECTED_TO'
  | 'INVOLVED_IN';

export interface PriorityBreakdown {
  connectivity: string;
  bridge_position: string;
  temporal_relevance: string;
  cross_case_links: string;
  confidence: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  role?: string;
  cluster?: string;
  detected_community?: string;
  first_observed?: string;
  last_observed?: string;
  confidence: number;
  notes?: string;
  risk_level?: string;
  priority_score?: number;
  priority_breakdown?: PriorityBreakdown;
  degree?: number;
  betweenness?: number;
  is_bridge?: boolean;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphEdge {
  id: string;
  source: string | GraphNode;
  target: string | GraphNode;
  type: EdgeType;
  timestamp?: string;
  weight?: number;
  confidence?: number;
  details?: string;
}

export interface CaseStats {
  total_entities: number;
  total_connections: number;
  communities_count: number;
  bridge_nodes_count: number;
  density: number;
  avg_degree: number;
}

export interface CaseData {
  case_id: string;
  case_name: string;
  codename: string;
  status: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  stats: CaseStats;
}

export interface Community {
  id: string;
  name: string;
  size: number;
  nodes: string[];
  internal_connections: number;
  type_breakdown: Record<string, number>;
  summary: string;
}

export interface BridgeEntity {
  id: string;
  label: string;
  type: NodeType;
  role: string;
  betweenness: number;
  connected_communities: number;
  direct_connections: number;
  explanation: string;
}

export interface ExecutionTraceStep {
  step: number;
  title: string;
  detail: string;
}

export interface AgentQueryResponse {
  query: string;
  intent: string;
  execution_trace: ExecutionTraceStep[];
  claim: string;
  summary: string;
  evidence_path?: string[];
  evidence_chain?: Array<{ source: string; rel: string; target: string }>;
  chain_narrative?: string;
  ranked_entities?: GraphNode[];
  locations?: GraphNode[];
  highlight_nodes: string[];
  highlight_edges: string[];
  confidence: number;
  hops?: number;
  priority_rating?: string;
  priority_factors?: PriorityBreakdown;
  priority_score?: number;
  disclaimer: string;
}

export interface EntityResolutionCandidate {
  pair_id: string;
  primary_entity: {
    id: string;
    name: string;
    type: NodeType;
    attributes: Record<string, any>;
  };
  candidate_entity: {
    id: string;
    name: string;
    type: NodeType;
    attributes: Record<string, any>;
  };
  confidence: number;
  match_reasons: string[];
  status: 'PENDING_REVIEW' | 'MERGE' | 'KEEP_SEPARATE' | 'MARK_REVIEW';
  resolution_timestamp?: string;
  notes?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  operator: string;
  action: string;
  details: string;
  hash: string;
}

export interface TimelineMilestone {
  month: string;
  title: string;
  description: string;
  entity_count: number;
  edge_count: number;
}
