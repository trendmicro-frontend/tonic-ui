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
