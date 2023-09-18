import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavabarTailwind from "@/compenents/Navbar/NavabarTailwind";
import { SessionProvider } from "next-auth/react";
import Footer from "@/compenents/Footer/Footer";

export default function App({ Component, pageProps }: AppProps) {
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
  const url = "http://locahost:4444";
  return (
    <SessionProvider session={pageProps.session}>
      <NavabarTailwind />
      <div className="pt-5"></div>
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}
