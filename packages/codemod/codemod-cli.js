#!/usr/bin/env node

const path = require('path');
const yargs = require('yargs');
const run = require('./codemod-main');

yargs
  .command({
    command: '$0 <codemod> <paths...>',
    describe: 'Applies a `@tonic-ui/codemod` to the specified paths',
    builder: (command) => {
      return command
        .positional('codemod', {
          description: 'The name of the codemod to apply',
          type: 'string',
        })
        .positional('paths', {
          array: true,
          description: 'The paths to the codebase that will be forwarded to `jscodeshift`',
          type: 'string',
        })
        .option('dry', {
          description: 'dry run (no changes are made to files)',
          default: false,
          type: 'boolean',
        })
        .option('extensions', {
          description: 'transform files with these file extensions (comma separated list)',
          default: 'js',
          type: 'string',
        })
        .option('ignore-pattern', {
          description: 'ignore files that match a provided glob expression',
          default: '**/node_modules/**',
          type: 'string',
        })
        .option('parser', {
          description: 'the parser to use for parsing the source files (--parser=babel|babylon|flow|ts|tsx)',
          default: 'babel',
          type: 'string',
        })
        .option('print', {
          description: 'print transformed files to stdout, useful for development',
          default: false,
          type: 'boolean',
        })
        .option('verbose', {
          description: 'show more information about the transform process (--verbose=0|1|2)',
          default: 0,
          type: 'number',
        })
        .option('jscodeshift', {
          description: 'pass options directly to jscodeshift',
          default: false,
          type: 'string',
        });
    },
    handler: function (argv) {
      const { codemod, paths, ...flags } = argv;
      const files = paths.map((filePath) => path.resolve(filePath));
      run(codemod, files, flags, argv._);
    },
  })
  .scriptName('npx @tonic-ui/codemod')
  .example('$0 react/v2.0.0/import-react-icons src')
  .help()
  .parse();
