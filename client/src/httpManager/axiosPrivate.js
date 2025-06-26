import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "http://192.168.1.20:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosPrivate;
