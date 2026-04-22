#!/usr/bin/env node

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as url from 'node:url';

const deprecatedIconNames = [
  'api',
  'api-management',
  'connect-noip',
  'file-pdf-o',
  'file-ppt-o',
  'iam',
  'ie',
  'ioc',
  'ip',
  'list-ol',
  'list-ul',
  'nas',
  'rca',
  'resize-nesw',
  'resize-nwse',
  'tv',
  'url',
  'usb',
  'wmi',
];

// This function converts tmicon v4 icon names to their corrected component names in capitalized camel case,
// ensuring alignment with the actual icon components.
const transformIconName = (iconName) => {
  return {
    // deprecated icons
    'api': 'API',
    'api-management': 'API-Management',
    'connect-noip': 'Connect-NoIP',
    'file-pdf-o': 'File-PDF-o',
    'file-ppt-o': 'File-PPT-o',
    'iam': 'IAM',
    'ie': 'IE',
    'ioc': 'IOC',
    'ip': 'IP',
    'list-ol': 'List-OL',
    'list-ul': 'List-UL',
    'nas': 'NAS',
    'rca': 'RCA',
    'resize-nesw': 'Resize-NESW',
    'resize-nwse': 'Resize-NWSE',
    'tv': 'TV',
    'url': 'URL',
    'usb': 'USB',
    'wmi': 'WMI',

    // default icons
    'ai-security': 'AI-Security',
    'security-ai': 'Security-AI',
  }[iconName] ?? iconName;
};

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDirectory = path.resolve(__dirname, '../src/icons');

// --- Helpers ---
const cleanOutputDirectory = (directoryPath) => {
  fs.readdirSync(directoryPath).forEach((file) => {
    const filePath = path.resolve(directoryPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      cleanOutputDirectory(filePath);
      fs.rmdirSync(filePath);
    } else if (stats.isFile()) {
      fs.unlinkSync(filePath);
    }
  });
};

const mapKebabCaseToCapitalizedCamelCase = (str) => {
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
};

const renderIconComponentFile = (displayName, svgCode) => `
// AUTO-GENERATED FILE. DO NOT EDIT.
import createSVGIcon from '../utils/createSVGIcon';

export default createSVGIcon(
  ${svgCode},
  '${displayName}',
);
`.trimStart();

const renderDeprecatedIconComponentFile = (iconComponentName, deprecatedIconComponentName) => `
// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import { forwardRef } from 'react';
import ${iconComponentName} from '../${iconComponentName}';

const ${deprecatedIconComponentName} = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The \`${deprecatedIconComponentName}\` component is deprecated and will be removed in the next major release. Use the \`${iconComponentName}\` component instead.');
  });

  return (
    <${iconComponentName} ref={ref} {...props} />
  );
});

${deprecatedIconComponentName}.displayName = '${iconComponentName}';
${deprecatedIconComponentName}._isDeprecated = true;

export default ${deprecatedIconComponentName};
`.trimStart();

const renderIndexFile = ({ defaultImports, deprecatedDefaultImports }) => `
// AUTO-GENERATED FILE. DO NOT EDIT.
${defaultImports.map(defaultImport => (`export { default as ${defaultImport} } from './${defaultImport}';`)).join('\n')}

// DEPRECATED ICONS
${deprecatedDefaultImports.map(defaultImport => (`export { default as ${defaultImport} } from './deprecated/${defaultImport}';`)).join('\n')}
`.trimStart();

const extractSVGData = (svgContent) => {
  const matchViewBox = svgContent.match(/viewBox="([^"]+)"/);
  const viewBox = matchViewBox ? matchViewBox[1] : '0 0 16 16';
  const paths = Array.from(svgContent.matchAll(/<path\s+[^>]*d="([^"]+)"[^>]*>/g)).map((m) => m[1]);
  return { viewBox, paths };
};

const generateIcons = (svgFiles) => {
  const deprecatedIcons = [];
  const icons = [];

  for (const filePath of svgFiles) {
    const fileName = path.basename(filePath, '.svg');
    const raw = fs.readFileSync(filePath, 'utf8');
    const { paths } = extractSVGData(raw);
    const transformedName = transformIconName(fileName);
    const name = mapKebabCaseToCapitalizedCamelCase(transformedName);

    if (deprecatedIconNames.includes(fileName)) {
      deprecatedIcons.push({
        deprecatedName: mapKebabCaseToCapitalizedCamelCase(fileName),
        name,
      });
    }

    icons.push({ name, paths });
  }

  // generate icon files
  for (const icon of icons) {
    const displayName = `${icon.name}Icon`;
    const file = path.resolve(outputDirectory, `${displayName}.js`);
    const svgCode = icon.paths.map((p) => `<path d="${p}" />`).join('');
    const data = renderIconComponentFile(
      displayName,
      (icon.paths.length > 1) ? `<>${svgCode}</>` : svgCode,
    );
    fs.writeFileSync(file, data, { encoding: 'utf8' });
  }

  // generate deprecated icons
  if (deprecatedIcons.length > 0) {
    fs.mkdirSync(path.resolve(outputDirectory, './deprecated'));
  }
  for (const icon of deprecatedIcons) {
    const displayName = `${icon.name}Icon`;
    const deprecatedDisplayName = `${icon.deprecatedName}Icon`;
    const iconPath = path.resolve(outputDirectory, `./deprecated/${deprecatedDisplayName}.js`);
    const iconData = renderDeprecatedIconComponentFile(displayName, deprecatedDisplayName);
    fs.writeFileSync(iconPath, iconData, { encoding: 'utf8' });
  }

  // Generate index.js file
  const file = path.resolve(outputDirectory, 'index.js');
  const data = renderIndexFile({
    defaultImports: icons.map(icon => `${icon.name}Icon`).sort(),
    deprecatedDefaultImports: deprecatedIcons.map(icon => `${icon.deprecatedName}Icon`).sort(),
  });
  fs.writeFileSync(file, data, { encoding: 'utf8' });
};

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: generate-icons.mjs <svg-file> [svg-file ...]');
  process.exit(1);
}

// Check if the output directory exists and create it if not
try {
  fs.accessSync(outputDirectory);
} catch (_err) {
  fs.mkdirSync(outputDirectory);
}

cleanOutputDirectory(outputDirectory);

generateIcons(args);
