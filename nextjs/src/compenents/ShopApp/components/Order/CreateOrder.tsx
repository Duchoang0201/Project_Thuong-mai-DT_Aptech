import React from "react";
import { useCartStore } from "../../../../hook/useCountStore";
import { useRouter } from "next/router";
import { message } from "antd";

export default function CreateOrder() {
  const { itemsCheckout } = useCartStore();

  const router = useRouter();

  const handleCheckout = () => {
    if (itemsCheckout.length > 0) {
      router.push("/checkout");
    } else {
      message.error(
        {
          content: "Vui lòng chọn sản phẩm để thanh toán!",
          style: {
            marginTop: 130,
          },
        },
        1.5
      );
    }
  };

  return (
    <div className="container ">
      <button
        type="button"
        className="text-white border rounded-lg bg-blue-500"
        style={{ border: 0, height: 42, width: 120 }}
        onClick={handleCheckout}
      >
        Đặt hàng
      </button>
    </div>
  );
}
