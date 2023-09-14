import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
// import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
// import NavBar from "@/compenents/Navbar/Navbar";
// import "bootstrap/dist/css/bootstrap.min.css";

import "swiper/swiper.min.css";
import "swiper/css/pagination";
import Slides from "@/compenents/Mainpage/Slides/Slides";
import Hotdeal from "@/compenents/Mainpage/Hotdeal/Hotdeal";
import { Divider } from "antd";
import Topmoth from "@/compenents/Mainpage/Topmonth/Topmonth";

import Searchtrend from "@/compenents/Mainpage/Searchtrend/Searchtrend";
import CheckoutMethod from "@/compenents/Checkout/CheckoutMethod";
import Products from "@/compenents/Mainpage/Product/Products";
import FacebookMsg from "@/compenents/Facebook/FacebookMsg";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/hook/useCountStore";
import { useEffect } from "react";
import { axiosAuth } from "@/libraries/axiosConfig";

export default function Home(props: any) {
  const { topMonth, hotTrend, hotDeal, slides, productView } = props;
  const { getDataServer } = useCartStore((state: any) => state);
  const { data: session } = useSession();

  useEffect(() => {
    getDataServer(session?.carts, session?.carts.customerId);
  }, [getDataServer, session?.carts]);
  return (
    <>
      <Head>
        <title>Jewelry Shop</title>

        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8857116005396641"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <main className="container mx-auto">
        <Slides slides={slides} />
        <div style={{ backgroundColor: "rgba(246,246,246,0.9)" }}>
          <h3 className=" py-2 text-center">Phương thức thanh toán</h3>

          <CheckoutMethod />
        </div>
        <Divider>
          <h3>Danh mục yêu thích</h3>
        </Divider>
        <div style={{ backgroundColor: "rgba(246,246,246,0.9)" }}>
          <div className="container mx-auto">
            <Searchtrend hotTrend={hotTrend} />
          </div>
        </div>
        <Divider>
          <h3>Hot trong tháng</h3>
        </Divider>
        <div style={{ backgroundColor: "rgba(246,246,246,0.9)" }}>
          <div className="container mx-auto">
            <Topmoth topMonth={topMonth} />
          </div>
        </div>
        <Divider>
          <h3> Ưu đãi hấp dẫn </h3>
        </Divider>
        <div style={{ backgroundColor: "rgba(246,246,246,0.9)" }}>
          <div className="container mx-auto">
            <Hotdeal hotDeal={hotDeal} />
          </div>
        </div>
        <Divider>
          <h3> Xem thêm</h3>
        </Divider>
        <div className="container mx-auto">
          <div className="p-4 ">
            <Products products={productView} />
          </div>
        </div>
        <FacebookMsg />
      </main>
    </>
  );
}

export async function getStaticProps(content: any) {
  try {
    //Slides
    const dataSlides = await axiosAuth.get(`/slides?active=true`);
    //GET HOTTREND
    const dataHottrend = await axiosAuth.get(`/categories?topMonth=true`);

    //GET TOPMONTH
    const dataTopMonth = await axiosAuth.get(`/products?topMonth=true`);

    //GET HOTDEAL
    const dataHotDeal = await axiosAuth.get(`/products?hotDeal=true`);

    //Product view

    const dataProduct = await axiosAuth.get(
      `/products?active=true&&limit=8&&fromDiscount=3`
    );
    return {
      props: {
        slides: dataSlides.data.results,
        topMonth: dataTopMonth.data.results,
        hotTrend: dataHottrend.data.results,
        hotDeal: dataHotDeal.data.results,
        productView: dataProduct.data.results,
      },
      revalidate: 24 * 60 * 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
