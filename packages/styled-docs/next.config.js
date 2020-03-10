require('dotenv-flow').config();

const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      require('remark-emoji'),
      require('remark-images'),
    ],
  }
});

module.exports = withPlugins([
  withCSS,
  withMDX(),
  {
    env: {
      PUBLIC_URL: process.env.PUBLIC_URL || '',
    },
    assetPrefix: process.env.ASSET_PREFIX || './',
    distDir: 'build',
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  }
]);
