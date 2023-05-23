import axios from "axios";
import React, { useCallback } from "react";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "antd";
import Style from "./product.module.css";

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

import { useAuthStore } from "../../hook/useAuthStore";
import { useCartStore } from "@/hook/useCountStore";

type Props = {
  products: any;
  categories: any;
  supplier: any;
};

const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";
const API_URL_Product = `${URL_ENV}/products`;
const API_URL_Categories = `${URL_ENV}/categories`;
const API_URL_Supplier = `${URL_ENV}/suppliers`;

function Products({ products, categories, supplier }: Props) {
  const { items } = useCartStore((state: any) => state);
  const { add } = useCartStore((state: any) => state);
  const { auth } = useAuthStore((state: any) => state);
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

  const row = [];
  let currentRow = [];

  for (let i = 0; i < data.length; i++) {
    currentRow.push(data[i]);
    if ((i + 1) % 3 === 0) {
      row.push(currentRow);
      currentRow = [];
    }
  }

  useEffect(() => {
    axios.get(`${API_URL_Product}?${queryParams}`).then((respones: any) => {
      // console.log(respones.data.results);
      setData(respones.data.results);
    });
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

  const handleAddCart = (value: any) => {
    console.log("value add cart: ", value);
    if (auth === null) {
      router.push("/login");
    } else {
      add(value, 1);
    }
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
    <>
      {/* ////////////////////////////////////// */}

      <Row className="">
        <Col span={18} push={4}>
          <div className={`${Style.container1}`}>
            {row &&
              row?.map((items: any, index: any) => {
                return (
                  <div key={index} className={Style.list}>
                    {items?.map((items2: any, index2: any) => {
                      return (
                        <div key={index2} className={` ${Style.items}`}>
                          <div>
                            <Image
                              src={`${URL_ENV}/${items2.imageUrl}`}
                              alt="Description of the image"
                              width={200}
                              height={200}
                              onClick={() => {
                                handleClick(`/products/${items2._id}`);
                              }}
                              className="w-100 p-3 "
                            ></Image>
                          </div>
                          <div className="d-flex justify-content-center">
                            <div>{items2.name}</div>
                          </div>
                          <div className={Style.price}>{items2.price}đ</div>
                          <div className={Style.button}>
                            <Button onClick={() => handleAddCart(items2)}>
                              Thêm vào giỏ hàng
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </Col>
        <Col span={4} pull={18} className={`${Style.col2} `}>
          <div>
            <div className={`pt-3 ${Style.splitRowPC}`}>
              <Space wrap className="d-flex flex-column ">
                <h5>Danh mục sản phẩm</h5>
                <Select
                  allowClear
                  autoClearSearchValue={!categoryId ? true : false}
                  defaultValue={"None"}
                  style={{ width: 180 }}
                  onChange={handleDataChange}
                  options={categories?.results?.map((items: any) => ({
                    label: items.name,
                    value: items._id,
                  }))}
                />

                <h5>Hãng sản phẩm</h5>
                <Select
                  allowClear
                  autoClearSearchValue={!supplierId ? true : false}
                  defaultValue={"None"}
                  style={{ width: 180 }}
                  onChange={handleChangeSupplier}
                  options={supplier?.results?.map((items: any) => ({
                    label: items.name,
                    value: items._id,
                  }))}
                />
                <h5>Lọc giá</h5>
                <div className="d-flex">
                  <InputNumber
                    defaultValue={"0"}
                    placeholder="Enter From"
                    min={0}
                    onChange={handleFromPrice}
                    style={{ margin: "0 5px" }}
                  />

                  <InputNumber
                    defaultValue={"0"}
                    placeholder="Enter to"
                    max={1000}
                    onChange={handleToPrice}
                  />
                </div>
                <h5>Mức giảm giá</h5>
                <div className="d-flex">
                  <InputNumber
                    placeholder="Enter From"
                    defaultValue={"0"}
                    min={0}
                    onChange={handleFromDiscount}
                    style={{ margin: "0 5px" }}
                  />

                  <InputNumber
                    placeholder="Enter to"
                    defaultValue={"0"}
                    max={90}
                    onChange={handleToDiscount}
                  />
                </div>
                <div className="d-flex ">
                  <Button type="primary" onClick={handleSubmit}>
                    Lọc sản phẩm
                  </Button>
                  <Button
                    type="primary"
                    onClick={handleClearSubmit}
                    className="ms-1"
                  >
                    Xóa lọc
                  </Button>
                </div>
              </Space>
            </div>
          </div>
        </Col>
        {/* //responsive */}
        <div className={Style.splitRow}>
          <Affix offsetTop={top}>
            <FloatButton
              icon={<MoreOutlined />}
              type="primary"
              onClick={showDrawer}
              style={{ right: 24 }}
            ></FloatButton>
          </Affix>

          <Drawer
            width={250}
            title="Lọc sản phẩm"
            placement="left"
            onClose={onClose}
            open={open}
          >
            <Space wrap>
              <h5>Danh mục sản phẩm</h5>
              <Select
                defaultValue="None"
                style={{ width: 220 }}
                onChange={handleDataChange}
                options={categories?.results?.map((items: any) => ({
                  label: items.name,
                  value: items._id,
                }))}
              />
              <h5>Hãng sản phẩm</h5>
              <Select
                defaultValue="None"
                style={{ width: 220 }}
                onChange={handleChangeSupplier}
                options={supplier?.results?.map((items: any) => ({
                  label: items.name,
                  value: items._id,
                }))}
              />
            </Space>
            <h5>Lọc giá</h5>
            <div className="d-flex mt-3">
              <InputNumber
                defaultValue="0"
                placeholder="Enter From"
                min={0}
                onChange={handleFromPrice}
                style={{ margin: "0 5px" }}
              />

              <InputNumber
                defaultValue="0"
                placeholder="Enter to"
                max={1000}
                onChange={handleToPrice}
              />
            </div>
            <h5>Mức giảm giá</h5>
            <div className="d-flex">
              <InputNumber
                defaultValue="0"
                placeholder="Enter From"
                min={0}
                onChange={handleFromDiscount}
                style={{ margin: "0 5px" }}
              />

              <InputNumber
                defaultValue="0"
                placeholder="Enter to"
                max={90}
                onChange={handleToDiscount}
              />
            </div>
            <div className="mt-3">
              <Button type="primary" onClick={handleSubmit}>
                Lọc sản phẩm
              </Button>
              <Button
                type="primary"
                onClick={handleClearSubmit}
                className="ms-1"
              >
                Xóa lọc
              </Button>
            </div>
          </Drawer>
        </div>
      </Row>
    </>
  );
}

export default Products;

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
