from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import subprocess
import os

app = Flask(__name__)
CORS(app)

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
