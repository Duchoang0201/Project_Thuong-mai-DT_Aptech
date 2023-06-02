import NavBar from "@/compenents/Navbar/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "@/compenents/Footer/Footer";
import { useAuthStore } from "@/hook/useAuthStore";
import { useCartStore } from "@/hook/useCountStore";
import { useEffect, useMemo } from "react";
import axios from "axios";
import { zeroFormat } from "numeral";
const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";

export default function App({ Component, pageProps }: AppProps) {
  const { auth } = useAuthStore((state: any) => state);
  const { items, getDataServer, cartId } = useCartStore((state: any) => state);

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

  const handleGetCart2 = useMemo(async () => {
    let cart: any = [];

    if (auth?.payload?._id) {
      const checkCart = await axios.get(
        `${URL_ENV}/carts/customer/${auth?.payload?._id}`
      );

      if (checkCart.data.cart._id) {
        cart = checkCart.data.cart;
      } else {
        await axios
          .post(`${URL_ENV}/carts`, {
            customerId: auth?.payload?._id,
            products: [],
          })
          .then((res) => {
            cart = res.data.result;
          })
          .catch((err) => {
            console.log(
              "««««« err.data.response.message »»»»»",
              err.data.response.message
            );
          });
      }

      getDataServer(cart, auth?.payload?._id);
    }
  }, [auth?.payload?._id, getDataServer]);
  handleGetCart2;
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
