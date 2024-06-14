const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const jscodeshiftPackage = require('jscodeshift/package.json');

const jscodeshiftDirectory = path.dirname(require.resolve('jscodeshift'));
const jscodeshiftExecutable = path.join(jscodeshiftDirectory, jscodeshiftPackage.bin.jscodeshift);

function sanitizeInput(input) {
  // Assuming input is a string or an array of strings
  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }

  // Allow common glob pattern characters and ensure the input is a string
  const allowedCharacters = /^[a-zA-Z0-9_\-\/\*\?\[\]\{\}\!\.\,]+$/;
  if (typeof input === 'string' && allowedCharacters.test(input)) {
    return input;
  }

  throw new Error('Invalid input: Only alphanumeric characters, dashes, slashes, and common glob pattern characters are allowed.');
}

function run(transform, files, flags, codemodFlags) {
  const transformPaths = [
    path.resolve(__dirname, './src', `${sanitizeInput(transform)}/index.js`),
    path.resolve(__dirname, './src', `${sanitizeInput(transform)}.js`),
    path.resolve(__dirname, './dist', `${sanitizeInput(transform)}/index.js`),
    path.resolve(__dirname, './dist', `${sanitizeInput(transform)}.js`),
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
        `${JSON.stringify(transform)} not found. Check out README.md for a list of available codemods.`,
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
    args.push('--extensions=' + sanitizeInput(flags.extensions));
  }

  if (flags.parser) {
    args.push('--parser=' + sanitizeInput(flags.parser));
  }

  if (flags.ignorePattern) {
    const ignorePatterns = Array.isArray(flags.ignorePattern) ? flags.ignorePattern : [flags.ignorePattern];
    ignorePatterns.filter(Boolean).forEach(pattern => {
      args.push('--ignore-pattern=' + sanitizeInput(pattern));
    });
  }

  if (flags.dry) {
    args.push('--dry');
  }
  if (flags.print) {
    args.push('--print');
  }
  if (flags.verbose !== undefined) {
    args.push('--verbose=' + flags.verbose);
  }
  if (flags.jscodeshift) {
    const jscodeshiftOptions = Array.isArray(flags.jscodeshift) ? flags.jscodeshift : [flags.jscodeshift];
    args.push(...jscodeshiftOptions);
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
