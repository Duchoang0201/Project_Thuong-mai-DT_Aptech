import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../../../hook/useAuthStore";
import { useCartStore } from "../../../../hook/useCountStore";
import axios from "axios";
import { message, Dropdown, Menu, Button } from "antd";

export default function Carts() {
  const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

  const { items, remove, increase, decrease } = useCartStore(
    (state: any) => state
  );
  const { auth } = useAuthStore((state: any) => state);
  const [getUser, setGetUser] = useState<any>(null);

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
      <div className="container">
        {getUser && (
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên sản phẩm</th>
                <th className="text-end">Đơn giá</th>
                <th className="text-end">Số lượng</th>
                <th className="text-center"> Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((i: any, index: any) => (
                  <tr key={i.product._id}>
                    <td>{index + 1}</td>
                    <td>{i.product.name}</td>
                    <td className="text-end">{i.product.price}</td>
                    <td className="text-end">{i.quantity}</td>
                    <td className="d-flex justify-content-evenly">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => {
                          increase(i.product._id);
                        }}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          decrease(i.product._id);
                        }}
                      >
                        -
                      </button>
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
