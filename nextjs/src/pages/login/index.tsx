import Login from "@/compenents/Account/login/Login";
import { axiosClient } from "@/libraries/axiosClient";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const CheckLogin = (props: Props) => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    axiosClient
      .get("/customer/login/profile")
      .then((res) => setUser(res?.data))
      .catch((err) => console.log(`⚠️⚠️⚠️!! err `, err));
  }, []);
  return <>{!user && <Login />}</>;
};

export default CheckLogin;
