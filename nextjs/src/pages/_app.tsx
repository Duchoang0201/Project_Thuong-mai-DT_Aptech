import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavabarTailwind from "@/compenents/Navbar/NavabarTailwind";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <NavabarTailwind />
      <div className="pt-5"></div>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
