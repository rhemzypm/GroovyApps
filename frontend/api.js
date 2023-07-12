import axios from "axios";

const api = axios.create({
  baseURL: "http://10.10.29.77:5001/v1/ga",
});

export default api;
