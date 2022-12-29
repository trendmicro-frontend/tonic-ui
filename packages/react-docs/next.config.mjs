import mdxPlugin from '@next/mdx';
import dotenv from 'dotenv-flow';
import remarkEmoji from 'remark-emoji';
import remarkGFM from 'remark-gfm';
import remarkImages from 'remark-images';
import remarkMdxCodeMeta from 'remark-mdx-code-meta';

dotenv.config();

const plugins = [];

const withMDX = mdxPlugin({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkEmoji,
      remarkGFM,
      remarkImages,
      remarkMdxCodeMeta,
    ],
    providerImportSource: '@mdx-js/react',
  }
});

plugins.push(withMDX);

const nextConfig = {
  env: {
    BASE_PATH: process.env.BASE_PATH,
    // Matomo
    MATOMO_URL: process.env.MATOMO_URL,
    MATOMO_CONTAINER_ID: process.env.MATOMO_CONTAINER_ID,
    // Google Analytics
    GA_TRACKING_ID: 'UA-187145735-1',
    // Algolia
    ALGOLIA_APPLICATION_ID: '7V00GBK8V8',
    ALGOLIA_API_KEY: 'c87cfe40f6ec7c43d4caf4316afd1816',
    ALGOLIA_INDEX_NAME: 'tonic-ui-v1',
    // see `.circleci/config.yml`
    TONIC_UI_REACT_VERSION: process.env.TONIC_UI_REACT_VERSION,
    // v1
    TONIC_UI_V1_BRANCH: process.env.TONIC_UI_V1_BRANCH,
    TONIC_UI_V1_DOCUMENTATION: process.env.TONIC_UI_V1_DOCUMENTATION,
    TONIC_UI_V1_SOURCE_CODE: process.env.TONIC_UI_V1_SOURCE_CODE,
    TONIC_UI_V1_TAGNAME: process.env.TONIC_UI_V1_TAGNAME,
    TONIC_UI_V1_RELEASE_VERSION: process.env.TONIC_UI_V1_RELEASE_VERSION,
    TONIC_UI_V1_RELEASE_DOCUMENTATION: process.env.TONIC_UI_V1_RELEASE_DOCUMENTATION,
    TONIC_UI_V1_RELEASE_NOTES: process.env.TONIC_UI_V1_RELEASE_NOTES,
    // v0
    TONIC_UI_V0_BRANCH: process.env.TONIC_UI_V0_BRANCH,
    TONIC_UI_V0_DOCUMENTATION: process.env.TONIC_UI_V0_DOCUMENTATION,
    TONIC_UI_V0_SOURCE_CODE: process.env.TONIC_UI_V0_SOURCE_CODE,
    TONIC_UI_V0_TAGNAME: process.env.TONIC_UI_V0_TAGNAME,
    TONIC_UI_V0_RELEASE_VERSION: process.env.TONIC_UI_V0_RELEASE_VERSION,
    TONIC_UI_V0_RELEASE_DOCUMENTATION: process.env.TONIC_UI_V0_RELEASE_DOCUMENTATION,
    TONIC_UI_V0_RELEASE_NOTES: process.env.TONIC_UI_V0_RELEASE_NOTES,
    // default
    TONIC_UI_DEFAULT_BRANCH: process.env.TONIC_UI_DEFAULT_BRANCH,
    TONIC_UI_DEFAULT_DOCUMENTATION: process.env.TONIC_UI_DEFAULT_DOCUMENTATION,
    TONIC_UI_DEFAULT_SOURCE_CODE: process.env.TONIC_UI_DEFAULT_SOURCE_CODE,
  },
  basePath: process.env.BASE_PATH,
  distDir: 'build',
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
};

export default () => plugins.reduce((acc, next) => next(acc), nextConfig);
