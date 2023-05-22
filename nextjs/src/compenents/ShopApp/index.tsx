import React from "react";
import Carts from "./components/Carts";
import CreateOrder from "./components/Order/CreateOrder";
import Products from "./components/Products";
import { useCartStore } from "@/hook/useCountStore";

export default function ShopApp() {
  return (
    <div>
      <Products />
      <Carts />
      <hr />
      <CreateOrder />
    </div>
  );
}
