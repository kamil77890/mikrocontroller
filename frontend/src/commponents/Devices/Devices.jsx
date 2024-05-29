import "./Devices.scss";
import { Info } from "../../utils";
import { useState, useEffect } from "react";
import DevicesFunctions from "../DevicesFunctions";

const Devices = () => {
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
        {devices.map((device, index) => (
          <div key={index} className="devices__item">
            <div className="devices__setup">
              <h2 className="name">{device.name}</h2>
              <p>
                {device.status ? (
                  <img
                    className="img"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Green_medal_icon_blank.svg/2048px-Green_medal_icon_blank.svg.png"
                    alt="Active"
                  />
                ) : (
                  <img
                    className="img"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Red_sphere_shaded_lightsource_top_right.svg/1024px-Red_sphere_shaded_lightsource_top_right.svg.png"
                    alt="Inactive"
                  />
                )}
              </p>
            </div>
            <span className="status">
              {isDeviceActive(device.time) ? "Conected" : "Disconnected..."}
            </span>
            <button
              onClick={(index) => {
                DevicesFunctions(index, device.name);
              }}
              className="ip"
            >
              {device.ip}
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Devices;
