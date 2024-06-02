import { useState } from "react";
import "./App.css";
import Devices from "./commponents/Devices";
import DevicesFunctions from "./commponents/DevicesFunctions";
import Input from "./commponents/Input";
import { DeviceProvider } from "./contexts/DeviceContext";

function App() {
  const [selectedDevice, setSelectedDevice] = useState(null);

  return (
    <DeviceProvider>
      <Input />
      <Devices setSelectedDevice={setSelectedDevice} />
      <DevicesFunctions device={selectedDevice} />
    </DeviceProvider>
  );
}

export default App;
