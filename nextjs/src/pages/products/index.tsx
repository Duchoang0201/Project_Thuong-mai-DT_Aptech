import axios from "axios";
import React from "react";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "antd";
import Style from "./product.module.css";

import { MoreOutlined } from "@ant-design/icons";
import { Select, Space, Button, Drawer, InputNumber, Form } from "antd";
import findItems from "./findItems";

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
  const [open, setOpen] = useState<boolean>(false);
  const [fetchData, setFetchData] = useState<number>(0);
  const [data, setData] = useState<Array<any>>([]);

  const [categoryId, setCategoryId] = useState<any>();
  const [supplierId, setSupplierId] = useState<any>();
  const [fromPrice, setFromPrice] = useState<any>();
  const [toPrice, setToPrice] = useState<any>("");
  const [fromDiscount, setFromDiscount] = useState<any>("");
  const [toDiscount, setToDiscount] = useState<any>("");

  const dataFind = findItems((state) => state.data);
  console.log("data Find: ", dataFind);

  const router = useRouter();

  //CALL API PRODUCT FILLTER
  const queryParams = [
    // productName && `productName=${productName}`,
    supplierId && `supplierId=${supplierId}`,
    categoryId && `categoryId=${categoryId}`,
    fromPrice && `fromPrice=${fromPrice}`,
    toPrice && `toPrice=${toPrice}`,
    fromDiscount && `fromDiscount=${fromDiscount}`,
    toDiscount && `toDiscount=${toDiscount}`,
    // fromStock && `fromStock=${fromStock}`,
    // toStock && `toStock=${toStock}`,
    // skip && `skip=${skip}`,
    // isActive && `active=${isActive}`,
    // isDelete && `isDeleted=${isDelete}`,
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
    setFetchData((pre) => pre + 1);
  };

  const handleChangeSupplier = (value: any) => {
    setSupplierId(value);
    setFetchData((pre) => pre + 1);
  };

  const handleToPrice = (value: any) => {
    setToPrice(value);
    setFetchData((pre) => pre + 1);
  };
  const handleFromPrice = (value: any) => {
    setFromPrice(value);
    setFetchData((pre) => pre + 1);
  };

  const handleFromDiscount = (value: any) => {
    // console.log(value);
    setFromDiscount(value);
    setFetchData((pre) => pre + 1);
  };

  const handleToDiscount = (value: any) => {
    setToDiscount(value);
    setFetchData((pre) => pre + 1);
  };
  // console.log("data: ", data);
  return (
    <>
      {/* ////////////////////////////////////// */}
      <Row className="">
        <Col span={18} push={6}>
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
                          <div style={{ padding: "0 40%" }}>
                            {items2.price}đ
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </Col>
        <Col span={6} pull={18} className={`${Style.col2}`}>
          <div>
            {/* //responsive */}
            <div className={Style.splitRow}>
              <Button type="primary" onClick={showDrawer} className="w-75">
                <MoreOutlined />
              </Button>
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
                    placeholder="Enter From"
                    min={1}
                    onChange={handleFromPrice}
                    style={{ margin: "0 5px" }}
                  />

                  <InputNumber
                    placeholder="Enter to"
                    max={1000}
                    onChange={handleToPrice}
                  />
                </div>
                <h5>Mức giảm giá</h5>
                <div className="d-flex">
                  <InputNumber
                    placeholder="Enter From"
                    min={0}
                    onChange={handleFromDiscount}
                    style={{ margin: "0 5px" }}
                  />

                  <InputNumber
                    placeholder="Enter to"
                    max={90}
                    onChange={handleToDiscount}
                  />
                </div>
              </Drawer>
            </div>

            <div className={`pt-3 ${Style.splitRowPC}`}>
              <Space wrap className="d-flex flex-column ">
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
                <h5>Lọc giá</h5>
                <div className="d-flex">
                  <InputNumber
                    placeholder="Enter From"
                    min={1}
                    onChange={handleFromPrice}
                    style={{ margin: "0 5px" }}
                  />

                  <InputNumber
                    placeholder="Enter to"
                    max={1000}
                    onChange={handleToPrice}
                  />
                </div>
                <h5>Mức giảm giá</h5>
                <div className="d-flex">
                  <InputNumber
                    placeholder="Enter From"
                    min={0}
                    onChange={handleFromDiscount}
                    style={{ margin: "0 5px" }}
                  />

                  <InputNumber
                    placeholder="Enter to"
                    max={90}
                    onChange={handleToDiscount}
                  />
                </div>
              </Space>
            </div>
          </div>
        </Col>
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
