import * as tmicon from '@trendmicro/tmicon';
import * as url from 'node:url';
import * as path from 'node:path';
import * as fs from 'node:fs';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDirectory = path.resolve(__dirname, '../src/icons');

const mapKebabCaseToCapitalizedCamelCase = (str) => {
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
};

const renderIconComponentFile = (displayName, svgCode) => `
// AUTO-GENERATED FILE. DO NOT EDIT.
import React from 'react';
import createSVGIcon from '../utils/createSVGIcon';

export default createSVGIcon(
  ${svgCode},
  '${displayName}',
);
`.trimStart();

const renderIndexFile = ({ defaultImports }) => `
// AUTO-GENERATED FILE. DO NOT EDIT.
${defaultImports.map(defaultImport => (`export { default as ${defaultImport} } from './${defaultImport}';`)).join('\n')}
`.trimStart();

const generateIcons = () => {
  const icons = tmicon.icons.map(icon => {
    return {
      name: mapKebabCaseToCapitalizedCamelCase(icon.name),
      paths: icon.paths,
    };
  });

  // generate icon component files
  for (const icon of icons) {
    const displayName = `${icon.name}Icon`;
    const file = path.resolve(outputDirectory, `${icon.name}Icon.js`);
    const svgCode = icon.paths.map(path => `<path d="${path}" />`).join('');
    const data = renderIconComponentFile(displayName, (icon.paths.length > 1) ? `<>${svgCode}</>` : svgCode);
    fs.writeFileSync(file, data, { encoding: 'utf8' });
  }

  // generate index.js file
  const file = path.resolve(outputDirectory, 'index.js');
  const data = renderIndexFile({
    defaultImports: icons.map(icon => `${icon.name}Icon`).sort(),
  });
  fs.writeFileSync(file, data, { encoding: 'utf8' });
};

// check if the output directory exists and create it if not
try {
  fs.accessSync(outputDirectory);
} catch (err) {
  fs.mkdirSync(outputDirectory);
}

// clean up the output directory
fs.readdirSync(outputDirectory).forEach((file) => fs.unlinkSync(path.resolve(outputDirectory, file)));

generateIcons();
