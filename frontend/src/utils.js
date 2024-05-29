import axios from "axios";

export const Info = async () => {
  const responce = await axios.get("http://127.0.0.1:5000/status");
  return responce;
};

export const Turn_off = async (id) => {
  const responce = await axios.get(`http://127.0.0.1:5000/${id}/turn_off`);
};

export const Turn_on = async (id) => {
  const responce = await axios.get(`http://127.0.0.1:5000/${id}/turn_on`);
};

export const Turn_off_all = async () => {
  const responce = await axios.get(`http://127.0.0.1:5000/off`);
};

export const Turn_on_all = async () => {
  const responce = await axios.get(`http://127.0.0.1:5000/on`);
};
