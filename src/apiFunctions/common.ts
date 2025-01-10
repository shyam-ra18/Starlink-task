import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.spacexdata.com/v4",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
