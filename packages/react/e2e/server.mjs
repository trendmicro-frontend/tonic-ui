import { context } from 'esbuild';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const host = process.env.E2E_HOST || '127.0.0.1';
const build = await context({
  absWorkingDir: root,
  entryPoints: ['fixture.jsx'],
  bundle: true,
  write: false,
  outfile: 'public/app.js',
  loader: { '.js': 'jsx' },
  jsx: 'automatic',
  jsxImportSource: '@emotion/react',
  define: { 'process.env.NODE_ENV': JSON.stringify(process.env.E2E_NODE_ENV || 'development') },
  sourcemap: 'inline',
});
const server = await build.serve({
  host,
  port: Number(process.env.E2E_PORT || 0),
  servedir: resolve(root, 'public'),
});
process.stdout.write(`E2E_REACT_URL=http://${host}:${server.port}/\n`);

const stop = async () => {
  await build.dispose();
  process.exit(0);
};
process.once('SIGINT', stop);
process.once('SIGTERM', stop);
