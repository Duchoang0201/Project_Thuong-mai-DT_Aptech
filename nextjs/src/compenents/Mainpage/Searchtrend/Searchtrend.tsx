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
import { Card } from "antd";

import Image from "next/image";
const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

export default function App({ hotTrend }: any) {
  const [hotDeals, setHotDeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL_ENV}/categories?topMonth=true`);
        const data = response.data.results;
        setHotDeals(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [hotTrend]);

  return (
    <>
      <Swiper
        slidesPerView={2}
        centeredSlides={true}
        loop={true}
        grabCursor={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="hotDeals"
        initialSlide={6}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          400: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
      >
        {hotDeals.length > 0 &&
          hotDeals.map((item: any, index: any) => (
            <>
              <SwiperSlide className="px-4 py-4">
                <Card
                  className=" rounded-4 "
                  bordered={false}
                  style={{
                    width: 300,
                    height: 350,

                    background: `rgba(245,245,245,0.1)`,
                  }}
                >
                  <Card
                    className="border  rounded-circle"
                    style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                  >
                    {" "}
                    <Image
                      alt={item.name}
                      src={`${URL_ENV}/${item.imageUrl}`}
                      width={200}
                      height={200}
                    />
                  </Card>
                  <h6 style={{ height: 40 }} className="text-center  py-2">
                    {item.name}
                  </h6>
                </Card>
              </SwiperSlide>
            </>
          ))}
      </Swiper>
    </>
  );
}
