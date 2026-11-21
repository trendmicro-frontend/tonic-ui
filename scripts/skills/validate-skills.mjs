#!/usr/bin/env node
import { existsSync, lstatSync, readFileSync, readdirSync, readlinkSync, realpathSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';

const require = createRequire(import.meta.url);
const { parse: parseYaml } = require('yaml');
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const linkPattern = /\[[^\]]*\]\(([^\s)]+)\)/g;

/** Contributor skills shipped at the repository root; plugin skills are discovered under plugins/<name>/skills. */
export const CONTRIBUTOR_SKILLS = ['tonic-ui-patterns', 'tonic-ui-plan', 'tonic-ui-pr', 'tonic-ui-slots', 'tonic-ui-sx', 'tonic-ui-tokens-maintenance', 'tonic-ui-types', 'tonic-ui-version'].sort();

const isLocalLink = (link) => Boolean(link) && !/^[a-z][a-z0-9+.-]*:/i.test(link) && !link.startsWith('/');

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

function validateSkill(root, name, directory) {
  const skillPath = join(directory, 'SKILL.md');
  assert(existsSync(skillPath), `Missing skill entry: ${relative(root, skillPath)}`);
  const content = readFileSync(skillPath, 'utf8');
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  assert(frontmatter, `Missing skill frontmatter: ${name}`);
  const metadata = parseYaml(frontmatter[1]);
  assert(metadata?.name === name && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) && name.length <= 64, `Invalid skill name: ${name}`);
  assert(typeof metadata.description === 'string' && metadata.description.trim().length > 0 && metadata.description.length <= 1024, `Invalid description: ${name}`);
  assert(content.split('\n').length <= 500, `Skill exceeds 500 lines: ${name}`);
  if (metadata.metadata) {
    assert(Object.values(metadata.metadata).every((value) => typeof value === 'string'), `Custom metadata must contain strings: ${name}`);
  }
  assert(!metadata['allowed-tools'] && metadata['disable-model-invocation'] === undefined, `Host-specific skill controls: ${name}`);
  for (const markdownFile of markdownFiles(directory)) {
    for (const match of readFileSync(markdownFile, 'utf8').matchAll(linkPattern)) {
      const link = match[1].split('#')[0];
      if (!isLocalLink(link)) {
        continue;
      }
      const target = resolve(dirname(markdownFile), link);
      assert(existsSync(target), `Missing linked skill resource: ${relative(root, markdownFile)} -> ${link}`);
    }
  }
}

function validateAdapters(root, name, directory) {
  for (const platform of ['.agents', '.claude']) {
    const adapter = join(root, platform, 'skills', name);
    const stats = lstatSync(adapter, { throwIfNoEntry: false });
    assert(stats?.isSymbolicLink() && readlinkSync(adapter) === `../../skills/${name}`, `Invalid ${platform} adapter: ${name}`);
    assert(existsSync(adapter) && realpathSync(adapter) === realpathSync(directory), `Adapter does not resolve canonical source: ${name}`);
  }
}

export function validateSkills(root) {
  const skillsRoot = join(root, 'skills');
  const pluginsRoot = join(root, 'plugins');
  assert(!existsSync(join(skillsRoot, 'internal')) && !existsSync(join(skillsRoot, 'external')), 'Obsolete skill groups remain.');
  const directories = readdirSync(skillsRoot)
    .filter((name) => !name.startsWith('.') && lstatSync(join(skillsRoot, name)).isDirectory())
    .sort();
  assert(isDeepStrictEqual(directories, CONTRIBUTOR_SKILLS), 'Unexpected physical directories in skills.');
  for (const platform of ['.agents', '.claude']) {
    assert(isDeepStrictEqual(readdirSync(join(root, platform, 'skills')).sort(), CONTRIBUTOR_SKILLS), `Native adapters must contain only contributor skills in ${platform}.`);
  }
  for (const name of CONTRIBUTOR_SKILLS) {
    const directory = join(skillsRoot, name);
    validateSkill(root, name, directory);
    validateAdapters(root, name, directory);
  }
  let pluginSkills = 0;
  if (existsSync(pluginsRoot)) {
    for (const plugin of readdirSync(pluginsRoot, { withFileTypes: true })) {
      if (plugin.name.startsWith('.') || !plugin.isDirectory()) {
        continue;
      }
      const bundledRoot = join(pluginsRoot, plugin.name, 'skills');
      if (!existsSync(bundledRoot)) {
        continue;
      }
      for (const entry of readdirSync(bundledRoot, { withFileTypes: true })) {
        if (entry.name.startsWith('.') || (!entry.isDirectory() && !(entry.isSymbolicLink() && statSync(join(bundledRoot, entry.name)).isDirectory()))) {
          continue;
        }
        validateSkill(root, entry.name, join(bundledRoot, entry.name));
        pluginSkills += 1;
      }
    }
  }
  return { contributorSkills: CONTRIBUTOR_SKILLS.length, pluginSkills, adapters: 'canonical-relative-links' };
}

const invokedDirectly = import.meta.main
  ?? (typeof process.argv[1] === 'string' && resolve(process.argv[1]) === fileURLToPath(import.meta.url));
if (invokedDirectly) {
  try {
    console.log(JSON.stringify(validateSkills(repoRoot)));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
