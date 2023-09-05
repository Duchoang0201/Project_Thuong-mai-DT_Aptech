import React, { useEffect, useState } from "react";
import { useCartStore } from "@/hook/useCountStore";
import CartShoppe from "./components/Carts/CartShoppe";

export default function ShopApp(user: any) {
  return (
    <div className=" ">
      {/* <Products /> */}
      {/* <Carts /> */}
      {user && <CartShoppe />}
      <hr />
    </div>
  );
}
