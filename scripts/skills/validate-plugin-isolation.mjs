import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// Exercise the shipped helper outside the checkout so repository-only imports and
// missing bundled assets fail, without banning harmless source references in prose.
export function validatePluginIsolation(pluginRoot) {
  const directory = mkdtempSync(join(tmpdir(), 'tonic-ui-plugin-isolation-'));
  try {
    const plugin = join(directory, 'plugin');
    cpSync(pluginRoot, plugin, { recursive: true });
    const lookup = (args) => {
      const execution = spawnSync(process.execPath, [join(plugin, 'tonic-ui-tokens/scripts/lookup-tokens.mjs'), ...args], {
        cwd: directory,
        encoding: 'utf8',
        timeout: 10000,
        maxBuffer: 1024 * 1024,
      });
      if (execution.error || execution.status !== 0) {
        throw new Error(`Standalone token lookup failed: ${execution.error?.message ?? execution.stderr}`);
      }
      return JSON.parse(execution.stdout).results[0];
    };
    return {
      token: lookup(['--token', '_component.keyboardFocused.outerFocusRing']),
      typography: lookup(['--figma', '$typography.body.md']),
    };
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}
