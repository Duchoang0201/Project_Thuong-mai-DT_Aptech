import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../../../hook/useAuthStore";
import { useCartStore } from "../../../../hook/useCountStore";

export default function Carts() {
  const { items, remove, increase, decrease } = useCartStore(
    (state: any) => state
  );
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  const { auth } = useAuthStore((state: any) => state);
  const renderTable = (): React.ReactNode => {
    if (!isHydrated) {
      return null;
    }
    if (items) {
      return (
        <>
          {items.map((i: any, index: any) => {
            return (
              <tr key={i.product._id}>
                <td>{index + 1}</td>
                <td>{i.product.name}</td>
                <td className="text-end">{i.product.price}</td>
                <td className="text-end">{i.quantity}</td>
                <td className="d-flex justify-content-evenly">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                      increase(i.product._id);
                    }}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      decrease(i.product._id);
                    }}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => {
                      remove(i.product._id);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </>
      );
    }
  };
  return (
    <>
      <h1 style={{ color: "red" }}>{auth?.name}</h1>
      <div className="container">
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
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    </>
  );
}
