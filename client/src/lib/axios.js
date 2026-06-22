import axios from "axios";
import { API_URL } from "../utils/env";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// api.interceptors.response.use((response) => response,(error) => {
//     console.log("Interceptor Error:", error?.response?.data);

//     if (error?.response?.data?.logout) {
//       console.log("Logging out user");

//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );



api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use((response) => response,(error) => {
    if (error.response?.status === 401 || error?.response?.data?.logout) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;