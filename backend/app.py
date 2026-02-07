<<<<<<< HEAD
from flask import Flask, request, jsonify
=======
#!/usr/bin/env python3
"""
AXIOM - Algorithmic Trading Simulator Backend
Flask API that connects the React frontend to the C++ simulation engine.
"""

from flask import Flask, request, jsonify, send_from_directory
>>>>>>> 9dff4cf (meow)
from flask_cors import CORS
import json
import subprocess
import os
<<<<<<< HEAD
=======
import sys
>>>>>>> 9dff4cf (meow)

app = Flask(__name__)
CORS(app)

<<<<<<< HEAD
@app.route("/")
def home():
    return "Hello, server is running!"

@app.route("/simulate", methods=["POST"])
def simulate():
    if not request.is_json:
        return jsonify({"error": "Invalid JSON"}), 400

    
    data = request.json

    json_input = json.dumps(data)
    
    with open("input.json" , "w") as f:
        json.dump(data,f)

    exe_path = os.path.join(".", "Engine", "engine.exe") 
    
    if not os.path.exists(exe_path):
        exe_path = "./Engine/engine"

    try:
        print(f"Running engine at: {exe_path}")
        completed = subprocess.run(
            [exe_path],
            input=json_input,
            capture_output=True,
            text=True,
            check=True
        )

        engine_output = completed.stdout.strip()
    
        if not engine_output:
            return jsonify({"error": "Engine returned empty result", "stderr": completed.stderr}), 500

        parsed_result = json.loads(engine_output)
        print(parsed_result)
        return jsonify(parsed_result)
    
        

    except subprocess.CalledProcessError as e:
        print("C++ Error:", e.stderr)
        return jsonify({"error": "Simulation failed", "details": e.stderr}), 500
    except Exception as e:
        print("Server Error:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":  
    app.run(port=8000, debug=True)
=======
# Get the directory where this script is located
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
ENGINE_DIR = os.path.join(BACKEND_DIR, "Engine")

# Determine engine binary name based on platform
if sys.platform == "darwin":  # macOS
    ENGINE_BINARY = "engine_mac"
elif sys.platform == "win32":  # Windows
    ENGINE_BINARY = "engine.exe"
else:  # Linux
    ENGINE_BINARY = "engine_linux"

ENGINE_PATH = os.path.join(ENGINE_DIR, ENGINE_BINARY)


def find_engine():
    """Find the engine binary, trying various names."""
    global ENGINE_PATH
    
    
    if os.path.exists(ENGINE_PATH):
        return ENGINE_PATH
    
    
    for name in ["engine", "engine.exe", "engine_mac", "engine_linux"]:
        path = os.path.join(ENGINE_DIR, name)
        if os.path.exists(path):
            ENGINE_PATH = path
            return path
    
    return None


@app.route("/")
def home():
    
    return jsonify({
        "status": "AXIOM Backend is running",
        "engine_available": find_engine() is not None,
        "engine_path": ENGINE_PATH if find_engine() else "Not found"
    })


@app.route("/api/status")
def status():
    
    engine_path = find_engine()
    return jsonify({
        "backend": "running",
        "engine_available": engine_path is not None,
        "engine_path": engine_path,
        "platform": sys.platform
    })
@app.route("/about")
def meow():
    return "."

@app.route("/simulate", methods=["POST"])
def simulate():
    
    if not request.is_json:
        return jsonify({"error": "Invalid JSON", "details": "Content-Type must be application/json"}), 400
    
    data = request.json
    
    
    if "market" not in data:
        return jsonify({"error": "Missing field", "details": "'market' is required"}), 400
    if "strategy" not in data:
        return jsonify({"error": "Missing field", "details": "'strategy' is required"}), 400
    
    
    json_input = json.dumps(data)
    
    
    input_path = os.path.join(ENGINE_DIR, "input.json")
    try:
        with open(input_path, "w") as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"Warning: Could not save input.json: {e}")
    
    
    engine_path = find_engine()
    if not engine_path:
        return jsonify({
            "error": "Engine not found",
            "details": f"Engine binary not found in {ENGINE_DIR}. Please compile the engine first."
        }), 500
    
    try:
        
        print(f"Running engine: {engine_path}")
        
        completed = subprocess.run(
            [engine_path],
            input=json_input,
            capture_output=True,
            text=True,
            cwd=ENGINE_DIR,
            timeout=30 
        )
        
        
        if completed.returncode != 0:
            print(f"Engine error (code {completed.returncode}): {completed.stderr}")
            return jsonify({
                "error": "Simulation engine error",
                "details": completed.stderr or "Unknown engine error"
            }), 500
        
        engine_output = completed.stdout.strip()
        
        if not engine_output:
            return jsonify({
                "error": "Empty engine output",
                "details": "The engine returned no output"
            }), 500
        
        
        try:
            parsed_result = json.loads(engine_output)
        except json.JSONDecodeError as e:
            print(f"Invalid JSON from engine: {engine_output[:200]}")
            return jsonify({
                "error": "Invalid engine output",
                "details": f"Engine returned invalid JSON: {str(e)}",
                "raw_output": engine_output[:500]
            }), 500
        
        
        if "error" in parsed_result:
            return jsonify({
                "error": "Simulation failed",
                "details": parsed_result["error"]
            }), 500
        
        
        output_path = os.path.join(ENGINE_DIR, "output.json")
        try:
            with open(output_path, "w") as f:
                json.dump(parsed_result, f, indent=2)
        except Exception as e:
            print(f"Warning: Could not save output.json: {e}")
        
        print(f"Simulation completed: {parsed_result.get('metrics', {})}")
        return jsonify(parsed_result)
    
    except subprocess.TimeoutExpired:
        return jsonify({"error": "Simulation timeout", "details": "Engine took too long to respond"}), 500
    except Exception as e:
        print(f"Server error: {str(e)}")
        return jsonify({"error": "Server error", "details": str(e)}), 500


@app.route("/input.json")
def get_input():
    
    input_path = os.path.join(ENGINE_DIR, "input.json")
    if os.path.exists(input_path):
        return send_from_directory(ENGINE_DIR, "input.json")
    return jsonify({"error": "No input file found"}), 404


@app.route("/output.json")
def get_output():
    
    output_path = os.path.join(ENGINE_DIR, "output.json")
    if os.path.exists(output_path):
        return send_from_directory(ENGINE_DIR, "output.json")
    return jsonify({"error": "No output file found"}), 404


if __name__ == "__main__":
    print("=" * 60)
    print("AXIOM - Algorithmic Trading Simulator Backend")
    print("=" * 60)
    print(f"Platform: {sys.platform}")
    print(f"Engine directory: {ENGINE_DIR}")
    
    engine = find_engine()
    if engine:
        print(f"Engine found: {engine}")
    else:
        print("WARNING: Engine not found! Please compile it first.")
        print(f"  Looking for: engine, engine.exe, engine_mac, engine_linux")
        print(f"  In directory: {ENGINE_DIR}")
    
    print("-" * 60)
    print("Starting Flask server on http://localhost:8000")
    print("Press Ctrl+C to stop")
    print("=" * 60)
    
    app.run(host="0.0.0.0", port=8000, debug=True)
>>>>>>> 9dff4cf (meow)
