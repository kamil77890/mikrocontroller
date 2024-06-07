import "./DeviceControlPanel.scss";
import { Turn_on, Turn_off } from "../../utils";

const DeviceControlPanel = ({ device }) => {
  return (
    <div className="control-panel" key={device.id}>
      <h3>{device.name}</h3>
      <p>
        Status: {device.status ? `Connected (${device.ip})` : "Not connected"}
      </p>
      <p>Last Connection: {device.time ? device.time : "Unknown"}</p>
      <button onClick={() => Turn_off(device.id)}>Turn Off</button>
      <button onClick={() => Turn_on(device.id)}>Turn On</button>
    </div>
  );
};

export default DeviceControlPanel;
