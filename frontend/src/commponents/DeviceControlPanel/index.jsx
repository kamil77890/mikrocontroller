import "./DeviceControlPanel.scss";
import { Turn_on, Turn_off } from "../../utils";

const DeviceControlPanel = ({ device }) => {
  const handleDeviceRename = () => {
    const newName = prompt("Enter new device name");
    if (newName) {
      console.log(newName);
    }
  };
  return (
    <div className="control-panel" key={device.id}>
<<<<<<< HEAD
      <h2>{device.name}</h2>
=======
      <h3>{device.name ? device.name : "Device"}</h3>
>>>>>>> df3c37703e442c952c13cf1aa83335b88e8d8421
      <p>
        Status: {device.status ? `Connected (${device.ip})` : "Not connected"}
      </p>
      <p>Last Connection: {device.time ? device.time : "Unknown"}</p>
      <button onClick={() => Turn_off(device.id)}>Turn Off</button>
      <button onClick={() => Turn_on(device.id)}>Turn On</button>
      <div className="configuration">
        <h2>Device "{device.name}" Configuration</h2>
        <button onClick={() => handleDeviceRename()}>Rename</button>
        <button className="important" onClick={() => {}}>
          Remove from list
        </button>
      </div>
    </div>
  );
};

export default DeviceControlPanel;
