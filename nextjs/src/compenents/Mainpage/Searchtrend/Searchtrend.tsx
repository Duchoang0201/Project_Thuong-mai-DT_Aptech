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
import { Card, Image } from "antd";

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
        slidesPerView={4}
        // grabCursor={true}
        // navigation={true}
        modules={[Pagination, Navigation]}
        className="hotDeals"
        initialSlide={3}
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
      >
        {hotDeals.length > 0 &&
          hotDeals.map((item: any, index: any) => (
            <>
              <SwiperSlide>
                <Card
                  className=" rounded-4 text-center"
                  bordered={false}
                  style={{
                    background: `rgba(245,245,245,0.1)`,
                  }}
                >
                  <Card
                    className="border  rounded-circle"
                    style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                  >
                    {" "}
                    <Image
                      preview={false}
                      alt={item.name}
                      src={`${URL_ENV}/${item.imageUrl}`}
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
