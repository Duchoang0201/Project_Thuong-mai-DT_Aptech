import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";
import axios from "axios";
import { Button, Card, Divider, Rate } from "antd";
import Image from "next/image";
import router, { useRouter } from "next/router";
const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

export default function App({ hotDeal }: any) {
  const router = useRouter();
  const [hotDeals, setHotDeals] = useState([]);
  const swiperRef = useRef<any>(null);
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

  useEffect(() => {
    const autoplayTimeout = setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.autoplay.start();
      }
    }, 2000);

    return () => {
      clearTimeout(autoplayTimeout);
    };
  }, []);

  const handleReachEnd = () => {
    setAutoplayConfig((prevConfig) => ({
      ...prevConfig,
      reverseDirection: false,
    }));
  };

  return (
    <>
      <Swiper
        centeredSlides={true}
        slidesPerView={3}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        spaceBetween={50}
        className={`mySwiper`}
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
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={autoplayConfig}
        loop={false}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onReachEnd={handleReachEnd}
      >
        {hotDeals.length > 0 &&
          hotDeals.map((item: any, index: any) => (
            <SwiperSlide className="px-4 py-4" key={index}>
              <Card
                className="border rounded-4 "
                bordered={false}
                style={{
                  width: 300,
                  height: 500,
                  background: `rgba(245,245,245,0.8)`,
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
