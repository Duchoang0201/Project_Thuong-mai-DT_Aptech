import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { axiosClient } from "./axiosConfig";

const useAxiosClient = () => {
  const { data: session } = useSession();

  useEffect(() => {
    //REQUEST
    const requestIntercept = axiosClient.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] =
            "Bearer " + session?.userInfo.accessToken;
        }

        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    return () => {
      axiosClient.interceptors.request.eject(requestIntercept);
    };
  }, [session]);
};

export default useAxiosClient;
