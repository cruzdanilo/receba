import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  experimental: { serverActions: true },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding', 'bufferutil', 'utf-8-validate');
    return config;
  },
};

export default JSON.parse(process.env.ANALYZE ?? 'false') ? withBundleAnalyzer(nextConfig) : nextConfig;
