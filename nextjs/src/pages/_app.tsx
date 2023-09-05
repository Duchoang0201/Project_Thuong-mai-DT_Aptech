import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "@/compenents/Footer/Footer";
import { useAuthStore } from "@/hook/useAuthStore";
import { useCartStore } from "@/hook/useCountStore";
import { useEffect, useMemo } from "react";
import axios from "axios";
import { zeroFormat } from "numeral";
import NavabarTailwind from "@/compenents/Navbar/NavabarTailwind";
const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

export default function App({ Component, pageProps }: AppProps) {
  const { auth } = useAuthStore((state: any) => state);
  const { getDataServer } = useCartStore((state: any) => state);

  // const handleGetCart = useMemo(async () => {
  //   let cart: any = [];

  //   if (auth?.payload) {
  //     const dataCheck = await axios
  //       .post(`${URL_ENV}/carts`, {
  //         customerId: auth?.payload?._id,
  //         cart: [],
  //       })
  //       .then((res) => {
  //         cart = res.data.result;
  //       })
  //       .catch(async (err) => {
  //         const data: any = await axios.get(
  //           `${URL_ENV}/carts/customer/${auth?.payload?._id}`
  //         );
  //         cart = data.data.cart;
  //         console.log("««««« err »»»»»", err.response.data.ok);
  //       });
  //     getDataServer(cart, auth?.payload?._id);
  //   }
  // }, [auth?.payload, getDataServer]);

  return (
    <>
      {/* <NavBar /> */}

      <NavabarTailwind />
      <div className="pt-5"></div>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
