import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { extractDocument } from '../extract-document.mjs';

const metadata = {
  title: 'Button',
  path: 'components/button',
  category: 'React Components',
};

const markdown = `
import { Button } from '@tonic-ui/react';

# Button

\`Button\` is used to trigger an action.

## Variants

Use the \`variant\` prop to change the visual style.

\`\`\`jsx
const element = <Button variant="primary">Ignored code</Button>;
\`\`\`

{render('./variants')}

## Variants

Duplicate heading.

#### Nested heading

Nested heading content.
`;

describe('extractDocument', () => {
  const documents = extractDocument(markdown, metadata);

  it('creates an intro section and one section per level-2 heading', () => {
    assert.equal(documents.length, 3);
    assert.equal(documents[0].heading, '');
    assert.equal(documents[0].url, '/components/button/');
    assert.equal(documents[1].heading, 'Variants');
    assert.equal(documents[1].url, '/components/button/#variants');
    assert.equal(documents[2].heading, 'Variants');
    assert.equal(documents[2].url, '/components/button/#variants-1');
  });

  it('uses the h1 as the document title', () => {
    for (const document of documents) {
      assert.equal(document.title, 'Button');
      assert.equal(document.category, 'React Components');
      assert.equal(document.path, 'components/button');
    }
  });

  it('indexes prose but excludes code blocks, imports and render expressions', () => {
    const content = documents.map((document) => document.content).join(' ');

    assert.match(content, /trigger an action/);
    assert.match(content, /change the visual style/);
    assert.match(content, /Nested heading content/);
    assert.doesNotMatch(content, /Ignored code/);
    assert.doesNotMatch(content, /@tonic-ui\/react/);
    assert.doesNotMatch(content, /render\(/);
  });

  it('collects identifiers and headings as keywords', () => {
    assert.match(documents[0].keywords, /Button/);
    assert.match(documents[0].keywords, /variant/);
    assert.match(documents[0].keywords, /button/);
  });

  it('assigns unique ids', () => {
    const ids = documents.map((document) => document.id);
    assert.equal(new Set(ids).size, ids.length);
  });
});
