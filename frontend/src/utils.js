import axios from "axios";

export const Info = async () => {
  const response = await axios.get("http://127.0.0.1:5000/status");
  return response;
};

export const Turn_off = async (id) => {
  const response = await axios.get(`http://127.0.0.1:5000/${id}/turn_off`);
};

export const Turn_on = async (id) => {
  const response = await axios.get(`http://127.0.0.1:5000/${id}/turn_on`);
};

export const Turn_off_all = async () => {
  const response = await axios.get(`http://127.0.0.1:5000/off`);
};

export const Turn_on_all = async () => {
  const response = await axios.get(`http://127.0.0.1:5000/on`);
};

