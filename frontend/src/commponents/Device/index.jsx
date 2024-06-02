import "./Device.scss"

const Device = ({device, index, selectedDevice, setSelectedDevice, isDeviceActive}) => {
  const textStyle = isDeviceActive(device.time) ? {color: "#5e5"} : {color: "#e55"};
  return (
    <div key={index} className="device__item">
      <div className="devices__setup">
        <h2 className="name">{device.name}</h2>
        <p>
          {isDeviceActive(device.time) ? (
            <img
              className="img"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Green_medal_icon_blank.svg/2048px-Green_medal_icon_blank.svg.png"
              alt="Active" />
          ) : (
            <img
              className="img"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Red_x.svg/2048px-Red_x.svg.png"
              alt="Inactive" />
          )}
        </p>
      </div>
      <div className="status">{device.ip}</div>
      <span className="status" style={textStyle}>
      {isDeviceActive(device.time) ? "Connected" : "Not connected"}
    </span><button onClick={() => setSelectedDevice(selectedDevice ? null : device)} className="select">
        {selectedDevice ? "Deselect" : "Select"}
      </button>
    </div>
  );
};

export default Device;