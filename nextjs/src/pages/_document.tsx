import { Html, Head, Main, NextScript } from "next/document";
import Provider from "./Provider";
import Footer from "@/compenents/Footer/Footer";

export default function Document() {
  return (
    <Html lang="en">
      <title>Jewelry Shop</title>
      <Head />
      <body>
        <Provider>
          <Main />
          <NextScript />
        </Provider>
      </body>
    </Html>
  );
}
