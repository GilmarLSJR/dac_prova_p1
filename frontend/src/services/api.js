import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // ajustar se o backend rodar em outra porta
});

export default api;
