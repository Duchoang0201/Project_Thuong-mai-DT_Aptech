import Login from "@/compenents/Account/login/Login";
import { useAuthStore } from "@/hook/useAuthStore";
import React from "react";

type Props = {};

const CheckLogin = (props: Props) => {
  const { auth } = useAuthStore((state: any) => state);
  return <>{!auth && <Login />}</>;
};

export default CheckLogin;
