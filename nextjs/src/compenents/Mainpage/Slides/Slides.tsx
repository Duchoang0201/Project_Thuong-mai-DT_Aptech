import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, HashNavigation } from "swiper";
import axios from "axios";
import Image from "next/image";
import "./style.module.css";

const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

const Slides = () => {
  const [slides, setSlides] = useState([]);

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
      <div className=" row slides  px-5 py-5">
        <div className="col-md-8 slide w-75 flex-grow-1">
          <Swiper
            loop={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Navigation, HashNavigation]}
            className="mySwiper"
          >
            {slides.length > 0 &&
              slides.map((item: any, index: any) => (
                <SwiperSlide className="w-100" key={`${index + 1}`}>
                  <Image
                    className="img-fluid"
                    width={1200}
                    height={450}
                    alt={item?.summary}
                    src={`${URL_ENV}${item?.imageUrl}`}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="col-md-3 slide">
          <div className="d-flex flex-column">
            {slides.length > 0 &&
              slides.map((item: any, index: any) => (
                <div className=" py-1" key={`${index + 1}`}>
                  <Image
                    className="img-fluid "
                    width={150}
                    height={150}
                    style={{ height: "100%", width: "100%" }}
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
