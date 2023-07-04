import Login from "@/compenents/Account/login/Login";
import { useAuthStore } from "@/hook/useAuthStore";
import axios from "axios";
import React, { useEffect, useState } from "react";
const URL_ENV = process.env.REACT_APP_BASE_URL || "http://localhost:9000";

type Props = {};

const CheckLogin = (props: Props) => {
  const { auth } = useAuthStore((state: any) => state);

  const [user, setUser] = useState<any>();
  const E_URL = `${URL_ENV}/customers/${auth?.payload?._id}`;

  useEffect(() => {
    axios
      .get(E_URL)
      .then((res) => {
        setUser(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [E_URL]);
  return <>{!user && <Login />}</>;
};

export default CheckLogin;
