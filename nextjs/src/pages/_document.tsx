import { Html, Head, Main, NextScript } from "next/document";
import Proivers from "./Proivers";
import Footer from "@/compenents/Footer/Footer";

export default function Document() {
  return (
    <Html lang="en">
      <title>Jewelry Shop</title>
      <Head />
      <body>
        <Proivers>
          <Main />
          <NextScript />
        </Proivers>
      </body>
    </Html>
  );
}
