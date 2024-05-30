import { useState } from "react";
import "./App.css";
import Devices from "./commponents/Devices";
import DevicesFunctions from "./commponents/DevicesFunctions";
import Input from "./commponents/Input";

function App() {
  const [selectedDevice, setSelectedDevice] = useState(null);

  return (
    <div>
      <Input />
      <Devices setSelectedDevice={setSelectedDevice} />
      <DevicesFunctions device={selectedDevice} />
    </div>
  );
}

export default App;
