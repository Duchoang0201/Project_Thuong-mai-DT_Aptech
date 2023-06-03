import axios from "axios";
import React, { useCallback } from "react";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, message } from "antd";
import Style from "./DongHo.module.css";

import { MoreOutlined } from "@ant-design/icons";
import {
  Select,
  Space,
  Button,
  Drawer,
  InputNumber,
  Affix,
  FloatButton,
} from "antd";
import { useCartStore } from "@/hook/useCountStore";

import Hotdeal from "../../compenents/Mainpage/Hotdeal/Hotdeal";

// import { useAuthStore } from "../../hook/useAuthStore";
// import { useCartStore } from "@/hook/useCountStore";

type Props = {
  products: any;
  categories: any;
  supplier: any;
  props: any;
};

const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";
const API_URL_Product = `${URL_ENV}/products`;
const API_URL_Categories = `${URL_ENV}/categories`;
const API_URL_Supplier = `${URL_ENV}/suppliers`;

function DongHo({ products, categories, supplier }: Props) {
  // const { items } = useCartStore((state: any) => state);
  // const { add } = useCartStore((state: any) => state);
  // const { auth } = useAuthStore((state: any) => state);
  const [open, setOpen] = useState<boolean>(false);
  const [fetchData, setFetchData] = useState<number>(0);
  const [data, setData] = useState<Array<any>>([]);

  const [categoryId, setCategoryId] = useState<any>();
  const [supplierId, setSupplierId] = useState<any>();
  const [fromPrice, setFromPrice] = useState<any>();
  const [toPrice, setToPrice] = useState<any>("");
  const [fromDiscount, setFromDiscount] = useState<any>("");
  const [toDiscount, setToDiscount] = useState<any>("");
  const [isActive, setIsActive] = useState<boolean>(true);

  const router = useRouter();
  const [top, setTop] = useState(30);

  const {
    add,
    items: itemsCart,
    increase,
  } = useCartStore((state: any) => state);

  //CALL API PRODUCT FILLTER
  const queryParams = [
    // productName && `productName=${productName}`,
    supplierId && `supplierId=${supplierId}`,
    categoryId && `categoryId=${categoryId}`,
    fromPrice && `fromPrice=${fromPrice}`,
    toPrice && `toPrice=${toPrice}`,
    fromDiscount && `fromDiscount=${fromDiscount}`,
    isActive && `active=${isActive}`,
  ]
    .filter(Boolean)
    .join("&");

  useEffect(() => {
    if (fetchData === 0) {
      axios
        .get(
          `${API_URL_Product}?categoryId=6418ecd7695619ee88123bd9
    `
        )
        .then((respones: any) => {
          // console.log(respones.data.results);
          setData(respones.data.results);
        });
    } else {
      axios.get(`${API_URL_Product}?${queryParams}`).then((respones: any) => {
        // console.log(respones.data.results);
        setData(respones.data.results);
      });
    }
  }, [fetchData]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleClick = (path: any) => {
    router.push(path);
  };
  const handleDataChange = (value: any) => {
    setCategoryId(value);
    // setFetchData((pre) => pre + 1);
  };

  const handleChangeSupplier = (value: any) => {
    setSupplierId(value);
    // setFetchData((pre) => pre + 1);
  };

  const handleToPrice = (value: any) => {
    setToPrice(value);
    // setFetchData((pre) => pre + 1);
  };
  const handleFromPrice = (value: any) => {
    setFromPrice(value);
    // setFetchData((pre) => pre + 1);
  };

  const handleFromDiscount = (value: any) => {
    // console.log(value);
    setFromDiscount(value);
    // setFetchData((pre) => pre + 1);
  };

  const handleToDiscount = (value: any) => {
    setToDiscount(value);
    // setFetchData((pre) => pre + 1);
  };

  // console.log("data: ", data);
  const handleSubmit = useCallback((value: any) => {
    setFetchData((pre) => pre + 1);
  }, []);

  const handleClearSubmit = useCallback(() => {
    setCategoryId("");
    setFromDiscount("");
    setFromPrice("");
    setToDiscount("");
    setToPrice("");
    setSupplierId("");
    setFetchData((pre) => pre + 1);
  }, []);

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
          <div className="mb-5">
            <h3>Sản phẩm nổi bật</h3>
            <Hotdeal />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DongHo;

export async function getStaticProps() {
  const products = await axios.get(API_URL_Product).then((response) => {
    return response.data;
  });
  const categories = await axios.get(API_URL_Categories).then((response) => {
    return response.data;
  });
  const supplier = await axios.get(API_URL_Supplier).then((response) => {
    return response.data;
  });
  return {
    props: {
      products,
      categories,
      supplier,
    },
  };
}
