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
        self.uptime = None
        self.status = None

    def jsonify(self):
        return {"status": self.status, "uptime": self.uptime, "ip": self.ip}


app = Flask(__name__)

devices = [Device("192.168.143.202")]


def update_status(devices: list[Device]):
    while True:
        for device in devices:
            logger.debug(f"Updating status for {device.ip}")
            response = requests.get(f"http://{device.ip}/")
            response_body: dict = response.json()
            uptime = response_body.get("uptime")
            status = response_body.get("status")

            device.uptime = uptime
            device.status = status
            print("device is still working")

        time.sleep(10)


def turn_off_all(devices):
    for device in devices:
        response = requests.get(f"http://{device.ip}/turn_off")
        if response.status_code != 200:
            print(f"Failed to turn off device at {device.ip}")


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

    uptime = response_body.get("uptime")
    status = response_body.get("status")

    devices[id].uptime = uptime
    devices[id].status = status

    return ("", 200)


@app.get("/status")
def status():
    return jsonify([d.jsonify() for d in devices])


if __name__ == "__main__":
    threading.Thread(target=update_status, daemon=True, args=[devices]).start()
    app.run(debug=True)
