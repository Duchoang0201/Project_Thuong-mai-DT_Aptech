import axios from "axios";
import { API_URL } from "../contants/URLS";
import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "./optionLocalStorage";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const axiosAuth = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// // REQUEST
// axiosClient.interceptors.request.use(
//   (config) => {
//     const token = getLocalStorage("token");
//     if (token) {
//       config.headers["Authorization"] = "Bearer " + token;
//     }

//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// // RESPONSE

// axiosClient.interceptors.response.use(
//   async (response) => {
//     const { token, refreshToken } = response.data;
//     // LOGIN
//     if (token) {
//       setLocalStorage("token", token);
//     }
//     if (refreshToken) {
//       setLocalStorage("refreshToken", refreshToken);
//     }

//     return response;
//   },
//   async (error) => {
//     if (error?.response?.status !== 401) {
//       return Promise.reject(error);
//     }
//     if (
//       error?.response?.status === 401 &&
//       (error?.response?.data?.message === "refreshToken is not a valid Token" ||
//         error?.response?.data?.message === "refreshToken and id's not match!")
//     ) {
//       clearLocalStorage();
//     }

//     const originalConfig = error.config;

//     if (error?.response?.status === 401 && !originalConfig.sent) {
//       console.log("Error 🚀", error);
//       originalConfig.sent = true;
//       try {
//         // Trường hợp không có token thì chuyển sang trang LOGIN
//         const token = getLocalStorage("token");
//         if (!token) {
//           return Promise.reject(error);
//         }

//         const refreshToken = getLocalStorage("refreshToken");
//         if (refreshToken) {
//           const response = await axiosClient.post("/customers/refreshToken", {
//             refreshToken: refreshToken,
//           });

//           const { token } = response.data;
//           setLocalStorage("token", token);

//           originalConfig.headers = {
//             ...originalConfig.headers,
//             Authorization: `Bearer ${token}`,
//           };

//           return axiosClient(originalConfig);
//         } else {
//           return Promise.reject(error);
//         }
//       } catch (err) {
//         return Promise.reject(err);
//       }
//     }
//   }
// );

export { axiosClient, axiosAuth };
