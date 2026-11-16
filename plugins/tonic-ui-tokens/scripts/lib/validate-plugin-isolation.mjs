import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// Exercise the shipped helper outside the checkout so repository-only imports and
// missing bundled assets fail, without banning harmless source references in prose.
export function validatePluginIsolation(pluginRoot) {
  const directory = mkdtempSync(join(tmpdir(), 'tonic-plugin-isolation-'));
  try {
    const plugin = join(directory, 'plugin');
    cpSync(pluginRoot, plugin, { recursive: true });
    const networkGuard = join(directory, 'offline.cjs');
    writeFileSync(networkGuard, `
const block = () => { throw new Error('Network access is disabled during standalone validation.'); };
for (const name of ['node:http', 'node:https']) {
  const transport = require(name);
  transport.request = transport.get = block;
}
const net = require('node:net');
net.connect = net.createConnection = net.Socket.prototype.connect = block;
require('node:tls').connect = block;
require('node:dgram').Socket.prototype.send = block;
for (const name of ['node:dns', 'node:dns/promises']) {
  const dns = require(name);
  for (const key of Object.keys(dns)) {
    if (key === 'lookup' || key === 'lookupService' || key === 'reverse' || key.startsWith('resolve')) {
      dns[key] = block;
    }
  }
}
globalThis.fetch = block;
require('node:module').syncBuiltinESMExports();
`);
    const lookup = (args) => {
      const execution = spawnSync(process.execPath, ['--require', networkGuard, join(plugin, 'skills/tonic-ui-tokens/scripts/lookup-tokens.mjs'), ...args], {
        cwd: directory,
        env: {
          HOME: directory, USERPROFILE: directory, TMPDIR: directory, TMP: directory, TEMP: directory,
          ...(process.env.SystemRoot ? { SystemRoot: process.env.SystemRoot } : {}),
        },
        encoding: 'utf8',
        timeout: 10000,
        maxBuffer: 1024 * 1024,
      });
      if (execution.error || execution.status !== 0) {
        throw new Error(`Standalone token lookup failed: ${execution.error?.message ?? execution.stderr}`);
      }
      return JSON.parse(execution.stdout).results[0];
    };
    const token = lookup(['--token', '_component.keyboardFocused.outerFocusRing']);
    const typography = lookup(['--figma', '$typography.body.md']);
    const variable = lookup(['--variable', 'semantic:Color/text/primary']);
    const accent = lookup(['--token', 'colors.text.accent']);
    if (variable?.source !== 'figma-variable'
      || variable.variable?.library !== 'semantic'
      || variable.variable?.path !== 'Color/text/primary'
      || variable.correspondence?.status !== 'unreviewed'
      || !Array.isArray(variable.themeTokens) || variable.themeTokens.length !== 0) {
      throw new Error('Standalone variable lookup did not return the unreviewed text primary capture.');
    }
    if (accent?.path !== 'colors.text.accent'
      || accent.correspondence?.status !== 'unreviewed'
      || !Array.isArray(accent.figmaVariables) || accent.figmaVariables.length !== 0) {
      throw new Error('Standalone token lookup did not return the unreviewed accent token.');
    }
    return { token, typography, variable, accent };
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}
