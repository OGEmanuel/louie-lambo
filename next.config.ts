import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['github.githubassets.com', 'xumm.app'],
  },
};

export default nextConfig;
