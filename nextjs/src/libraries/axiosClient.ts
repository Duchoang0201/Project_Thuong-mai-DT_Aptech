import axios from "axios";
import { API_URL } from "../contants/URLS";
import { message } from "antd";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST
axiosClient.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] =
        "Bearer " + window.localStorage.getItem("token");
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// RESPONSE

axiosClient.interceptors.response.use(
  async (response) => {
    const { token, refreshToken } = response.data;
    // LOGIN
    if (token) {
      window?.localStorage?.setItem("token", token);
    }
    if (refreshToken) {
      window?.localStorage?.setItem("refreshToken", refreshToken);
    }

    return response;
  },
  async (error) => {
    if (error?.response?.status !== 401) {
      return Promise.reject(error);
    }
    if (
      error?.response?.status === 401 &&
      (error?.response?.data?.message === "refreshToken is not a valid Token" ||
        error?.response?.data?.message === "refreshToken and id's not match!")
    ) {
      localStorage.clear();
      setTimeout(() => {
        message.info("Please login !!!", 1.5);

        // window.location.href = "/";
      }, 3000);
    }

    const originalConfig = error.config;

    if (error?.response?.status === 401 && !originalConfig.sent) {
      console.log("Error 🚀", error);
      originalConfig.sent = true;
      try {
        // Trường hợp không có token thì chuyển sang trang LOGIN
        const token = window.localStorage.getItem("token");
        if (!token) {
          // message.error("Account's not found", 1.5);

          // window.location.href = "/";
          return Promise.reject(error);
        }

        const refreshToken = window.localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axiosClient.post("/customers/refreshToken", {
            refreshToken: refreshToken,
          });

          const { token } = response.data;
          window.localStorage.setItem("token", token);

          originalConfig.headers = {
            ...originalConfig.headers,
            Authorization: `Bearer ${token}`,
          };
          message.info("System reload", 1.5);

          return axiosClient(originalConfig);
        } else {
          return Promise.reject(error);
        }
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
);

export { axiosClient };
