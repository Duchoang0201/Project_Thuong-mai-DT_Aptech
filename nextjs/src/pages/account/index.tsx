import NavbarAccount from "@/compenents/Account/NavbarAccount";
import { useAuthStore } from "@/hook/useAuthStore";
import { axiosClient } from "@/libraries/axiosClient";
import React, { useEffect, useState } from "react";

type Props = {};

const AccountInfor = (props: Props) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const res: any = axiosClient
      .get("/customers/login/profile")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setUser(null);
      });
  }, []);

  return (
    <>
      {user ? (
        <NavbarAccount />
      ) : (
        <div className="text-center">Vui lòng đăng nhập !!</div>
      )}
    </>
  );
};

export default AccountInfor;
