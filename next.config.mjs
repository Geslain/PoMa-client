/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jaimelesstartups.fr",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
