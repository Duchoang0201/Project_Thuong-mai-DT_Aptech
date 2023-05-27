import React from "react";
import { useAuthStore } from "@/hook/useAuthStore";
import dynamic from "next/dynamic";
import AccountOrders from "@/compenents/Account/orders";

const CheckoutPay: React.FC = () => {
  const { auth } = useAuthStore((state: any) => state);

  return (
    <>
      <AccountOrders />
    </>
  );
};

export default CheckoutPay;
