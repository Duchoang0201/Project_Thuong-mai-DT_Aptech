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
    <div className="container mx-auto ">
      <button
        type="button"
        className="text-white border rounded-lg bg-blue-500 px-2 py-2"
        onClick={handleCheckout}
      >
        Đặt hàng
      </button>
    </div>
  );
}
