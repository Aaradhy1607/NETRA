# 👁️ NETRA — AI-Powered Criminal Network Analysis & Intelligence Platform

> **NETRA** (*Network Entity Tracking & Relational Analytics*) is an advanced, AI-driven intelligence workstation and graph analytics platform designed for law enforcement, intelligence agencies, and forensic analysts to detect, visualize, and dismantle complex criminal and financial syndicate networks.

---

## 🌟 Key Features

### 🕸️ 1. Interactive Graph Intelligence & Network Analytics
- **Dynamic Topology Visualization**: Force-directed, hierarchical, and cluster views of multi-layer criminal networks.
- **Graph Centrality Metrics**: Real-time algorithmic computation of Degree Centrality, Betweenness Centrality, Closeness, and Eigenvector metrics.
- **Bridge & Conduit Node Detection**: Automatically pinpoint critical broker nodes connecting disconnected sub-syndicates.

### 🧠 2. Autonomous AI Investigation Copilot
- **Natural Language Intelligence Queries**: Ask contextual queries like *"Identify the primary financier across Operation Trident"* or *"Show high-risk conduits"*.
- **Multi-Hop Reasoning**: Autonomous chain-of-thought analysis linking entities across phone calls, financial transactions, shell corporations, and geolocation hops.
- **Evidence Chain Verification**: Generate verifiable, traceable links between suspects and illegal operations.

### 👥 3. Probabilistic Entity Resolution & Deduplication
- **Fuzzy Identity Matching**: Resolve disguised identities across aliases, shared phone numbers, burner SIMs, and bank accounts.
- **Analyst-in-the-Loop Decisions**: Review confidence scores and execute `MERGE`, `KEEP_SEPARATE`, or `FLAG_REVIEW` actions.

### 🔒 4. Cryptographic Forensic Audit Trail
- **Tamper-Evident SHA-256 Ledger**: Every analyst action, node manipulation, and AI query is cryptographically signed and logged.
- **Chain of Custody**: Ensures evidence integrity and legal compliance for investigative dossiers.

### 📄 5. Court-Ready Intelligence Dossier Generation
- **Automated Report Engine**: Export structured, comprehensive intelligence summaries with executive overviews, key actor profiles, evidence matrices, and risk scores.

### 🎯 6. Guided Interactive Demo Flow
- Built-in walkthrough scenarios (*Operation Trident*, *Operation Meridian*) showcasing end-to-end investigation workflows.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 + Glassmorphic Cyber-Intelligence UI
- **Icons & Visuals**: Lucide React, Canvas Confetti

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Graph Engine**: Network Analytics & Centrality Engine
- **Server**: Uvicorn ASGI
- **Data Validation**: Pydantic v2

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18 or higher) & **npm**
- **Python** (v3.10 or higher) & **pip**
- **Git**

---

### Option A: One-Click Launch (Windows)
Run the automated batch script to start both backend and frontend servers simultaneously:

```cmd
run_all.bat
```

---

### Option B: Manual Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/Aaradhy1607/NETRA.git
cd NETRA
```

#### 2. Backend Setup
```bash
# Navigate to backend directory (or run from root)
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
# source .venv/bin/activate

# Install dependencies
pip install fastapi uvicorn pydantic

# Start FastAPI server
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
*Backend will be live at:* `http://127.0.0.1:8000`  
*Swagger API Docs:* `http://127.0.0.1:8000/docs`

#### 3. Frontend Setup
```bash
cd frontend

# Install Node packages
npm install

# Start Vite development server
npm run dev -- --host 127.0.0.1 --port 5180
```
*Frontend will be live at:* `http://127.0.0.1:5180`

---

## 📁 Repository Structure

```
NETRA/
├── backend/
│   ├── agent/                 # AI Investigation Agent logic
│   ├── data/                  # Synthetic case datasets (Operation Trident, Meridian)
│   ├── graph/                 # Graph analytics & centrality algorithms
│   ├── main.py                # FastAPI endpoints & CORS configuration
│   └── test_system.py         # Backend automated test suite
├── frontend/
│   ├── public/                # Static assets & icons
│   ├── src/
│   │   ├── components/        # GraphCanvas, IntelligencePanels, DemoController
│   │   ├── App.tsx            # Main intelligence dashboard layout
│   │   └── main.tsx           # React entrypoint
│   ├── package.json           # Frontend dependencies & scripts
│   └── vite.config.ts         # Vite configuration
├── .gitignore                 # Excludes node_modules, cache, & artifacts
├── README.md                  # Project documentation
└── run_all.bat                # Automated multi-process startup script
```

---

## 🧪 Running Tests

To verify backend services and intelligence engines:
```bash
python -m backend.test_system
```

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author
- **Aaradhya** — [@Aaradhy1607](https://github.com/Aaradhy1607)
