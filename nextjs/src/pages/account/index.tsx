import NavbarAccount from "@/compenents/Account/NavbarAccount";
import { useAuthStore } from "@/hook/useAuthStore";
import React from "react";

type Props = {};

const AccountInfor = (props: Props) => {
  const { auth } = useAuthStore((state: any) => state);
  return (
    <>
      {auth?.payload ? (
        <NavbarAccount />
      ) : (
        <div className="text-center">Vui lòng đăng nhập !!</div>
      )}
    </>
  );
};

export default AccountInfor;
