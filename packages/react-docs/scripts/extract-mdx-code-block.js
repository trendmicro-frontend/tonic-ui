const fs = require('node:fs');

const args = process.argv.slice(2);
const components = args;

const content = fs.readFileSync('./index.page.mdx', 'utf8');
const sections = content.split('\n#');

const generateComponentExample = (components, code) => {
  return `
import { ${components.join(', ')} } from '@tonic-ui/react';
import React from 'react';

const App = () => (
${code}
);

export default App;
`.trim();
};

sections.forEach(section => {
  const sectionName = section.split('\n')[0].split(' ').slice(1).join(' ');
  const normalizedSectionName = sectionName.toLowerCase().replace(/ /g, '-');
  const codeBlockRegex = /```jsx[^\n]*\n([\s\S]+?)```/g;
  // Array to store matched code blocks
  const codeBlocks = [];
  let match;

  // Loop through matches and push to codeBlocks array
  while ((match = codeBlockRegex.exec(section)) !== null) {
    codeBlocks.push(match[1].trim());
  }

  codeBlocks.forEach((codeBlock, index) => {
    const fileName = (index > 0)
      ? `${normalizedSectionName}-${index + 1}.js`
      : `${normalizedSectionName}.js`;
    fs.writeFileSync(fileName, generateComponentExample(components, codeBlock));
  });
});
