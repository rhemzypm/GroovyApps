import axios from "axios";

const api = axios.create({
  baseURL: "http://10.10.28.139:5000/v1/ga",
});

export default api;