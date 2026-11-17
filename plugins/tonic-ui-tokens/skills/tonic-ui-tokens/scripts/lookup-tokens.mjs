#!/usr/bin/env node
import { readFileSync, realpathSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const selectorError = 'Provide exactly one --theme-token or --figma-variable selector.';

function parseArguments(args) {
  const selectors = [];
  let help = 0;
  for (let index = 0; index < args.length; index++) {
    const argument = args[index];
    if (argument === '--help') {
      help++;
      continue;
    }
    const equals = argument.indexOf('=');
    const option = equals === -1 ? argument : argument.slice(0, equals);
    if (option !== '--theme-token' && option !== '--figma-variable') {
      throw new Error(argument.startsWith('-') ? `Unknown option: ${option}.` : `Unexpected positional argument: ${argument}.`);
    }
    let value;
    if (equals !== -1) {
      value = argument.slice(equals + 1);
    } else {
      value = args[++index];
      if (value === undefined || value.startsWith('--')) {
        throw new Error(selectorError);
      }
    }
    if (!value) {
      throw new Error(selectorError);
    }
    selectors.push({ option, value });
  }
  if (help === 1 && selectors.length === 0) {
    return { help: true };
  }
  if (help || selectors.length !== 1) {
    throw new Error(selectorError);
  }
  return selectors[0];
}

function isEntrypoint() {
  if (!process.argv[1]) {
    return false;
  }
  try {
    return realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

if (isEntrypoint()) {
  try {
    const args = parseArguments(process.argv.slice(2));
    if (args.help) {
      console.log('Usage: node <skill-directory>/scripts/lookup-tokens.mjs --theme-token PATTERN | --figma-variable PATTERN');
    } else {
      const scriptDirectory = dirname(realpathSync(fileURLToPath(import.meta.url)));
      const { createTokenMatcher } = await import(pathToFileURL(resolve(scriptDirectory, 'token-matcher.mjs')).href);
      const assets = resolve(scriptDirectory, '../assets');
      const load = (path) => JSON.parse(readFileSync(resolve(assets, path), 'utf8'));
      const matcher = createTokenMatcher({
        inventory: load('tokens.json'),
        relations: load('token-relations.json'),
        figmaVariables: ['foundations', 'semantic'].map((library) => load(`figma-variables/${library}.json`)),
      });
      const result = args.option === '--theme-token'
        ? matcher.matchThemeTokens(args.value) : matcher.matchFigmaVariables(args.value);
      console.log(JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
