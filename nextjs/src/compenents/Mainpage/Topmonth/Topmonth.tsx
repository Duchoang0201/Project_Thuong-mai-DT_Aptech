import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";

import axios from "axios";
import { Button, Card, Divider, Rate } from "antd";

import Image from "next/image";

import router from "next/router";

const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

export default function Topmoth() {
  const [hotDeals, setHotDeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL_ENV}/products?topMonth=true`);
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
      <div>
        <Swiper
          loop={true}
          autoplay={{ delay: 2000 }}
          effect={"coverflow"}
          grabCursor={true}
          slidesPerView={4}
          spaceBetween={160}
          initialSlide={4}
          coverflowEffect={{
            rotate: 30,
            stretch: 2,
            depth: 50,
            modifier: 1,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="Top_Month py-5 px-4" // Remove any shadow styles from the className
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            400: {
              slidesPerView: 2,
            },
            900: {
              slidesPerView: 3,
            },
          }}
        >
          {hotDeals.length > 0 &&
            hotDeals.map((item: any, index: any) => (
              <>
                <SwiperSlide>
                  <Card
                    bordered={false}
                    style={{
                      width: 300,
                      height: 500,
                      background: `rgba(245,245,245,0.8)`,
                    }}
                  >
                    <Card style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
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
      </div>
    </>
  );
}
