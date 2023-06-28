import { useCartStore } from "@/hook/useCountStore";
import React, { useEffect, useState } from "react";
import ShopApp from "@/compenents/ShopApp";
import {
  Affix,
  Avatar,
  Badge,
  Card,
  Checkbox,
  Divider,
  Dropdown,
  Menu,
} from "antd";
import CreateOrder from "@/compenents/ShopApp/components/Order/CreateOrder";
import { useAuthStore } from "@/hook/useAuthStore";
import axios from "axios";
const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

export default function CounterApp() {
  const [loading, setLoading] = useState(true);
  const { auth } = useAuthStore((state: any) => state);
  const [user, setUser] = useState<any>();

  const { selectAllCheck, removeAllCheck, itemsCheckout } = useCartStore(
    (state: any) => state
  );
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth?.payload?._id) {
          const response = await axios.get(
            `${URL_ENV}/customers/${auth?.payload?._id}`
          );
          setUser(response.data.result);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [auth?.payload._id]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // Set initial window width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div style={{ background: "rgb(245,245,245)" }}>
        <h4 className="text-center py-4">
          {user?._id
            ? `Giỏ hàng của bạn`
            : `Vui lòng đăng nhập để truy cập giỏ hàng`}
        </h4>
      </div>
      {user?._id && (
        <Card className="bg-body-secondary" loading={loading}>
          <ShopApp />
          <Affix offsetBottom={10}>
            <Card
              type="inner"
              title={
                <Divider orientation="left">Tạm tính đơn hàng của bạn</Divider>
              }
              className="container"
            >
              <div className="row text-center">
                <div className="col-lg-2">
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
                <div className="col-lg-4">
                  <Dropdown
                    trigger={windowWidth < 900 ? ["contextMenu"] : ["hover"]}
                    className="text-center"
                    overlayStyle={{
                      zIndex: 100000000000,
                    }}
                    placement="topRight"
                    overlay={
                      <Menu>
                        {itemsCheckout.map((item: any, index: number) => (
                          <Menu.Item key={index}>
                            <div
                              onClick={(e) => e.preventDefault()}
                              className="d-flex justify-content-between"
                            >
                              <div className="w-75 text-truncate py-3">
                                <span>{item.product?.name}</span>
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
                  >
                    <div className="text-center">
                      <Badge
                        className="text-center"
                        count={itemsCheckout?.length}
                      >
                        <div className="py-1 text-center">
                          Tổng số sản phẩm đã chọn
                        </div>
                      </Badge>
                    </div>
                  </Dropdown>
                </div>
                <div className="col-lg-4">
                  Tổng thanh toán :{" "}
                  {itemsCheckout
                    .map((item: any) => item.product.price * item.quantity)
                    .reduce(
                      (accumulator: any, subtotal: any) =>
                        accumulator + subtotal,
                      0
                    )
                    .toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </div>
                <div className="col-lg-2">
                  {" "}
                  <CreateOrder />
                </div>
              </div>
            </Card>
          </Affix>
        </Card>
      )}
    </div>
  );
}
