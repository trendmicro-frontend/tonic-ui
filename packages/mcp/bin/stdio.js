#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('node:fs');
const path = require('node:path');
const { Command } = require('commander');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { createMcpServer } = require('../dist/index.cjs');

// Read version from package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
const packageJson = JSON.parse(packageJsonContent);

const MCP_SERVER_NAME = packageJson.name;
const MCP_SERVER_DESCRIPTION = packageJson.description;
const MCP_SERVER_VERSION = packageJson.version ?? '1.0.0';

/**
 * Parse command-line arguments using Commander.js
 */
function parseArgs() {
  const program = new Command();

  program
    .name(`npx ${MCP_SERVER_NAME}`)
    .description(MCP_SERVER_DESCRIPTION)
    .version(MCP_SERVER_VERSION)
    .option('-c, --config <path>', 'path to configuration file (JSON or JavaScript format)')
    .helpOption('-h, --help', 'display help for command');

  program.parse();

  const options = program.opts();

  if (!options.config) {
    console.error('Error: Configuration file is required.\n');
    program.outputHelp();
    process.exit(1);
  }

  return {
    ...options,
  };
}

async function main() {
  try {
    const options = parseArgs();
    const resolvedConfigPath = path.isAbsolute(options.config)
      ? options.config
      : path.resolve(process.cwd(), options.config);

    const server = await createMcpServer({
      name: MCP_SERVER_NAME,
      version: MCP_SERVER_VERSION,
      configPath: resolvedConfigPath,
    });
    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error('🚀 Tonic UI MCP server running on stdio');
    console.error(`Loaded config file: ${resolvedConfigPath}`);
  } catch (error) {
    console.error('Failed to start MCP server:', error.message);
    if (error.code) {
      console.error(`• Error code: ${error.code}`);
    }
    if (error.validationErrors) {
      console.error('• Validation errors:');
      error.validationErrors.forEach(err => {
        console.error(`  - ${err.field}: ${err.message}`);
      });
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
