// import { USER_JWT_TOKEN } from "@/utils/const/cookie";
import axios from "axios";
// import Cookies from "js-cookie";

// const token = Cookies.get(USER_JWT_TOKEN);
const token = "";

const ApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
});

ApiClient.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

ApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response && error.response.status === 401) {
      //   Cookies.remove(USER_JWT_TOKEN);
    }
    return Promise.reject(error);
  }
);

export default ApiClient;
