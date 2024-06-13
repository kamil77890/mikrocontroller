import "./Communicator.scss";

const Communicator = ({ name, ip }) => {
  return (
    <div className="Communicator">
      <h1>Device succesfully added!</h1>
      <h2>Current Data:</h2>
      <div className="deviceData">
        <span>Device name: {name}</span>
        <h3>
          <span>Device ip: {ip}</span>
        </h3>
      </div>
    </div>
  );
};

export default Communicator;
