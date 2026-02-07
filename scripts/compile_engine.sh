#!/bin/bash
# AXIOM - Engine Compilation Script for macOS

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENGINE_DIR="$SCRIPT_DIR/../backend/Engine"

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}  AXIOM Engine Compiler${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

cd "$ENGINE_DIR"

echo -e "${YELLOW}Compiling engine for macOS...${NC}"
echo ""

# Check for g++
if ! command -v g++ &> /dev/null; then
    echo -e "${RED}g++ not found!${NC}"
    echo "Please install Xcode Command Line Tools:"
    echo "  xcode-select --install"
    exit 1
fi

echo "Compiler: $(g++ --version | head -1)"
echo ""

# Compile
g++ -std=c++17 -O2 -o engine_mac \
    source/main.cpp \
    source/MarketSimulator.cpp \
    source/strategy.cpp \
    -I include \
    -I json

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}============================================${NC}"
    echo -e "${GREEN}  Compilation successful!${NC}"
    echo -e "${GREEN}============================================${NC}"
    echo ""
    echo "Engine binary: $ENGINE_DIR/engine_mac"
    echo ""
    echo -e "${YELLOW}To start AXIOM, run:${NC}"
    echo "  ./scripts/start_mac.sh"
else
    echo ""
    echo -e "${RED}============================================${NC}"
    echo -e "${RED}  Compilation failed!${NC}"
    echo -e "${RED}============================================${NC}"
    exit 1
fi
