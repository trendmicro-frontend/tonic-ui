#!/usr/bin/env node

const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const jscodeshiftPackage = require('jscodeshift/package.json');

const jscodeshiftDirectory = path.dirname(require.resolve('jscodeshift'));
const jscodeshiftExecutable = path.join(jscodeshiftDirectory, jscodeshiftPackage.bin.jscodeshift);

function runJSCodeShiftTransform(transform, files, flags, codemodFlags) {
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
        `Transform '${transform}' not found. Check out ${path.resolve(
          __dirname,
          './README.md for a list of available codemods.',
        )}`,
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

function run(argv) {
  const { codemod, paths, ...flags } = argv;
  const files = paths.map((filePath) => path.resolve(filePath));

  runJSCodeShiftTransform(codemod, files, flags, argv._);
}

yargs
  .command({
    command: '$0 <codemod> <paths...>',
    describe: 'Applies a `@tonic-ui/codemod` to the specified paths',
    builder: (command) => {
      return command
        .positional('codemod', {
          description: 'The name of the codemod',
          type: 'string',
        })
        .positional('paths', {
          array: true,
          description: 'Paths forwarded to `jscodeshift`',
          type: 'string',
        })
        .option('dry', {
          description: 'dry run (no changes are made to files)',
          default: false,
          type: 'boolean',
        })
        .option('extensions', {
          description: 'Specify the file extensions to process',
          default: 'js,ts,jsx,tsx,json',
          type: 'string',
        })
        .option('ignore-pattern', {
          description: 'Specify the glob pattern for files to ignore',
          default: '**/node_modules/**',
          type: 'string',
        })
        .option('parser', {
          description: 'the parser to use for parsing the source files',
          default: 'babel',
          type: 'string',
        })
        .option('print', {
          description: 'print transformed files to stdout, useful for development',
          default: false,
          type: 'boolean',
        })
        .option('jscodeshift', {
          description: '(Advanced) Pass options directly to jscodeshift',
          default: false,
          type: 'string',
        });
    },
    handler: run,
  })
  .scriptName('npx @tonic-ui/codemod')
  .example('$0 react/v2.0.0/import-react-icons src')
  .help()
  .parse();
