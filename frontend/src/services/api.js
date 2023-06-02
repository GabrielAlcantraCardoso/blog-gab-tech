import axios from "axios";


const api = axios.create({
  baseURL: process.env.DASEURL
});

export default api;
