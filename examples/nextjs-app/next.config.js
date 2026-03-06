/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      enabled: true,
    },
  },
  transpilePackages: ['@alisaitteke/seatmap-canvas'],
};

module.exports = nextConfig;
