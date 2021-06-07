import axios from "axios";

const API_URL = "https://backend-humanista.herokuapp.com/api";

let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).accessToken
  : "";

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const axiosURL = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
    "Acess-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});

export default axiosURL;
