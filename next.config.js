/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "d-themes.com",
      "localhost",
      "product-express.nbadigitalservice.com",
      "192.168.1.23"
    ],
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

module.exports = nextConfig;
