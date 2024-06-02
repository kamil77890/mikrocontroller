export const Device = ({device, index, setSelectedDevice, isDeviceActive}) => {
  return (
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
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Red_x.svg/2048px-Red_x.svg.png"
              alt="Inactive"
            />
          )}
        </p>
      </div>
      <span className="status">
        {isDeviceActive(device.time) ? "Connected" : "Not connected"}
      </span>
      <button onClick={() => setSelectedDevice(device)} className="ip">
        {device.ip}
      </button>
    </div>
  );
};