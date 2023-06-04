import axios from "axios";
import React, { useCallback } from "react";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, message } from "antd";
import Style from "./SearchPage.module.css";

import { Button } from "antd";
import { useCartStore } from "@/hook/useCountStore";

import { PropsSearch } from "@/compenents/Navbar/PropsSearch";
import { useAuthStore } from "@/hook/useAuthStore";

type Props = {};

const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

function DongHo({}: Props) {
  const { dataSearch } = PropsSearch((state: any) => state);
  const [data, setData] = useState<Array<any>>([]);

  const { auth }: any = useAuthStore((state) => state);

  const router = useRouter();

  const {
    add,
    items: itemsCart,
    increase,
  } = useCartStore((state: any) => state);

  useEffect(() => {
    setData(dataSearch);
  }, [dataSearch]);

  const handleClick = (path: any) => {
    router.push(path);
  };

  return (
    <div>
      {/* ////////////////////////////////////// */}

      <Row>
        <Col span={20} push={2}>
          <div className={`${Style.container1}`}>
            <ul className={Style.list}>
              {data &&
                data?.map((items: any, index: any) => {
                  return (
                    <li key={index} className={` ${Style.items}`}>
                      <div className="d-flex justify-content-center align-items-center pt-3">
                        <Image
                          src={`${URL_ENV}/${items.imageUrl}`}
                          alt="Description of the image"
                          width={200}
                          height={200}
                          className={` ${Style.imgItems}`}
                          onClick={() => {
                            handleClick(`/products/${items._id}`);
                          }}
                        ></Image>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <div className={Style.name}>{items.name}</div>
                        <div className={Style.price}>
                          <div>{items.price}đ</div>
                        </div>
                        <div className={Style.button}>
                          <Button
                            onClick={() => {
                              if (auth === null) {
                                router.push("/login");
                                message.warning(
                                  "Vui lòng đăng nhập để thêm vào giỏ hàng!!",
                                  1.5
                                );
                              } else {
                                const productId = items?._id;

                                const productExists = itemsCart.some(
                                  (item: any) => item.product._id === productId
                                );
                                console.log(
                                  "««««« productExists »»»»»",
                                  productExists
                                );
                                if (productExists === true) {
                                  increase(productId);
                                  message.success(
                                    {
                                      content: "Thêm 1 sản phẩm vào giỏ hàng!",
                                      style: {
                                        marginTop: 130,
                                      },
                                    },
                                    1.5
                                  );
                                } else {
                                  add({ product: items, quantity: 1 });
                                  message.success(1.5);
                                  message.success(
                                    {
                                      content: "Đã thêm sản phẩm vào giỏ hàng!",
                                      style: { zIndex: 9999999999 },
                                    },
                                    1.5
                                  );
                                }
                              }
                            }}
                          >
                            Thêm vào giỏ hàng
                          </Button>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DongHo;
