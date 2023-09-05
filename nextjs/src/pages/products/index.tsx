import { API_URL } from "@/contants/URLS";
import { useCartStore } from "@/hook/useCountStore";
import { axiosClient } from "@/libraries/axiosClient";
import { StarOutlined } from "@ant-design/icons";
import { Badge, Card, Image, message } from "antd";
import router from "next/router";
import React, { useEffect, useState } from "react";

type Props = {};

const Products = (props: Props) => {
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const {
    add,
    items: itemsCart,
    increase,
  } = useCartStore((state: any) => state);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it initially to set the initial state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/products?active=true`);
        const data = response.data.results;
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUser = await axiosClient.get("/customers/login/profile");
        if (getUser?.data) {
          setUser(getUser?.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-4 gap-10 md:grid-cols-3  sm:grid-cols-2">
        {products.length > 0 &&
          products.map((item: any, index: any) => (
            <div key={`${item._id}-${index + 1}`}>
              <div>
                <Badge.Ribbon text={item.discount > 5 ? "Giảm giá " : ""}>
                  <Card
                    style={{
                      background:
                        "-webkit-linear-gradient(top,#fff 0%,#f7f7f7 100%)",
                    }}
                    className="border rounded-4"
                    bordered={false}
                  >
                    <Card
                      onClick={() => {
                        router.push(`/products/${item._id}`);
                      }}
                      className="border-none text-center"
                      style={{
                        background:
                          "-webkit-linear-gradient(top,#fff 0%,#f7f7f7 100%)",
                      }}
                    >
                      <Image
                        className="cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-150  duration-300"
                        preview={false}
                        alt={item.name}
                        src={`${API_URL}/${item.imageUrl}`}
                      />
                    </Card>
                    <div
                      style={{ height: 40 }}
                      className={`text-center ${
                        windowWidth < 1400 ? "truncate" : ""
                      }`}
                    >
                      {item.name}
                    </div>
                    <div
                      className="text-center py-4"
                      style={{ color: "#c48c46" }}
                    >
                      <strong>
                        {item.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </strong>
                    </div>
                    <div className="flex justify-around">
                      {" "}
                      <div className="text-start  ">
                        <StarOutlined style={{ color: "#FFC107" }} /> (
                        {Math.round(item.averageRate * 2) / 2})
                      </div>
                      <div className="">
                        <button
                          type="button"
                          className="text-black text-center border rounded-lg px-1 py-1 hover:text-white hover:bg-slate-400 "
                          onClick={() => {
                            if (user === null) {
                              router.push("/login");
                              message.warning(
                                "Vui lòng đăng nhập để thêm vào giỏ hàng!!",
                                1.5
                              );
                            } else {
                              const productId = item._id;
                              const productExists = itemsCart.some(
                                (item: any) => item.product._id === productId
                              );

                              if (productExists === true) {
                                increase(productId);
                                message.success(
                                  {
                                    content: "Thêm 1 sản phẩm vào giỏ hàng!",
                                    style: {
                                      marginTop: 150,
                                    },
                                  },
                                  1.5
                                );
                              } else {
                                add({ product: item, quantity: 1 });
                                message.success(
                                  {
                                    content: "Đã thêm sản phẩm vào giỏ hàng!",
                                    style: {
                                      paddingTop: 150,
                                    },
                                  },
                                  1.5
                                );
                              }
                            }
                          }}
                        >
                          Thêm vào giỏ hàng
                        </button>
                      </div>
                      <div className="text-end">{item.amountSold} Đã bán</div>
                    </div>
                  </Card>
                </Badge.Ribbon>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
