import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";
import axios from "axios";
import { Button, Card, Divider, Rate, Image } from "antd";
import router from "next/router";
const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

export default function App({ hotDeal }: any) {
  const [hotDeals, setHotDeals] = useState([]);
  const [autoplayConfig, setAutoplayConfig] = useState({
    delay: 3000,
    disableOnInteraction: false,
    reverseDirection: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL_ENV}/products?hotDeal=true`);
        const data = response.data.results;
        setHotDeals(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [hotDeal]);

  const handleReachEnd = () => {
    setAutoplayConfig((prevConfig) => ({
      ...prevConfig,
      reverseDirection: false,
    }));
  };

  return (
    <>
      <Swiper
        speed={3000}
        centeredSlides={true}
        slidesPerView={3}
        initialSlide={3}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        spaceBetween={160}
        className={`mySwiper`}
        breakpoints={{
          0: {
            slidesPerView: 1,
            centeredSlides: true,
          },
          900: {
            slidesPerView: 2,
            centeredSlides: true,
          },
          1200: {
            slidesPerView: 3,
            centeredSlides: true,
          },
        }}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={autoplayConfig}
        loop={true}
      >
        {hotDeals.length > 0 &&
          hotDeals.map((item: any, index: any) => (
            <SwiperSlide key={`${item._id}-${index + 1}`}>
              <Card
                className="border rounded-4 "
                bordered={false}
                style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
              >
                <Card
                  className="border rounded-4 text-center"
                  style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                >
                  {" "}
                  <Image alt={item.name} src={`${URL_ENV}/${item.imageUrl}`} />
                </Card>
                <p style={{ height: 40 }} className="text-center">
                  {item.name}
                </p>
                <p className="text-center" style={{ color: "#c48c46" }}>
                  <strong>
                    {item.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}{" "}
                  </strong>
                </p>
                <p className="text-center">Đã bán: {item.amountSold} cái</p>
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
          ))}
      </Swiper>
    </>
  );
}
