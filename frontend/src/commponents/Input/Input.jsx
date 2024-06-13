import React, { useState, useEffect } from "react";
import "./Input.scss";
import Communicator from "../Communicator";

const Input = () => {
  const [ip, setIp] = useState("");
  const [name, setName] = useState("");
  const [communicator, setCommunicator] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name.length > 5 && ip) {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ip: ip, name: name }),
      });
      setCommunicator(true);
    }
  };

  useEffect(() => {
    let communicatorTimeout;
    if (communicator) {
      communicatorTimeout = setTimeout(() => {
        setCommunicator(false);
      }, 5000);
    }

    return () => {
      clearTimeout(communicatorTimeout);
    };
  }, [communicator]);

  return (
    <div className="input-container">
      <h2>Add device</h2>
      <form method="post" action="/submit" id="inputForm"></form>
      <input
        className="input-field"
        type="text"
        placeholder="IP address"
        id="ip"
        name="ip"
        value={ip}
        onChange={(e) => {
          setIp(e.target.value);
        }}
      />
      <input
        className="input-field"
        type="text"
        placeholder="Device name"
        id="name"
        name="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button className="button" onClick={handleSubmit}>
        Add
      </button>
      {communicator ? <Communicator ip={ip} name={name} /> : ""}
    </div>
  );
};

export default Input;
