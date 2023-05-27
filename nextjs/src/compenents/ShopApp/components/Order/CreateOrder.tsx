import React from "react";
import { useCartStore } from "../../../../hook/useCountStore";
import { useRouter } from "next/router";
import { message } from "antd";

export default function CreateOrder() {
  const { items } = useCartStore();

  const router = useRouter();

  const handleCheckout = () => {
    if (items.length > 0) {
      router.push("/checkout");
    } else {
      message.error("Vui lòng chọn sản phẩm vào giỏ hàng", 1.5);
    }
  };

  return (
    <div className="container text-end">
      <button
        className="btn btn-primary "
        style={{ border: 0, height: 42, width: 120 }}
        onClick={handleCheckout}
      >
        Đặt hàng
      </button>
    </div>
  );
}
