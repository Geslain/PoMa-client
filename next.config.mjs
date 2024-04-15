/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://github.com",
        port: "",
        pathname: "/Geslain/PoMa/**",
      },
    ],
  },
};

export default nextConfig;
