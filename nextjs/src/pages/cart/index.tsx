import { useCartStore } from "@/hook/useCountStore";
import React, { useEffect, useState } from "react";
import ShopApp from "@/compenents/ShopApp";
import { Affix, Badge, Card, Checkbox, Divider, Dropdown, Menu } from "antd";
import CreateOrder from "@/compenents/ShopApp/components/Order/CreateOrder";
import { axiosClient } from "@/libraries/axiosConfig";
import Image from "next/image";
import { API_URL } from "@/contants/URLS";
import { useSession } from "next-auth/react";

export default function CounterApp() {
  const { data: session } = useSession();
  const user = session?.user;

  const { selectAllCheck, removeAllCheck, itemsCheckout } = useCartStore(
    (state: any) => state
  );

  const [windowWidth, setWindowWidth] = useState<number>(0);

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
      {user && (
        <Card className="bg-body-secondary">
          <ShopApp user={user} />
          <Affix offsetBottom={10}>
            <Card
              type="inner"
              title={
                <Divider orientation="left">Tạm tính đơn hàng của bạn</Divider>
              }
              className=""
            >
              <div className="grid grid-cols-1 md:grid-cols-4">
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
                <div className="">
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
                              className="flex "
                            >
                              <div className="image">
                                <Image
                                  src={`${API_URL}${item.product?.imageUrl}`}
                                  width={100}
                                  height={100}
                                  alt={item.product.name}
                                />
                              </div>
                              <div className="content">
                                <div className="">
                                  <span>{item.product?.name}</span>
                                </div>
                                <div className="py-3">
                                  {item.product?.price?.toLocaleString(
                                    "vi-VN",
                                    {
                                      style: "currency",
                                      currency: "VND",
                                    }
                                  )}
                                </div>
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
                        <div className="">Tổng số sản phẩm đã chọn</div>
                      </Badge>
                    </div>
                  </Dropdown>
                </div>
                <div className="text-center">
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
                <div className="text-center">
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
