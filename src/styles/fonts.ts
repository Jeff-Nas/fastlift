import { Inter, Montserrat, Audiowide } from "next/font/google";

//body
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

//header
export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

//logo - só possui peso 400 - uma alternativa: Rajdhani
export const audiowide = Audiowide({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-audiowide",
});
