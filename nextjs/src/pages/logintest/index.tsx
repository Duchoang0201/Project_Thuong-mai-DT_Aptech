import { useAuthStore } from "@/hook/useAuthStore";
import useAxiosAuth from "@/libraries/axiosAuth";
import { axiosAuth } from "@/libraries/axiosConfig";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

type Props = {};

const LoginTest = (props: Props) => {
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const { nextLogin } = useAuthStore((state) => state);
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  console.log(`🚀🚀🚀!..session`, session);
  const handleSubmit = async () => {
    const res = await signIn("credentials", {
      username: "Blaise45@hotmail.com",
      password: "123456",
      redirect: false,
    });
  };
  const handleGetData = async () => {
    axiosAuth.get(`/orders/personal/${session?.user?._id}`).then((res) => {
      console.log(`🚀🚀🚀!..res`, res);
    });
  };

  const handleLogout = async () => {
    signOut();
  };
  return (
    <div>
      <input
        className="w-50 border-red-600 border"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        title="EMAIL"
      ></input>
      <input
        className="w-50 border-red-600 border"
        onChange={(e) => {
          setPass(e.target.value);
        }}
      ></input>

      <button onClick={handleSubmit}>SIGNIN</button>
      <button className="px-10" onClick={handleGetData}>
        getData
      </button>
      <button className="px-10" onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
};

export default LoginTest;
