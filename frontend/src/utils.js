import axios from "axios";

export const info = async () => {
  const responce = await axios.get("http://127.0.0.1:5000/status");
  return responce;
};

export const turn_off = async (id) => {
  const responce = await axios.get(`http://127.0.0.1:5000/${id}/turn_off`);
};

export const turn_on = async (id) => {
  const responce = await axios.get(`http://127.0.0.1:5000/${id}/turn_on`);
};

export const turn_off_all = async () => {
  const responce = await axios.get(`http://127.0.0.1:5000/`);
};
