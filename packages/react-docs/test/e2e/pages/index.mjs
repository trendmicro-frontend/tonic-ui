// Documentation-page contracts, discovered from the folder layout so a new page
// only needs a spec next to its route: `pages/integrations/cdn.spec.mjs` becomes
// project `integrations/cdn` at `/integrations/cdn/`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true })
  .flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });

export const tests = walk(root)
  .filter((file) => file.endsWith('.spec.mjs'))
  .map((file) => {
    const route = path.relative(root, file).replace(/\.spec\.mjs$/, '').split(path.sep).join('/');
    return {
      name: route,
      testMatch: `**/${route}.spec.mjs`,
      path: `/${route}/`,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));
