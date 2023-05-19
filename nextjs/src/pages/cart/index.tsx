import { useCartStore } from "@/hook/useCountStore";
import React from "react";
import ShopApp from "@/compenents/ShopApp";

export default function CounterApp() {
  const { decrease } = useCartStore((state: any) => state);
  const { count } = useCartStore((state: any) => state);

  const { increase } = useCartStore((state: any) => state);
  return (
    <div>
      <ShopApp />
    </div>
  );
}
