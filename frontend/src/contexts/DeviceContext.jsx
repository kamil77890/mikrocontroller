import React, { createContext, useContext, useState } from 'react';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);

  return (
    <DeviceContext.Provider value={{ devices, setDevices }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => {
    return useContext(DeviceContext);
}