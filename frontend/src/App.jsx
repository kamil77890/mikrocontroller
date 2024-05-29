import { useState } from "react";
import "./App.css";
import Devices from "./commponents/Devices";
import DevicesFunctions from "./commponents/DevicesFunctions";
import Input from "./commponents/Input/Input";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Input />
      <Devices />
      <DevicesFunctions id={0} />
    </div>
  );
}

export default App;
