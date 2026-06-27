import { randomBytes } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import mdxPlugin from '@next/mdx';
import * as acorn from 'acorn';
import dotenv from 'dotenv-flow';
import { ensureString } from 'ensure-type';
import { h } from 'hastscript';
import { mdxJsx } from 'micromark-extension-mdx-jsx';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdxJsxFromMarkdown } from 'mdast-util-mdx-jsx';
import withSVGR from 'next-plugin-svgr';
import remarkEmoji from 'remark-emoji';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGFM from 'remark-gfm';
import remarkImages from 'remark-images';
import remarkMdxCodeMeta from 'remark-mdx-code-meta';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';

const getIsDirectory = x => fs.existsSync(x) && fs.lstatSync(x).isDirectory();

const mapMarkdownToSyntaxTree = (markdown) => {
  const tree = fromMarkdown(markdown.trim(), {
    // https://github.com/syntax-tree/mdast-util-from-markdown#options
    extensions: [mdxJsx({
      // https://github.com/micromark/micromark-extension-mdx-jsx#mdxjsxoptions
      acorn,
      addResult: true, // add `estree` fields to tokens with results from acorn
    })],
    mdastExtensions: [mdxJsxFromMarkdown()]
  });
  return tree;
};

/**
 * Transforms
 *
 * ```
 * import Component from '../../components/Component';
 * ```
 *
 * into
 *
 * ```
 * import Component from '@/components/Component';
 * ```
 */
const transformRelativeImportsToAbsoluteImports = (content, options) => {
  const {
    rootdir,
    filedir,
  } = options;

  const reImportStatement = /^import\s'([^']+)'|import\s[\s\S]*?\sfrom\s+'([^']+)'/gm;
  const reRelativeImport = /(?<importPath>^\..*)/;

  content = content.replaceAll(reImportStatement, (match, p1, p2) => {
    const p = p2 ?? p1;
    const relativeImportMatch = p.match(reRelativeImport);
    if (relativeImportMatch) {
      return match.replace(p, '@/' + path.relative(rootdir, path.resolve(filedir, relativeImportMatch.groups.importPath)));
    }

    return match;
  });

  return content;
};

// @ref: https://github.com/mui/material-ui/blob/master/docs/src/modules/sandbox/Dependencies.ts
const extractLocalImportFiles = (content, options) => {
  const files = {};

  const reImportStatement = /^import\s'([^']+)'|import\s[\s\S]*?\sfrom\s+'([^']+)'/gm;
  let r = null;

  while ((r = reImportStatement.exec(content))) {
    const fullName = ensureString(r[2] ?? r[1]);
    const localImportMatch = fullName.match(/^@\/(?<importPath>.*)/);
    if (localImportMatch !== null) {
      const { rootdir } = options;

      const filepath = (() => {
        const importPath = localImportMatch.groups.importPath;
        const isDirectory = getIsDirectory(path.resolve(rootdir, importPath));
        if (isDirectory) {
          return path.resolve(rootdir, importPath, 'index.js');
        }
        if (path.extname(importPath) === '') {
          return path.resolve(rootdir, importPath + '.js');
        }
        return path.resolve(rootdir, importPath);
      })();
      const filedir = path.dirname(filepath);

      const file = path.relative(rootdir, filepath);
      files[`src/${file}`] = transformRelativeImportsToAbsoluteImports(fs.readFileSync(filepath, 'utf8').trim(), { rootdir, filedir });
      Object.assign(files, extractLocalImportFiles(files[`src/${file}`], { rootdir }));
    }
  }

  return files;
};

dotenv.config();

// Load version configuration
const versionConfig = await import('../../tonic-ui-version.config.js').then(m => m.default);

// Build per-version environment variables for explicit Next.js inlining.
// Next.js only inlines statically-referenced process.env.FOO; dynamic key access
// (process.env[computedKey]) stays empty in the browser bundle unless each var is
// enumerated here explicitly.
const buildVersionEnvVars = () => {
  const envVars = {};
  versionConfig.versions.forEach(({ label, prerelease = false }) => {
    const prefix = `TONIC_UI_${label.toUpperCase()}`;
    envVars[`${prefix}_BRANCH`] = process.env[`${prefix}_BRANCH`];
    envVars[`${prefix}_DOCUMENTATION`] = process.env[`${prefix}_DOCUMENTATION`];
    envVars[`${prefix}_SOURCE_CODE`] = process.env[`${prefix}_SOURCE_CODE`];
    envVars[`${prefix}_TAGNAME`] = process.env[`${prefix}_TAGNAME`];
    envVars[`${prefix}_RELEASE_VERSION`] = process.env[`${prefix}_RELEASE_VERSION`];
    envVars[`${prefix}_RELEASE_DOCUMENTATION`] = process.env[`${prefix}_RELEASE_DOCUMENTATION`];
    envVars[`${prefix}_RELEASE_NOTES`] = process.env[`${prefix}_RELEASE_NOTES`];
    // Bake the prerelease flag as a string so Header.js can read it without dynamic key access
    envVars[`${prefix}_PRERELEASE`] = String(prerelease);
  });
  return envVars;
};

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
          const rootdir = process.cwd();

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
             * <Demo
             *   component={DemoComponent$1}
             *   file={{ data, path }}
             *   sandbox={{ files, raw, title }}
             * />
             * ```
             */
            const re = new RegExp(/render\(['"]([^'"]+)['"](?:,\s*({.*}))?\)/);
            const results = node.value.match(re);
            if (!results) {
              return;
            }

            let newNode = null;

            const importName = `DemoComponent$${index}`;
            const importPath = results[1];
            const renderOptionExpression = ensureString(results[2]) || '{}';

            newNode = {
              type: 'mdxjsEsm',
              value: `import ${importName} from '${importPath}'`,
            };
            newNode.data = {
              estree: acorn.parse(newNode.value, {
                ecmaVersion: '2020',
                sourceType: 'module',
              }),
            };
            tree.children.unshift(newNode);

            renderExpressionCount++;

            const filepath = (() => {
              const filedir = path.dirname(file.path);
              const isDirectory = getIsDirectory(path.resolve(filedir, importPath));
              if (isDirectory) {
                return path.resolve(filedir, importPath, 'index.js');
              }
              if (path.extname(importPath) === '') {
                return path.resolve(filedir, importPath + '.js');
              }
              return path.resolve(filedir, importPath);
            })();
            const filedir = path.dirname(filepath);

            const data = fs.readFileSync(filepath, 'utf8').trim();
            const sandbox = {};
            sandbox.raw = transformRelativeImportsToAbsoluteImports(data, { rootdir, filedir });
            sandbox.files = extractLocalImportFiles(sandbox.raw, { rootdir });
            sandbox.title = 'Tonic UI';

            newNode = mapMarkdownToSyntaxTree(`
              <Demo
                {...${renderOptionExpression}}
                component={${importName}}
                file={{
                  data: ${JSON.stringify(data)},
                  path: ${JSON.stringify(path.relative(rootdir, file.path))},
                }}
                sandbox={{
                  files: ${JSON.stringify(sandbox.files)},
                  raw: ${JSON.stringify(sandbox.raw)},
                  title: ${JSON.stringify(sandbox.title)},
                }}
              />
            `).children[0];

            Object.keys(node).forEach(key => {
              node[key] = undefined;
              delete node[key];
            });

            node.type = newNode.type;
            node.name = newNode.name;
            node.attributes = newNode.attributes;
            node.children = newNode.children;
          });

          if (renderExpressionCount > 0) {
            // Insert `import Demo from '../../components/Demo';` to the top of the MDX document
            // const relativePath = path.relative(path.dirname(file.path), rootdir);
            const newNode = {
              type: 'mdxjsEsm',
              value: 'import Demo from "@/components/Demo";',
            };
            newNode.data = {
              estree: acorn.parse(newNode.value, {
                ecmaVersion: '2020',
                sourceType: 'module',
              }),
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
plugins.push(withSVGR);

const initialNextConfig = {
  env: {
    // CI
    CI_COMMIT: process.env.CI_COMMIT,
    CI_PULL_REQUEST_NUMBER: process.env.CI_PULL_REQUEST_NUMBER,
    // Content Security Policy
    NONCE: randomBytes(16).toString('base64'),
    // Matomo
    MATOMO_URL: process.env.MATOMO_URL,
    MATOMO_CONTAINER_ID: process.env.MATOMO_CONTAINER_ID,
    // Algolia
    ALGOLIA_APPLICATION_ID: '7V00GBK8V8',
    ALGOLIA_SEARCH_API_KEY: 'c87cfe40f6ec7c43d4caf4316afd1816',
    ALGOLIA_INDEX_NAME: 'tonic-ui-v2',
    // common
    TONIC_UI_REACT_DOCS_BASE_PATH: process.env.TONIC_UI_REACT_DOCS_BASE_PATH,
    TONIC_UI_REACT_DOCS_URL: process.env.TONIC_UI_REACT_DOCS_URL,
    TONIC_UI_REACT_DOCS_VERSION: process.env.TONIC_UI_REACT_DOCS_VERSION,
    TONIC_UI_REACT_PACKAGE_VERSION: process.env.TONIC_UI_REACT_PACKAGE_VERSION,
    TONIC_UI_REPO_ROOT: process.env.TONIC_UI_REPO_ROOT,
    TONIC_UI_VERSION_LABELS: process.env.TONIC_UI_VERSION_LABELS,
    // Space-separated prerelease labels baked from version config (e.g. "v3").
    // A single literal key that Next.js can inline — avoids dynamic process.env[computedKey] access.
    TONIC_UI_PRERELEASE_LABELS: versionConfig.versions.filter(v => v.prerelease).map(v => v.label).join(' '),
    // Per-version variables (dynamically generated from tonic-ui-version.config.js)
    ...buildVersionEnvVars(),
  },
  basePath: process.env.TONIC_UI_REACT_DOCS_BASE_PATH,
  distDir: process.env.NODE_ENV === 'production' ? 'dist' : 'build',
  output: process.env.NODE_ENV === 'production' ? 'export' : 'standalone',
  pageExtensions: ['page.js', 'page.mdx'],
  trailingSlash: true,
};

const transformNextConfig = () => plugins.reduce((acc, next) => next(acc), initialNextConfig);

export default transformNextConfig;
