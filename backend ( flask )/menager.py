import requests
import time
from threading import Thread

from device import Device


class Devices:
    def __init__(self) -> None:
        self.devices = []


def add_device(device: Device, devices: Devices) -> None:
    devices.devices.append(device)


def remove_device_by_ip(ip: str, devices: Devices) -> None:
    initial_len = len(devices.devices)
    devices = [device for device in devices.devices if device.ip != ip]
    print(devices.devices)
    print("Działa")
    return len(devices.devices) < initial_len


def find_device_by_ip(ip: str, devices: Devices) -> any:
    for device in devices.devices:
        if device.ip == ip:
            return device
    return None


def update_device_name_by_ip(ip: str, new_name: str, devices: Devices) -> None:
    device = find_device_by_ip(ip)
    if device:
        device.update_name(new_name)
        return True
    return False


def update_status(devices: Devices) -> None:
    while True:
        for device in devices.devices:
            response = requests.get(f"http://{device.ip}/")
            response_body = response.json()
            status = response_body.get("status")
            curr_time = time.time()
            correct_time = time.ctime(curr_time)
            device.status = status
            device.last_connection = correct_time
            print("device is still working")
        time.sleep(2)


def turn_off_all(devices: Devices) -> None:
    for device in devices.devices:
        requests.get(f"http://{device.ip}/turn_off")


def turn_on_all(devices: Devices) -> None:
    for device in devices.devices:
        requests.get(f"http://{device.ip}/turn_on")


status = Thread(target=update_status, daemon=True).start()
