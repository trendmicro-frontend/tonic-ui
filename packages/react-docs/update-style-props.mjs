#!/usr/bin/env node

import fs from 'fs';
import { system } from '@tonic-ui/styled-system';
import { ensureString } from 'ensure-type';
import _ from 'lodash';

const args = process.argv.slice(2);
const source = args[0];
const target = args[1];

const kebabize = str => {
  return ensureString(str).split('').map((letter, idx) => {
    return (letter.toUpperCase() === letter)
      ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
      : letter;
  }).join('');
};

const systemConfig = _.reduce(system.config, (result, value, key) => {
  const sx = value;
  if (sx.group != null) {
    const item = {
      prop: key,
      originalProperties: sx.originalProperties.map(kebabize),
      scale: sx.scale,
      defaultScale: sx.defaultScale,
    };
    sx.alias && (item.alias = sx.alias);
    (result[sx.group] || (result[sx.group] = [])).push(item);
  }
  return result;
}, {});

try {
  const originalContent = fs.readFileSync(source, 'utf8');
  let output = originalContent;
  for (const [key, value] of Object.entries(systemConfig)) {
    const pattern = new RegExp(`__${key}__`, 'g')
    const replacement = (() => {
      const arr = [
        '| Prop | CSS Property | Theme Key |',
        '| :-- | :-- | :-- |',
      ].concat(value.map(x => {
        const cells = [
          '`' + x.prop + '`',
          '`' + x.originalProperties.join('`, `') + '`',
          x.scale ? `[${x.scale}](${kebabize(x.scale)})` : '',
        ];
        return '| ' + cells.join(' | ') + ' |';
      }));
      return arr.join('\n');
    })();
    output = output.replace(pattern, replacement);
  }

  if (target) {
    fs.writeFileSync(target, output, 'utf8');
  } else {
    console.log(output);
  }
} catch (err) {
  console.error(err);
}
