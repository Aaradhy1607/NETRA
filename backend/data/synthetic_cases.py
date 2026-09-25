"""
Synthetic Intelligence Investigation Datasets for NETRA.
ALL DATA IS ENTIRELY FICTIONAL AND SYNTHETIC FOR DEMONSTRATION PURPOSES.
NO REAL PERSONS, NUMBERS, ACCOUNTS, OR IDENTIFIERS ARE USED.
"""

from typing import Dict, List, Any

OPERATION_TRIDENT_DATA: Dict[str, Any] = {
    "case_id": "CASE-TRIDENT-2026",
    "name": "Operation Trident",
    "codename": "TRIDENT-NX-88",
    "classification": "RESTRICTED // LAW ENFORCEMENT & INTEL USE ONLY",
    "status": "Active Surveillance",
    "start_date": "2026-01-10",
    "end_date": "2026-05-25",
    "lead_agency": "Special Investigation Unit (SIU)",
    "description": "Cross-jurisdiction intelligence operation analyzing fragmented communication channels, shell logistics hubs, and illicit hawala transaction clusters.",
    "nodes": [
        # PERSONS (Cluster Alpha: Financial & Logistics)
        {
            "id": "PERSON-01",
            "label": "Vikram Singhania (Alias: 'The Broker')",
            "type": "PERSON",
            "role": "Financial Facilitator",
            "cluster": "Cluster-A (Finance)",
            "first_observed": "2026-01-12",
            "last_observed": "2026-05-18",
            "confidence": 0.94,
            "notes": "Direct controller of 3 offshore shell accounts. Regularly meets ORG-01 logistics coordinators.",
            "risk_level": "HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "PERSON-02",
            "label": "Tanya Fernandez",
            "type": "PERSON",
            "role": "Shell Entity Director",
            "cluster": "Cluster-A (Finance)",
            "first_observed": "2026-01-15",
            "last_observed": "2026-04-20",
            "confidence": 0.88,
            "notes": "Signatory for ORG-02 and ORG-03. Receives synthetic wire transfers via ACC-02.",
            "risk_level": "MEDIUM PRIORITY FOR REVIEW"
        },
        {
            "id": "PERSON-03",
            "label": "Deepak Sethi",
            "type": "PERSON",
            "role": "Accountant / Bookkeeper",
            "cluster": "Cluster-A (Finance)",
            "first_observed": "2026-01-20",
            "last_observed": "2026-05-02",
            "confidence": 0.91,
            "notes": "Manages transaction ledgers between ACC-01, ACC-03, and ACC-05.",
            "risk_level": "MEDIUM PRIORITY FOR REVIEW"
        },
        {
            "id": "PERSON-04",
            "label": "Arjun Nambiar",
            "type": "PERSON",
            "role": "Senior Coordinator",
            "cluster": "Cluster-A (Finance)",
            "first_observed": "2026-01-14",
            "last_observed": "2026-05-22",
            "confidence": 0.96,
            "notes": "Key liaison in Cluster A. Indirectly connects to field operations through PHONE-03 and bridge nodes.",
            "risk_level": "HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "PERSON-05",
            "label": "Meera Joshi",
            "type": "PERSON",
            "role": "Compliance Proxy",
            "cluster": "Cluster-A (Finance)",
            "first_observed": "2026-02-01",
            "last_observed": "2026-04-15",
            "confidence": 0.82,
            "notes": "Submits fraudulent customs documents for ORG-01 shipments.",
            "risk_level": "LOW PRIORITY FOR REVIEW"
        },

        # BRIDGE ENTITY (Crucial Node linking Cluster A & Cluster B & Cluster C)
        {
            "id": "PERSON-07",
            "label": "Karan Malhotra (Alias: 'Nexus-7')",
            "type": "PERSON",
            "role": "Strategic Logistics & Operations Bridge",
            "cluster": "Bridge Entity",
            "first_observed": "2026-01-10",
            "last_observed": "2026-05-24",
            "confidence": 0.98,
            "notes": "High-centrality hub. 14+ direct links connecting financial controllers in Cluster A with field couriers in Cluster B and comms safehouse in Cluster C.",
            "risk_level": "CRITICAL - HIGH PRIORITY FOR REVIEW"
        },

        # PERSONS (Cluster Bravo: Field & Transport Operations)
        {
            "id": "PERSON-11",
            "label": "Rohan Deshmukh",
            "type": "PERSON",
            "role": "Fleet Supervisor",
            "cluster": "Cluster-B (Field Ops)",
            "first_observed": "2026-01-18",
            "last_observed": "2026-05-20",
            "confidence": 0.92,
            "notes": "Controls commercial vehicle fleet (VEHICLE-01, VEHICLE-02). Observed at LOC-02 warehouse.",
            "risk_level": "HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "PERSON-12",
            "label": "Sanjay Verma (Alias: 'Ghost Courier')",
            "type": "PERSON",
            "role": "Tactical Transport Courier",
            "cluster": "Cluster-B (Field Ops)",
            "first_observed": "2026-02-05",
            "last_observed": "2026-05-19",
            "confidence": 0.90,
            "notes": "Operates VEHICLE-04. Visited safehouse LOC-04 multiple times between midnight and 03:00.",
            "risk_level": "HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "PERSON-13",
            "label": "Imran Qureshi",
            "type": "PERSON",
            "role": "Warehouse Manager",
            "cluster": "Cluster-B (Field Ops)",
            "first_observed": "2026-01-22",
            "last_observed": "2026-05-11",
            "confidence": 0.89,
            "notes": "Primary keyholder for Port Warehouse LOC-03 and Container Terminal LOC-01.",
            "risk_level": "MEDIUM PRIORITY FOR REVIEW"
        },
        {
            "id": "PERSON-14",
            "label": "Naveen Rawat",
            "type": "PERSON",
            "role": "Customs Handler",
            "cluster": "Cluster-B (Field Ops)",
            "first_observed": "2026-02-14",
            "last_observed": "2026-05-08",
            "confidence": 0.87,
            "notes": "Cleared cargo manifest for ORG-04 container shipments.",
            "risk_level": "MEDIUM PRIORITY FOR REVIEW"
        },
        {
            "id": "PERSON-15",
            "label": "Bikram Choudhury",
            "type": "PERSON",
            "role": "Highway Scout",
            "cluster": "Cluster-B (Field Ops)",
            "first_observed": "2026-02-28",
            "last_observed": "2026-05-04",
            "confidence": 0.79,
            "notes": "Provides advance route reconnaissance for freight trucks along NH-48.",
            "risk_level": "LOW PRIORITY FOR REVIEW"
        },

        # PERSONS (Cluster Charlie: Communication & Digital Nexus)
        {
            "id": "PERSON-18",
            "label": "Aditya Rao",
            "type": "PERSON",
            "role": "Encrypted Comms Admin",
            "cluster": "Cluster-C (Comms & Digital)",
            "first_observed": "2026-01-25",
            "last_observed": "2026-05-23",
            "confidence": 0.95,
            "notes": "Distributes burner SIMs (PHONE-01, PHONE-02, PHONE-03) and encrypted hardware devices.",
            "risk_level": "HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "PERSON-19",
            "label": "Farhan Akhtar (Alias: 'Silent Echo')",
            "type": "PERSON",
            "role": "Regional Field Director",
            "cluster": "Cluster-C (Comms & Digital)",
            "first_observed": "2026-02-10",
            "last_observed": "2026-05-25",
            "confidence": 0.96,
            "notes": "Receives directives from PERSON-04 indirectly through PERSON-07 and PHONE-03. Holds meeting logs.",
            "risk_level": "HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "PERSON-20",
            "label": "Sunita Patil",
            "type": "PERSON",
            "role": "Safehouse Custodian",
            "cluster": "Cluster-C (Comms & Digital)",
            "first_observed": "2026-03-01",
            "last_observed": "2026-05-14",
            "confidence": 0.84,
            "notes": "Oversees communications hub LOC-05 and digital relay point LOC-06.",
            "risk_level": "LOW PRIORITY FOR REVIEW"
        },
        {
            "id": "PERSON-21",
            "label": "Rahul Mehta",
            "type": "PERSON",
            "role": "Financial Associate (Ambiguous Record)",
            "cluster": "Cluster-A (Finance)",
            "first_observed": "2026-03-15",
            "last_observed": "2026-05-10",
            "confidence": 0.81,
            "notes": "Potential duplicate/alias entity of 'R. Mehta'. Shared account access on ACC-02.",
            "risk_level": "MEDIUM PRIORITY FOR REVIEW"
        },
        {
            "id": "PERSON-22",
            "label": "Kabir Sheikh",
            "type": "PERSON",
            "role": "Cross-Border Contact",
            "cluster": "Cluster-C (Comms & Digital)",
            "first_observed": "2026-03-20",
            "last_observed": "2026-05-21",
            "confidence": 0.86,
            "notes": "Associated with cross-border VoIP routing and satellite handset PHONE-09.",
            "risk_level": "MEDIUM PRIORITY FOR REVIEW"
        },

        # PHONE IDENTIFIERS
        {
            "id": "PHONE-01",
            "label": "+91-98701-XX801 (Burner Alpha)",
            "type": "PHONE",
            "role": "Encrypted VoIP Endpoint",
            "cluster": "Cluster-A (Finance)",
            "first_observed": "2026-01-12",
            "last_observed": "2026-05-20",
            "confidence": 0.93,
            "notes": "IMEI: 354892019283710. Registered under synthetic alias.",
            "risk_level": "HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "PHONE-02",
            "label": "+91-98702-XX802 (Secure Line)",
            "type": "PHONE",
            "role": "Field Ops Dispatch",
            "cluster": "Cluster-B (Field Ops)",
            "first_observed": "2026-01-20",
            "last_observed": "2026-05-18",
            "confidence": 0.91,
            "notes": "Cell tower location logs show regular pings near Port Warehouse LOC-03.",
            "risk_level": "HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "PHONE-03",
            "label": "+91-98703-XX803 (Bridge Burner)",
            "type": "PHONE",
            "role": "Cross-Cluster Communication Relay",
            "cluster": "Bridge Entity",
            "first_observed": "2026-01-15",
            "last_observed": "2026-05-24",
            "confidence": 0.97,
            "notes": "Crucial bridge device. Calls originate between PERSON-04 (Cluster A) and PERSON-19 (Cluster C).",
            "risk_level": "CRITICAL - HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "PHONE-04",
            "label": "+91-98704-XX804 (Courier Line)",
            "type": "PHONE",
            "role": "Logistics Dispatch",
            "cluster": "Cluster-B (Field Ops)",
            "first_observed": "2026-02-01",
            "last_observed": "2026-05-15",
            "confidence": 0.85,
            "notes": "Frequently active during highway transport runs.",
            "risk_level": "MEDIUM PRIORITY FOR REVIEW"
        },
        {
            "id": "PHONE-05",
            "label": "+91-98705-XX805 (Financial Hotline)",
            "type": "PHONE",
            "role": "Hawala Desk Line",
            "cluster": "Cluster-A (Finance)",
            "first_observed": "2026-01-18",
            "last_observed": "2026-04-30",
            "confidence": 0.88,
            "notes": "Directly linked to hawala settlement calls with ORG-03.",
            "risk_level": "MEDIUM PRIORITY FOR REVIEW"
        },
        {
            "id": "PHONE-09",
            "label": "+88-216-XX909 (Satellite Handset)",
            "type": "PHONE",
            "role": "Offshore Satellite Terminal",
            "cluster": "Cluster-C (Comms & Digital)",
            "first_observed": "2026-03-10",
            "last_observed": "2026-05-22",
            "confidence": 0.89,
            "notes": "Thuraya satellite handset used for maritime route coordination.",
            "risk_level": "HIGH PRIORITY FOR REVIEW"
        },

        # VEHICLES
        {
            "id": "VEHICLE-01",
            "label": "Heavy Truck (Reg: MH-04-TR-4011)",
            "type": "VEHICLE",
            "role": "Container Freight Vehicle",
            "cluster": "Cluster-B (Field Ops)",
            "first_observed": "2026-01-25",
            "last_observed": "2026-05-15",
            "confidence": 0.94,
            "notes": "GPS logs confirm 14 trips between Port LOC-01 and Inland Hub LOC-02.",
            "risk_level": "HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "VEHICLE-02",
            "label": "Light Van (Reg: MH-02-VN-8822)",
            "type": "VEHICLE",
            "role": "Last-Mile Distribution Van",
            "cluster": "Cluster-B (Field Ops)",
            "first_observed": "2026-02-02",
            "last_observed": "2026-05-10",
            "confidence": 0.89,
            "notes": "Observed at Safehouse LOC-04 during late night deliveries.",
            "risk_level": "MEDIUM PRIORITY FOR REVIEW"
        },
        {
            "id": "VEHICLE-04",
            "label": "Armored SUV (Reg: GJ-01-AX-9901)",
            "type": "VEHICLE",
            "role": "Command & Executive Transport",
            "cluster": "Bridge Entity",
            "first_observed": "2026-01-15",
            "last_observed": "2026-05-23",
            "confidence": 0.96,
            "notes": "Used by PERSON-07 to visit both financial offices (LOC-07) and port facilities (LOC-01).",
            "risk_level": "CRITICAL - HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "VEHICLE-05",
            "label": "Sedan (Reg: DL-08-CD-3319)",
            "type": "VEHICLE",
            "role": "Escort Vehicle",
            "cluster": "Cluster-A (Finance)",
            "first_observed": "2026-02-12",
            "last_observed": "2026-04-28",
            "confidence": 0.81,
            "notes": "Registered to shell company ORG-02.",
            "risk_level": "LOW PRIORITY FOR REVIEW"
        },

        # LOCATIONS
        {
            "id": "LOC-01",
            "label": "Port Cargo Terminal 4B",
            "type": "LOCATION",
            "role": "Primary Inbound Logistics Point",
            "cluster": "Cluster-B (Field Ops)",
            "first_observed": "2026-01-10",
            "last_observed": "2026-05-24",
            "confidence": 0.99,
            "notes": "High-traffic node. Multiple container manifests linked to ORG-01 and ORG-04.",
            "risk_level": "CRITICAL - HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "LOC-02",
            "label": "Industrial Estate Warehouse #12",
            "type": "LOCATION",
            "role": "Central Staging & Consolidation Hub",
            "cluster": "Cluster-B (Field Ops)",
            "first_observed": "2026-01-18",
            "last_observed": "2026-05-21",
            "confidence": 0.95,
            "notes": "Leased under ORG-01. CCTV records confirm visits by VEHICLE-01 and VEHICLE-04.",
            "risk_level": "HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "LOC-03",
            "label": "Seaside CFS Cold Storage",
            "type": "LOCATION",
            "role": "Secondary Storage Depot",
            "cluster": "Cluster-B (Field Ops)",
            "first_observed": "2026-02-01",
            "last_observed": "2026-05-12",
            "confidence": 0.88,
            "notes": "Temporary holding zone for covert shipments.",
            "risk_level": "MEDIUM PRIORITY FOR REVIEW"
        },
        {
            "id": "LOC-04",
            "label": "Suburban Safehouse (Villa-8)",
            "type": "LOCATION",
            "role": "Field Meeting & Cache Site",
            "cluster": "Cluster-C (Comms & Digital)",
            "first_observed": "2026-02-15",
            "last_observed": "2026-05-22",
            "confidence": 0.93,
            "notes": "Surveillance confirmed clandestine meetings involving PERSON-12, PERSON-19, and PERSON-20.",
            "risk_level": "HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "LOC-05",
            "label": "Comms Relay Tower Apex",
            "type": "LOCATION",
            "role": "Digital Signal Gateway",
            "cluster": "Cluster-C (Comms & Digital)",
            "first_observed": "2026-01-20",
            "last_observed": "2026-05-25",
            "confidence": 0.90,
            "notes": "Handles encrypted VoIP traffic and burner relay signals.",
            "risk_level": "MEDIUM PRIORITY FOR REVIEW"
        },
        {
            "id": "LOC-07",
            "label": "Apex Heights Corporate Suite 902",
            "type": "LOCATION",
            "role": "Financial Management Office",
            "cluster": "Cluster-A (Finance)",
            "first_observed": "2026-01-12",
            "last_observed": "2026-05-24",
            "confidence": 0.96,
            "notes": "Registered address for ORG-01, ORG-02, and ORG-03. Visited frequently by PERSON-01, PERSON-04, and PERSON-07.",
            "risk_level": "CRITICAL - HIGH PRIORITY FOR REVIEW"
        },

        # ORGANIZATIONS (Shell companies & fronts)
        {
            "id": "ORG-01",
            "label": "Trident Oceanic Freight Ltd.",
            "type": "ORGANIZATION",
            "role": "Commercial Freight Front",
            "cluster": "Cluster-B (Field Ops)",
            "first_observed": "2026-01-10",
            "last_observed": "2026-05-24",
            "confidence": 0.97,
            "notes": "Acts as shipping consignee for international containers arriving at LOC-01.",
            "risk_level": "CRITICAL - HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "ORG-02",
            "label": "BluePeak Global Trading FZE",
            "type": "ORGANIZATION",
            "role": "Offshore Invoicing Shell",
            "cluster": "Cluster-A (Finance)",
            "first_observed": "2026-01-15",
            "last_observed": "2026-05-20",
            "confidence": 0.93,
            "notes": "Issues fraudulent commercial invoices used to justify multi-million wire transfers.",
            "risk_level": "HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "ORG-03",
            "label": "SilverLine Agro Logistics LLP",
            "type": "ORGANIZATION",
            "role": "Hawala Layering Vehicle",
            "cluster": "Cluster-A (Finance)",
            "first_observed": "2026-01-20",
            "last_observed": "2026-05-18",
            "confidence": 0.91,
            "notes": "Channel for cash conversion and account layering.",
            "risk_level": "HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "ORG-04",
            "label": "Zenith Warehousing Services",
            "type": "ORGANIZATION",
            "role": "Domestic Storage Contractor",
            "cluster": "Cluster-B (Field Ops)",
            "first_observed": "2026-02-01",
            "last_observed": "2026-05-14",
            "confidence": 0.86,
            "notes": "Operates storage leases for LOC-02 and LOC-03.",
            "risk_level": "MEDIUM PRIORITY FOR REVIEW"
        },

        # FINANCIAL ACCOUNTS
        {
            "id": "ACC-01",
            "label": "ACC-CORP-99104 (Offshore Wire)",
            "type": "ACCOUNT",
            "role": "Primary Wire Treasury",
            "cluster": "Cluster-A (Finance)",
            "first_observed": "2026-01-14",
            "last_observed": "2026-05-19",
            "confidence": 0.95,
            "notes": "Synthetic IBAN: GB29NWBK60161331928411. Processed $4.2M in synthetic transactions.",
            "risk_level": "HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "ACC-02",
            "label": "ACC-SHELL-44810 (Escrow Escapement)",
            "type": "ACCOUNT",
            "role": "Layering Node",
            "cluster": "Cluster-A (Finance)",
            "first_observed": "2026-01-22",
            "last_observed": "2026-05-12",
            "confidence": 0.92,
            "notes": "Rapid transit account with near-zero overnight balances.",
            "risk_level": "HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "ACC-03",
            "label": "ACC-CRYPTO-TRX88 (Tether Vault)",
            "type": "ACCOUNT",
            "role": "Crypto Stablecoin Wallet",
            "cluster": "Cluster-A (Finance)",
            "first_observed": "2026-02-05",
            "last_observed": "2026-05-23",
            "confidence": 0.89,
            "notes": "Synthetic USDT wallet address: 0x71C...9B2E. Linked to ORG-02 transfers.",
            "risk_level": "MEDIUM PRIORITY FOR REVIEW"
        },

        # CASES & EVENTS
        {
            "id": "EVENT-01",
            "label": "Shipment Consignment Seizure #402",
            "type": "EVENT",
            "role": "Interdiction Milestone",
            "cluster": "Cluster-B (Field Ops)",
            "first_observed": "2026-03-04",
            "last_observed": "2026-03-04",
            "confidence": 1.0,
            "notes": "Interdiction at Port LOC-01 yielded concealed contraband within machinery consignments.",
            "risk_level": "CRITICAL - HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "EVENT-02",
            "label": "Apex Executive Summit",
            "type": "EVENT",
            "role": "Coordination Meeting",
            "cluster": "Cluster-A (Finance)",
            "first_observed": "2026-04-12",
            "last_observed": "2026-04-12",
            "confidence": 0.98,
            "notes": "Physical meeting at LOC-07 attended by PERSON-01, PERSON-04, and PERSON-07.",
            "risk_level": "CRITICAL - HIGH PRIORITY FOR REVIEW"
        },
        {
            "id": "EVENT-03",
            "label": "Safehouse Midnight Handover",
            "type": "EVENT",
            "role": "Tactical Transfer",
            "cluster": "Cluster-C (Comms & Digital)",
            "first_observed": "2026-04-28",
            "last_observed": "2026-04-28",
            "confidence": 0.94,
            "notes": "Late night handover of encrypted satellite transceivers at LOC-04.",
            "risk_level": "HIGH PRIORITY FOR REVIEW"
        }
    ],
    "edges": [
        # Cluster A Internal Connections
        {"id": "E01", "source": "PERSON-01", "target": "ORG-01", "type": "WORKED_WITH", "timestamp": "2026-01-12", "weight": 4, "confidence": 0.94, "details": "Commercial Director and authorization signatory."},
        {"id": "E02", "source": "PERSON-01", "target": "ACC-01", "type": "TRANSACTED_WITH", "timestamp": "2026-01-14", "weight": 5, "confidence": 0.96, "details": "Initiated international wire transfer of $1.4M."},
        {"id": "E03", "source": "PERSON-02", "target": "ORG-02", "type": "OWNED", "timestamp": "2026-01-15", "weight": 4, "confidence": 0.90, "details": "Sole nominal director on corporate filings."},
        {"id": "E04", "source": "PERSON-02", "target": "ACC-02", "type": "TRANSACTED_WITH", "timestamp": "2026-01-22", "weight": 4, "confidence": 0.91, "details": "Transferred funds between ACC-01 and ACC-02."},
        {"id": "E05", "source": "PERSON-03", "target": "ACC-01", "type": "ASSOCIATED_WITH", "timestamp": "2026-01-20", "weight": 3, "confidence": 0.88, "details": "Maintains monthly balancing records."},
        {"id": "E06", "source": "PERSON-03", "target": "ACC-03", "type": "TRANSACTED_WITH", "timestamp": "2026-02-05", "weight": 4, "confidence": 0.89, "details": "Converted fiat balance into 250k synthetic USDT."},
        {"id": "E07", "source": "PERSON-04", "target": "PHONE-01", "type": "OWNED", "timestamp": "2026-01-14", "weight": 5, "confidence": 0.95, "details": "Subscriber and biometric voice match."},
        {"id": "E08", "source": "PERSON-04", "target": "LOC-07", "type": "VISITED", "timestamp": "2026-01-16", "weight": 5, "confidence": 0.97, "details": "Attended 18 distinct strategic meetings at Suite 902."},
        {"id": "E09", "source": "PERSON-01", "target": "LOC-07", "type": "VISITED", "timestamp": "2026-01-12", "weight": 5, "confidence": 0.96, "details": "Primary office headquarters."},
        {"id": "E10", "source": "PERSON-05", "target": "ORG-01", "type": "WORKED_WITH", "timestamp": "2026-02-01", "weight": 3, "confidence": 0.83, "details": "Prepares false bill of lading documents."},

        # Bridge Node (PERSON-07) Connections - Linking Cluster A, B, and C!
        {"id": "E11", "source": "PERSON-07", "target": "PERSON-04", "type": "ASSOCIATED_WITH", "timestamp": "2026-01-15", "weight": 5, "confidence": 0.98, "details": "Frequent direct operational synchronization sessions."},
        {"id": "E12", "source": "PERSON-07", "target": "PHONE-03", "type": "OWNED", "timestamp": "2026-01-16", "weight": 5, "confidence": 0.97, "details": "Key burner hardware operated by PERSON-07."},
        {"id": "E13", "source": "PERSON-07", "target": "VEHICLE-04", "type": "OWNED", "timestamp": "2026-01-15", "weight": 5, "confidence": 0.96, "details": "Registered driver of Armored SUV GJ-01-AX-9901."},
        {"id": "E14", "source": "PERSON-07", "target": "LOC-07", "type": "VISITED", "timestamp": "2026-01-18", "weight": 4, "confidence": 0.95, "details": "Met finance principals Vikram & Arjun at Suite 902."},
        {"id": "E15", "source": "PERSON-07", "target": "PERSON-11", "type": "WORKED_WITH", "timestamp": "2026-01-20", "weight": 5, "confidence": 0.94, "details": "Dispatched transport directives to fleet supervisor."},
        {"id": "E16", "source": "PERSON-07", "target": "LOC-01", "type": "VISITED", "timestamp": "2026-01-22", "weight": 4, "confidence": 0.92, "details": "Inspected inbound shipping container slots."},
        {"id": "E17", "source": "PERSON-07", "target": "LOC-02", "type": "VISITED", "timestamp": "2026-02-02", "weight": 4, "confidence": 0.93, "details": "Monitored inventory arrival at Warehouse #12."},
        {"id": "E18", "source": "PERSON-07", "target": "PERSON-18", "type": "ASSOCIATED_WITH", "timestamp": "2026-01-28", "weight": 4, "confidence": 0.93, "details": "Acquired batch of encrypted SIM cards and keys."},

        # Bridge Phone (PHONE-03) Links (Connects Person-04, Person-07, Person-19)
        {"id": "E19", "source": "PHONE-03", "target": "PHONE-01", "type": "CALLED", "timestamp": "2026-01-20", "weight": 4, "confidence": 0.94, "details": "22 encrypted calls recorded over 45 days."},
        {"id": "E20", "source": "PHONE-03", "target": "PHONE-02", "type": "CALLED", "timestamp": "2026-01-24", "weight": 4, "confidence": 0.92, "details": "17 calls coordinating field couriers."},
        {"id": "E21", "source": "PHONE-03", "target": "PERSON-19", "type": "CALLED", "timestamp": "2026-02-12", "weight": 5, "confidence": 0.96, "details": "Direct communication relay connecting to regional field commander."},

        # Cluster B Internal Connections (Field Ops & Transport)
        {"id": "E22", "source": "PERSON-11", "target": "VEHICLE-01", "type": "OWNED", "timestamp": "2026-01-25", "weight": 4, "confidence": 0.93, "details": "Vehicle assigned to fleet manifest."},
        {"id": "E23", "source": "PERSON-11", "target": "PERSON-12", "type": "WORKED_WITH", "timestamp": "2026-02-05", "weight": 4, "confidence": 0.91, "details": "Assigned high-risk courier routes to Sanjay."},
        {"id": "E24", "source": "PERSON-12", "target": "VEHICLE-02", "type": "OWNED", "timestamp": "2026-02-02", "weight": 4, "confidence": 0.90, "details": "Regularly drives last-mile delivery van."},
        {"id": "E25", "source": "PERSON-12", "target": "LOC-04", "type": "VISITED", "timestamp": "2026-02-18", "weight": 4, "confidence": 0.92, "details": "Delivered sealed packages to Villa-8 safehouse."},
        {"id": "E26", "source": "PERSON-13", "target": "LOC-03", "type": "VISITED", "timestamp": "2026-01-22", "weight": 5, "confidence": 0.95, "details": "Stationed as resident warehouse manager."},
        {"id": "E27", "source": "PERSON-13", "target": "LOC-01", "type": "VISITED", "timestamp": "2026-01-26", "weight": 4, "confidence": 0.91, "details": "Coordinates container offloading at Terminal 4B."},
        {"id": "E28", "source": "PERSON-14", "target": "LOC-01", "type": "VISITED", "timestamp": "2026-02-14", "weight": 4, "confidence": 0.88, "details": "Customs clearance counter on duty."},
        {"id": "E29", "source": "PERSON-14", "target": "ORG-04", "type": "ASSOCIATED_WITH", "timestamp": "2026-02-16", "weight": 3, "confidence": 0.86, "details": "Third-party liaison for storage contracts."},
        {"id": "E30", "source": "PERSON-15", "target": "VEHICLE-01", "type": "OBSERVED_AT", "timestamp": "2026-02-28", "weight": 3, "confidence": 0.80, "details": "Spotted shadowing truck along NH-48 corridor."},
        {"id": "E31", "source": "ORG-01", "target": "LOC-01", "type": "VISITED", "timestamp": "2026-01-10", "weight": 5, "confidence": 0.98, "details": "Leased berth and designated receiving dock."},
        {"id": "E32", "source": "ORG-04", "target": "LOC-02", "type": "ASSOCIATED_WITH", "timestamp": "2026-02-01", "weight": 4, "confidence": 0.92, "details": "Facility management agreement."},

        # Cluster C Internal Connections (Comms & Digital Nexus)
        {"id": "E33", "source": "PERSON-18", "target": "LOC-05", "type": "VISITED", "timestamp": "2026-01-25", "weight": 4, "confidence": 0.91, "details": "Installs cellular repeaters and antenna arrays."},
        {"id": "E34", "source": "PERSON-18", "target": "PHONE-09", "type": "ASSOCIATED_WITH", "timestamp": "2026-03-10", "weight": 4, "confidence": 0.90, "details": "Configured encrypted satellite firmware."},
        {"id": "E35", "source": "PERSON-19", "target": "LOC-04", "type": "VISITED", "timestamp": "2026-02-15", "weight": 5, "confidence": 0.97, "details": "Host for regional operations briefings."},
        {"id": "E36", "source": "PERSON-19", "target": "PERSON-20", "type": "WORKED_WITH", "timestamp": "2026-03-01", "weight": 4, "confidence": 0.89, "details": "Instructs safehouse security protocols."},
        {"id": "E37", "source": "PERSON-20", "target": "LOC-04", "type": "VISITED", "timestamp": "2026-03-01", "weight": 5, "confidence": 0.96, "details": "Resident caretaker and logbook keeper."},
        {"id": "E38", "source": "PERSON-22", "target": "PHONE-09", "type": "OWNED", "timestamp": "2026-03-20", "weight": 4, "confidence": 0.88, "details": "Used handset for maritime check-ins."},
        {"id": "E39", "source": "PERSON-22", "target": "PERSON-19", "type": "ASSOCIATED_WITH", "timestamp": "2026-03-22", "weight": 4, "confidence": 0.91, "details": "Relayed vessel coordinates to Farhan."},

        # Inter-Cluster Milestone Events
        {"id": "E40", "source": "EVENT-01", "target": "LOC-01", "type": "INVOLVED_IN", "timestamp": "2026-03-04", "weight": 5, "confidence": 1.0, "details": "Interdiction conducted at Port Terminal 4B."},
        {"id": "E41", "source": "EVENT-01", "target": "ORG-01", "type": "INVOLVED_IN", "timestamp": "2026-03-04", "weight": 5, "confidence": 0.99, "details": "Container marked under Trident Oceanic Freight manifest."},
        {"id": "E42", "source": "EVENT-01", "target": "PERSON-13", "type": "INVOLVED_IN", "timestamp": "2026-03-04", "weight": 4, "confidence": 0.95, "details": "Questioned on site regarding container locks."},
        {"id": "E43", "source": "EVENT-02", "target": "LOC-07", "type": "INVOLVED_IN", "timestamp": "2026-04-12", "weight": 5, "confidence": 0.99, "details": "Conducted inside Suite 902."},
        {"id": "E44", "source": "EVENT-02", "target": "PERSON-01", "type": "INVOLVED_IN", "timestamp": "2026-04-12", "weight": 5, "confidence": 0.98, "details": "Present for 3 hours."},
        {"id": "E45", "source": "EVENT-02", "target": "PERSON-04", "type": "INVOLVED_IN", "timestamp": "2026-04-12", "weight": 5, "confidence": 0.98, "details": "Chaired the operational review session."},
        {"id": "E46", "source": "EVENT-02", "target": "PERSON-07", "type": "INVOLVED_IN", "timestamp": "2026-04-12", "weight": 5, "confidence": 0.99, "details": "Arrived via VEHICLE-04 to brief finance heads on supply routes."},
        {"id": "E47", "source": "EVENT-03", "target": "LOC-04", "type": "INVOLVED_IN", "timestamp": "2026-04-28", "weight": 5, "confidence": 0.96, "details": "Observed at Villa-8 at 02:40 AM."},
        {"id": "E48", "source": "EVENT-03", "target": "PERSON-19", "type": "INVOLVED_IN", "timestamp": "2026-04-28", "weight": 5, "confidence": 0.97, "details": "Received sealed hardware case."},
        {"id": "E49", "source": "EVENT-03", "target": "PERSON-12", "type": "INVOLVED_IN", "timestamp": "2026-04-28", "weight": 4, "confidence": 0.93, "details": "Delivered package from warehouse."}
    ],
    "timeline_milestones": [
        {"month": "2026-01", "title": "Network Establishment", "description": "Initial registration of shell entities ORG-01/ORG-02, bank accounts ACC-01/ACC-02, and distribution of burner phones PHONE-01/PHONE-03.", "entity_count": 14, "edge_count": 18},
        {"month": "2026-02", "title": "Supply Route Activation", "description": "Fleet deployment with VEHICLE-01 & VEHICLE-04. Staging hub LOC-02 activated alongside safehouse LOC-04.", "entity_count": 22, "edge_count": 32},
        {"month": "2026-03", "title": "Port Interdiction Milestone", "description": "Event-01 occurs: Port Terminal interdiction reveals shipment irregularities linked to ORG-01. Encrypted sat comms PHONE-09 activated.", "entity_count": 26, "edge_count": 42},
        {"month": "2026-04", "title": "Apex Strategic Realignment", "description": "Event-02 high-level summit at LOC-07 with PERSON-01, PERSON-04, and PERSON-07. Safehouse night handover Event-03 observed.", "entity_count": 28, "edge_count": 48},
        {"month": "2026-05", "title": "Active Multi-Cluster Surveillance", "description": "Full triangulation across Financial (Cluster A), Field Logistics (Cluster B), and Encrypted Comms (Cluster C).", "entity_count": 28, "edge_count": 49}
    ]
}

# Synthetic Case 2 for Cross-Case Comparison
OPERATION_MERIDIAN_DATA: Dict[str, Any] = {
    "case_id": "CASE-MERIDIAN-2026",
    "name": "Operation Meridian",
    "codename": "MERIDIAN-ZX-14",
    "classification": "RESTRICTED // LAW ENFORCEMENT & INTEL USE ONLY",
    "status": "Targeting Phase",
    "start_date": "2026-02-15",
    "end_date": "2026-05-20",
    "lead_agency": "Border Enforcement Intelligence Unit",
    "description": "Counter-trafficking intelligence inquiry monitoring cross-border transit conduits, proxy freight forwarders, and shadow financiers.",
    "nodes": [
        # Shared & Cross-Case Entities
        {"id": "PERSON-07", "label": "Karan Malhotra (Alias: 'Nexus-7')", "type": "PERSON", "role": "Key Target / Strategic Link", "cluster": "Cross-Case Bridge", "first_observed": "2026-02-18", "last_observed": "2026-05-20", "confidence": 0.97, "notes": "IDENTICAL TARGET: Observed coordinating border transit manifests for Meridian group.", "risk_level": "CRITICAL - HIGH PRIORITY FOR REVIEW"},
        {"id": "PHONE-03", "label": "+91-98703-XX803 (Bridge Burner)", "type": "PHONE", "role": "Intercepted Comms Line", "cluster": "Shared Infrastructure", "first_observed": "2026-02-20", "last_observed": "2026-05-18", "confidence": 0.95, "notes": "IDENTICAL IDENTIFIER: Intercepted in CDR records of Operation Meridian targets.", "risk_level": "CRITICAL - HIGH PRIORITY FOR REVIEW"},
        {"id": "ORG-02", "label": "BluePeak Global Trading FZE", "type": "ORGANIZATION", "role": "Financial Laundering Conduit", "cluster": "Shared Shell Entity", "first_observed": "2026-02-25", "last_observed": "2026-05-15", "confidence": 0.94, "notes": "IDENTICAL SHELL COMPANY: Handled $1.8M in escrow invoices for Meridian consignments.", "risk_level": "HIGH PRIORITY FOR REVIEW"},
        {"id": "LOC-01", "label": "Port Cargo Terminal 4B", "type": "LOCATION", "role": "Shared Transshipment Point", "cluster": "Shared Facility", "first_observed": "2026-02-15", "last_observed": "2026-05-20", "confidence": 0.98, "notes": "IDENTICAL FACILITY: Both operations utilize Berth 4B for clearance.", "risk_level": "CRITICAL - HIGH PRIORITY FOR REVIEW"},
        {"id": "VEHICLE-04", "label": "Armored SUV (Reg: GJ-01-AX-9901)", "type": "VEHICLE", "role": "Surveillance Sighting", "cluster": "Shared Asset", "first_observed": "2026-03-01", "last_observed": "2026-05-19", "confidence": 0.93, "notes": "IDENTICAL ASSET: Photographed near Meridian border checkpoint staging area.", "risk_level": "HIGH PRIORITY FOR REVIEW"},

        # Meridian Specific Entities
        {"id": "PERSON-M01", "label": "Tariq Mansoor", "type": "PERSON", "role": "Border Transit Coordinator", "cluster": "Meridian Border Unit", "first_observed": "2026-02-15", "last_observed": "2026-05-18", "confidence": 0.91, "notes": "Coordinates cross-border freight routes in western sector.", "risk_level": "HIGH PRIORITY FOR REVIEW"},
        {"id": "PERSON-M02", "label": "Devraj Chauhan", "type": "PERSON", "role": "Security Liaison", "cluster": "Meridian Border Unit", "first_observed": "2026-02-20", "last_observed": "2026-05-10", "confidence": 0.85, "notes": "Provides escort and bribery channels for border crossings.", "risk_level": "MEDIUM PRIORITY FOR REVIEW"},
        {"id": "ORG-M01", "label": "Trans-Frontier Shipping Corp", "type": "ORGANIZATION", "role": "Border Freight Carrier", "cluster": "Meridian Border Unit", "first_observed": "2026-02-18", "last_observed": "2026-05-16", "confidence": 0.89, "notes": "Registered transport operator for western corridor.", "risk_level": "HIGH PRIORITY FOR REVIEW"},
        {"id": "LOC-M01", "label": "Border Checkpoint Transit Hub 9", "type": "LOCATION", "role": "Border Crossing Station", "cluster": "Meridian Border Unit", "first_observed": "2026-02-15", "last_observed": "2026-05-19", "confidence": 0.96, "notes": "Key chokepoint monitored by border intel units.", "risk_level": "CRITICAL - HIGH PRIORITY FOR REVIEW"}
    ],
    "edges": [
        {"id": "ME01", "source": "PERSON-M01", "target": "PERSON-07", "type": "WORKED_WITH", "timestamp": "2026-02-22", "weight": 5, "confidence": 0.95, "details": "Direct coordination on international transit paperwork."},
        {"id": "ME02", "source": "PERSON-07", "target": "PHONE-03", "type": "OWNED", "timestamp": "2026-02-20", "weight": 5, "confidence": 0.96, "details": "Burner phone utilized across both operations."},
        {"id": "ME03", "source": "PERSON-07", "target": "ORG-02", "type": "ASSOCIATED_WITH", "timestamp": "2026-02-25", "weight": 4, "confidence": 0.93, "details": "Offshore invoice settlements."},
        {"id": "ME04", "source": "PERSON-M01", "target": "ORG-M01", "type": "OWNED", "timestamp": "2026-02-18", "weight": 4, "confidence": 0.90, "details": "Registered operating manager."},
        {"id": "ME05", "source": "ORG-M01", "target": "LOC-M01", "type": "VISITED", "timestamp": "2026-02-28", "weight": 5, "confidence": 0.94, "details": "Weekly convoy clearances."},
        {"id": "ME06", "source": "PERSON-M02", "target": "LOC-M01", "type": "OBSERVED_AT", "timestamp": "2026-03-05", "weight": 4, "confidence": 0.88, "details": "Stationed near checkpoint barrier."},
        {"id": "ME07", "source": "VEHICLE-04", "target": "LOC-M01", "type": "VISITED", "timestamp": "2026-03-01", "weight": 4, "confidence": 0.92, "details": "Armored SUV spotted passing Checkpoint 9."},
        {"id": "ME08", "source": "ORG-02", "target": "LOC-01", "type": "ASSOCIATED_WITH", "timestamp": "2026-02-15", "weight": 4, "confidence": 0.91, "details": "Port shipping bills linked to BluePeak Trading."}
    ]
}

# Synthetic Ingestion & Entity Resolution Ambiguity Pairs
ENTITY_RESOLUTION_CANDIDATES: List[Dict[str, Any]] = [
    {
        "pair_id": "RES-01",
        "primary_entity": {
            "id": "PERSON-04",
            "name": "Arjun Nambiar",
            "type": "PERSON",
            "attributes": {"phone": "+91-98701-XX801", "role": "Senior Coordinator", "address": "Apex Heights Corporate Suite 902", "associated_case": "Operation Trident"}
        },
        "candidate_entity": {
            "id": "RAW-REC-9081",
            "name": "A. Nambiar (Alias: 'AN-Alpha')",
            "type": "PERSON",
            "attributes": {"phone": "+91-98701-XX801", "role": "Financial Officer", "address": "Suite 902, Apex Heights", "associated_case": "Unindexed Ingestion"}
        },
        "confidence": 0.94,
        "match_reasons": [
            "Exact Phone Number Match (+91-98701-XX801)",
            "High Name Fuzzy Similarity (92% Levenshtein)",
            "Identical Address Landmark (Apex Heights Suite 902)",
            "Overlapping Temporal Activity Window (Jan-May 2026)"
        ],
        "status": "PENDING_REVIEW"
    },
    {
        "pair_id": "RES-02",
        "primary_entity": {
            "id": "PERSON-21",
            "name": "Rahul Mehta",
            "type": "PERSON",
            "attributes": {"account": "ACC-02", "role": "Financial Associate", "location": "LOC-07", "associated_case": "Operation Trident"}
        },
        "candidate_entity": {
            "id": "RAW-REC-4412",
            "name": "R. Mehta",
            "type": "PERSON",
            "attributes": {"account": "ACC-02", "role": "Trading Associate", "location": "Corporate Suite 902", "associated_case": "Hawala Ledger Import"}
        },
        "confidence": 0.87,
        "match_reasons": [
            "Shared Financial Account Access (ACC-02 / Shell Invoicing)",
            "Initials and Surname Exact Match ('R. Mehta' == 'Rahul Mehta')",
            "Same Physical Workstation Access (LOC-07 / Apex Suite)",
            "Co-occurrence with Vikram Singhania (PERSON-01)"
        ],
        "status": "PENDING_REVIEW"
    },
    {
        "pair_id": "RES-03",
        "primary_entity": {
            "id": "VEHICLE-04",
            "name": "Armored SUV (Reg: GJ-01-AX-9901)",
            "type": "VEHICLE",
            "attributes": {"driver": "PERSON-07", "make": "Black Armored Land Cruiser", "associated_case": "Operation Trident"}
        },
        "candidate_entity": {
            "id": "RAW-REC-1092",
            "name": "Black SUV GJ-01-AX-9901 (Toll Plaza Log)",
            "type": "VEHICLE",
            "attributes": {"driver": "Karan M.", "make": "Armored SUV 4x4", "associated_case": "Highway ANPR Feed"}
        },
        "confidence": 0.98,
        "match_reasons": [
            "Exact License Plate Number Match (GJ-01-AX-9901)",
            "Driver Identity Resolution (Karan M. == Karan Malhotra / PERSON-07)",
            "ANPR Camera Timestamp Corroboration"
        ],
        "status": "PENDING_REVIEW"
    }
]
