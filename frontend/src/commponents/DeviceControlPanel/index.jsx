import "./DeviceControlPanel.scss";
import { Turn_on, Turn_off } from "../../utils";
import { useState } from "react";

const DeviceControlPanel = ({ device }) => {
  const [newName, setNewName] = useState(device.name);

  const handleDeviceRename = async () => {
    const newDeviceName = prompt("Enter new device name");
    if (newDeviceName) {
      setNewName(newDeviceName);
      await fetch("http://localhost:5000/api/changingName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ip: device.ip, newName: newDeviceName }),
      });
    }
  };

  const handleRemoveDevice = async () => {
    await fetch("http://localhost:5000/api/deletingDevice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ip: device.ip }),
    });
  };

  return (
    <div className="control-panel" key={device.id}>
      <h2>{newName}</h2>
      <p>
        Status: {device.status ? `Connected (${device.ip})` : "Not connected"}
      </p>
      <p>Last Connection: {device.time ? device.time : "Unknown"}</p>
      <button onClick={() => Turn_off(device.id)}>Turn Off</button>
      <button onClick={() => Turn_on(device.id)}>Turn On</button>
      <div className="configuration">
        <h2>Device "{newName}" Configuration</h2>
        <button onClick={handleDeviceRename}>Rename</button>
        <button className="important" onClick={handleRemoveDevice}>
          Remove from list
        </button>
      </div>
    </div>
  );
};

export default DeviceControlPanel;
