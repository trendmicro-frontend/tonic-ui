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
      ASSET_PREFIX: process.env.ASSET_PREFIX,
      GA_TRACKING_ID: 'UA-187145735-1',
      TONIC_UI_V1_TAGNAME: process.env.TONIC_UI_V1_TAGNAME,
      TONIC_UI_V1_RELEASE_VERSION: process.env.TONIC_UI_V1_RELEASE_VERSION,
      TONIC_UI_V1_RELEASE_DOCUMENTATION: process.env.TONIC_UI_V1_RELEASE_DOCUMENTATION,
      TONIC_UI_V1_RELEASE_NOTES: process.env.TONIC_UI_V1_RELEASE_NOTES,
      TONIC_UI_V0_TAGNAME: process.env.TONIC_UI_V0_TAGNAME,
      TONIC_UI_V0_RELEASE_VERSION: process.env.TONIC_UI_V0_RELEASE_VERSION,
      TONIC_UI_V0_RELEASE_DOCUMENTATION: process.env.TONIC_UI_V0_RELEASE_DOCUMENTATION,
      TONIC_UI_V0_RELEASE_NOTES: process.env.TONIC_UI_V0_RELEASE_NOTES,
      TONIC_UI_MASTER_BRANCH_NAME: process.env.TONIC_UI_MASTER_BRANCH_NAME,
      TONIC_UI_MASTER_BRANCH_DOCUMENTATION: process.env.TONIC_UI_MASTER_BRANCH_DOCUMENTATION,
      TONIC_UI_MASTER_BRANCH_SOURCE_CODE: process.env.TONIC_UI_MASTER_BRANCH_SOURCE_CODE,
    },
    assetPrefix: process.env.ASSET_PREFIX,
    distDir: 'build',
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  },
]);
