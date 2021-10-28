import mdxPlugin from '@next/mdx';
import withCSS from '@zeit/next-css';
import dotenv from 'dotenv-flow';
import withPlugins from 'next-compose-plugins';
import remarkEmoji from 'remark-emoji';
import remarkImages from 'remark-images';

dotenv.config();

const withMDX = mdxPlugin({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkEmoji,
      remarkImages,
    ],
  }
});

export default withPlugins([
  withCSS,
  withMDX(),
  {
    env: {
      PUBLIC_URL: process.env.PUBLIC_URL || '',
      GA_TRACKING_ID: 'UA-187145735-1',
    },
    assetPrefix: process.env.ASSET_PREFIX,
    distDir: 'build',
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  }
]);
