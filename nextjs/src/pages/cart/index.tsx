import { useCartStore } from "@/hook/useCountStore";
import React, { useEffect, useState } from "react";
import ShopApp from "@/compenents/ShopApp";
import { Card } from "antd";

export default function CounterApp() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
      <Card className="container" loading={loading}>
        <ShopApp />
      </Card>
    </div>
  );
}
