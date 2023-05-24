import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, HashNavigation, EffectCards } from "swiper";
import axios from "axios";
import Image from "next/image";
import "./style.module.css";

const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

const Slides = () => {
  const [slides, setSlides] = useState([]);
  const [windowWidth, setWindowWidth] = useState<number>(0);

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
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL_ENV}/slides?active=true`);
        const data = response.data.results;
        setSlides(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className=" row slides ">
        <div className="col-lg-8 slide w-75 flex-grow-1">
          <Swiper
            loop={true}
            pagination={true}
            modules={[Pagination, Navigation, HashNavigation]}
            autoplay={{
              delay: 1000,
            }}
          >
            {slides.length > 0 &&
              slides.map((item: any, index: any) => (
                <SwiperSlide className="w-100" key={`${index + 1}`}>
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: windowWidth < 500 ? 200 : 450,
                    }}
                    alt={item?.summary}
                    src={`${URL_ENV}${item?.imageUrl}`}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="col-lg-3 slide">
          <div className="d-flex flex-column">
            {slides.length > 0 &&
              slides.map((item: any, index: any) => (
                <div className="py-3" key={`${index + 1}`}>
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    alt={item?.summary}
                    src={`${URL_ENV}${item?.imageUrl}`}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slides;
