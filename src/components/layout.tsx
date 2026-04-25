import { inter, montserrat, audiowide } from "@/styles/fonts";
import { ReactNode } from "react";
import Header from "./header";
import Footer from "@/components/footer";
import Head from "next/head";
import OpenGraph from "./openGraph";
interface LayoutProps {
  children: ReactNode; //React.ReactNode
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <OpenGraph title="FastLift" />
      <Head>
        <title>FastLift</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        className={`${inter.variable} ${audiowide.variable} ${montserrat.variable} font-body min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>

        <Footer />
      </div>
    </>
  );
}
