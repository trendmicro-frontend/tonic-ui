const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const jscodeshiftPackage = require('jscodeshift/package.json');

const jscodeshiftDirectory = path.dirname(require.resolve('jscodeshift'));
const jscodeshiftExecutable = path.join(jscodeshiftDirectory, jscodeshiftPackage.bin.jscodeshift);

function run(transform, files, flags, codemodFlags) {
  const transformPaths = [
    path.resolve(__dirname, './src', `${transform}/index.js`),
    path.resolve(__dirname, './src', `${transform}.js`),
    path.resolve(__dirname, './dist', `${transform}/index.js`),
    path.resolve(__dirname, './dist', `${transform}.js`),
  ];

  let transformPath;
  let error;

  for (transformPath of transformPaths) {
    try {
      fs.statSync(transformPath);
      error = undefined;
      break;
    } catch (err) {
      error = err;
      continue;
    }
  }

  if (error) {
    if (error?.code === 'ENOENT') {
      throw new Error(
        `${JSON.stringify(transform)} not found. Check out ${path.resolve(__dirname, './README.md for a list of available codemods.')}`,
      );
    }
    throw error;
  }

  const args = [
    // can't directly spawn `jscodeshiftExecutable` due to https://github.com/facebook/jscodeshift/issues/424
    jscodeshiftExecutable,
    '--transform',
    transformPath,
    ...codemodFlags,
  ];

  if (flags.extensions) {
    args.push('--extensions');
    args.push(flags.extensions);
  }

  if (flags.parser) {
    args.push('--parser');
    args.push(flags.parser);
  }

  if (flags.ignorePattern) {
    const ignorePatterns = Array.isArray(flags.ignorePattern) ? flags.ignorePattern : [flags.ignorePattern];
    ignorePatterns.filter(Boolean).forEach(pattern => {
      args.push('--ignore-pattern', pattern);
    });
  }

  if (flags.dry) {
    args.push('--dry');
  }
  if (flags.print) {
    args.push('--print');
  }
  if (flags.jscodeshift) {
    args.push(flags.jscodeshift);
  }

  args.push(...files);

  // eslint-disable-next-line no-console -- debug information
  console.log(`Executing command: ${args.join(' ')}`);
  const jscodeshiftProcess = childProcess.spawnSync('node', args, { stdio: 'inherit' });

  if (jscodeshiftProcess.error) {
    throw jscodeshiftProcess.error;
  }
}

module.exports = run;
