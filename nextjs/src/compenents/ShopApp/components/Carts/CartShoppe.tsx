import React from "react";
import { useCartStore } from "../../../../hook/useCountStore";
import { Divider, Card, Checkbox, Badge, Statistic } from "antd";
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
  return (
    <>
      <div className="">
        <Divider orientation="left">Danh sách sản phẩm trong giỏ hàng</Divider>
      </div>
      <div>
        <Card className=" hidden sm:block">
          <div className="grid grid-cols-6 gap-4 text-center ">
            <div className=" ">
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
            <div className="">
              <div>Sản phẩm</div>
            </div>
            <div className="">Đơn giá</div>
            <div className="">Số lượng</div>
            <div className="">Số tiền</div>
            <div className="">Thao tác</div>
          </div>
        </Card>
        <div className="">
          {items.map((item: any, index: any) => (
            <Badge.Ribbon
              className="py-3"
              key={`${item._id}-${index}`}
              text={
                itemsCheckout.some(
                  (checkoutItem: any) =>
                    checkoutItem.product.productId === item.product.productId
                )
                  ? "Đã chọn"
                  : ""
              }
            >
              <div
                className="  gap-2 py-2
              "
              ></div>
              <div
                className={`grid grid-cols-1  ${
                  itemsCheckout?.some(
                    (checkoutItem: any) =>
                      checkoutItem.product.productId === item.product.productId
                  )
                    ? "bg-body-tertiary"
                    : ""
                } md:grid-cols-6 border rounded-lg py-6
                `}
              >
                <div className="flex items-center justify-center ">
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
                <div className="flex items-center justify-center">
                  <div className="">
                    <div className="flex  justify-center">
                      {" "}
                      <Image
                        width={150}
                        height={150}
                        alt=""
                        src={`${URL_ENV}/${item.product?.imageUrl}`}
                      />
                    </div>
                    <div className="w-auto">
                      <p className=" text-center text-clip ">
                        {item.product.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  {item.product.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
                <div className="flex items-center justify-center">
                  <div
                    className="inline-flex rounded-md shadow-sm"
                    role="group"
                  >
                    <button
                      onClick={() => {
                        increase(item.product._id);
                      }}
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-l-lg hover:bg-blue-100    dark:focus:text-black"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100    dark:focus:text-black"
                    >
                      {item.quantity}
                    </button>
                    <button
                      onClick={() => {
                        decrease(item.product._id);
                      }}
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-900  border border-gray-200 rounded-r-md hover:bg-red-100    dark:focus:text-black"
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  {(item.product.price * item.quantity).toLocaleString(
                    "vi-VN",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )}
                </div>
                <div className="flex items-center justify-center">
                  {" "}
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border rounded-lg border-gray-200 hover:bg-gray-100    dark:focus:text-black"
                    onClick={() => {
                      remove(item.product._id);
                      removeCheck(item.product._id);
                    }}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </Badge.Ribbon>
          ))}
        </div>
      </div>
    </>
  );
}
