import axios from "axios";
import React, { useCallback } from "react";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, message } from "antd";
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
  Pagination,
} from "antd";
import { useCartStore } from "@/hook/useCountStore";
import Hotdeal from "../../compenents/Mainpage/Topmonth/Topmonth";

import { useAuthStore } from "../../hook/useAuthStore";
// import { useCartStore } from "@/hook/useCountStore";

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

  const [pages, setPages] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState<any>(10);
  const [currentPage, setCurrentPage] = useState(1);

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
    skip && `skip=${skip}`,
    limit && `limit=${limit}`,
  ]
    .filter(Boolean)
    .join("&");

  const { auth }: any = useAuthStore((state) => state);

  const [scroll, setScroll] = useState<number>(10);

  const slideCurrent = (value: any) => {
    setSkip(value * 10 - 10);
    setFetchData((prev) => prev + 1);
  };

  useEffect(() => {
    const handleResize = () => {
      setScroll(window.scrollY);
    };

    handleResize(); // Set initial window width
    window.addEventListener("scroll", handleResize);

    return () => {
      window.removeEventListener("scroll", handleResize);
    };
  }, []);

  useEffect(() => {
    axios.get(`${API_URL_Product}?${queryParams}`).then((respones: any) => {
      // console.log(respones.data.results);
      setData(respones.data.results);
      setPages(respones.data.amountResults);
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

  // console.log("data: ", data);
  const handleSubmit = useCallback((value: any) => {
    setFetchData((pre) => pre + 1);
    setLimit(0);
    setSkip(0);
  }, []);

  const handleClearSubmit = useCallback(() => {
    setCategoryId("");
    setFromDiscount("");
    setFromPrice("");
    setToDiscount("");
    setToPrice("");
    setSupplierId("");
    setLimit(10);
    setSkip(10);
    setFetchData((pre) => pre + 1);
  }, []);

  return (
    <div>
      {/* ////////////////////////////////////// */}

      <Row>
        <Col span={18} push={4}>
          <div
            className={`d-flex justify-content-center align-items-center ${Style.title}`}
          >
            {/* <h2 style={{ color: "#6508fa" }}>Sản Phẩm</h2> */}
          </div>
          <div className={`${Style.container1}`}>
            <ul className={Style.list}>
              {data &&
                data?.map((items: any, index: any) => {
                  return (
                    <li key={index} className={` ${Style.items}`}>
                      <div
                        className={`d-flex justify-content-center align-items-center pt-3 `}
                      >
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
                      <div
                        className={`d-flex justify-content-center align-items-center`}
                      >
                        <div className={Style.name}>{items.name}</div>
                        <div className={Style.price}>
                          <div>
                            {items.price.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </div>
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
                                  message.success(
                                    {
                                      content: "Đã thêm sản phẩm vào giỏ hàng!",
                                      style: {
                                        marginTop: 130,
                                      },
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
            <Pagination
              className="py-4 container text-end "
              onChange={(e) => slideCurrent(e)}
              defaultCurrent={1}
              total={pages}
            />
          </div>
          <div className="mb-5">
            <h3>Sản phẩm nổi bật</h3>
            <Hotdeal />
          </div>
        </Col>
        <Col span={4} pull={18} className={`${Style.col2} `}>
          <Affix offsetTop={95}>
            <div className="py-4">
              <div className={`pt-3  ${Style.splitRowPC}`}>
                <Space wrap className="d-flex flex-column ">
                  <h5>Danh mục sản phẩm</h5>
                  <Select
                    allowClear
                    autoClearSearchValue={!categoryId ? true : false}
                    defaultValue={"Chọn danh mục"}
                    style={{ width: 180 }}
                    onChange={handleDataChange}
                    options={categories?.results?.map((items: any) => ({
                      label: items.name,
                      value: items._id,
                    }))}
                    dropdownStyle={{
                      position: "fixed",
                      top: scroll > 90 ? 210 : 250,
                    }}
                  />

                  <h5>Hãng sản phẩm</h5>
                  <Select
                    allowClear
                    autoClearSearchValue={!supplierId ? true : false}
                    defaultValue={"Chọn nhà cung cấp"}
                    style={{ width: 180 }}
                    onChange={handleChangeSupplier}
                    options={supplier?.results?.map((items: any) => ({
                      label: items.name,
                      value: items._id,
                    }))}
                    dropdownStyle={{
                      position: "fixed",
                      top: scroll > 90 ? 290 : 330,
                    }}
                  />
                  <h5>Lọc giá</h5>
                  <div className="d-flex">
                    <InputNumber
                      placeholder="Enter From"
                      min={0}
                      onChange={handleFromPrice}
                      style={{ margin: "0 5px" }}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      }
                      parser={(value: any) =>
                        value!.replace(/\s?d|(\.*)/g, "").replace(/\./g, "")
                      }
                    />

                    <InputNumber
                      placeholder="Enter to"
                      // max={}
                      onChange={handleToPrice}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      }
                      parser={(value: any) =>
                        value!.replace(/\s?d|(\.*)/g, "").replace(/\./g, "")
                      }
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
                  <div className="d-flex ">
                    <Button onClick={handleSubmit}>Lọc sản phẩm</Button>
                    <Button onClick={handleClearSubmit} className="ms-1">
                      Xóa lọc
                    </Button>
                  </div>
                </Space>
              </div>
            </div>
          </Affix>
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
            style={{
              marginTop: scroll > 60 ? 130 : 0,
            }}
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
                dropdownStyle={{
                  position: "fixed",
                  top: scroll > 60 ? 285 : 155,
                }}
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
                dropdownStyle={{
                  position: "fixed",
                  top: scroll > 60 ? 365 : 235,
                }}
              />
            </Space>
            <h5>Lọc giá</h5>
            <div className="d-flex mt-3">
              <InputNumber
                placeholder="Enter From"
                min={0}
                onChange={handleFromPrice}
                style={{ margin: "0 5px" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value: any) =>
                  value!.replace(/\s?d|(\.*)/g, "").replace(/\./g, "")
                }
              />

              <InputNumber
                placeholder="Enter to"
                onChange={handleToPrice}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value: any) =>
                  value!.replace(/\s?d|(\.*)/g, "").replace(/\./g, "")
                }
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
    </div>
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
