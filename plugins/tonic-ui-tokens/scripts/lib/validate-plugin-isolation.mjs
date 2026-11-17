import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseThemePath } from '../../skills/tonic-ui-tokens/scripts/path-pattern.mjs';

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
      const envelope = JSON.parse(execution.stdout);
      if (!Array.isArray(envelope?.results)) {
        throw new Error('Standalone token lookup did not return a results array.');
      }
      return envelope;
    };
    const tokenResults = lookup(['--theme-token', '_component.keyboardFocused.outerFocusRing']).results;
    const fontSizeResults = lookup(['--theme-token', 'fontSizes.sm']).results;
    const variableResults = lookup(['--figma-variable', 'semantic:Color/text/primary']).results;
    const accentResults = lookup(['--theme-token', 'colors.text.accent']).results;
    const token = tokenResults.length === 1 ? tokenResults[0] : undefined;
    const fontSize = fontSizeResults.length === 1 ? fontSizeResults[0] : undefined;
    const variable = variableResults.length === 1 ? variableResults[0] : undefined;
    const accent = accentResults.length === 1 ? accentResults[0] : undefined;
    if (token?.path !== 'colors._component.keyboardFocused.outerFocusRing' || token.visibility !== 'private'
      || fontSize?.path !== 'fontSizes.sm') {
      throw new Error('Standalone token lookup did not return the expected private token and font size.');
    }
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
    const themeMatches = lookup(['--theme-token', 'colors.text.*']).results;
    const variableMatches = lookup(['--figma-variable', 'semantic:Color/text/*']).results;
    const assets = join(plugin, 'skills/tonic-ui-tokens/assets');
    const inventory = JSON.parse(readFileSync(join(assets, 'tokens.json'), 'utf8'));
    const semantic = JSON.parse(readFileSync(join(assets, 'figma-variables/semantic.json'), 'utf8'));
    const expectedThemePaths = inventory.tokens.filter((entry) => {
      const segments = parseThemePath(entry.path);
      return (segments.length === 3 && segments[0] === 'colors' && segments[1] === 'text')
        || (segments.length === 4 && segments[1] === 'colors' && segments[2] === 'text');
    }).map((entry) => entry.path).sort();
    const expectedVariablePaths = semantic.variables.filter((entry) => {
      const segments = entry.path.split('/');
      return segments.length === 3 && segments[0] === 'Color' && segments[1] === 'text';
    }).map((entry) => entry.path).sort();
    if (themeMatches.length < 2
      || JSON.stringify(themeMatches.map((entry) => entry.path)) !== JSON.stringify(expectedThemePaths)
      || themeMatches.some((entry) => entry.correspondence?.status !== 'unreviewed'
        || !Array.isArray(entry.figmaVariables) || entry.figmaVariables.length !== 0)) {
      throw new Error('Standalone token lookup did not return all unreviewed direct text token matches.');
    }
    if (variableMatches.length < 2
      || JSON.stringify(variableMatches.map((entry) => entry.variable?.path)) !== JSON.stringify(expectedVariablePaths)
      || variableMatches.some((entry) => entry.variable?.library !== 'semantic'
        || entry.correspondence?.status !== 'unreviewed'
        || !Array.isArray(entry.themeTokens) || entry.themeTokens.length !== 0)) {
      throw new Error('Standalone variable lookup did not return all unreviewed direct semantic text variable matches.');
    }
    return { token, fontSize, variable, accent, themeMatches, variableMatches };
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}
