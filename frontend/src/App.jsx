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
      <Devices
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
      />
      <main>
        <Input />
        <DevicesFunctions device={selectedDevice} />
      </main>
    </DeviceProvider>
  );
}

export default App;
