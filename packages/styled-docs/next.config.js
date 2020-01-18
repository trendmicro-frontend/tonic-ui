require('dotenv-flow').config();

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      require('remark-emoji'),
      require('remark-images'),
    ],
  }
});
const withCSS = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
  withMDX({
    assetPrefix: process.env.ASSET_PREFIX || './',
    distDir: 'build',
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  }),
  withCSS,
]);
