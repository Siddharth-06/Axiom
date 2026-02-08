#!/bin/bash
<<<<<<< HEAD
=======
# AXIOM - Start Script for macOS
# This script starts both the backend and serves the frontend
>>>>>>> 10bb505 (serious meow)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend/dist"

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}  AXIOM - Algorithmic Trading Simulator${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

# Check if engine exists
ENGINE_PATH="$BACKEND_DIR/Engine/engine_mac"
if [ ! -f "$ENGINE_PATH" ]; then
    echo -e "${YELLOW}Engine not found at $ENGINE_PATH${NC}"
    echo -e "${YELLOW}Attempting to compile...${NC}"
    
    cd "$BACKEND_DIR/Engine"
    
    # Compile the engine
    g++ -std=c++17 -O2 -o engine_mac \
        source/main.cpp \
        source/MarketSimulator.cpp \
        source/strategy.cpp \
        -I include \
        -I json
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Engine compiled successfully!${NC}"
    else
        echo -e "${RED}Failed to compile engine!${NC}"
        echo "Please ensure you have g++ installed: xcode-select --install"
        exit 1
    fi
else
    echo -e "${GREEN}Engine found: $ENGINE_PATH${NC}"
fi

# Check Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Python 3 is not installed!${NC}"
    echo "Please install Python 3: https://www.python.org/downloads/"
    exit 1
fi

# Install Python dependencies if needed
if [ ! -d "$BACKEND_DIR/venv" ]; then
    echo -e "${YELLOW}Creating Python virtual environment...${NC}"
    cd "$BACKEND_DIR"
    python3 -m venv venv
fi

echo -e "${YELLOW}Installing Python dependencies...${NC}"
cd "$BACKEND_DIR"
source venv/bin/activate
pip install -q -r requirements.txt

echo ""
echo -e "${GREEN}Starting AXIOM...${NC}"
echo ""

# Start backend in background
echo -e "${BLUE}Starting backend on http://localhost:8000${NC}"
cd "$BACKEND_DIR"
python app.py &
BACKEND_PID=$!

# Give backend time to start
sleep 2

# Check if backend started successfully
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo -e "${RED}Failed to start backend!${NC}"
    exit 1
fi

echo -e "${GREEN}Backend started (PID: $BACKEND_PID)${NC}"
echo ""

# Serve frontend
echo -e "${BLUE}Starting frontend on http://localhost:5173${NC}"
cd "$FRONTEND_DIR"

# Try different methods to serve frontend
if command -v python3 &> /dev/null; then
    python3 -m http.server 5173 &
    FRONTEND_PID=$!
elif command -v npx &> /dev/null; then
    npx serve -l 5173 &
    FRONTEND_PID=$!
else
    echo -e "${YELLOW}No suitable server found. Please open frontend/dist/index.html manually.${NC}"
    FRONTEND_PID=""
fi

if [ -n "$FRONTEND_PID" ]; then
    echo -e "${GREEN}Frontend started (PID: $FRONTEND_PID)${NC}"
fi

echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  AXIOM is running!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo -e "  Frontend: ${BLUE}http://localhost:5173${NC}"
echo -e "  Backend:  ${BLUE}http://localhost:8000${NC}"
echo ""
echo -e "  API Status: ${BLUE}http://localhost:8000/api/status${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
echo ""

# Cleanup function
cleanup() {
    echo ""
    echo -e "${YELLOW}Shutting down...${NC}"
    if [ -n "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
    fi
    if [ -n "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    echo -e "${GREEN}Goodbye!${NC}"
    exit 0
}

trap cleanup INT TERM

# Wait for user to press Ctrl+C
wait
