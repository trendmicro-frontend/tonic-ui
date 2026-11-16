import { spawn } from 'node:child_process';
import { lstatSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../', import.meta.url));
const hasDirectorySymlink = (directory) => {
  let current = root;
  for (const part of directory.split('/')) {
    current = join(current, part);
    if (lstatSync(current).isSymbolicLink()) return true;
  }
  return false;
};
const contributorDirectories = hasDirectorySymlink('skills') ? [] :
  readdirSync(join(root, 'skills'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules')
    .map((entry) => `skills/${entry.name}/scripts/__tests__`);
const directories = [
  'scripts/__tests__',
  'scripts/figma-variables/__tests__',
  'scripts/skills/__tests__',
  'scripts/plugins/__tests__',
  'test/__tests__',
  ...contributorDirectories,
];
const isTestFile = (entry, directory) => !entry.name.startsWith('.') && entry.name.endsWith('.test.mjs') &&
  (entry.isFile() || (entry.isSymbolicLink() && statSync(join(root, directory, entry.name)).isFile()));
const files = [];
for (const directory of directories) {
  let entries;
  try {
    if (hasDirectorySymlink(directory)) continue;
    entries = readdirSync(join(root, directory), { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT' && directory.startsWith('skills/')) {
      continue;
    }
    throw error;
  }
  files.push(...entries
    .filter((entry) => isTestFile(entry, directory))
    .map((entry) => `${directory}/${entry.name}`));
}
const collectPluginTests = (directory) => {
  for (const entry of readdirSync(join(root, directory), { withFileTypes: true })) {
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      collectPluginTests(join(directory, entry.name));
    } else if (directory.split('/').includes('__tests__') && isTestFile(entry, directory)) {
      files.push(join(directory, entry.name));
    }
  }
};
if (!hasDirectorySymlink('plugins')) collectPluginTests('plugins');
if (files.length === 0) {
  throw new Error('No AI tooling tests found.');
}
files.sort();

const child = spawn(process.execPath, ['--test', '--test-reporter=./test/test-reporter.mjs', ...process.argv.slice(2), ...files], {
  cwd: root,
  stdio: 'inherit',
});
child.once('error', (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
child.once('exit', (code) => {
  process.exitCode = code ?? 1;
});
