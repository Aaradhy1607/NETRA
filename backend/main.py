"""
NETRA: AI-Powered Investigation & Network Intelligence Backend
FastAPI Main Application
"""

from fastapi import FastAPI, HTTPException, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Any, Optional
from datetime import datetime
import hashlib

from backend.data.synthetic_cases import (
    OPERATION_TRIDENT_DATA,
    OPERATION_MERIDIAN_DATA,
    ENTITY_RESOLUTION_CANDIDATES
)
from backend.graph.engine import GraphAnalyticsEngine
from backend.agent.investigation_agent import InvestigationAgent

app = FastAPI(
    title="NETRA Intelligence Engine API",
    description="AI-Powered Criminal Network Analysis & Intelligence Platform",
    version="2.0.0"
)

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize in-memory case state and engines
trident_engine = GraphAnalyticsEngine(OPERATION_TRIDENT_DATA)
meridian_engine = GraphAnalyticsEngine(OPERATION_MERIDIAN_DATA)
investigation_agent = InvestigationAgent(trident_engine)

# In-memory entity resolution state
entity_resolution_state = list(ENTITY_RESOLUTION_CANDIDATES)

# In-memory cryptographic audit log
audit_logs: List[Dict[str, Any]] = [
    {
        "id": "AUD-001",
        "timestamp": "2026-08-29 08:30:12",
        "operator": "ANALYST-709 // SIU",
        "action": "CASE_INITIALIZATION",
        "details": "Opened synthetic case file 'CASE-TRIDENT-2026 (Operation Trident)'",
        "hash": hashlib.sha256(b"init_case_trident_083012").hexdigest()[:16]
    },
    {
        "id": "AUD-002",
        "timestamp": "2026-08-29 08:32:45",
        "operator": "ANALYST-709 // SIU",
        "action": "GRAPH_CENTRALITY_COMPUTATION",
        "details": "Computed Degree & Betweenness Centrality across 28 entities",
        "hash": hashlib.sha256(b"centrality_eval_083245").hexdigest()[:16]
    },
    {
        "id": "AUD-003",
        "timestamp": "2026-08-29 08:35:10",
        "operator": "ANALYST-709 // SIU",
        "action": "BRIDGE_NODE_SCAN",
        "details": "Executed bridge detection algorithm; identified PERSON-07 and PHONE-03 as conduits",
        "hash": hashlib.sha256(b"bridge_scan_083510").hexdigest()[:16]
    }
]

def add_audit_event(action: str, details: str):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    event_id = f"AUD-{len(audit_logs) + 1:03d}"
    raw_str = f"{timestamp}-{action}-{details}-{event_id}".encode('utf-8')
    audit_hash = hashlib.sha256(raw_str).hexdigest()[:16]
    audit_logs.append({
        "id": event_id,
        "timestamp": timestamp,
        "operator": "ANALYST-709 // SIU",
        "action": action,
        "details": details,
        "hash": audit_hash
    })

# Request Models
class AgentQueryRequest(BaseModel):
    query: str
    case_id: Optional[str] = "CASE-TRIDENT-2026"
    context: Optional[Dict[str, Any]] = None

class ResolutionActionRequest(BaseModel):
    pair_id: str
    action: str  # "MERGE", "KEEP_SEPARATE", "MARK_REVIEW"
    notes: Optional[str] = ""

class ReportGenerateRequest(BaseModel):
    case_id: str = "CASE-TRIDENT-2026"
    include_ai_findings: bool = True
    include_evidence_chains: bool = True
    analyst_notes: Optional[str] = "Standard analytical prioritization review conducted under Tier-3 protocol."

# ----------------- ROUTES -----------------

@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "system": "NETRA Intelligence Engine",
        "version": "2.0.0",
        "classification": "RESTRICTED // SYNTHETIC INTEL ENVIRONMENT"
    }

@app.get("/api/cases")
def list_cases():
    return {
        "cases": [
            {
                "case_id": OPERATION_TRIDENT_DATA["case_id"],
                "name": OPERATION_TRIDENT_DATA["name"],
                "codename": OPERATION_TRIDENT_DATA["codename"],
                "status": OPERATION_TRIDENT_DATA["status"],
                "entities_count": len(OPERATION_TRIDENT_DATA["nodes"]),
                "connections_count": len(OPERATION_TRIDENT_DATA["edges"]),
                "description": OPERATION_TRIDENT_DATA["description"],
                "classification": OPERATION_TRIDENT_DATA["classification"]
            },
            {
                "case_id": OPERATION_MERIDIAN_DATA["case_id"],
                "name": OPERATION_MERIDIAN_DATA["name"],
                "codename": OPERATION_MERIDIAN_DATA["codename"],
                "status": OPERATION_MERIDIAN_DATA["status"],
                "entities_count": len(OPERATION_MERIDIAN_DATA["nodes"]),
                "connections_count": len(OPERATION_MERIDIAN_DATA["edges"]),
                "description": OPERATION_MERIDIAN_DATA["description"],
                "classification": OPERATION_MERIDIAN_DATA["classification"]
            }
        ]
    }

@app.get("/api/cases/{case_id}")
def get_case_graph(case_id: str):
    if case_id == "CASE-MERIDIAN-2026":
        data = meridian_engine.get_full_graph()
    else:
        data = trident_engine.get_full_graph()
    
    add_audit_event("VIEW_CASE_GRAPH", f"Inspected full relationship graph for {case_id}")
    return data

@app.get("/api/cases/{case_id}/communities")
def get_communities(case_id: str):
    engine = meridian_engine if case_id == "CASE-MERIDIAN-2026" else trident_engine
    return {"communities": engine.detect_communities()}

@app.get("/api/cases/{case_id}/bridges")
def get_bridges(case_id: str):
    engine = meridian_engine if case_id == "CASE-MERIDIAN-2026" else trident_engine
    return {"bridge_entities": engine.detect_bridge_nodes()}

@app.get("/api/cases/{case_id}/shortest-path")
def get_shortest_path(case_id: str, source: str, target: str):
    engine = meridian_engine if case_id == "CASE-MERIDIAN-2026" else trident_engine
    res = engine.find_shortest_path(source, target)
    add_audit_event("PATH_ANALYSIS", f"Calculated shortest relationship path: {source} -> {target}")
    return res

@app.get("/api/cases/{case_id}/timeline")
def get_timeline(case_id: str, cutoff_date: Optional[str] = "2026-05-25"):
    engine = meridian_engine if case_id == "CASE-MERIDIAN-2026" else trident_engine
    res = engine.filter_by_timeline(cutoff_date)
    return {
        **res,
        "milestones": OPERATION_TRIDENT_DATA.get("timeline_milestones", [])
    }

@app.get("/api/cases/{case_id}/neighborhood/{entity_id}")
def get_entity_neighborhood(case_id: str, entity_id: str, hops: int = 1):
    engine = meridian_engine if case_id == "CASE-MERIDIAN-2026" else trident_engine
    return engine.get_entity_neighborhood(entity_id, hops)

@app.get("/api/cases/{case_id}/explain/{entity_id}")
def explain_entity(case_id: str, entity_id: str):
    engine = meridian_engine if case_id == "CASE-MERIDIAN-2026" else trident_engine
    res = engine.explain_entity_importance(entity_id)
    add_audit_event("EXPLAIN_ENTITY", f"Generated explainability metric breakdown for {entity_id}")
    return res

@app.post("/api/agent/query")
def run_agent_query(req: AgentQueryRequest):
    add_audit_event("AI_AGENT_QUERY", f"Executed natural language investigation prompt: '{req.query}'")
    result = investigation_agent.query(req.query, req.context)
    return result

@app.get("/api/entity-resolution")
def get_entity_resolution_candidates():
    return {"candidates": entity_resolution_state}

@app.post("/api/entity-resolution/resolve")
def resolve_entity_pair(req: ResolutionActionRequest):
    for cand in entity_resolution_state:
        if cand["pair_id"] == req.pair_id:
            cand["status"] = req.action
            cand["resolution_timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            cand["notes"] = req.notes
            add_audit_event("ENTITY_RESOLUTION", f"Resolved pair {req.pair_id} as {req.action}")
            return {"success": True, "pair_id": req.pair_id, "status": req.action}
    raise HTTPException(status_code=404, detail="Resolution pair not found")

@app.get("/api/case-comparison")
def compare_cases():
    """Compares Operation Trident vs Operation Meridian to find shared and cross-case conduits."""
    trident_nodes = {n["id"]: n for n in OPERATION_TRIDENT_DATA["nodes"]}
    meridian_nodes = {n["id"]: n for n in OPERATION_MERIDIAN_DATA["nodes"]}

    shared_ids = set(trident_nodes.keys()).intersection(set(meridian_nodes.keys()))
    
    shared_entities = []
    for s_id in shared_ids:
        t_node = trident_nodes[s_id]
        m_node = meridian_nodes[s_id]
        shared_entities.append({
            "id": s_id,
            "label": t_node.get("label"),
            "type": t_node.get("type"),
            "role_in_trident": t_node.get("role"),
            "role_in_meridian": m_node.get("role"),
            "risk_level": "CRITICAL CROSS-CASE CONDUIT",
            "notes": f"Observed in both Operation Trident and Operation Meridian."
        })

    add_audit_event("CASE_COMPARISON", "Executed multi-case overlap analysis between Trident and Meridian")
    return {
        "case_a": {"id": "CASE-TRIDENT-2026", "name": "Operation Trident", "total_entities": len(trident_nodes)},
        "case_b": {"id": "CASE-MERIDIAN-2026", "name": "Operation Meridian", "total_entities": len(meridian_nodes)},
        "shared_entity_count": len(shared_entities),
        "shared_entities": shared_entities,
        "cross_case_summary": (
            f"Cross-case correlation identified {len(shared_entities)} critical shared infrastructure assets "
            f"(including bridge coordinator PERSON-07, burner device PHONE-03, and shell entity ORG-02). "
            f"This indicates a shared logistical and financial backbone spanning across both investigations."
        )
    }

@app.post("/api/report/generate")
def generate_investigation_brief(req: ReportGenerateRequest):
    graph_data = trident_engine.get_full_graph()
    bridges = trident_engine.detect_bridge_nodes()
    communities_list = trident_engine.detect_communities()

    add_audit_event("REPORT_GENERATION", "Generated official Restricted Investigation Brief for CASE-TRIDENT-2026")

    report = {
        "brief_id": f"INTEL-BRIEF-{datetime.now().strftime('%Y%m%d-%H%M')}",
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S UTC"),
        "classification": "RESTRICTED // LAW ENFORCEMENT & INTEL USE ONLY",
        "case_id": req.case_id,
        "case_name": "Operation Trident",
        "codename": "TRIDENT-NX-88",
        "lead_agency": "Special Investigation Unit (SIU)",
        "executive_summary": (
            "This analytical intelligence brief synthesizes 28 synthetic entities, 49 relationship vectors, "
            "and 3 distinct functional clusters identified during Operation Trident. High-centrality bridge entity "
            "PERSON-07 and encrypted communication burner PHONE-03 serve as primary topological links connecting "
            "Cluster A (Financial Controllers) with Cluster B (Field Transport) and Cluster C (Regional Comms Nexus)."
        ),
        "key_entities": [
            {"id": "PERSON-07", "name": "Karan Malhotra", "type": "PERSON", "role": "Strategic Logistics & Operations Bridge", "priority": "CRITICAL - HIGH PRIORITY FOR REVIEW", "connections": 14, "rationale": "High betweenness centrality (0.24) connecting 3 separate communities."},
            {"id": "PHONE-03", "name": "+91-98703-XX803", "type": "PHONE", "role": "Cross-Cluster Burner Relay", "priority": "CRITICAL - HIGH PRIORITY FOR REVIEW", "connections": 5, "rationale": "Encrypted communication link between Person-04 and Person-19."},
            {"id": "PERSON-04", "name": "Arjun Nambiar", "type": "PERSON", "role": "Senior Coordinator", "priority": "HIGH PRIORITY FOR REVIEW", "connections": 7, "rationale": "Financial authority in Cluster A initiating cross-cluster directives."},
            {"id": "ORG-01", "name": "Trident Oceanic Freight Ltd.", "type": "ORGANIZATION", "role": "Commercial Freight Front", "priority": "CRITICAL - HIGH PRIORITY FOR REVIEW", "connections": 6, "rationale": "Consignee for interdicted shipments at Port Terminal 4B."}
        ],
        "sub_networks": communities_list,
        "bridge_analysis": bridges,
        "milestone_events": OPERATION_TRIDENT_DATA.get("timeline_milestones", []),
        "disclaimer_limitations": (
            "LEGAL & ANALYTICAL DISCLAIMER: All intelligence insights, centrality scores, and connection paths contained "
            "herein represent statistical and structural network hypotheses generated from synthetic dataset inputs. "
            "Network centrality is an investigative prioritization indicator, NOT a judicial determination of guilt. "
            "All findings must be independently corroborated through lawful evidentiary procedures."
        ),
        "analyst_signoff": "ANALYST-709 // SPECIAL INVESTIGATION UNIT"
    }
    return report

@app.get("/api/audit-logs")
def get_audit_logs():
    return {"audit_trail": audit_logs}

@app.post("/api/audit-logs")
def log_action(body: Dict[str, Any] = Body(...)):
    action = body.get("action", "USER_ACTION")
    details = body.get("details", "")
    add_audit_event(action, details)
    return {"success": True}
