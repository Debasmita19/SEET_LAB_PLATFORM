import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // or your backend URL
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Automatically handle invalid token errors
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.message === "Invalid token.") {
      localStorage.clear();
      window.location.href = "/choose-role?action=login"; // or "/instructor/login" based on role
    } 
    return Promise.reject(err);
  }
);

export default API;
