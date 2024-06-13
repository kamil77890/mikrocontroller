from flask import Flask, jsonify, request
from flask_cors import CORS
import threading

from device import Device
from menager import devices, add_device, remove_device_by_ip, update_device_name_by_ip, turn_off_all, turn_on_all

app = Flask(__name__)
CORS(app)


@app.route('/register_ip', methods=['GET'])
def register_ip():
    ip_address = request.args.get('ip')
    if ip_address:
        new_device = Device(len(devices), ip_address, "Your device")
        add_device(new_device)
        return "", 200


@app.route("/off")
def all_turn_off():
    threading.Thread(target=turn_off_all, daemon=True).start()
    return "", 200


@app.route("/on")
def all_turn_on():
    threading.Thread(target=turn_on_all, daemon=True).start()
    return "", 200


@app.route("/<id>/<cmd>", methods=['GET'])
def control_device(id: str, cmd: str):
    if cmd not in ["turn_on", "turn_off"]:
        return jsonify({"error": "Unknown method"}), 422

    id = int(id)
    response = request.get(f"http://{devices[id].ip}/{cmd}")
    response_body = response.json()
    status = response_body.get("status")
    time = response_body.get("time")
    devices[id].status = status
    devices[id].last_connection = time
    return jsonify({"status": status, "time": time}), 200


@app.route("/status", methods=['GET'])
def status():
    return jsonify([d.jsonify() for d in devices])


@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json
    ip = data.get("ip")
    name = data.get("name")
    new_device = Device(len(devices), ip, name)
    add_device(new_device)
    return "", 200


@app.route('/api/changingName', methods=['POST'])
def edditing_data():
    data = request.json
    new_name = data.get("newName")
    ip = data.get("ip")
    update_device_name_by_ip(ip, new_name)
    return "", 200


@app.route('/api/deletingDevice', methods=['POST'])
def deleting_data():
    data = request.json
    remove_ip = data.get("ip")
    remove_device_by_ip(remove_ip)
    return "", 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
