#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, realpathSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual, parseArgs } from 'node:util';
import { validatePluginVersions } from './lib/validate-plugin-versions.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const linkPattern = /\[[^\]]*\]\(([^\s)]+)\)/g;
const json = (root, path) => {
  try {
    return JSON.parse(readFileSync(join(root, path), 'utf8'));
  } catch (error) {
    throw new Error(`Invalid JSON: ${path}: ${error.message}`);
  }
};
const inside = (root, target) => {
  const path = relative(root, target);
  return path !== '..' && !path.startsWith('../') && !path.startsWith('..\\');
};
const isLocalLink = (link) => Boolean(link) && !/^[a-z][a-z0-9+.-]*:/i.test(link) && !link.startsWith('/');

/** Independent plugins; each declares and bundles exactly one skill. */
export const PLUGIN_NAMES = ['tonic-ui-dev', 'tonic-ui-tokens', 'tonic-ui-upgrade'].sort();

const markdownFiles = (directory) => {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const child = join(directory, entry.name);
    assert(!entry.isSymbolicLink(), `Skill package contains a resource symlink: ${child}`);
    if (entry.isDirectory()) {
      files.push(...markdownFiles(child));
    } else if (entry.name.endsWith('.md')) {
      files.push(child);
    }
  }
  return files;
};

function validateSkillBoundary(root, name, pluginRoot) {
  const skillRoot = join(pluginRoot, 'skills', name);
  for (const markdownFile of markdownFiles(skillRoot)) {
    for (const match of readFileSync(markdownFile, 'utf8').matchAll(linkPattern)) {
      const link = match[1].split('#')[0];
      if (!isLocalLink(link)) {
        continue;
      }
      const target = resolve(dirname(markdownFile), link);
      assert(existsSync(target), `Missing linked plugin resource: ${relative(root, markdownFile)} -> ${link}`);
      assert(inside(realpathSync(pluginRoot), realpathSync(target)), `Resource escapes its independent plugin: ${link}`);
    }
  }
}

export function validatePlugins(root, { baseRef } = {}) {
  const pluginsRoot = join(root, 'plugins');
  const directories = readdirSync(pluginsRoot, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith('.') && entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  assert(isDeepStrictEqual(directories, PLUGIN_NAMES), 'Unexpected physical directories in plugins.');
  for (const name of PLUGIN_NAMES) {
    const pluginRoot = join(pluginsRoot, name);
    const manifestPath = `plugins/${name}/.claude-plugin/plugin.json`;
    assert(existsSync(join(pluginRoot, '.claude-plugin/plugin.json')), `Missing plugin manifest: ${name}`);
    const manifest = json(root, manifestPath);
    assert(manifest?.name === name && typeof manifest.version === 'string' && /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(manifest.version), `Invalid plugin identity/version: ${name}`);
    assert(isDeepStrictEqual(manifest.skills, [`./skills/${name}`]), `Plugin must explicitly declare its skill: ${name}`);
    const skillsRoot = join(pluginRoot, 'skills');
    const skillRoot = join(skillsRoot, name);
    const realPluginRoot = realpathSync(pluginRoot);
    assert(inside(realPluginRoot, realpathSync(skillsRoot)), `Skills directory escapes its independent plugin: ${name}`);
    assert(isDeepStrictEqual(readdirSync(skillsRoot).sort(), [name]), `Unexpected bundled skills: ${name}`);
    assert(inside(realPluginRoot, realpathSync(skillRoot)), `Bundled skill escapes its independent plugin: ${name}`);
    for (const field of ['mcpServers', 'hooks', 'settings', 'lspServers']) {
      assert(manifest[field] === undefined, `Unexpected plugin capability: ${name}/${field}`);
    }
    for (const redundant of ['.codex-plugin', '.cursor-plugin', '.mcp.json']) {
      assert(!existsSync(join(pluginRoot, redundant)), `Unexpected duplicate manifest/autostart: ${name}/${redundant}`);
    }
    validateSkillBoundary(root, name, pluginRoot);
  }

  assert(!existsSync(join(root, '.claude-plugin/plugin.json')) && !existsSync(join(root, '.codex-plugin/plugin.json')), 'Obsolete repository-root plugin manifest remains.');
  assert(!existsSync(join(root, '.mcp.json')), 'MCP autostart entry remains.');
  assert(existsSync(join(root, 'packages/mcp/bin/cli.js')) && existsSync(join(root, 'tonic-ui-mcp.config.js')), 'Optional MCP implementation/config was removed.');
  const pluginVersions = baseRef === undefined
    ? { status: 'skipped' }
    : { status: 'checked', ...validatePluginVersions(root, baseRef) };
  return { plugins: PLUGIN_NAMES.length, pluginBoundary: 'independent', pluginVersions };
}

const invokedDirectly = import.meta.main
  ?? (typeof process.argv[1] === 'string' && resolve(process.argv[1]) === fileURLToPath(import.meta.url));
if (invokedDirectly) {
  try {
    const { values } = parseArgs({ options: { base: { type: 'string' } } });
    const baseRef = values.base ?? process.env.PLUGIN_BASE_REF;
    if (baseRef === undefined) {
      console.error('Plugin version bump check skipped: no baseline; use --base <ref> or PLUGIN_BASE_REF.');
    }
    console.log(JSON.stringify(validatePlugins(repoRoot, { baseRef })));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
