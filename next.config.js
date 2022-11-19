/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "d-themes.com",
      "localhost",
      "nbadigitalservice.com",
      "product-express.nbadigitalservice.com",
      "192.168.1.59",
    ],
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

module.exports = nextConfig;
