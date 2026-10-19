import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

function findCheckout(start) {
  let directory = resolve(start);
  while (true) {
    if (existsSync(join(directory, '.git'))
        && existsSync(join(directory, 'tonic-ui-version.config.js'))
        && existsSync(join(directory, 'packages/react-docs/pages'))) {
      return directory;
    }
    const parent = dirname(directory);
    if (parent === directory) return undefined;
    directory = parent;
  }
}

// The active checkout takes precedence when a skill is loaded from a plugin
// cache. A source-checkout invocation still works from an unrelated CWD.
export function resolveRepoRoot(scriptDirectory) {
  const root = findCheckout(process.cwd()) ?? findCheckout(scriptDirectory);
  if (!root) {
    console.error('A Tonic UI checkout is required; run from its root or a subdirectory.');
    process.exit(1);
  }
  return root;
}
