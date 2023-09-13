import { Html, Head, Main, NextScript } from "next/document";
import Proivers from "./Proivers";

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
