import { useCartStore } from "@/hook/useCountStore";
import React, { useEffect, useState } from "react";
import ShopApp from "@/compenents/ShopApp";
import { Affix, Button, Card, Checkbox } from "antd";
import CreateOrder from "@/compenents/ShopApp/components/Order/CreateOrder";

export default function CounterApp() {
  const [loading, setLoading] = useState(true);
  const { selectAllCheck, removeAllCheck, itemsCheckout } = useCartStore(
    (state: any) => state
  );
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
      <Affix offsetBottom={10}>
        <Card className="container">
          <div className="row text-center">
            <div className="col-sm-2">
              <Checkbox
                onChange={(info: any) => {
                  if (info.target.checked) {
                    selectAllCheck();
                  } else {
                    removeAllCheck();
                  }
                }}
              >
                {" "}
                Chọn tất cả
              </Checkbox>
            </div>
            <div className="col-sm-4">
              <div> Tổng số sản phẩm: {itemsCheckout.length}</div>
            </div>
            <div className="col-sm-4">
              Tổng thanh toán :{" "}
              {itemsCheckout
                .map((item: any) => item.product.price * item.quantity)
                .reduce(
                  (accumulator: any, subtotal: any) => accumulator + subtotal,
                  0
                )
                .toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
            </div>
            <div className="col-sm-2">
              {" "}
              <CreateOrder />
            </div>
          </div>
        </Card>
      </Affix>
    </div>
  );
}
