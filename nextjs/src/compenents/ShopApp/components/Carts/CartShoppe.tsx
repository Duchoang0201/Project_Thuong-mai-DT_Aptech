import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../../../hook/useAuthStore";
import { useCartStore } from "../../../../hook/useCountStore";
import axios from "axios";
import { message, Dropdown, Menu, Button, Divider, Card, Checkbox } from "antd";
import Image from "next/image";

export default function CartShoppe() {
  const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

  const {
    items,
    remove,
    increase,
    decrease,
    itemsCheckout,
    addCheck,
    removeCheck,
    selectAllCheck,
    removeAllCheck,
  } = useCartStore((state: any) => state);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      // Your callback function logic here
      removeAllCheck();
      console.log("Navigating away from the page");
      // Call any necessary cleanup functions or perform other actions
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [removeAllCheck]);

  console.log("««««« itemsCheckout  »»»»»", itemsCheckout);
  return (
    <>
      <div className="container table-responsive ">
        <Divider orientation="left">Danh sách các đơn hàng</Divider>
      </div>
      <div className=" ">
        <Card>
          <div className="row text-center">
            <div className="col-sm-1">
              <Checkbox
                onChange={(info: any) => {
                  if (info.target.checked) {
                    selectAllCheck();
                  } else {
                    removeAllCheck();
                  }
                }}
              ></Checkbox>
            </div>
            <div className="col-sm-4">
              <div>Sản phẩm</div>
            </div>
            <div className="col-sm-2">Đơn giá</div>
            <div className="col-sm-2">Số lượng</div>
            <div className="col-sm-2">Số tiền</div>
            <div className="col-sm-1">Thao tác</div>
          </div>
        </Card>
        <div className="py-3">
          {items.map((item: any, index: any) => (
            <Card
              key={`${item._id}-${index}`}
              className=" text-center py-3 my-2"
            >
              <div
                className={`row py-3 border rounded-2 ${
                  itemsCheckout?.some(
                    (checkoutItem: any) =>
                      checkoutItem.product.productId === item.product.productId
                  )
                    ? "bg-body-tertiary"
                    : ""
                }`}
              >
                <div className="col-sm-1 align-self-center">
                  <Checkbox
                    checked={itemsCheckout.some(
                      (checkoutItem: any) =>
                        checkoutItem.product.productId ===
                        item.product.productId
                    )}
                    onChange={(info: any) => {
                      if (info.target.checked) {
                        addCheck(item);
                      } else {
                        removeCheck(item.product.productId);
                      }
                    }}
                  ></Checkbox>
                </div>
                <div className="col-sm-4 d-flex flex-column align-self-center">
                  <div className="row">
                    <div className="col-sm-8">
                      {" "}
                      <Image
                        width={150}
                        height={150}
                        alt=""
                        src={`${URL_ENV}/${item.product?.imageUrl}`}
                      />
                    </div>
                    <div className="col-sm-4">{item.product.name}</div>
                  </div>
                </div>
                <div className="col-sm-2 align-self-center">
                  {item.product.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
                <div className="col-sm-2 align-self-center">
                  {" "}
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => {
                        increase(item.product?._id);
                      }}
                    >
                      +
                    </button>
                    <div className="border px-4 py-2 text-center align-self-center justify-content-center ">
                      {item.quantity}
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => {
                        decrease(item.product._id);
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="col-sm-2 align-self-center">
                  {(item.product.price * item.quantity).toLocaleString(
                    "vi-VN",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )}
                </div>
                <div className="col-sm-1 align-self-center">
                  {" "}
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => {
                      remove(item.product._id);
                    }}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
