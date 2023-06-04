import React from "react";
import { useAuthStore } from "@/hook/useAuthStore";
import dynamic from "next/dynamic";
import AccountOrders from "@/compenents/Account/orders";

const CheckoutPay: React.FC = () => {
  return (
    <>
      <AccountOrders />
    </>
  );
};

export default CheckoutPay;
