const withBundleAnalyzer = require('@next/bundle-analyzer');
const CopyPlugin = require('copy-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  experimental: { serverActions: true },
  webpack: (config, { isServer, dev }) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding', 'bufferutil', 'utf-8-validate');
    const wasm = isServer ? 'nodejs' : 'web';
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          `@noir-lang/acvm_js/${wasm}/acvm_js_bg.wasm`,
          `@noir-lang/noirc_abi/${wasm}/noirc_abi_wasm_bg.wasm`,
        ].map((from) => ({ from: require.resolve(from), to: dev ? 'vendor-chunks' : 'chunks' })),
      }),
    );
    return config;
  },
};

module.exports = JSON.parse(process.env.ANALYZE ?? 'false') ? withBundleAnalyzer(nextConfig) : nextConfig;
