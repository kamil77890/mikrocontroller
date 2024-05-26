from flask import Flask, jsonify
import requests
import threading
import time
import logging


logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


class Device:
    def __init__(self, ip) -> None:
        self.ip = ip
        self.status = None
        self.last_connection = None

    def jsonify(self):
        return {"status": self.status, "time": self.last_connection, "ip": self.ip}


app = Flask(__name__)

devices = [Device("192.168.143.202")]


def update_status(devices: list[Device]):
    while True:
        for device in devices:
            response = requests.get(f"http://{device.ip}/")
            response_body: dict = response.json()
            status = response_body.get("status")
            
            curr_time = time.time()
            correct_time = time.ctime(curr_time)

            device.status = status
            device.last_connection = correct_time
            print("device is still working")

        time.sleep(10)


def turn_off_all(devices):
    for device in devices:
        response = requests.get(f"http://{device.ip}/turn_off")


@app.route("/")
def all():
    threading.Thread(target=turn_off_all, args=(devices,), daemon=True).start()
    return ("", 200)


@app.get("/<id>/<cmd>")
def turn_on(id: str, cmd: str):
    if cmd not in ["turn_on", "turn_off"]:
        return ("Unknown method", 422)

    id: int = int(id)

    response = requests.get(f"http://{devices[id].ip}/{cmd}")
    response_body: dict = response.json()

    status = response_body.get("status")
    time = response_body.get("time")

    devices[id].status = status
    devices[id].last_connection = time

    return ("", 200)


@app.get("/status")
def status():
    return jsonify([d.jsonify() for d in devices])


if __name__ == "__main__":
    threading.Thread(target=update_status, daemon=True, args=[devices]).start()
    app.run(debug=True)
