import Login from "@/compenents/Account/login/Login";
import { axiosClient } from "@/libraries/axiosConfig";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Props = {};

const CheckLogin = (props: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  return <>{!user && <Login />}</>;
};

export default CheckLogin;
