import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, HashNavigation, Autoplay } from "swiper";
import Image from "next/image";
import "./style.module.css";
import router from "next/router";
import { API_URL } from "@/contants/URLS";
import Aos from "aos";

const Slides = ({ slides }: any) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // Set initial window width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    Aos.init();
  }, []);

  // useEffect(() => {
  //   const autoplayTimeout = setTimeout(() => {
  //     if (swiperRef.current) {
  //       swiperRef.current.autoplay.start();
  //     }
  //   }, 2000);

  //   return () => {
  //     clearTimeout(autoplayTimeout);
  //   };
  // }, []);

  return (
    <div>
      <div className="flex py-4 gap-2">
        <div
          data-aos="zoom-out"
          data-aos-duration={1000}
          className="flex-auto w-2/3  "
        >
          <Swiper
            loop={true}
            pagination={true}
            modules={[Autoplay, Pagination, Navigation, HashNavigation]}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            initialSlide={3}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {slides.length > 0 &&
              slides.map((item: any, index: any) => (
                <SwiperSlide
                  key={`${item._id}-${index + 1}`}
                  onClick={() => {
                    router.push(`${item.url}`);
                  }}
                  className="w-100"
                >
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: windowWidth < 500 ? 200 : 450,
                      transition: " 0.5s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                    alt={item?.summary}
                    src={`${API_URL}${item?.imageUrl}`}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="flex-auto w-1/3 md:flex md:flex-col md:w-auto hidden">
          {slides.length > 0 &&
            slides.map((item: any, index: any) => (
              <div
                data-aos="fade-left"
                data-aos-duration={1000 + index * 500}
                className=""
                key={`${item._id}-${index + 1}`}
              >
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "150px" }}
                  alt={item?.summary}
                  src={`${API_URL}${item?.imageUrl}`}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Slides;
