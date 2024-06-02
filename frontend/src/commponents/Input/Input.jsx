import React, { useState } from "react";
import "./Input.scss";

const Input = () => {
  const [ip, setIp] = useState("192.168.");
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ip: ip, name: name }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="input-container">
      <h3>Add device</h3>
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
    </div>
  );
};

export default Input;
