import requests
import time
from threading import Thread

from device import Device

devices = []


def add_device(device: Device) -> None:
    devices.append(device)


def remove_device_by_ip(ip: str):
    global devices
    initial_len = len(devices)
    devices = [device for device in devices if device.ip != ip]
    print(devices)
    print("Dziła")
    return len(devices) < initial_len


def find_device_by_ip(ip: str):
    for device in devices:
        if device.ip == ip:
            return device
    return None


def update_device_name_by_ip(ip: str, new_name: str):
    device = find_device_by_ip(ip)
    if device:
        device.update_name(new_name)
        return True
    return False


def update_status():
    while True:
        for device in devices:
            response = requests.get(f"http://{device.ip}/")
            response_body = response.json()
            status = response_body.get("status")
            curr_time = time.time()
            correct_time = time.ctime(curr_time)
            device.status = status
            device.last_connection = correct_time
            print("device is still working")
        time.sleep(5)


def turn_off_all():
    for device in devices:
        requests.get(f"http://{device.ip}/turn_off")


def turn_on_all():
    for device in devices:
        requests.get(f"http://{device.ip}/turn_on")


status = Thread(target=update_status, daemon=True).start()
