#!/usr/bin/env node
import { existsSync, lstatSync, readFileSync, readdirSync, readlinkSync, realpathSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual, parseArgs } from 'node:util';
import { buildTokenInventory } from './source-theme.mjs';
import { validatePluginIsolation } from './validate-plugin-isolation.mjs';

const require = createRequire(import.meta.url);
const { parse: parseYaml } = require('yaml');
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const externalRoot = join(repoRoot, 'skills/external');
const tokenRoot = join(externalRoot, 'tonic-ui-tokens');
const json = (path) => JSON.parse(readFileSync(path, 'utf8'));
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const groups = {
  internal: ['tonic-ui-patterns', 'tonic-ui-pr', 'tonic-ui-slots', 'tonic-ui-sx', 'tonic-ui-types', 'tonic-ui-version'].sort(),
  external: ['tonic-ui-dev', 'tonic-ui-tokens', 'tonic-ui-upgrade'].sort(),
};
const inside = (root, target) => {
  const path = relative(root, target);
  return path !== '..' && !path.startsWith('../') && !path.startsWith('..\\');
};

try {
  const { values } = parseArgs({ options: { inventory: { type: 'string' }, mappings: { type: 'string' } } });
  const inventory = json(values.inventory ? resolve(values.inventory) : join(tokenRoot, 'assets/tokens.json'));
  const expected = buildTokenInventory(repoRoot);
  const actualPaths = new Map(inventory.tokens.map((token) => [token.path, token]));
  const expectedPaths = new Set(expected.tokens.map((token) => token.path));
  assert(actualPaths.size === inventory.tokens.length, 'Duplicate paths in token inventory.');
  for (const token of expected.tokens) {
    assert(actualPaths.has(token.path), `Missing source token: ${token.path}`);
    assert(isDeepStrictEqual(actualPaths.get(token.path), token), `Stale source token: ${token.path}`);
  }
  for (const path of actualPaths.keys()) assert(expectedPaths.has(path), `Unknown source token: ${path}`);
  const comparable = { ...expected, meta: { ...expected.meta, sourceRevision: inventory.meta.sourceRevision } };
  assert(isDeepStrictEqual(inventory, comparable), 'Token inventory metadata or source fingerprints differ.');

  const mappings = json(values.mappings ? resolve(values.mappings) : join(tokenRoot, 'assets/figma-mappings.json'));
  assert(mappings.schemaVersion === 1, 'Unsupported Figma mapping schema.');
  const statuses = new Set(['verified', 'family-mapping', 'source-conflict', 'design-only', 'composed']);
  for (const mapping of mappings.mappings) {
    assert(typeof mapping.figma === 'string' && mapping.figma.length > 0, 'Missing Figma name.');
    assert(statuses.has(mapping.status), `Invalid mapping status: ${mapping.figma}`);
    assert(mapping.source?.contentId && mapping.source?.version && mapping.source?.row, `Missing mapping provenance: ${mapping.figma}`);
    assert(mappings.sources.some((source) => source.contentId === mapping.source.contentId && source.version === mapping.source.version),
      `Undeclared mapping source: ${mapping.figma}`);
    if (mapping.path) assert(actualPaths.has(mapping.path), `Invalid mapped token target: ${mapping.path}`);
    if (mapping.status === 'verified') assert(mapping.path, `Verified mapping has no implemented target: ${mapping.figma}`);
    if (mapping.status === 'design-only') assert(mapping.path === null, `Design-only mapping invents a target: ${mapping.figma}`);
    for (const path of Object.values(mapping.properties ?? {})) assert(actualPaths.has(path), `Invalid typography target: ${path}`);
  }

  for (const [group, names] of Object.entries(groups)) {
    const skillRoot = join(repoRoot, 'skills', group);
    const directories = readdirSync(skillRoot).filter((name) => !name.startsWith('.') && lstatSync(join(skillRoot, name)).isDirectory()).sort();
    assert(isDeepStrictEqual(directories, names), `Unexpected physical skills in ${group}.`);
    for (const name of names) {
      const directory = join(skillRoot, name);
      const content = readFileSync(join(directory, 'SKILL.md'), 'utf8');
      const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
      assert(frontmatter, `Missing skill frontmatter: ${name}`);
      const metadata = parseYaml(frontmatter[1]);
      assert(metadata.name === name && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) && name.length <= 64, `Invalid skill name: ${name}`);
      assert(typeof metadata.description === 'string' && metadata.description.trim().length > 0 && metadata.description.length <= 1024, `Invalid description: ${name}`);
      assert(content.split('\n').length <= 500, `Skill exceeds 500 lines: ${name}`);
      if (metadata.metadata) assert(Object.values(metadata.metadata).every((value) => typeof value === 'string'), `Custom metadata must contain strings: ${name}`);
      assert(!metadata['allowed-tools'] && metadata['disable-model-invocation'] === undefined, `Host-specific skill controls: ${name}`);
      if (group === 'internal') {
        for (const platform of ['.agents', '.claude']) {
          const adapter = join(repoRoot, platform, 'skills', name);
          assert(lstatSync(adapter).isSymbolicLink() && readlinkSync(adapter) === `../../skills/internal/${name}`, `Invalid ${platform} adapter: ${name}`);
          assert(realpathSync(adapter) === realpathSync(directory), `Adapter does not resolve canonical source: ${name}`);
        }
      }
      const markdownFiles = [];
      const visit = (path) => {
        for (const entry of readdirSync(path, { withFileTypes: true })) {
          const child = join(path, entry.name);
          assert(!entry.isSymbolicLink(), `Skill package contains a resource symlink: ${child}`);
          if (entry.isDirectory()) visit(child);
          else if (entry.name.endsWith('.md')) markdownFiles.push(child);
        }
      };
      visit(directory);
      for (const markdownFile of markdownFiles) {
        for (const match of readFileSync(markdownFile, 'utf8').matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)) {
          const link = match[1].split('#')[0];
          if (!link || /^[a-z][a-z0-9+.-]*:/i.test(link) || link.startsWith('/')) continue;
          const target = resolve(dirname(markdownFile), link);
          assert(existsSync(target), `Missing linked skill resource: ${markdownFile} -> ${link}`);
          if (group === 'external') assert(inside(externalRoot, realpathSync(target)), `External resource escapes plugin root: ${link}`);
        }
      }
    }
  }
  for (const platform of ['.agents', '.claude']) {
    assert(isDeepStrictEqual(readdirSync(join(repoRoot, platform, 'skills')).sort(), groups.internal), `Native adapters must contain only internal skills in ${platform}.`);
  }

  validatePluginIsolation(externalRoot);

  // One shared manifest serves every client: Codex 0.155.1 and omp both read
  // .claude-plugin/plugin.json, and an actual isolated install proved it loads.
  const manifest = json(join(externalRoot, '.claude-plugin/plugin.json'));
  const claudeCatalog = json(join(repoRoot, '.claude-plugin/marketplace.json'));
  const codexCatalog = json(join(repoRoot, '.agents/plugins/marketplace.json'));
  assert(manifest.name === 'tonic-ui', 'Invalid plugin identity.');
  const skillPaths = groups.external.map((name) => `./${name}`);
  assert(isDeepStrictEqual(manifest.skills, skillPaths), 'Manifest must name the three external skill directories; Codex rejects a bare ./ path and has no default skills/ directory to scan.');
  assert(claudeCatalog.name === 'tonic-ui' && claudeCatalog.plugins.length === 1 && claudeCatalog.plugins[0].name === manifest.name
    && claudeCatalog.plugins[0].source === './skills/external' && claudeCatalog.plugins[0].version === manifest.version, 'Invalid Claude marketplace source/identity.');
  assert(codexCatalog.name === claudeCatalog.name && codexCatalog.plugins.length === 1 && codexCatalog.plugins[0].name === manifest.name
    && codexCatalog.plugins[0].source.source === 'local' && codexCatalog.plugins[0].source.path === './skills/external', 'Invalid Codex local marketplace source.');
  for (const field of ['mcpServers', 'hooks', 'settings', 'lspServers']) assert(manifest[field] === undefined, `Unexpected plugin capability: ${field}`);
  for (const redundant of ['.codex-plugin', '.cursor-plugin']) {
    assert(!existsSync(join(externalRoot, redundant)), `Redundant duplicate plugin manifest remains: ${redundant}`);
  }
  assert(!existsSync(join(repoRoot, '.claude-plugin/plugin.json')) && !existsSync(join(repoRoot, '.codex-plugin/plugin.json')), 'Obsolete repository-root plugin manifest remains.');
  assert(!existsSync(join(repoRoot, '.mcp.json')) && !existsSync(join(externalRoot, '.mcp.json')), 'MCP autostart entry remains.');
  assert(existsSync(join(repoRoot, 'packages/mcp/bin/cli.js')) && existsSync(join(repoRoot, 'tonic-ui-mcp.config.js')), 'Optional MCP implementation/config was removed.');
  console.log(JSON.stringify({ internalSkills: groups.internal.length, externalSkills: groups.external.length, tokens: inventory.meta.counts,
    mappings: mappings.mappings.length, themeCoverage: 'complete', adapters: 'canonical-relative-links', pluginBoundary: 'external-only' }));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
