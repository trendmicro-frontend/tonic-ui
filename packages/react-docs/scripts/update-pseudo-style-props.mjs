import fs from 'fs';
import { pseudoClassSelector, pseudoElementSelector } from '@tonic-ui/styled-system';
import { ensureArray } from 'ensure-type';
import _ from 'lodash';

const args = process.argv.slice(2);
const source = args[0];
const target = args[1];

const list = {
  'pseudo-class-selectors': pseudoClassSelector,
  'pseudo-element-selectors': pseudoElementSelector,
};

// XXX: `_focusActive` and `_focusHover` will be deprecated. Use `_focus: { '&:active': {}, '&:hover': {} }` instead.
delete list['pseudo-class-selectors']['_focusActive'];
delete list['pseudo-class-selectors']['_focusHover'];

const data = _.reduce(list, (result, selectorObject, key) => {
  for (const [prop, sx] of Object.entries(selectorObject)) {
    let items = [];

    if (prop === '_has') {
      items = [{
        prop: '_has',
        selector: '&:has(<relative-selector-list>)',
      }];
    } else if (prop === '_is') {
      items = [{
        prop: '_is',
        selector: '&:is(<forgiving-selector-list>)',
      }];
    } else if (prop === '_not') {
      items = [{
        prop: '_not',
        selector: '&:not(<complex-selector-list>)',
      }];
    } else if (prop === '_nthOfType') {
      items = [{
        prop: '_nthOfType',
        selector: '&:nth-of-type(<An+B> | even | odd)',
      }];
    } else {
      items = sx({}).map(x => {
        return {
          prop,
          selector: x[0],
        };
      });
    }

    result[key] = ensureArray(result[key]).concat(items);
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
          '`' + x.selector.replaceAll('|', '\\|').split(',').join('`,<br/>`') + '`',
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
