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
        const response = await axios.get(`${URL_ENV}/products`);
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
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="Top_Month py-5"
          initialSlide={6}
        >
          {hotDeals.length > 0 &&
            hotDeals.map((item: any, index: any) => (
              <>
                <SwiperSlide className=" w-25">
                  <Card
                    className=""
                    bordered={false}
                    style={{
                      width: 300,
                      height: 500,
                      background: `rgba(245,245,245,0.8)`,
                    }}
                  >
                    <Card className="">
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
                      <strong>{item.price} đ</strong>
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
