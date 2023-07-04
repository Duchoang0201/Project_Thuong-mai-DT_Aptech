import React, { useEffect, useState } from "react";
import { useCartStore } from "@/hook/useCountStore";
import CartShoppe from "./components/Carts/CartShoppe";
import axios from "axios";
import { useAuthStore } from "@/hook/useAuthStore";
import { message } from "antd";
const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

export default function ShopApp() {
  const [getUser, setGetUser] = useState<any>(null);

  const { auth } = useAuthStore((state: any) => state);

  useEffect(() => {
    axios
      .get(`${URL_ENV}/customers/${auth?.payload._id}`)
      .then((res) => {
        setGetUser(res.data.result);
      })
      .catch((err) => {
        message.error(`${err}`, 1.5);
      });
  }, [auth?.payload._id]);
  return (
    <div className="container ">
      {/* <Products /> */}
      {/* <Carts /> */}
      {getUser && <CartShoppe />}
      <hr />
    </div>
  );
}
