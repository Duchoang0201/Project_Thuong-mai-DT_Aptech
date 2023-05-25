import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../../../hook/useAuthStore";
import { useCartStore } from "../../../../hook/useCountStore";
import axios from "axios";
import { message, Dropdown, Menu, Button, Divider } from "antd";
import Image from "next/image";

export default function Carts() {
  const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

  const { items, remove, increase, decrease } = useCartStore(
    (state: any) => state
  );
  const { auth } = useAuthStore((state: any) => state);
  const [getUser, setGetUser] = useState<any>(null);

  console.log("««««« items »»»»»", items);
  useEffect(() => {
    axios
      .get(`${URL_ENV}/customers/${auth?.payload._id}`)
      .then((res) => {
        setGetUser(res.data.result);
      })
      .catch((err) => {
        message.error(`${err}`, 1.5);
      });
  }, [URL_ENV, auth?.payload._id]);

  // const renderTable = () => (

  // );

  return (
    <>
      <div className="container table-responsive">
        <Divider orientation="left">Danh sách các đơn hàng</Divider>
        {getUser && (
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Hình minh họa </th>
                <th>Tên sản phẩm</th>
                <th className="text-end">Đơn giá</th>
                <th className="text-center">Số lượng</th>
                <th className="text-center"> Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((i: any, index: any) => (
                  <tr key={i.product?._id}>
                    <td>{index + 1}</td>
                    <td>
                      <Image
                        width={50}
                        height={50}
                        alt=""
                        src={`${URL_ENV}/${i.product?.imageUrl}`}
                      />
                    </td>
                    <td>{i.product?.name}</td>
                    <td className="text-end">
                      {i.product?.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td>
                      {" "}
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => {
                            increase(i.product?._id);
                          }}
                        >
                          +
                        </button>
                        <div className="border px-4 py-2 text-center align-self-center justify-content-center">
                          {i.quantity}
                        </div>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => {
                            decrease(i.product._id);
                          }}
                        >
                          -
                        </button>
                      </div>
                    </td>
                    <td className="text-end ">
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => {
                          remove(i.product._id);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
