import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper";

import axios from "axios";
import { Button, Card, Divider, Rate, Image, Badge } from "antd";

// import Image from "next/image";

import router from "next/router";

const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

export default function Topmoth({ topMonth }: any) {
  const [hotDeals, setHotDeals] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
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
        const response = await axios.get(`${URL_ENV}/products?topMonth=true`);
        const data = response.data.results;
        setHotDeals(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [topMonth]);

  return (
    <>
      <div>
        <Swiper
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          effect={"coverflow"}
          grabCursor={true}
          spaceBetween={50}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={true}
          modules={[Autoplay, EffectCoverflow, Pagination]}
          speed={3000}
          breakpoints={{
            0: {
              slidesPerView: 1,
              centeredSlides: true,
              // initialSlide: 3,
            },
            900: {
              slidesPerView: 2,
              centeredSlides: true,
              // initialSlide: 3,
            },
            1200: {
              slidesPerView: 3,
              centeredSlides: true,
              // initialSlide: 3,
            },
          }}
        >
          {hotDeals.length > 0 &&
            hotDeals.map((item: any, index: any) => (
              <SwiperSlide key={`${item._id}-${index + 1}-${item.name}`}>
                <Badge.Ribbon text={item.discount > 5 ? "Giảm giá " : ""}>
                  <Card
                    className="text-center"
                    bordered={false}
                    style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                  >
                    <Card style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                      <Image
                        alt={item.name}
                        src={`${URL_ENV}/${item.imageUrl}`}
                        style={{
                          width: "100%",
                          transition: "0.5s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      />
                    </Card>
                    <div
                      style={{ height: 40 }}
                      className={`text-center ${
                        windowWidth < 1400 ? "text-truncate" : ""
                      }`}
                    >
                      {item.name}
                    </div>
                    <div
                      className="text-center py-2"
                      style={{ color: "#c48c46" }}
                    >
                      <strong>
                        {item.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}{" "}
                      </strong>
                    </div>
                    <div className="text-center">
                      Đã bán: {item.amountSold} cái
                    </div>
                    <div className="text-center">
                      <Rate disabled defaultValue={item.averageRate} />
                    </div>
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
                </Badge.Ribbon>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}
