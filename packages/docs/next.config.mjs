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
      BASE_PATH: process.env.BASE_PATH,
      GA_TRACKING_ID: 'UA-187145735-1',
      // see `.circleci/config.yml`
      TONIC_UI_DOC_VERSION: process.env.TONIC_UI_DOC_VERSION,
      // v1
      TONIC_UI_V1_BRANCH: process.env.TONIC_UI_V1_BRANCH,
      TONIC_UI_V1_TAGNAME: process.env.TONIC_UI_V1_TAGNAME,
      TONIC_UI_V1_RELEASE_VERSION: process.env.TONIC_UI_V1_RELEASE_VERSION,
      TONIC_UI_V1_RELEASE_DOCUMENTATION: process.env.TONIC_UI_V1_RELEASE_DOCUMENTATION,
      TONIC_UI_V1_RELEASE_NOTES: process.env.TONIC_UI_V1_RELEASE_NOTES,
      TONIC_UI_V1_UNRELEASED_DOCUMENTATION: process.env.TONIC_UI_V1_UNRELEASED_DOCUMENTATION,
      TONIC_UI_V1_UNRELEASED_SOURCE_CODE: process.env.TONIC_UI_V1_UNRELEASED_SOURCE_CODE,
      // v0
      TONIC_UI_V0_BRANCH: process.env.TONIC_UI_V0_BRANCH,
      TONIC_UI_V0_TAGNAME: process.env.TONIC_UI_V0_TAGNAME,
      TONIC_UI_V0_RELEASE_VERSION: process.env.TONIC_UI_V0_RELEASE_VERSION,
      TONIC_UI_V0_RELEASE_DOCUMENTATION: process.env.TONIC_UI_V0_RELEASE_DOCUMENTATION,
      TONIC_UI_V0_RELEASE_NOTES: process.env.TONIC_UI_V0_RELEASE_NOTES,
      TONIC_UI_V0_UNRELEASED_DOCUMENTATION: process.env.TONIC_UI_V0_UNRELEASED_DOCUMENTATION,
      TONIC_UI_V0_UNRELEASED_SOURCE_CODE: process.env.TONIC_UI_V0_UNRELEASED_SOURCE_CODE,
      // default
      TONIC_UI_DEFAULT_BRANCH: process.env.TONIC_UI_DEFAULT_BRANCH,
      TONIC_UI_DEFAULT_DOCUMENTATION: process.env.TONIC_UI_DEFAULT_DOCUMENTATION,
      TONIC_UI_DEFAULT_SOURCE_CODE: process.env.TONIC_UI_DEFAULT_SOURCE_CODE,
    },
    basePath: process.env.BASE_PATH,
    assetPrefix: process.env.ASSET_PREFIX,
    distDir: 'build',
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  },
]);
