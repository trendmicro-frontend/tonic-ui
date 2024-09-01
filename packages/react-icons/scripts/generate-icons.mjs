import * as fs from 'node:fs';
import * as path from 'node:path';
import * as url from 'node:url';
import * as tmicon from '@trendmicro/tmicon';

// This function converts tmicon v4 icon names to their corrected component names in capitalized camel case,
// ensuring alignment with the actual icon components.
const transformV4IconName = (iconName) => {
  return {
    'ai-security': 'AI-security',
    'api': 'API',
    'api-management': 'API-management',
    'connect-noip': 'connect-NoIP',
    'file-pdf-o': 'file-PDF-o',
    'file-ppt-o': 'file-PPT-o',
    'iam': 'IAM',
    'ie': 'IE',
    'ioc': 'IOC',
    'ip': 'IP',
    'list-ol': 'list-OL',
    'list-ul': 'list-UL',
    'nas': 'NAS',
    'rca': 'RCA',
    'resize-nesw': 'resize-NESW',
    'resize-nwse': 'resize-NWSE',
    'security-ai': 'security-AI',
    'tv': 'TV',
    'url': 'URL',
    'usb': 'USB',
    'wmi': 'WMI',
  }[iconName] ?? iconName;
};

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

const renderDeprecatedIconComponentFile = (iconComponentName, deprecatedIconComponentName) => `
// AUTO-GENERATED FILE. DO NOT EDIT.
import { useOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
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

const renderIndexFile = ({ defaultImports, deprecatedDefaultImports}) => `
// AUTO-GENERATED FILE. DO NOT EDIT.
${defaultImports.map(defaultImport => (`export { default as ${defaultImport} } from './${defaultImport}';`)).join('\n')}

// DEPRECATED ICONS
${deprecatedDefaultImports.map(defaultImport => (`export { default as ${defaultImport} } from './deprecated/${defaultImport}';`)).join('\n')}
`.trimStart();

const generateIcons = () => {
  const deprecatedIcons = [];
  const icons = tmicon.icons.map(icon => {
    const iconName = transformV4IconName(icon.name);
    if (iconName !== icon.name) {
      deprecatedIcons.push({
        deprecatedName: mapKebabCaseToCapitalizedCamelCase(icon.name),
        name: mapKebabCaseToCapitalizedCamelCase(iconName),
        paths: icon.paths,
      });
    }

    return {
      name: mapKebabCaseToCapitalizedCamelCase(iconName),
      paths: icon.paths,
    };
  });

  // generate icon component files
  for (const icon of icons) {
    const displayName = `${icon.name}Icon`;
    const file = path.resolve(outputDirectory, `${displayName}.js`);
    const svgCode = icon.paths.map(path => `<path d="${path}" />`).join('');
    const data = renderIconComponentFile(displayName, (icon.paths.length > 1) ? `<>${svgCode}</>` : svgCode);
    fs.writeFileSync(file, data, { encoding: 'utf8' });
  }

  // generate deprecated icon component files
  if (deprecatedIcons.length > 0) {
    fs.mkdirSync(path.resolve(outputDirectory, './deprecated'));
  }
  for (const icon of deprecatedIcons) {
    const displayName = `${icon.name}Icon`;
    const deprecatedDisplayName = `${icon.deprecatedName}Icon`;
    const file = path.resolve(outputDirectory, `./deprecated/${deprecatedDisplayName}.js`);
    const data = renderDeprecatedIconComponentFile(displayName, deprecatedDisplayName);
    fs.writeFileSync(file, data, { encoding: 'utf8' });
  }

  // generate index.js file
  const file = path.resolve(outputDirectory, 'index.js');
  const data = renderIndexFile({
    defaultImports: icons.map(icon => `${icon.name}Icon`).sort(),
    deprecatedDefaultImports: deprecatedIcons.map(icon => `${icon.deprecatedName}Icon`).sort(),
  });
  fs.writeFileSync(file, data, { encoding: 'utf8' });
};

// check if the output directory exists and create it if not
try {
  fs.accessSync(outputDirectory);
} catch (err) {
  fs.mkdirSync(outputDirectory);
}

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

cleanOutputDirectory(outputDirectory);

generateIcons();
