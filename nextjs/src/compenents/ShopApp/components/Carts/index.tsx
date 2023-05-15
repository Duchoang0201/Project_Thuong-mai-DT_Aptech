import React from "react";
import { useAuthStore } from "../../../../hook/useAuthStore";
import { useCartStore } from "../../../../hook/useCountStore";

export default function Carts() {
  const { items, remove, increase, decrease } = useCartStore(
    (state: any) => state
  );
  const { auth }: any = useAuthStore((state: any) => state);
  return (
    <div>
      <h1 style={{ color: "red" }}>{auth?.name}</h1>
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th className="text-end">Price</th>
            <th className="text-end">Qty</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((i: any, index: any) => {
            return (
              <tr key={i.product._id}>
                <td>{index + 1}</td>
                <td>{i.product.name}</td>
                <td className="text-end">{i.product.price}</td>
                <td className="text-end">{i.quantity}</td>
                <td>
                  <button
                    onClick={() => {
                      increase(i.product._id);
                    }}
                  >
                    +
                  </button>

                  <button
                    onClick={() => {
                      decrease(i.product._id);
                    }}
                  >
                    -
                  </button>
                  <button
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
        </tbody>
      </table>
    </div>
  );
}
