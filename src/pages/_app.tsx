import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Script Principal do Google Analytics com o ID fixo */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-DLE0CW8HRQ"
        strategy="afterInteractive"
      />
      {/* Inicialização do Analytics */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-DLE0CW8HRQ');
        `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}
