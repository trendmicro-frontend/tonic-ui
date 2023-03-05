import fs from 'node:fs';
import path from 'node:path';
import mdxPlugin from '@next/mdx';
import { parse } from 'acorn-loose';
import dotenv from 'dotenv-flow';
import { h } from 'hastscript';
import remarkEmoji from 'remark-emoji';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGFM from 'remark-gfm';
import remarkImages from 'remark-images';
import remarkMdxCodeMeta from 'remark-mdx-code-meta';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';

dotenv.config();

const plugins = [];

const withMDX = mdxPlugin({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',

    // remark plugins operate on markdown before it is converted to HTML
    remarkPlugins: [
      remarkEmoji,
      remarkFrontmatter,
      remarkGFM,
      remarkImages,
      () => {
        return (tree, file) => {
          const basedir = process.cwd();
          const relativePath = path.relative(path.dirname(file.path), basedir);
          let renderExpressionCount = 0;

          visit(tree, 'mdxFlowExpression', function (node, index) {
            /*
             * This plugin will transform the code
             *
             * ```mdx
             * {render('./MyComponent')}
             * ```
             *
             * into the following statement
             *
             * ```mdx
             * import DemoComponent$1 from './MyComponent';
             *
             * <Demo component={DemoComponent$1} />
             * ```
             */
            const re = new RegExp(/\s*render\('(.*)'\)/);
            const results = node.value.match(re);
            if (!results) {
              return;
            }
            const importName = `DemoComponent$${index}`;
            const importPath = results[1];
            const newNode = {
              type: 'mdxjsEsm',
              value: `import ${importName} from '${importPath}'`,
            };
            newNode.data = {
              estree: parse(newNode.value),
            };
            tree.children.unshift(newNode);

            renderExpressionCount++;

            const filepath = path.resolve(path.dirname(file.path), importPath + '.js');
            const code = fs.readFileSync(filepath, 'utf8');

            node.position = {};
            node.value = undefined;
            node.type = 'mdxJsxFlowElement';
            node.name = 'Demo';
            node.attributes = [
              {
                type: 'mdxJsxAttribute',
                name: 'code',
                value: code,
              },
              {
                type: 'mdxJsxAttribute',
                name: 'component',
                value: {
                  type: 'mdxJsxAttributeValueExpression',
                  value: importName,
                  data: {
                    estree: parse(importName),
                  },
                },
              },
            ];
            node.children = [];
            node.data = {
              _mdxExplicitJsx: true,
            };
          });

          if (renderExpressionCount > 0) {
            // Insert `import Demo from '../../components/Demo';` to the top of the MDX document
            const newNode = {
              type: 'mdxjsEsm',
              value: `import Demo from "${relativePath}/components/Demo";`,
            };
            newNode.data = {
              estree: parse(newNode.value),
            };
            tree.children.unshift(newNode);
          }
        };
      },
      remarkMdxCodeMeta,
    ],

    // rehype plugins operate on the HTML after it has been generated
    rehypePlugins: [
      [
        // wraps the generated HTML content within a "div" element with the class "main-content"
        //
        // <main>
        //   <div class="main-content" id="main-content" />
        // </main>
        () => (ast) => {
          ast.children = [
            {
              type: 'element',
              tagName: 'div',
              properties: {
                class: 'main-content',
                id: 'main-content',
              },
              children: ast.children,
            },
          ];
        },
      ],

      // adds "id" attribute to headings
      // https://github.com/rehypejs/rehype-slug
      [rehypeSlug],

      // adds links to headings
      // https://github.com/rehypejs/rehype-autolink-headings
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          content: () => {
            // https://github.com/syntax-tree/hast
            return [
              h('svg', [
                h('use', { 'xlink:href': '#anchor-link-icon' }),
              ]),
            ];
          },
          properties: {
            ariaHidden: true,
            className: 'anchor-link',
            tabIndex: -1,
          },
          test: ['h2', 'h3', 'h4', 'h5', 'h6'],
        },
      ],
    ],
  }
});

plugins.push(withMDX);

const initialNextConfig = {
  env: {
    BASE_PATH: process.env.BASE_PATH,
    // Matomo
    MATOMO_URL: process.env.MATOMO_URL,
    MATOMO_CONTAINER_ID: process.env.MATOMO_CONTAINER_ID,
    // Algolia
    ALGOLIA_APPLICATION_ID: '7V00GBK8V8',
    ALGOLIA_SEARCH_API_KEY: 'c87cfe40f6ec7c43d4caf4316afd1816',
    ALGOLIA_INDEX_NAME: 'tonic-ui-v1',
    // see `.circleci/config.yml`
    TONIC_UI_REACT_DOCS_VERSION: process.env.TONIC_UI_REACT_DOCS_VERSION,
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

const transformNextConfig = () => plugins.reduce((acc, next) => next(acc), initialNextConfig);

export default transformNextConfig;
