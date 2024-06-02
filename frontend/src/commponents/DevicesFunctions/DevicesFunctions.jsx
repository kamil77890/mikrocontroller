import React, { useEffect, useState } from "react";
import {
  Info,
  Turn_off,
  Turn_on,
  Turn_off_all,
  Turn_on_all,
} from "../../utils";
import "./DevicesFunctions.scss";
import DeviceControlPanel from "../DeviceControlPanel";

const DevicesFunctions = ({ device }) => {
  return (
    <>
      <div className="functions">
        <button onClick={Turn_off_all}>Turn Off All</button>
        <button onClick={Turn_on_all}>Turn On All</button>
      </div>
      {device ? (
        <DeviceControlPanel device={device} />
      ) : (
        "Select a device to show more options"
      )}
    </>
  );
};

export default DevicesFunctions;
