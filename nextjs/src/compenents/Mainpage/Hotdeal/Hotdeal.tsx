import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Button, Card, Divider, Rate, Badge } from "antd";
import router from "next/router";
import { API_URL } from "@/contants/URLS";
import Image from "next/image";

export default function App({ hotDeal }: any) {
  const [autoplayConfig, setAutoplayConfig] = useState({
    delay: 3000,
    disableOnInteraction: false,
    reverseDirection: true,
  });

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
            initialSlide: 3,
          },
          900: {
            slidesPerView: 2,
            centeredSlides: true,
            initialSlide: 3,
          },
          1200: {
            slidesPerView: 3,
            centeredSlides: true,
            initialSlide: 3,
          },
        }}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={autoplayConfig}
        loop={true}
      >
        {hotDeal?.length > 0 &&
          hotDeal?.map((item: any, index: any) => (
            <SwiperSlide key={`${item._id}-${index + 1}`}>
              <Badge.Ribbon
                key={`${item._id}-${index}`}
                text={item.discount > 5 ? "Giảm giá " : ""}
              >
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
                    <Image
                      width={200}
                      height={200}
                      alt={item.name}
                      src={`${API_URL}/${item.imageUrl}`}
                      style={{
                        width: "100%",
                        transition: "transform 1s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                  </Card>
                  <div style={{ height: 40 }} className="text-center">
                    {item.name}
                  </div>
                  <div
                    className="text-center py-3"
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
                      // type="primary"
                      className="bg-slate-800 text-white hover:bg-gray-800"
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
    </>
  );
}
