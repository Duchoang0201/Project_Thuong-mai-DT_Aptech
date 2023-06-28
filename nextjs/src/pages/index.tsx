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

import Searchtrend from "@/compenents/Mainpage/Searchtrend/Searchtrend";
import CheckoutMethod from "@/compenents/Checkout/CheckoutMethod";
import Products from "@/compenents/Mainpage/Product/Products";
const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

export default function Home(props: any) {
  const { topMonth } = props;
  const { hotTrend } = props;
  const { hotDeal } = props;

  return (
    <>
      <Head>
        <title>Jewelry Shop</title>

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
          <h3>Hot trong tháng</h3>
        </Divider>
        <div style={{ backgroundColor: "rgba(246,246,246,0.9)" }}>
          <div className="container">
            <Topmoth topMonth={topMonth} />
          </div>
        </div>
        <Divider>
          <h3> Ưu đãi hấp dẫn </h3>
        </Divider>
        <div style={{ backgroundColor: "rgba(246,246,246,0.9)" }}>
          <div className="container">
            <Hotdeal hotDeal={hotDeal} />
          </div>
        </div>
        <Divider>
          <h3> Xem thêm</h3>
        </Divider>
        <div className="container">
          <div className="p-4 ">
            <Products />
          </div>
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
