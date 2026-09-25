import { 
  CaseData, 
  Community, 
  BridgeEntity, 
  AgentQueryResponse, 
  EntityResolutionCandidate,
  AuditLogItem 
} from '../types';

const API_BASE = 'http://127.0.0.1:8000/api';

export const api = {
  async getCaseGraph(caseId: string = 'CASE-TRIDENT-2026'): Promise<CaseData> {
    const res = await fetch(`${API_BASE}/cases/${caseId}`);
    if (!res.ok) throw new Error(`Failed to load case graph: ${res.statusText}`);
    return res.json();
  },

  async getCommunities(caseId: string = 'CASE-TRIDENT-2026'): Promise<Community[]> {
    const res = await fetch(`${API_BASE}/cases/${caseId}/communities`);
    if (!res.ok) throw new Error(`Failed to load communities: ${res.statusText}`);
    const data = await res.json();
    return data.communities;
  },

  async getBridges(caseId: string = 'CASE-TRIDENT-2026'): Promise<BridgeEntity[]> {
    const res = await fetch(`${API_BASE}/cases/${caseId}/bridges`);
    if (!res.ok) throw new Error(`Failed to load bridges: ${res.statusText}`);
    const data = await res.json();
    return data.bridge_entities;
  },

  async getShortestPath(caseId: string, source: string, target: string) {
    const res = await fetch(`${API_BASE}/cases/${caseId}/shortest-path?source=${encodeURIComponent(source)}&target=${encodeURIComponent(target)}`);
    if (!res.ok) throw new Error(`Failed to find shortest path: ${res.statusText}`);
    return res.json();
  },

  async getTimeline(caseId: string, cutoffDate: string) {
    const res = await fetch(`${API_BASE}/cases/${caseId}/timeline?cutoff_date=${encodeURIComponent(cutoffDate)}`);
    if (!res.ok) throw new Error(`Failed to filter timeline: ${res.statusText}`);
    return res.json();
  },

  async explainEntity(caseId: string, entityId: string) {
    const res = await fetch(`${API_BASE}/cases/${caseId}/explain/${encodeURIComponent(entityId)}`);
    if (!res.ok) throw new Error(`Failed to explain entity: ${res.statusText}`);
    return res.json();
  },

  async runAgentQuery(query: string, caseId: string = 'CASE-TRIDENT-2026'): Promise<AgentQueryResponse> {
    const res = await fetch(`${API_BASE}/agent/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, case_id: caseId })
    });
    if (!res.ok) throw new Error(`Agent query failed: ${res.statusText}`);
    return res.json();
  },

  async getEntityResolutionCandidates(): Promise<EntityResolutionCandidate[]> {
    const res = await fetch(`${API_BASE}/entity-resolution`);
    if (!res.ok) throw new Error(`Failed to load resolution candidates: ${res.statusText}`);
    const data = await res.json();
    return data.candidates;
  },

  async resolveEntityPair(pairId: string, action: string, notes: string = '') {
    const res = await fetch(`${API_BASE}/entity-resolution/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pair_id: pairId, action, notes })
    });
    if (!res.ok) throw new Error(`Failed to resolve pair: ${res.statusText}`);
    return res.json();
  },

  async getCaseComparison() {
    const res = await fetch(`${API_BASE}/case-comparison`);
    if (!res.ok) throw new Error(`Failed to compare cases: ${res.statusText}`);
    return res.json();
  },

  async generateBrief(caseId: string = 'CASE-TRIDENT-2026') {
    const res = await fetch(`${API_BASE}/report/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ case_id: caseId })
    });
    if (!res.ok) throw new Error(`Failed to generate brief: ${res.statusText}`);
    return res.json();
  },

  async getAuditLogs(): Promise<AuditLogItem[]> {
    const res = await fetch(`${API_BASE}/audit-logs`);
    if (!res.ok) throw new Error(`Failed to fetch audit logs: ${res.statusText}`);
    const data = await res.json();
    return data.audit_trail;
  },

  async logAuditEvent(action: string, details: string) {
    try {
      await fetch(`${API_BASE}/audit-logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, details })
      });
    } catch {
      // Non-blocking
    }
  }
};
