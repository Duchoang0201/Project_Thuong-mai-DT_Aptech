import { useCartStore } from "@/hook/useCountStore";
import { Divider } from "antd";
import React from "react";

type Props = {};

const CheckoutPay = (props: Props) => {
  const { itemsCheckout } = useCartStore((state: any) => state);

  return (
    <>
      {itemsCheckout.length > 0 &&
        itemsCheckout.map((i: any, index: any) => {
          return (
            <div key={i.product._id}>
              <div className="d-flex justify-content-between">
                <div className="w-75">
                  <span>{i.product.name}</span> x{" "}
                  <span className="text-danger">{i.quantity}</span>
                </div>
                <span>
                  {(i.product.price * i.quantity).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <Divider key={i.product.id}></Divider>
            </div>
          );
        })}

      <div className="d-flex justify-content-between">
        <strong>Tổng</strong>
        <strong>
          {itemsCheckout.length > 0
            ? itemsCheckout
                .map((item: any) => item.product.price * item.quantity)
                .reduce(
                  (accumulator: any, subtotal: any) => accumulator + subtotal,
                  0
                )
                .toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
            : 0}
        </strong>
      </div>
    </>
  );
};

export default CheckoutPay;
