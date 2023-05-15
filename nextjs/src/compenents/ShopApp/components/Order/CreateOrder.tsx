import React from "react";
import { useCartStore } from "../../../../hook/useCountStore";

export default function CreateOrder() {
  const { items } = useCartStore((state: any) => state);
  return (
    <div>
      <button
        style={{ border: 0, height: 42, width: 120 }}
        onClick={() => {
          console.log("items", items);
        }}
      >
        Create Order
      </button>
    </div>
  );
}
