<<<<<<< HEAD
# AXIOM
## An Educational Algorithmic Trading Simulator

AXIOM is a simulation-first, educational platform designed to help users understand how algorithmic trading strategies behave under different market conditions — without real money, live markets, or black-box predictions.

The project focuses on learning and explainability, not profit or execution.

AXIOM is built as a modular system with a high-performance C++ core, a lightweight backend layer, and a modern frontend for visualization.

Disclaimer:  
AXIOM is strictly for educational purposes.  
It does not provide financial advice and does not execute real trades.

---

## Project Overview

Learning algorithmic trading today often requires advanced mathematics, heavy coding, or experimentation with real financial risk.

AXIOM addresses this gap by providing:
- synthetic market simulations
- deterministic and reproducible results
- parameterized, explainable strategies
- clear performance metrics

The goal is to help users understand why strategies behave the way they do, not to predict markets.
=======
# AXIOM - Complete Algorithmic Trading Simulator

A complete, ready-to-run algorithmic trading simulator with a polished React frontend, Flask backend, and high-performance C++ engine.

## What's Included

```
axiom-complete/
├── backend/                 # Flask backend
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   └── Engine/             # C++ simulation engine
│       ├── include/        # Header files (config.hpp, MarketSimulator.hpp, PriceSeries.hpp, strategy.hpp)
│       ├── source/         # Source files (main.cpp, MarketSimulator.cpp, strategy.cpp)
│       └── json/           # JSON library (json.hpp)
├── frontend/dist/          # React frontend (pre-built, ready to serve)
│   ├── index.html
│   └── assets/
├── scripts/
│   ├── compile_engine.sh   # Compile engine on macOS
│   ├── start_mac.sh        # One-command startup for macOS
│   └── start_windows.bat   # Windows startup
└── README.md               # This file
```

## Quick Start (macOS) - Just 2 Commands!

### Step 1: Compile the Engine (One-time)

```bash
cd axiom-complete
./scripts/compile_engine.sh
```

This will create `backend/Engine/engine_mac`.

### Step 2: Start Everything

```bash
./scripts/start_mac.sh
```

This will:
- Start the Flask backend on http://localhost:8000
- Serve the frontend on http://localhost:5173

### Step 3: Open Your Browser

Go to http://localhost:5173 and start trading!

---

## Manual Setup (if scripts don't work)

### 1. Compile the Engine

```bash
cd backend/Engine
g++ -std=c++17 -O2 -o engine_mac \
    source/main.cpp \
    source/MarketSimulator.cpp \
    source/strategy.cpp \
    -I include \
    -I json
```

### 2. Install Python Dependencies

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3. Start Backend

```bash
cd backend
source venv/bin/activate
python app.py
```

Backend will start on http://localhost:8000

### 4. Start Frontend (in a new terminal)

```bash
cd frontend/dist
python3 -m http.server 5173
```

Frontend will be available at http://localhost:5173

---

## Windows Setup

### 1. Compile the Engine

Install MinGW-w64 or Visual Studio, then:

```cmd
cd backend\Engine
g++ -std=c++17 -O2 -o engine.exe ^
    source\main.cpp ^
    source\MarketSimulator.cpp ^
    source\strategy.cpp ^
    -I include ^
    -I json
```

### 2. Install Python Dependencies

```cmd
cd backend
python -m venv venv
venv\Scripts\activate.bat
pip install -r requirements.txt
```

### 3. Run

Double-click `scripts/start_windows.bat` or run:

```cmd
cd scripts
start_windows.bat
```

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/api/status` | GET | Backend & engine status |
| `/simulate` | POST | Run simulation |
| `/input.json` | GET | Last simulation input |
| `/output.json` | GET | Last simulation output |

### POST /simulate

Request body:
```json
{
  "market": "Trending",
  "timesteps": 1000,
  "seed": 42,
  "strategy": {
    "buy": [
      {
        "lhs": "RSI",
        "op": "<",
        "rhs_type": "CONSTANT",
        "rhs_value": 30
      }
    ],
    "sell": [
      {
        "lhs": "RSI",
        "op": ">",
        "rhs_type": "CONSTANT",
        "rhs_value": 70
      }
    ]
  }
}
```

Response:
```json
{
  "prices": [100.0, 100.5, ...],
  "trades": [
    {"t": 52, "type": "BUY", "price": 98.5},
    {"t": 78, "type": "SELL", "price": 102.3, "pnl": 3.8}
  ],
  "metrics": {
    "total_pnl": 15.5,
    "num_trades": 12,
    "win_rate": 0.67,
    "max_drawdown": 5.2
  }
}
```

---

## Available Indicators

- `Price` - Current price
- `RSI` - Relative Strength Index (14-period)
- `MA` / `MA_SHORT` - Short moving average (20-period)
- `MA_LONG` - Long moving average (50-period)
- `VOLATILITY` - Price volatility (20-period)
- `VOLATILITY_MA` - Volatility moving average

## Market Regimes

- **Trending** - Upward drift with noise
- **Sideways** - Mean-stationary with noise
- **Mean Reversion** - Pulls back to mean of 100

---

## Troubleshooting

### "Engine not found"

Compile the engine first:
```bash
./scripts/compile_engine.sh
```

### "Permission denied"

Make scripts executable:
```bash
chmod +x scripts/*.sh
```

### "Module not found"

Install Python dependencies:
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### CORS errors

The backend already has CORS enabled. If you see CORS errors, make sure:
1. Backend is running on port 8000
2. You're accessing frontend via http://localhost:5173 (not file://)

### Port already in use

Change ports in:
- Backend: Edit `backend/app.py` (line 180)
- Frontend: Use `python -m http.server 5174` (different port)

---

## File Structure Details

### C++ Engine Files

**Headers (`backend/Engine/include/`):**
- `config.hpp` - Configuration struct
- `MarketSimulator.hpp` - Market simulation class
- `PriceSeries.hpp` - Price data container
- `strategy.hpp` - Strategy and condition definitions

**Source (`backend/Engine/source/`):**
- `main.cpp` - Main entry point, JSON I/O
- `MarketSimulator.cpp` - Market simulation logic
- `strategy.cpp` - Strategy validation

**Library (`backend/Engine/json/`):**
- `json.hpp` - nlohmann JSON library
>>>>>>> 9dff4cf (meow)

---

## Architecture

<<<<<<< HEAD
AXIOM follows a clean, layered architecture:

Frontend (React)  
↓  
Backend (Flask)  
↓  
C++ Simulation Engine  

- The C++ engine performs all simulation, strategy execution, and metric computation.
- The Flask backend acts as a thin orchestration layer that invokes the engine and returns results.
- The frontend focuses on interaction and visualization.

Each layer is independent and replaceable.

---

## Repository Structure

.
├── backend/
│   ├── Engine/
│   │   ├── include/              C++ headers
│   │   ├── source/               C++ source files
│   │   ├── engine                Compiled C++ binary
│   │   ├── input.json            Local test input
│   │   └── json/                 nlohmann/json library
│   │
│   ├── app.py                    Flask backend entry point
│   ├── input.json                Backend test input
│   ├── mockOutput.json
│   └── output.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   └── vite.config.js
│
└── README.md

---

## Core Features (Current State)

Simulation Engine:
- Synthetic market generation (trending, sideways)
- Deterministic simulations using seeded randomness
- Moving Average Crossover strategy
- Trade generation (BUY / SELL)
- Performance metrics:
  - Total PnL
  - Max drawdown
  - Win rate
  - Trade count

Strategy Design:
- Parameter-based configuration
- No strategy scripting
- No black-box models
- Fully explainable logic

---

## Example Input Format

The engine accepts a JSON configuration file.

{
  "market": "trending",
  "timesteps": 1000,
  "seed": 42,
  "strategy": {
    "type": "ma_crossover",
    "short_window": 20,
    "long_window": 50,
    "position_size": 1
  }
}

---

## How to Run the Project

### 1. Running the C++ Engine (Standalone)

Option A: Using Xcode

1. Open the Xcode project inside backend/Engine
2. Select the executable target
3. In Run Scheme → Arguments, add:
   input.json
4. Set the Working Directory to:
   backend/Engine
5. Run the project

The engine will print JSON output to the console.

Option B: Using Terminal

cd backend/Engine  
./engine input.json

---

### 2. Running the Flask Backend

From the repository root:

cd backend

Create and activate a virtual environment:

python3 -m venv venv  
source venv/bin/activate

Install dependencies:

pip install flask

Run the backend:

python app.py

The backend server will start locally (typically on port 5000).

---

### 3. Running the Frontend

cd frontend  
npm install  
npm run dev

Open the URL shown in the terminal (usually http://localhost:5173).
=======
```
┌─────────────┐     HTTP      ┌─────────────┐     Pipe      ┌─────────────┐
│   React     │ ────────────> │    Flask    │ ────────────> │   C++       │
│  Frontend   │               │   Backend   │               │   Engine    │
│  (port 5173)│ <──────────── │  (port 8000)│ <──────────── │             │
└─────────────┘    JSON       └─────────────┘    JSON       └─────────────┘
```
>>>>>>> 9dff4cf (meow)

---

## Team

<<<<<<< HEAD
AXIOM is built by a team of undergraduate engineers with interests in:
- systems programming
- quantitative finance
- simulation-based learning

---

## Disclaimer

AXIOM is an educational simulation platform.  
It does not provide financial advice, investment recommendations, or real trading functionality.
=======
- **Siddharth** - Project Lead & Engine Developer
- **Manas Agrawal** - Frontend & UI Developer  
- **Qafirnaal** - Backend & Integration

## License

Educational use only. Not for real trading.

## Support

For issues, visit: https://github.com/Siddharth-06/AXIOM---algo-trading-sandbox
>>>>>>> 9dff4cf (meow)
