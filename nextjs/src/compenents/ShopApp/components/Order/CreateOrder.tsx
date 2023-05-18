import React from "react";
import { useCartStore } from "../../../../hook/useCountStore";
import router from "next/router";

export default function CreateOrder() {
  const { items } = useCartStore((state: any) => state);
  return (
    <div className="container text-end">
      <button
        className="btn btn-primary"
        style={{ border: 0, height: 42, width: 120 }}
        onClick={() => {
          router.push("/checkout");
        }}
      >
        Đặt hàng
      </button>
    </div>
  );
}
