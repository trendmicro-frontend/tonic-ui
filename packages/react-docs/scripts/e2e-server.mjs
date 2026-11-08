import { createReadStream } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import next from 'next';
import { SEARCH_INDEX_BASENAME, SEARCH_INDEX_DIR, SEARCH_MANIFEST_FILE } from '../search/config.mjs';

const port = Number(process.argv[2]);
const hostname = '0.0.0.0';
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const searchDir = path.join(rootDir, '.e2e', SEARCH_INDEX_DIR);
const indexPattern = new RegExp(`^${SEARCH_INDEX_BASENAME}\\.[0-9a-f]+\\.json$`);
const app = next({ dev: true, hostname, port, dir: rootDir });
const handle = app.getRequestHandler();

await app.prepare();
const basePath = (process.env.TONIC_UI_REACT_DOCS_BASE_PATH || '').replace(/\/$/, '');
const searchPrefix = `${basePath}/${SEARCH_INDEX_DIR}/`;

createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (!pathname.startsWith(searchPrefix)) {
    handle(req, res);
    return;
  }

  const filename = pathname.slice(searchPrefix.length);
  if ((req.method !== 'GET' && req.method !== 'HEAD') ||
    (filename !== SEARCH_MANIFEST_FILE && !indexPattern.test(filename))) {
    res.writeHead(404).end();
    return;
  }

  const stream = createReadStream(path.join(searchDir, filename));
  stream.once('error', (error) => {
    if (!res.headersSent) {
      res.writeHead(error.code === 'ENOENT' ? 404 : 500).end();
    } else {
      res.destroy(error);
    }
  });
  stream.once('open', () => {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    if (req.method === 'HEAD') {
      stream.destroy();
      res.end();
    } else {
      stream.pipe(res);
    }
  });
}).once('error', (error) => {
  console.error(error);
  process.exit(1);
}).listen(port, hostname, () => {
  console.log(`Local: http://localhost:${port}`);
});
