/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "localhost",
      "upload.wikimedia.org",
      "vivnpay.vn",
      "encrypted-tbn0.gstatic.com",
      "data-server-shop.onrender.com",
      "ip-api.com",
    ],
    loader: "default",
  },
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_SECRET: process.env.NEXT_PUBLIC_SECRET,
  },
};

module.exports = nextConfig;
