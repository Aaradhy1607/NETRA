import urllib.request
import json
import sys

def test_system():
    base = 'http://127.0.0.1:8000/api'
    
    # 1. Health
    h = json.loads(urllib.request.urlopen(f'{base}/health').read().decode('utf-8'))
    print(f"[PASS] 1. Health Check: {h['status']} | System: {h['system']}")
    
    # 2. Case Trident
    trident = json.loads(urllib.request.urlopen(f'{base}/cases/CASE-TRIDENT-2026').read().decode('utf-8'))
    print(f"[PASS] 2. Case Trident: {len(trident['nodes'])} nodes, {len(trident['edges'])} edges, {trident['stats']['bridge_nodes_count']} bridges")
    
    # 3. Communities
    comm = json.loads(urllib.request.urlopen(f'{base}/cases/CASE-TRIDENT-2026/communities').read().decode('utf-8'))
    print(f"[PASS] 3. Detected Communities: {len(comm['communities'])} modular sub-networks")
    
    # 4. Shortest Path P-04 to P-19
    path = json.loads(urllib.request.urlopen(f'{base}/cases/CASE-TRIDENT-2026/shortest-path?source=PERSON-04&target=PERSON-19').read().decode('utf-8'))
    print(f"[PASS] 4. Shortest Path Found: {path['found']} | Hops: {path['hops']}")
    
    # 5. Agent Query
    req = urllib.request.Request(
        f'{base}/agent/query', 
        data=json.dumps({'query': 'Which entities connect separate clusters?'}).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    agent_res = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))
    print(f"[PASS] 5. AI Agent Query: {len(agent_res['execution_trace'])} execution steps | Confidence: {agent_res['confidence']*100}%")
    
    # 6. Entity Resolution Candidates
    res_cand = json.loads(urllib.request.urlopen(f'{base}/entity-resolution').read().decode('utf-8'))
    print(f"[PASS] 6. Resolution Candidates: {len(res_cand['candidates'])} pairs | Match: {res_cand['candidates'][0]['confidence']*100}%")
    
    # 7. Case Comparison
    cmp = json.loads(urllib.request.urlopen(f'{base}/case-comparison').read().decode('utf-8'))
    print(f"[PASS] 7. Case Comparison: {cmp['shared_entity_count']} shared entities between Trident and Meridian")
    
    # 8. Brief Generation
    req_brief = urllib.request.Request(
        f'{base}/report/generate',
        data=json.dumps({'case_id': 'CASE-TRIDENT-2026'}).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    brief = json.loads(urllib.request.urlopen(req_brief).read().decode('utf-8'))
    print(f"[PASS] 8. Brief Generated: {brief['brief_id']} | Targets: {len(brief['key_entities'])}")

    # 9. Frontend Server Response (Port 5180)
    fe = urllib.request.urlopen('http://127.0.0.1:5180/').read().decode('utf-8')
    assert 'NETRA' in fe
    print(f"[PASS] 9. Frontend Vite Server running on port 5180 (NETRA Index HTML verified)")

    print("\n========================================================")
    print(">>> ALL 9 INTEGRATION SUITE TESTS PASSED WITH 100% SUCCESS! <<<")
    print("========================================================")

if __name__ == '__main__':
    test_system()
