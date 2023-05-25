import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
// import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
// import NavBar from "@/compenents/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import Slides from "@/compenents/Mainpage/Slides/Slides";
import Hotdeal from "@/compenents/Mainpage/Hotdeal/Hotdeal";
import { Divider } from "antd";
import Topmoth from "@/compenents/Mainpage/Topmonth/Topmonth";

import Backgroundhot from "../compenents/Mainpage/Hotdeal/top_img_01_pc_watch_191226.jpg";
import Backgroundmonth from "../compenents/Mainpage/Topmonth/pexels-leah-kelley-691046.jpg";
import Searchtrend from "@/compenents/Mainpage/Searchtrend/Searchtrend";
import CheckoutMethod from "@/compenents/Checkout/CheckoutMethod";
const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

export default function Home(props: any) {
  const { topMonth } = props;
  const { hotTrend } = props;
  const { hotDeal } = props;
  const hotStyle = {
    backgroundSize: "cover",
    backgroundImage: `url(${Backgroundhot.src})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  const monthStyle = {
    backgroundSize: "cover",
    backgroundImage: `url(${Backgroundmonth.src})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <Head>
        <title>my Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <Slides />
        <div style={{ backgroundColor: "rgba(246,246,246,0.9)" }}>
          <h3 className=" py-2 text-center">Phương thức thanh toán</h3>

          <CheckoutMethod />
        </div>
        <Divider>
          <h3>Danh mục yêu thích</h3>
        </Divider>
        <div style={{ backgroundColor: "rgba(246,246,246,0.9)" }}>
          <div className="container">
            <Searchtrend hotTrend={hotTrend} />
          </div>
        </div>
        <Divider>
          <h3>Số lượng mua nhiều nhất trong tháng</h3>
        </Divider>
        <div style={monthStyle}>
          <div className="container">
            <Topmoth topMonth={topMonth} />
          </div>
        </div>
        <Divider>
          <h3> Ưu đãi hấp dẫn </h3>
        </Divider>
        <div style={hotStyle}>
          <div className="container">
            <Hotdeal hotDeal={hotDeal} />
          </div>
        </div>
        <div className="container">
          <div className="p-4 " style={{ height: "300px" }}></div>
          <div></div>
          <div></div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps(content: any) {
  try {
    //GET HOTTREND
    const dataHottrend = await axios.get(`${URL_ENV}/categories?topMonth=true`);

    //GET TOPMONTH
    const dataTopMonth = await axios.get(`${URL_ENV}/products?topMonth=true`);

    //GET HOTDEAL
    const dataHotDeal = await axios.get(`${URL_ENV}/products?hotDeal=true`);

    return {
      props: {
        topMonth: dataTopMonth.data.results,
        hotTrend: dataHottrend.data.results,
        hotDeal: dataHotDeal.data.results,
      },
      revalidate: 24 * 60 * 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
