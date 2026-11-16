import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { isDeepStrictEqual } from 'node:util';

export function validatePluginVersions(repoRoot, baseRef) {
  if (typeof repoRoot !== 'string' || typeof baseRef !== 'string' || !baseRef.trim()) {
    throw new Error('repoRoot and a nonempty baseRef must be strings.');
  }
  const git = (...args) => execFileSync('git', args, { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const base = git('rev-parse', '--verify', '--end-of-options', `${baseRef}^{commit}`).trim();
  const mergeBase = git('merge-base', 'HEAD', base).trim();
  const paths = new Set([
    ...git('diff', '--name-only', '-z', '--no-renames', mergeBase, '--', 'plugins/').split('\0'),
    ...git('ls-files', '--others', '--exclude-standard', '-z', '--', 'plugins/').split('\0'),
  ].filter(Boolean));
  const version = (value, name) => {
    if (typeof value !== 'string' || !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(value)) {
      throw new Error(`Invalid plugin version: ${name}: ${value}`);
    }
    return value.split('.').map(BigInt);
  };
  const changedPlugins = [];
  const newPlugins = [];
  const versionReviews = [];
  const guidance = 'Choose patch for compatible fixes, minor for backward-compatible capabilities, or major for incompatible instructions, outputs or CLI contracts. A file diff cannot determine compatibility; author review is required.';
  for (const entry of readdirSync(join(repoRoot, 'plugins'), { withFileTypes: true })) {
    if (entry.name.startsWith('.') || !entry.isDirectory()) {
      continue;
    }
    const name = entry.name;
    const prefix = `plugins/${name}/`;
    const manifestPath = `${prefix}.claude-plugin/plugin.json`;
    const current = JSON.parse(readFileSync(join(repoRoot, manifestPath), 'utf8'));
    const currentVersion = version(current.version, name);
    const listing = git('ls-tree', '-z', base, '--', manifestPath);
    if (!listing) {
      newPlugins.push(name);
      continue;
    }
    const previous = JSON.parse(git('show', `${base}:${manifestPath}`));
    const previousVersion = version(previous.version, `${name} (base)`);
    let comparison = 0;
    for (let index = 0; index < 3; index += 1) {
      if (currentVersion[index] !== previousVersion[index]) {
        comparison = currentVersion[index] > previousVersion[index] ? 1 : -1;
        break;
      }
    }
    const triggers = [...paths].filter((path) => {
      if (!path.startsWith(prefix)) {
        return false;
      }
      const local = path.slice(prefix.length);
      const parts = local.split('/');
      if (parts.some((part) => part === 'tests' || part === '__tests__')
          || /\.(test|spec)\./.test(parts.at(-1))
          || ['README.md', 'CHANGELOG.md', 'LICENSE'].includes(local)) {
        return false;
      }
      if (path === manifestPath) {
        // Content changes follow the merge-base diff, not a newer base branch.
        if (!git('ls-tree', '-z', mergeBase, '--', manifestPath)) {
          return true;
        }
        const old = JSON.parse(git('show', `${mergeBase}:${manifestPath}`));
        const { version: oldVersion, ...oldContent } = old;
        const { version: newVersion, ...newContent } = current;
        return !isDeepStrictEqual(oldContent, newContent);
      }
      return true;
    }).sort();
    if (triggers.length > 0) {
      changedPlugins.push(name);
      const [major, minor, patch] = previousVersion;
      versionReviews.push({
        plugin: name,
        baseVersion: previous.version,
        currentVersion: current.version,
        files: triggers,
        candidates: { patch: `${major}.${minor}.${patch + 1n}`, minor: `${major}.${minor + 1n}.0`, major: `${major + 1n}.0.0` },
        guidance,
      });
    }
    if (comparison < 0 || (triggers.length > 0 && comparison <= 0)) {
      throw new Error(`Plugin ${name}: base ${previous.version}, current ${current.version}; files: ${triggers.join(', ') || manifestPath}. Increase manifest.version, then run node scripts/plugins/sync-plugin-marketplace-metadata.mjs --write. ${guidance}`);
    }
  }
  return { base, changedPlugins: changedPlugins.sort(), newPlugins: newPlugins.sort(), versionReviews };
}
