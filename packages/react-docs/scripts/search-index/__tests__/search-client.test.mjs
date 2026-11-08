import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import MiniSearch from 'minisearch';
import {
  createMiniSearchOptions,
} from '../../../search/config.mjs';
import {
  getSnippet,
  getSuggestions,
  searchDocuments,
} from '../../../search/client.mjs';

const documents = [
  {
    id: 'components/button',
    title: 'Button',
    heading: '',
    content: 'Button is used to trigger an action.',
    keywords: 'Button components button',
    category: 'React Components',
    path: 'components/button',
    url: '/components/button/',
  },
  {
    id: 'components/button#variants',
    title: 'Button',
    heading: 'Variants',
    content: 'Use the variant prop.',
    keywords: 'Button components button',
    category: 'React Components',
    path: 'components/button',
    url: '/components/button/#variants',
  },
  {
    id: 'components/button-link',
    title: 'ButtonLink',
    heading: '',
    content: 'A link styled as a button.',
    keywords: 'ButtonLink components buttonlink',
    category: 'React Components',
    path: 'components/button-link',
    url: '/components/button-link/',
  },
  {
    id: 'components/color-mode/useColorMode',
    title: 'useColorMode',
    heading: '',
    content: 'Returns the current color mode.',
    keywords: 'useColorMode hook usecolormode',
    category: 'React Components',
    path: 'components/color-mode/useColorMode',
    url: '/components/color-mode/useColorMode/',
  },
];

const createIndex = () => {
  const miniSearch = new MiniSearch(createMiniSearchOptions());
  miniSearch.addAll(documents);
  return miniSearch;
};

describe('searchDocuments', () => {
  it('ranks an exact title match above longer prefix matches', () => {
    const results = searchDocuments(createIndex(), 'Button');

    assert.equal(results[0].title, 'Button');
    assert.equal(results[0].url, '/components/button/');
  });

  it('ranks prefix matches', () => {
    const results = searchDocuments(createIndex(), 'butt');

    assert.equal(results[0].title, 'Button');
  });

  it('tolerates typos', () => {
    const results = searchDocuments(createIndex(), 'useColrMode');

    assert.equal(results[0].title, 'useColorMode');
  });

  it('returns no results for an empty or single-character query', () => {
    assert.deepEqual(searchDocuments(createIndex(), '   '), []);
    assert.deepEqual(searchDocuments(createIndex(), 'b'), []);
  });

  it('falls back to any word when no document matches every word', () => {
    const results = searchDocuments(createIndex(), 'Button zebra');

    assert.ok(results.length > 0);
    assert.equal(results[0].title, 'Button');
  });
});

describe('getSuggestions', () => {
  it('suggests matching document titles with canonical casing', () => {
    const suggestions = getSuggestions(createIndex(), 'butt');

    assert.ok(suggestions.includes('Button'));
    assert.ok(suggestions.includes('ButtonLink'));
    assert.equal(suggestions.includes('butt'), false);
  });

  it('falls back to indexed term completions', () => {
    const suggestions = getSuggestions(createIndex(), 'useCol');

    assert.ok(suggestions.some((suggestion) => suggestion.toLowerCase().startsWith('usecol')));
  });

  it('returns no suggestions for an empty query', () => {
    assert.deepEqual(getSuggestions(createIndex(), ''), []);
  });
});

describe('getSnippet', () => {
  it('returns the stored text when the first term is near the start', () => {
    const text = 'Close the modal with the close button.';
    assert.equal(getSnippet({ text }, ['close']), text);
  });

  it('starts the window before the first matched term', () => {
    const text = `${'x'.repeat(120)} close button`;
    const snippet = getSnippet({ text }, ['close']);
    assert.ok(snippet.startsWith('…'));
    assert.ok(snippet.includes('close button'));
    assert.ok(snippet.length < text.length);
  });

  it('returns an empty string when no text is stored', () => {
    assert.equal(getSnippet({}, ['close']), '');
  });
});
