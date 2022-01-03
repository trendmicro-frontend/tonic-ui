#!/usr/bin/env node

import fs from 'fs';
import { pseudoClassSelector, pseudoElementSelector } from '@tonic-ui/styled-system';
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

const list = {
  'pseudo-class-selectors': pseudoClassSelector,
  'pseudo-element-selectors': pseudoElementSelector,
};

const data = _.reduce(list, (result, selectorObject, key) => {
  for (const [prop, sx] of Object.entries(selectorObject)) {
    const items = sx({}).map(x => ({
      prop,
      selector: x[0],
    }));
    result[key] = (result[key] || (result[key] = [])).concat(items);
  }
  return result;
}, {});

try {
  const originalContent = fs.readFileSync(source, 'utf8');
  let output = originalContent;
  for (const [key, value] of Object.entries(data)) {
    const pattern = new RegExp(`__${key}__`, 'g')
    const replacement = (() => {
      const arr = [
        '| Prop | Selector |',
        '| :--- | :------- |',
      ].concat(value.map(x => {
        const cells = [
          '`' + x.prop + '`',
          '`' + x.selector.split(',').join('` ,<br/>`') + '`',
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
