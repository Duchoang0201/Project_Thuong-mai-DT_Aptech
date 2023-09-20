import { API_URL } from "@/contants/URLS";
import { useCartStore } from "@/hook/useCountStore";
import { axiosClient } from "@/libraries/axiosConfig";
import { StarOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Badge, Card, message } from "antd";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ProductFilter from "@/compenents/Products/filter";
import { useAuthStore } from "@/hook/useAuthStore";
import { useFilterProduct } from "@/hook/useFilterProduct";
import SuppliersFilter from "@/compenents/Products/SuppliersFilter";
import Aos from "aos";

type Props = {
  data: any[];
};

const Products = ({ data }: any) => {
  const { products } = data;
  const { filterValue, getDataProduct, setValueFilterNull, filter } =
    useFilterProduct((state: any) => state);
  const { data: session } = useSession();

  useEffect(() => {
    getDataProduct(products);
  }, [getDataProduct, products]);
  const user = session?.user;

  const [windowWidth, setWindowWidth] = useState(0);
  const {
    add,
    items: itemsCart,
    increase,
  } = useCartStore((state: any) => state);
  //HANDLE SCROLL
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
    Aos.init();
  }, []);
  return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-center">
        <ProductFilter />
        <SuppliersFilter />
        <button
          className="px-10"
          onClick={() => {
            filter();
          }}
        >
          Filter
        </button>
        <button
          onClick={() => {
            setValueFilterNull();
          }}
        >
          Clear
        </button>
      </div>
      <div className="grid lg:grid-cols-4 gap-10 md:grid-cols-3  sm:grid-cols-2">
        {filterValue.length > 0 &&
          filterValue.map((item: any, index: any) => (
            <div
              data-aos={index % 2 ? "fade-up-right" : "fade-up-left"}
              data-aos-duration="2300"
              data-aos-offset="300"
              key={`${item._id}-${index + 1}`}
            >
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
                      className="border-none text-center flex flex-1 justify-center items-center "
                      style={{
                        background:
                          "-webkit-linear-gradient(top,#fff 0%,#f7f7f7 100%)",
                      }}
                    >
                      <Image
                        width={300}
                        height={150}
                        className="cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-150  duration-300"
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
                          className="text-white bg-slate-600 text-center border rounded-lg px-2 py-1 hover:text-white hover:bg-slate-400 "
                          onClick={() => {
                            if (user === undefined) {
                              router.push("/login");
                              message.warning(
                                "Vui lòng đăng nhập để thêm vào giỏ hàng!!",
                                1.5
                              );
                            } else {
                              add({ product: item });
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

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const response = await axiosClient.get(`/products?active=true`);
  const data = response.data.results;

  return {
    props: {
      data: { products: data },
    },
  };
}
