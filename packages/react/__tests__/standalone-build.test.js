import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// The Rollup-integrated transform must match the esbuild CLI pass byte for
// byte. The CLI receives the exact full bundle written by the same Rollup run.

jest.setTimeout(120_000);

const packageDirectory = path.resolve(__dirname, '..');
const rollupCli = path.join(path.dirname(require.resolve('rollup')), 'bin', 'rollup');
const esbuildCli = path.join(path.dirname(require.resolve('esbuild')), '..', 'bin', 'esbuild');

const esbuildCliArgs = [
  '--minify',
  '--format=esm',
  '--target=es2022',
  '--sourcemap',
  '--define:process.env.NODE_ENV="production"',
];

const expectByteEqual = (actual, expected, label) => {
  const length = Math.min(actual.length, expected.length);
  let firstDifference = -1;
  for (let i = 0; i < length; i += 1) {
    if (actual[i] !== expected[i]) {
      firstDifference = i;
      break;
    }
  }
  if (firstDifference === -1 && actual.length !== expected.length) {
    firstDifference = length;
  }
  if (firstDifference === -1) {
    return;
  }
  const context = buffer =>
    JSON.stringify(
      buffer.slice(Math.max(0, firstDifference - 20), firstDifference + 20).toString('utf8')
    );
  throw new Error(
    `${label}: the rollup-integrated minify and the esbuild CLI pass differ\n` +
    `  first difference at byte ${firstDifference} (${actual.length} vs ${expected.length} bytes)\n` +
    `  rollup-integrated: ${context(actual)}\n` +
    `  esbuild CLI:       ${context(expected)}`
  );
};

// The published artifact is served raw by esm.sh and jsDelivr, so every import
// that is not inlined must be resolvable by the consumer's import map. The set
// below is the contract documented in the CDN integration guide: if the build
// emits anything else, the artifact is no longer self-contained.
const allowedExternalSpecifiers = new Set([
  'react',
  'react-dom',
  '@emotion/react',
  '@emotion/react/jsx-runtime',
  '@emotion/styled/base',
  '@emotion/is-prop-valid',
]);

const bareSpecifiers = (source) =>
  [...source.matchAll(/(?:import|from)\s*["']([^"']+)["']/g)].map((match) => match[1]);

test('the standalone artifact keeps only the documented external imports', () => {
  const artifact = path.join(packageDirectory, 'dist', 'standalone', 'index.min.js');
  // NODE_ENV=test changes the babel transform; the artifact must be checked as
  // the published build produces it.
  const env = { ...process.env, BUILD_STANDALONE_ONLY: '1' };
  delete env.NODE_ENV;
  execFileSync(process.execPath, [rollupCli, '--config', 'rollup.config.mjs'], {
    cwd: packageDirectory,
    env,
    stdio: 'pipe',
  });

  const source = fs.readFileSync(artifact, 'utf8');
  const specifiers = bareSpecifiers(source);
  const unexpected = [...new Set(specifiers)].filter((id) => !allowedExternalSpecifiers.has(id));
  if (unexpected.length > 0) {
    throw new Error(
      `dist/standalone/index.min.js imports modules the import map does not provide: ${unexpected.join(', ')}`
    );
  }
  if (specifiers.some((id) => id.startsWith('.') || id.startsWith('/') || id.startsWith('http'))) {
    throw new Error('the standalone artifact must contain no relative or absolute imports');
  }
  if (/require\s*\(/.test(source) || /from\s*["']node:/.test(source)) {
    throw new Error('the standalone artifact must not contain CommonJS or Node-only imports');
  }
  if (!/sourceMappingURL=index\.min\.js\.map/.test(source)) {
    throw new Error('the standalone artifact must reference its sourcemap by relative name');
  }
});

test('standalone minify integrated in rollup is byte-identical to the esbuild CLI pass', () => {
  const fullArtifact = path.join(packageDirectory, 'dist', 'standalone', 'index.js');
  const artifact = path.join(packageDirectory, 'dist', 'standalone', 'index.min.js');
  const artifactMap = `${artifact}.map`;
  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'tonic-standalone-'));
  const cliInput = path.join(tmpRoot, 'index.js');
  const cliArtifact = path.join(tmpRoot, 'index.min.js');
  const env = { ...process.env, BUILD_STANDALONE_ONLY: '1' };
  delete env.NODE_ENV;

  try {
    execFileSync(process.execPath, [rollupCli, '--config', 'rollup.config.mjs'], {
      cwd: packageDirectory,
      env,
      stdio: 'pipe',
    });
    fs.copyFileSync(fullArtifact, cliInput);

    execFileSync(
      process.execPath,
      [esbuildCli, 'index.js', ...esbuildCliArgs, '--outfile=index.min.js'],
      { cwd: tmpRoot, stdio: 'pipe' }
    );

    expectByteEqual(
      fs.readFileSync(artifact),
      fs.readFileSync(cliArtifact),
      'dist/standalone/index.min.js'
    );
    expectByteEqual(
      fs.readFileSync(artifactMap),
      fs.readFileSync(`${cliArtifact}.map`),
      'dist/standalone/index.min.js.map'
    );
  } finally {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  }
});
