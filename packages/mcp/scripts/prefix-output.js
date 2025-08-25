#!/usr/bin/env node

/* eslint-disable-next-line @typescript-eslint/no-require-imports */
const { spawn } = require('child_process');

// Get prefix and command from process.argv
const [,, prefix, ...commandArgs] = process.argv;

if (!prefix || commandArgs.length === 0) {
  console.error('Usage: node prefix-output.js <prefix> -- <command> [args...]');
  process.exit(1);
}

// Remove the '--' separator if present
const separatorIndex = commandArgs.indexOf('--');
const actualCommandArgs = separatorIndex >= 0 ? commandArgs.slice(separatorIndex + 1) : commandArgs;

const [command, ...args] = actualCommandArgs;

// Spawn the process
const childProcess = spawn(command, args, {
  stdio: ['inherit', 'pipe', 'pipe']
});

// Prefix stdout lines
childProcess.stdout.on('data', (data) => {
  const lines = data.toString().split('\n');
  lines.forEach((line, index) => {
    if (index === lines.length - 1 && line === '') {
      // Don't add prefix to final empty line
      return;
    }
    try {
      process.stdout.write(prefix + line + '\n');
    } catch (err) {
      if (err.code !== 'EPIPE') {
        throw err;
      }
    }
  });
});

// Prefix stderr lines
childProcess.stderr.on('data', (data) => {
  const lines = data.toString().split('\n');
  lines.forEach((line, index) => {
    if (index === lines.length - 1 && line === '') {
      // Don't add prefix to final empty line
      return;
    }
    try {
      process.stderr.write(prefix + line + '\n');
    } catch (err) {
      if (err.code !== 'EPIPE') {
        throw err;
      }
    }
  });
});

// Handle EPIPE errors gracefully
process.stdout.on('error', (err) => {
  if (err.code === 'EPIPE') {
    process.exit(0);
  }
  throw err;
});

process.stderr.on('error', (err) => {
  if (err.code === 'EPIPE') {
    process.exit(0);
  }
  throw err;
});

// Forward exit code
childProcess.on('close', (code) => {
  process.exit(code);
});
