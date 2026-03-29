import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagens.fastlift.com.br",
        port: "",
        pathname: "/**", // Permite todas as pastas dentro do domínio
      },
    ],
  },
};

export default nextConfig;
