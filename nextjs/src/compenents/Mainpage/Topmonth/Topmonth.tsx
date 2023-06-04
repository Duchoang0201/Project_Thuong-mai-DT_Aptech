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
import { Button, Card, Divider, Rate, Image } from "antd";

// import Image from "next/image";

import router from "next/router";

const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

export default function Topmoth({ topMonth }: any) {
  const [hotDeals, setHotDeals] = useState([]);
  const swiperRef = useRef<any>(null);

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

  useEffect(() => {
    const autoplayTimeout = setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.autoplay.start();
      }
    }, 1000);

    return () => {
      clearTimeout(autoplayTimeout);
    };
  }, []);
  return (
    <>
      <div>
        <Swiper
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          effect={"coverflow"}
          grabCursor={true}
          slidesPerView={4}
          spaceBetween={50}
          initialSlide={3}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={true}
          modules={[Autoplay, EffectCoverflow, Pagination]}
          speed={3000}
          // className="Top_Month py-4 px-4 text-center"
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
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {hotDeals.length > 0 &&
            hotDeals.map((item: any, index: any) => (
              <>
                <SwiperSlide
                  // className="text-center"
                  key={`${item._id}-${index + 1}`}
                >
                  <Card
                    className="text-center"
                    key={`${item.name}-${index + 1}`}
                    bordered={false}
                    style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                  >
                    <Card style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                      {" "}
                      <Image
                        alt={item.name}
                        src={`${URL_ENV}/${item.imageUrl}`}
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
              </>
            ))}
        </Swiper>
      </div>
    </>
  );
}
