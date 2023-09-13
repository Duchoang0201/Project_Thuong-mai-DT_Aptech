import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { axiosAuth } from "./axiosConfig"; // Assuming you have your Axios instance configured correctly
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();
  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${session?.user.token}`;
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log(`🚀🚀🚀!..error`, error);

        if (error?.response?.status !== 401) {
          return Promise.reject(error);
        }
        if (
          error?.response?.status === 401 &&
          (error?.response?.data?.message ===
            "refreshToken is not a valid Token" ||
            error?.response?.data?.message ===
              "refreshToken and id's not match!")
        ) {
          signOut();
        }
        const prevRequest = error.config;

        if (error?.response?.status === 401 && !prevRequest.sent) {
          console.log("Error 🚀", error);
          prevRequest.sent = true;
          await refreshToken();

          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${session?.user?.token}`;
          return axiosAuth(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    // Clean up the interceptor when the component unmounts
    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [refreshToken, session]);

  return axiosAuth;
};

export default useAxiosAuth;
