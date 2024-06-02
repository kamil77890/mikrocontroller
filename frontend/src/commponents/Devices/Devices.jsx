import "./Devices.scss";
import { Info } from "../../utils";
import { Device } from "../Device";
import { useState, useEffect } from "react";

const Devices = ({ setSelectedDevice }) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      Info().then((res) => {
        setDevices(res.data);
      });
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const isDeviceActive = (deviceTime) => {
    const currentTime = Date.now() / 1000;
    const deviceLastSeenTime = new Date(deviceTime).getTime() / 1000;
    return currentTime - deviceLastSeenTime < 11;
  };

  return (
    <aside className="devices">
      <h1>Devices</h1>
      <div className="devices__list">
        {devices.map((device, index) => {
          <Device
            device={device}
            index={index}
            setSelectedDevice={setSelectedDevice}
            isDeviceActive={isDeviceActive}
          />;
        })}
      </div>
    </aside>
  );
};

export default Devices;
