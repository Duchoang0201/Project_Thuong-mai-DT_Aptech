import React from "react";
import { useCartStore } from "../../../../hook/useCountStore";
import { products } from "../../data/products";
import Image from "next/image";

export default function Products() {
  const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

  const { add } = useCartStore((state: any) => state);

  console.log("««««« products »»»»»", products);
  return (
    <div style={{ display: "flex", flexDirection: "row", padding: 24 }}>
      {products.length > 0 &&
        products.map((p) => {
          return (
            <div
              key={`${p._id}-${p.imageUrl}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                src={`${URL_ENV}${p.imageUrl}`}
                alt=""
                width={240}
                height={240}
              />
              <strong>{p.name}</strong>
              <strong>{p.price}</strong>
              <button
                style={{
                  marginTop: 12,
                  height: 42,
                  border: 0,
                  width: 80,
                }}
                onClick={() => {
                  add({ product: p, quantity: 1 });
                }}
              >
                Add
              </button>
            </div>
          );
        })}
    </div>
  );
}
