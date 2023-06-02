import { useCartStore } from "@/hook/useCountStore";
import React, { useEffect, useState } from "react";
import ShopApp from "@/compenents/ShopApp";
import { Affix, Button, Card } from "antd";

export default function CounterApp() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
      <div style={{ background: "rgb(245,245,245)" }}>
        <h4 className="text-center py-4">Giỏ hàng của bạn</h4>
      </div>

      <Card className="bg-body-secondary" loading={loading}>
        <ShopApp />
      </Card>
      <Affix offsetBottom={8}>
        <div className="container">asdas</div>
      </Affix>
    </div>
  );
}
