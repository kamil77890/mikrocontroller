import React, { useEffect, useState } from "react";
import {
  Info,
  Turn_off,
  Turn_on,
  Turn_off_all,
  Turn_on_all,
} from "../../utils";

const DevicesFunctions = ({ device }) => {
  return (
    <div>
      <button onClick={Turn_off_all}>Turn Off All</button>
      <button onClick={Turn_on_all}>Turn On All</button>
      {device ? (
        <div key={device.id}>
          <h3>{device.name}</h3>
          <p>Status: {device.status}</p>
          <p>Last Connection: {device.time}</p>
          <button onClick={() => Turn_off(device.id)}>Turn Off</button>
          <button onClick={() => Turn_on(device.id)}>Turn On</button>
        </div>
      ) : (
        "No device found..."
      )}
    </div>
  );
};

export default DevicesFunctions;
