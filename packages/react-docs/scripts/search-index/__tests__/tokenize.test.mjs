import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  getQueryTerms,
  tokenize,
} from '../../../search/config.mjs';

describe('search tokenizer', () => {
  it('indexes identifiers and their camel case parts', () => {
    const tokens = tokenize('useColorMode');

    assert.ok(tokens.includes('usecolormode'));
    assert.ok(tokens.includes('use'));
    assert.ok(tokens.includes('color'));
    assert.ok(tokens.includes('mode'));
  });

  it('drops single-character camel case fragments', () => {
    const tokens = tokenize('closeB');

    assert.ok(tokens.includes('closeb'));
    assert.ok(tokens.includes('close'));
    assert.equal(tokens.includes('b'), false);
  });

  it('splits punctuation and hyphenated terms', () => {
    const tokens = tokenize('date-picker, onInteractOutside');

    assert.ok(tokens.includes('date'));
    assert.ok(tokens.includes('picker'));
    assert.ok(tokens.includes('oninteractoutside'));
    assert.ok(tokens.includes('interact'));
    assert.ok(tokens.includes('outside'));
  });

  it('deduplicates query terms', () => {
    assert.deepEqual(getQueryTerms('color color mode'), ['color', 'mode']);
  });

  it('keeps camel case identifiers intact in queries', () => {
    assert.deepEqual(getQueryTerms('useColrMode'), ['usecolrmode']);
    assert.deepEqual(getQueryTerms('onInteractOutside'), ['oninteractoutside']);
  });
});
