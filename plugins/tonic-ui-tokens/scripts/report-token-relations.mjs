#!/usr/bin/env node
import { readFileSync, realpathSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptPath = realpathSync(fileURLToPath(import.meta.url));
const { buildVariableRelationIndex } = createRequire(scriptPath)('../skills/tonic-ui-tokens/scripts/variable-relations.mjs');

function compareCodePoints(left, right) {
  let a = 0;
  let b = 0;
  while (a < left.length && b < right.length) {
    const first = left.codePointAt(a);
    const second = right.codePointAt(b);
    if (first !== second) {
      return first - second;
    }
    a += first > 0xffff ? 2 : 1;
    b += second > 0xffff ? 2 : 1;
  }
  return (a < left.length ? 1 : 0) - (b < right.length ? 1 : 0);
}

const cell = (value) => String(value ?? '—').replaceAll('\\', '\\\\').replaceAll('|', '\\|').replace(/\r?\n/g, '<br>');
const pair = (library, key) => JSON.stringify([library, key]);

export function renderTokenRelations(inventory, figmaVariables, relations) {
  const index = buildVariableRelationIndex(inventory, relations, figmaVariables);
  const names = ['Mapped', 'Stale reviews', 'Reviewed Figma-only', 'Reviewed theme-only', 'Unreviewed Figma variables', 'Unreviewed theme tokens'];
  const sections = new Map(names.map((name) => [name, new Map()]));
  const add = (section, group, sort, values) => {
    const groups = sections.get(section);
    if (!groups.has(group)) {
      groups.set(group, []);
    }
    groups.get(group).push({ sort, values });
  };
  for (const review of index.reviews) {
    const figma = review.figma;
    const variable = figma ? index.variablesByKey.get(pair(figma.library, figma.key)) : null;
    const token = review.themePath ? index.tokens.get(review.themePath) : null;
    const section = review.freshness === 'stale' ? 'Stale reviews'
      : review.status === 'mapped' ? 'Mapped'
        : review.status === 'figma-only' ? 'Reviewed Figma-only' : 'Reviewed theme-only';
    const group = figma ? (variable ? `${figma.library} / ${variable.collection}` : `${figma.library} / missing endpoint`)
      : token?.scale ?? 'missing theme endpoint';
    const variableLabel = figma ? `${figma.library}:${variable?.path ?? `${figma.key} (missing)`}` : '—';
    const themeLabel = review.themePath ? `${review.themePath}${token ? '' : ' (missing)'}` : '—';
    const modes = review.modeMap ? Object.entries(review.modeMap).sort(([a], [b]) => compareCodePoints(a, b))
      .map(([mode, values]) => `${mode} → ${values.join(', ')}`).join('; ') : '—';
    add(section, group, [figma?.library ?? '', variable?.path ?? '', figma?.key ?? '', review.themePath ?? ''],
      [variableLabel, themeLabel, review.status, review.freshness, modes, review.evidence.reviewedAt, review.evidence.reason]);
  }
  for (const [library, document] of index.libraries) {
    for (const variable of document.variables) {
      if (!index.byVariable.has(pair(library, variable.figmaKey))) {
        add('Unreviewed Figma variables', `${library} / ${variable.collection}`, [library, variable.path, variable.figmaKey], [`${library}:${variable.path}`]);
      }
    }
  }
  for (const token of inventory.tokens) {
    if (!index.byTheme.has(token.path)) {
      add('Unreviewed theme tokens', token.scale, [token.path], [token.path, token.kind, token.visibility]);
    }
  }
  const lines = ['# Figma variable ↔ theme token relations', '', 'Coverage is partial. This report uses offline snapshots; unreviewed does not mean a counterpart is absent.', 'Counts represent rows, not unique endpoints.', ''];
  for (const name of names) {
    const groups = sections.get(name);
    const count = [...groups.values()].reduce((sum, rows) => sum + rows.length, 0);
    lines.push(`## ${name}`, '', `Rows: ${count}`, '');
    if (!count) {
      lines.push('None.', '');
      continue;
    }
    for (const group of [...groups.keys()].sort(compareCodePoints)) {
      const rows = groups.get(group);
      rows.sort((a, b) => {
        for (let i = 0; i < Math.max(a.sort.length, b.sort.length); i += 1) {
          const result = compareCodePoints(a.sort[i] ?? '', b.sort[i] ?? '');
          if (result) {
            return result;
          }
        }
        return 0;
      });
      const headers = name === 'Unreviewed Figma variables' ? ['Figma variable']
        : name === 'Unreviewed theme tokens' ? ['Theme token', 'Kind', 'Visibility']
          : ['Figma variable', 'Theme token', 'Review', 'Freshness', 'Modes', 'Reviewed', 'Reason'];
      lines.push(`### ${cell(group)}`, '', `Rows: ${rows.length}`, '', `| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`);
      for (const row of rows) {
        lines.push(`| ${row.values.map(cell).join(' | ')} |`);
      }
      lines.push('');
    }
  }
  return `${lines.join('\n')}\n`;
}

function isEntryPoint() {
  if (!process.argv[1]) {
    return false;
  }
  try {
    return realpathSync(process.argv[1]) === scriptPath;
  } catch {
    return false;
  }
}

if (isEntryPoint()) {
  try {
    const args = process.argv.slice(2);
    if (args.length === 1 && args[0] === '--help') {
      console.log('Usage: node plugins/tonic-ui-tokens/scripts/report-token-relations.mjs\nOutputs Markdown on stdout. Categories: Mapped, Stale reviews, Reviewed Figma-only, Reviewed theme-only, Unreviewed Figma variables, Unreviewed theme tokens.');
    } else {
      if (args.length) {
        throw new Error('This report accepts no arguments except --help.');
      }
      const assets = resolve(dirname(scriptPath), '../skills/tonic-ui-tokens/assets');
      const read = (name) => JSON.parse(readFileSync(join(assets, name), 'utf8'));
      process.stdout.write(renderTokenRelations(read('tokens.json'), [read('figma-variables/foundations.json'), read('figma-variables/semantic.json')], read('token-relations.json')));
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
