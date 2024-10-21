/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-domain.com', 'another-domain.com', 'new-domain.com'], // Add any new domains here
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(mpwebm)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
          name: '[name].[hash].[ext]',
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
