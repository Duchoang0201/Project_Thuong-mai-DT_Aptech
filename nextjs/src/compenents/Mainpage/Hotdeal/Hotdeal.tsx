import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import axios from "axios";
import { Button, Card, Divider, Rate } from "antd";

import Image from "next/image";
import { SmallDashOutlined } from "@ant-design/icons";
import router from "next/router";
const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

export default function App() {
  const [hotDeals, setHotDeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL_ENV}/products?hotdeal=true`);
        const data = response.data.results;
        setHotDeals(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={2}
        centeredSlides={true}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="hotDeals"
        initialSlide={6}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 100,
          },
          400: {
            slidesPerView: 2,
            spaceBetween: 100,
          },
          900: {
            slidesPerView: 3,
          },
        }}
      >
        {hotDeals.length > 0 &&
          hotDeals.map((item: any, index: any) => (
            <>
              <SwiperSlide className="px-4 py-4">
                <Card
                  className="border rounded-4 "
                  bordered={false}
                  style={{
                    width: 300,
                    height: 500,

                    background: `rgba(245,245,245,0.9)`,
                  }}
                >
                  <Card
                    className="border rounded-4"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                  >
                    {" "}
                    <Image
                      alt={item.name}
                      src={`${URL_ENV}/${item.imageUrl}`}
                      width={200}
                      height={200}
                    />
                  </Card>
                  <Divider>Thông tin sản phẩm</Divider>
                  <p style={{ height: 40 }} className="text-center">
                    {item.name}
                  </p>
                  <p className="text-center">
                    <strong>
                      {item.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}{" "}
                    </strong>
                  </p>
                  <p className="text-center">
                    <Rate disabled defaultValue={item.averageRate} />
                  </p>
                  <Divider>
                    <Button
                      type="primary"
                      onClick={() => {
                        router.push(`/products/${item._id}`);
                      }}
                    >
                      Chi tiết
                    </Button>
                  </Divider>
                </Card>
              </SwiperSlide>
            </>
          ))}
      </Swiper>
    </>
  );
}
