@echo off
REM AXIOM - Start Script for Windows
REM This script starts both the backend and serves the frontend

echo ============================================
echo   AXIOM - Algorithmic Trading Simulator
echo ============================================
echo.

set "SCRIPT_DIR=%~dp0"
set "PROJECT_DIR=%SCRIPT_DIR%.."
set "BACKEND_DIR=%PROJECT_DIR%\backend"
set "FRONTEND_DIR=%PROJECT_DIR%\frontend\dist"

REM Check if engine exists
set "ENGINE_PATH=%BACKEND_DIR%\Engine\engine.exe"
if not exist "%ENGINE_PATH%" (
    echo Engine not found at %ENGINE_PATH%
    echo.
    echo Please compile the engine first:
    echo   cd backend\Engine
    echo   g++ -std=c++17 -O2 -o engine.exe source\main.cpp source\MarketSimulator.cpp source\strategy.cpp -I include -I json
    echo.
    pause
    exit /b 1
) else (
    echo Engine found: %ENGINE_PATH%
)

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo Python is not installed or not in PATH!
    echo Please install Python 3: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Install Python dependencies if needed
if not exist "%BACKEND_DIR%\venv" (
    echo Creating Python virtual environment...
    cd "%BACKEND_DIR%"
    python -m venv venv
)

echo Installing Python dependencies...
cd "%BACKEND_DIR%"
call venv\Scripts\activate.bat
pip install -q -r requirements.txt

echo.
echo Starting AXIOM...
echo.

REM Start backend
echo Starting backend on http://localhost:8000
start "AXIOM Backend" cmd /k "cd /d "%BACKEND_DIR%" && call venv\Scripts\activate.bat && python app.py"

REM Wait for backend to start
timeout /t 3 /nobreak >nul

REM Serve frontend
echo Starting frontend on http://localhost:5173
cd "%FRONTEND_DIR%"
start "AXIOM Frontend" cmd /k "npm run dev"

echo.
echo ============================================
echo   AXIOM is running!
echo ============================================
echo.
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:8000
echo.
echo   API Status: http://localhost:8000/api/status
echo.
echo Press any key to stop all services...
pause >nul

REM Kill processes
taskkill /FI "WINDOWTITLE eq AXIOM Backend*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq AXIOM Frontend*" /F >nul 2>&1

echo.
echo Goodbye!
timeout /t 2 >nul
