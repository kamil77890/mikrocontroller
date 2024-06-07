from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import requests
import threading
import time
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


class Device:
    def __init__(self, id, ip, name) -> None:
        self.id = id
        self.ip = ip
        self.name = name
        self.status = None
        self.last_connection = None

    def jsonify(self):
        return {"status": self.status, "id": self.id, "name": self.name, "time": self.last_connection, "ip": self.ip}


app = Flask(__name__)
CORS(app)

devices = []


def update_status(devices: list[Device]):
    while True:
        for device in devices:
            try:
                response = requests.get(f"http://{device.ip}/")
                response_body = response.json()
                status = response_body.get("status")

                curr_time = time.time()
                correct_time = time.ctime(curr_time)

                device.status = status
                device.last_connection = correct_time
                print("device is still working")
            except Exception as e:
                logger.error(
                    f"Error updating status for device {device.ip}: {e}")

        time.sleep(10)


def turn_off_all(devices):
    for device in devices:
        try:
            response = requests.get(f"http://{device.ip}/turn_off")
        except Exception as e:
            logger.error(f"Error turning off device {device.ip}: {e}")


def turn_on_all(devices):
    for device in devices:
        try:
            response = requests.get(f"http://{device.ip}/turn_on")
        except Exception as e:
            logger.error(f"Error turning on device {device.ip}: {e}")


@app.route("/off")
def all_turn_off():
    threading.Thread(target=turn_off_all, args=(devices,), daemon=True).start()
    return ("", 200)


@app.route("/on")
def all_turn_on():
    threading.Thread(target=turn_on_all, args=(devices,), daemon=True).start()
    return ("", 200)


@app.get("/<id>/<cmd>")
def control_device(id: str, cmd: str):
    if cmd not in ["turn_on", "turn_off"]:
        return ("Unknown method", 422)

    id = int(id)

    try:
        response = requests.get(f"http://{devices[id].ip}/{cmd}")
        response_body = response.json()

        status = response_body.get("status")
        time = response_body.get("time")

        devices[id].status = status
        devices[id].last_connection = time

        return ("", 200)
    except Exception as e:
        logger.error(f"Error controlling device {id}: {e}")
        return ("Error", 500)


@app.get("/status")
def status():
    return jsonify([d.jsonify() for d in devices])


@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json
    ip = data.get("ip")
    name = data.get("name")

    devices.append(Device(len(devices), ip, name))

    return ("", 200)


if __name__ == "__main__":
    threading.Thread(target=update_status, daemon=True, args=[devices]).start()
    app.run(debug=True, port=5000)
