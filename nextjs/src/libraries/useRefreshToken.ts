"use client";

import { useSession } from "next-auth/react";
import { axiosAuth } from "./axiosConfig";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axiosAuth.post("customers/refreshToken", {
      refreshToken: session?.user.refreshToken,
    });

    if (session) session.user.token = res.data.token;
  };
  return refreshToken;
};
