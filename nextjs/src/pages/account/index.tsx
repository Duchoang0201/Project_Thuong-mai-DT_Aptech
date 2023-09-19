import NavbarAccount from "@/compenents/Account/NavbarAccount";
import { useAuthStore } from "@/hook/useAuthStore";
import { axiosClient } from "@/libraries/axiosConfig";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Props = {};

const AccountInfor = (props: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

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
