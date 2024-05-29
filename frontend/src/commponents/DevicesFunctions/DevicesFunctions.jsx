import "./DevicesFunctions";
import { Turn_off, Turn_on } from "../../utils";

const DevicesFunctions = (props) => {
  const { id, name = "Device" } = props;
  return (
    <main>
      <div>
        <h1>{name}</h1>
        <h3>{id}</h3>
      </div>
      <div className="device__funtions">
        <button
          onClick={() => {
            Turn_off(id);
          }}
          className="id"
        >
          Turn off
        </button>
        <button
          onClick={() => {
            Turn_on(id);
          }}
          className="id"
        >
          Turn on
        </button>
      </div>
    </main>
  );
};

export default DevicesFunctions;
