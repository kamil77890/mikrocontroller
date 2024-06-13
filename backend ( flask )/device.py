class Device:
    def __init__(self, id, ip, name) -> None:
        self.id = id
        self.ip = ip
        self.name = name
        self.status = None
        self.last_connection = None

    def jsonify(self):
        return {"status": self.status, "id": self.id, "name": self.name, "time": self.last_connection, "ip": self.ip}

    def update_ip(self, ip: str) -> None:
        self.ip = ip

    def update_name(self, name: str) -> None:
        self.name = name
