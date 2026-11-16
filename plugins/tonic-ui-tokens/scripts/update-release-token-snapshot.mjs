#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

try {
  if (process.argv.length !== 2) {
    throw new Error('Release snapshot updater does not accept arguments.');
  }

  const git = (...args) => execFileSync('git', args, { cwd: repoRoot, stdio: ['ignore', 'pipe', 'pipe'] });
  const run = (script, args = []) => execFileSync(process.execPath, [join(repoRoot, script), ...args], { cwd: repoRoot, stdio: 'inherit' });
  const head = git('rev-parse', '--verify', 'HEAD^{commit}').toString().trim();
  const manifestPath = 'plugins/tonic-ui-tokens/.claude-plugin/plugin.json';
  const snapshotPath = 'plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/tokens.json';

  const baseline = JSON.parse(git('show', `${head}:${manifestPath}`).toString());
  if (typeof baseline.version !== 'string' || !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(baseline.version)) {
    throw new Error('Invalid HEAD tokens plugin version.');
  }
  const previous = git('ls-tree', head, '--', snapshotPath).length > 0 ? git('show', `${head}:${snapshotPath}`) : null;

  // 1. Generate the source-derived token snapshot.
  run('plugins/tonic-ui-tokens/scripts/generate-token-inventory.mjs');

  // 2. Set the tokens plugin patch to the fixed HEAD patch + 1 when the snapshot changed.
  const generated = readFileSync(join(repoRoot, snapshotPath));
  if (previous === null || !generated.equals(previous)) {
    const current = JSON.parse(readFileSync(join(repoRoot, manifestPath), 'utf8'));
    const [major, minor, patch] = baseline.version.split('.');
    const next = `${major}.${minor}.${BigInt(patch) + 1n}`;
    if (current.version !== next) {
      current.version = next;
      writeFileSync(join(repoRoot, manifestPath), `${JSON.stringify(current, null, 2)}\n`);
    }
  }

  // 3. Synchronize Claude catalog metadata with the plugin manifests.
  run('scripts/plugins/sync-plugin-marketplace-metadata.mjs', ['--write']);

  // 4. Validate token data.
  run('plugins/tonic-ui-tokens/scripts/validate-tokens.mjs');

  // 5. Validate plugins against the fixed HEAD baseline.
  run('scripts/plugins/validate-plugins.mjs', ['--base', 'HEAD']);

  // 6. Validate plugin marketplace metadata and catalog structure.
  run('scripts/plugins/validate-plugin-marketplace.mjs');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
