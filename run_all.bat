@echo off
echo ==============================================================================
echo                 STARTING NETRA INTELLIGENCE WORKSTATION
echo ==============================================================================
echo [1/2] Starting Python FastAPI Backend on http://127.0.0.1:8000 ...
start "NETRA Backend API (FastAPI)" cmd /k "python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 2 >nul

echo [2/2] Starting Vite React Frontend on http://127.0.0.1:5180 ...
start "NETRA Frontend (React + Vite)" cmd /k "cd frontend && npm run dev -- --host 127.0.0.1 --port 5180"

echo ==============================================================================
echo NETRA System started successfully!
echo - Frontend: http://127.0.0.1:5180
echo - Backend:  http://127.0.0.1:8000
echo - API Docs: http://127.0.0.1:8000/docs
echo ==============================================================================
timeout /t 3 >nul
start http://127.0.0.1:5180
