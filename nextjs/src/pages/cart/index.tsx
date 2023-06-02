import { useCartStore } from "@/hook/useCountStore";
import React, { useEffect, useState } from "react";
import ShopApp from "@/compenents/ShopApp";
import {
  Affix,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  Dropdown,
  Menu,
} from "antd";
import CreateOrder from "@/compenents/ShopApp/components/Order/CreateOrder";
import { ShoppingCartOutlined } from "@ant-design/icons";
const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

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
        <Card
          type="inner"
          title={
            <Divider orientation="left">Tạm tính đơn hàng của bạn</Divider>
          }
          className="container"
        >
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
              <Dropdown
                placement="topRight"
                overlay={
                  <Menu>
                    {itemsCheckout?.length > 0 &&
                      itemsCheckout?.map((item: any) => (
                        <Menu.Item key={item.product?._id}>
                          <div className="d-flex justify-content-between">
                            <div className="w-75 text-truncate py-3">
                              <Badge color="blue" count={item.quantity}>
                                <Avatar
                                  shape="square"
                                  size="large"
                                  src={`${URL_ENV}${item.product?.imageUrl}`}
                                />
                              </Badge>
                              <span> {item.product?.name}</span>
                            </div>

                            <div className="py-3">
                              {item.product?.price?.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </div>
                          </div>
                        </Menu.Item>
                      ))}
                  </Menu>
                }
                className="d-flex"
              >
                <Badge count={itemsCheckout?.length}>
                  <div className="py-1"> Tổng số sản phẩm đã chọn</div>
                </Badge>
              </Dropdown>
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
