import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import Image from "next/image";

import { Card } from "antd";
import { PropsSearch } from "@/hook/PropsSearch";

const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

export default function App({ hotTrend }: any) {
  const { searchCategory } = PropsSearch((state: any) => state);

  return (
    <>
      <Swiper
        modules={[Pagination, Navigation]}
        className="hotDeals"
        breakpoints={{
          0: {
            slidesPerView: 2,
            centeredSlides: true,
            initialSlide: 2,
          },
          900: {
            slidesPerView: 3,
            centeredSlides: true,
            initialSlide: 2,
          },
          1200: {
            slidesPerView: 4,
            centeredSlides: true,
            initialSlide: 2,
          },
        }}
      >
        {hotTrend?.length > 0 &&
          hotTrend?.map((item: any, index: any) => (
            <SwiperSlide
              key={`${item._id}-${index + 1}-${item.name}`}
              onClick={() => {
                searchCategory(item._id);
              }}
            >
              <Card
                className="text-center"
                bordered={false}
                style={{
                  background: `rgba(245,245,245,0.1)`,
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(245,245,245,0.1)";
                }}
              >
                <Card
                  className="border flex flex-1 items-center justify-center"
                  style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                >
                  <Image
                    width={300}
                    height={400}
                    alt={item.name}
                    src={`${URL_ENV}/${item.imageUrl}`}
                    style={{
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
                <h6 style={{ height: 40 }} className="text-center py-2">
                  {item.name}
                </h6>
              </Card>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
