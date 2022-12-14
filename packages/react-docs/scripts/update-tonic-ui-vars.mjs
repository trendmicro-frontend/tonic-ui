import fs from 'fs';
import _ from 'lodash';

const args = process.argv.slice(2);
const source = args[0];
const target = args[1];

const vars = _.reduce(process.env, (acc, value, key) => {
  if (key.startsWith('TONIC_UI_')) {
    acc[key] = value;
  }
  return acc;
}, {});

try {
  const originalContent = fs.readFileSync(source, 'utf8');
  let output = originalContent;
  for (const [key, value] of Object.entries(vars)) {
    const pattern = new RegExp(`__${key}__`, 'g');
    const replacement = value;
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
