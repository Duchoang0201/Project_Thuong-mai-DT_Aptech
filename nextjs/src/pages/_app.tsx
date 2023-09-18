import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavabarTailwind from "@/compenents/Navbar/NavabarTailwind";
import { SessionProvider } from "next-auth/react";
import Footer from "@/compenents/Footer/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="flex flex-col h-screen justify-between">
        <NavabarTailwind />
        <div className="pt-5"></div>
        <Component {...pageProps} />
        <Footer />
      </div>
    </SessionProvider>
  );
}
