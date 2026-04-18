import { isValidElement } from 'react';
import { findAllChunks, transformJSXTextNodes } from '../utils';

describe('findAllChunks', () => {
  describe('basic functionality', () => {
    it('should return empty array when text is empty', () => {
      const result = findAllChunks({
        searchWords: ['hello'],
        text: '',
      });

      expect(result).toEqual([]);
    });

    it('should return empty array when text is null', () => {
      const result = findAllChunks({
        searchWords: ['hello'],
        text: null,
      });

      expect(result).toEqual([]);
    });

    it('should return empty array when text is undefined', () => {
      const result = findAllChunks({
        searchWords: ['hello'],
        text: undefined,
      });

      expect(result).toEqual([]);
    });

    it('should return single non-matching chunk when no matches found', () => {
      const result = findAllChunks({
        searchWords: ['xyz'],
        text: 'hello world',
      });

      expect(result).toEqual([
        { start: 0, end: 11, match: false }
      ]);
    });

    it('should find single match in text', () => {
      const result = findAllChunks({
        searchWords: ['hello'],
        text: 'hello world',
      });

      expect(result).toEqual([
        { start: 0, end: 5, match: true },
        { start: 5, end: 11, match: false }
      ]);
    });

    it('should find multiple matches of same word', () => {
      const result = findAllChunks({
        searchWords: ['test'],
        text: 'test and test again',
      });

      expect(result).toEqual([
        { start: 0, end: 4, match: true },
        { start: 4, end: 9, match: false },
        { start: 9, end: 13, match: true },
        { start: 13, end: 19, match: false }
      ]);
    });

    it('should find matches for multiple search words', () => {
      const result = findAllChunks({
        searchWords: ['hello', 'world'],
        text: 'hello beautiful world',
      });

      expect(result).toEqual([
        { start: 0, end: 5, match: true },
        { start: 5, end: 16, match: false },
        { start: 16, end: 21, match: true }
      ]);
    });

    it('should handle text with only matching content', () => {
      const result = findAllChunks({
        searchWords: ['hello'],
        text: 'hello',
      });

      expect(result).toEqual([
        { start: 0, end: 5, match: true }
      ]);
    });
  });

  describe('case sensitivity', () => {
    it('should be case-insensitive by default', () => {
      const result = findAllChunks({
        searchWords: ['hello'],
        text: 'Hello HELLO hello',
      });

      expect(result).toEqual([
        { start: 0, end: 5, match: true },
        { start: 5, end: 6, match: false },
        { start: 6, end: 11, match: true },
        { start: 11, end: 12, match: false },
        { start: 12, end: 17, match: true }
      ]);
    });

    it('should be case-sensitive when caseSensitive is true', () => {
      const result = findAllChunks({
        searchWords: ['hello'],
        text: 'Hello hello HELLO',
        caseSensitive: true,
      });

      expect(result).toEqual([
        { start: 0, end: 6, match: false },
        { start: 6, end: 11, match: true },
        { start: 11, end: 17, match: false }
      ]);
    });

    it('should handle mixed case with multiple search words', () => {
      const result = findAllChunks({
        searchWords: ['Hello', 'World'],
        text: 'hello world HELLO WORLD',
        caseSensitive: false,
      });

      expect(result).toEqual([
        { start: 0, end: 5, match: true },
        { start: 5, end: 6, match: false },
        { start: 6, end: 11, match: true },
        { start: 11, end: 12, match: false },
        { start: 12, end: 17, match: true },
        { start: 17, end: 18, match: false },
        { start: 18, end: 23, match: true }
      ]);
    });
  });

  describe('autoEscape', () => {
    it('should escape regex special characters when autoEscape is true', () => {
      const result = findAllChunks({
        searchWords: ['hello.world'],
        text: 'hello.world and helloXworld',
        autoEscape: true,
      });

      expect(result).toEqual([
        { start: 0, end: 11, match: true },
        { start: 11, end: 27, match: false }
      ]);
    });

    it('should not escape regex special characters when autoEscape is false', () => {
      const result = findAllChunks({
        searchWords: ['hello.world'],
        text: 'hello.world and helloXworld',
        autoEscape: false,
      });

      // Without escaping, '.' matches any character
      expect(result.length).toBeGreaterThan(0);
      expect(result.some(chunk => chunk.match)).toBe(true);
    });

    it('should handle parentheses with autoEscape', () => {
      const result = findAllChunks({
        searchWords: ['(test)'],
        text: 'This is a (test) case',
        autoEscape: true,
      });

      expect(result).toEqual([
        { start: 0, end: 10, match: false },
        { start: 10, end: 16, match: true },
        { start: 16, end: 21, match: false }
      ]);
    });

    it('should handle brackets with autoEscape', () => {
      const result = findAllChunks({
        searchWords: ['[test]'],
        text: 'This is a [test] case',
        autoEscape: true,
      });

      expect(result).toEqual([
        { start: 0, end: 10, match: false },
        { start: 10, end: 16, match: true },
        { start: 16, end: 21, match: false }
      ]);
    });

    it('should handle asterisks with autoEscape', () => {
      const result = findAllChunks({
        searchWords: ['test*'],
        text: 'test* and test',
        autoEscape: true,
      });

      expect(result).toEqual([
        { start: 0, end: 5, match: true },
        { start: 5, end: 14, match: false }
      ]);
    });

    it('should handle plus signs with autoEscape', () => {
      const result = findAllChunks({
        searchWords: ['C++'],
        text: 'I love C++ programming',
        autoEscape: true,
      });

      expect(result).toEqual([
        { start: 0, end: 7, match: false },
        { start: 7, end: 10, match: true },
        { start: 10, end: 22, match: false }
      ]);
    });

    it('should handle question marks with autoEscape', () => {
      const result = findAllChunks({
        searchWords: ['what?'],
        text: 'what? is this',
        autoEscape: true,
      });

      expect(result).toEqual([
        { start: 0, end: 5, match: true },
        { start: 5, end: 13, match: false }
      ]);
    });
  });

  describe('transform function', () => {
    it('should apply transform to text and search words', () => {
      const transform = (str) => str.toLowerCase().trim();
      const result = findAllChunks({
        searchWords: ['  HELLO  '],
        text: '  HELLO WORLD  ',
        transform,
      });

      expect(result).toEqual([
        { start: 0, end: 5, match: true },
        { start: 5, end: 11, match: false }
      ]);
    });

    it('should use default transform when not provided', () => {
      const result = findAllChunks({
        searchWords: ['hello'],
        text: 'hello world',
      });

      expect(result).toEqual([
        { start: 0, end: 5, match: true },
        { start: 5, end: 11, match: false }
      ]);
    });

    it('should handle transform that removes accents', () => {
      const removeAccents = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const result = findAllChunks({
        searchWords: ['cafe'],
        text: 'café and cafe',
        transform: removeAccents,
      });

      expect(result).toEqual([
        { start: 0, end: 4, match: true },
        { start: 4, end: 9, match: false },
        { start: 9, end: 13, match: true }
      ]);
    });

    it('should handle transform that normalizes whitespace', () => {
      const normalizeWhitespace = (str) => str.replace(/\s+/g, ' ').trim();
      const result = findAllChunks({
        searchWords: ['hello world'],
        text: 'hello    world',
        transform: normalizeWhitespace,
      });

      expect(result).toEqual([
        { start: 0, end: 11, match: true }
      ]);
    });
  });

  describe('overlapping matches', () => {
    it('should combine overlapping matches', () => {
      const result = findAllChunks({
        searchWords: ['test', 'testing'],
        text: 'testing is fun',
      });

      // 'testing' contains 'test', so they should be combined
      expect(result).toEqual([
        { start: 0, end: 7, match: true },
        { start: 7, end: 14, match: false }
      ]);
    });

    it('should combine adjacent matches', () => {
      const result = findAllChunks({
        searchWords: ['hello', 'world'],
        text: 'helloworld',
      });

      expect(result).toEqual([
        { start: 0, end: 10, match: true }
      ]);
    });

    it('should handle multiple overlapping patterns', () => {
      const result = findAllChunks({
        searchWords: ['abc', 'bcd', 'cde'],
        text: 'abcde',
      });

      // All three patterns overlap, should be combined into one match
      expect(result).toEqual([
        { start: 0, end: 5, match: true }
      ]);
    });

    it('should handle partially overlapping matches', () => {
      const result = findAllChunks({
        searchWords: ['hello', 'llo wo'],
        text: 'hello world',
      });

      // 'hello' (0-5) and 'llo wo' (2-8) overlap, should be combined
      expect(result).toEqual([
        { start: 0, end: 8, match: true },
        { start: 8, end: 11, match: false }
      ]);
    });
  });

  describe('edge cases', () => {
    it('should handle empty searchWords array', () => {
      const result = findAllChunks({
        searchWords: [],
        text: 'hello world',
      });

      expect(result).toEqual([
        { start: 0, end: 11, match: false }
      ]);
    });

    it('should filter out empty strings from searchWords', () => {
      const result = findAllChunks({
        searchWords: ['', 'hello', ''],
        text: 'hello world',
      });

      expect(result).toEqual([
        { start: 0, end: 5, match: true },
        { start: 5, end: 11, match: false }
      ]);
    });

    it('should filter out null values from searchWords', () => {
      const result = findAllChunks({
        searchWords: [null, 'hello', null],
        text: 'hello world',
      });

      expect(result).toEqual([
        { start: 0, end: 5, match: true },
        { start: 5, end: 11, match: false }
      ]);
    });

    it('should filter out undefined values from searchWords', () => {
      const result = findAllChunks({
        searchWords: [undefined, 'hello', undefined],
        text: 'hello world',
      });

      expect(result).toEqual([
        { start: 0, end: 5, match: true },
        { start: 5, end: 11, match: false }
      ]);
    });

    it('should handle very long text', () => {
      const longText = 'hello '.repeat(1000) + 'world';
      const result = findAllChunks({
        searchWords: ['hello'],
        text: longText,
      });

      // Should find 1000 matches
      const matches = result.filter(chunk => chunk.match);
      expect(matches.length).toBe(1000);
    });

    it('should handle unicode characters', () => {
      const result = findAllChunks({
        searchWords: ['你好'],
        text: '你好世界 你好',
      });

      expect(result.length).toBeGreaterThan(0);
      expect(result.some(chunk => chunk.match)).toBe(true);
    });

    it('should handle emoji', () => {
      const result = findAllChunks({
        searchWords: ['😀'],
        text: 'Hello 😀 World 😀',
      });

      expect(result.length).toBeGreaterThan(0);
      expect(result.some(chunk => chunk.match)).toBe(true);
    });

    it('should handle newlines in text', () => {
      const result = findAllChunks({
        searchWords: ['hello'],
        text: 'hello\nworld\nhello',
      });

      expect(result).toEqual([
        { start: 0, end: 5, match: true },
        { start: 5, end: 12, match: false },
        { start: 12, end: 17, match: true }
      ]);
    });

    it('should handle tabs in text', () => {
      const result = findAllChunks({
        searchWords: ['hello'],
        text: 'hello\tworld\thello',
      });

      expect(result).toEqual([
        { start: 0, end: 5, match: true },
        { start: 5, end: 12, match: false },
        { start: 12, end: 17, match: true }
      ]);
    });

    it('should handle match at the end of text', () => {
      const result = findAllChunks({
        searchWords: ['world'],
        text: 'hello world',
      });

      expect(result).toEqual([
        { start: 0, end: 6, match: false },
        { start: 6, end: 11, match: true }
      ]);
    });

    it('should handle match at the beginning of text', () => {
      const result = findAllChunks({
        searchWords: ['hello'],
        text: 'hello world',
      });

      expect(result).toEqual([
        { start: 0, end: 5, match: true },
        { start: 5, end: 11, match: false }
      ]);
    });

    it('should handle consecutive matches', () => {
      const result = findAllChunks({
        searchWords: ['a'],
        text: 'aaa',
      });

      // Consecutive overlapping matches get combined into one
      expect(result).toEqual([
        { start: 0, end: 3, match: true }
      ]);
    });
  });

  describe('return value structure', () => {
    it('should return chunks with correct properties', () => {
      const result = findAllChunks({
        searchWords: ['hello'],
        text: 'hello world',
      });

      result.forEach(chunk => {
        expect(chunk).toHaveProperty('start');
        expect(chunk).toHaveProperty('end');
        expect(chunk).toHaveProperty('match');
        expect(typeof chunk.start).toBe('number');
        expect(typeof chunk.end).toBe('number');
        expect(typeof chunk.match).toBe('boolean');
        expect(chunk.end).toBeGreaterThan(chunk.start);
      });
    });

    it('should return chunks in correct order', () => {
      const result = findAllChunks({
        searchWords: ['hello', 'world'],
        text: 'hello beautiful world',
      });

      for (let i = 1; i < result.length; i++) {
        expect(result[i].start).toBe(result[i - 1].end);
      }
    });

    it('should cover entire text with chunks', () => {
      const text = 'hello beautiful world';
      const result = findAllChunks({
        searchWords: ['hello', 'world'],
        text,
      });

      expect(result[0].start).toBe(0);
      expect(result[result.length - 1].end).toBe(text.length);
    });
  });
});

describe('transformJSXTextNodes', () => {
  describe('basic functionality', () => {
    it('should transform string children', () => {
      const callback = (text) => text.toUpperCase();
      const result = transformJSXTextNodes('hello world', callback);

      expect(result).toEqual(['HELLO WORLD']);
    });

    it('should preserve React elements', () => {
      const callback = (text) => text.toUpperCase();
      const children = <div>hello</div>;
      const result = transformJSXTextNodes(children, callback);

      expect(result).toHaveLength(1);
      expect(isValidElement(result[0])).toBe(true);
    });

    it('should transform text nodes within React elements', () => {
      const callback = (text) => text.toUpperCase();
      const children = <div>hello world</div>;
      const result = transformJSXTextNodes(children, callback);

      expect(result).toHaveLength(1);
      expect(isValidElement(result[0])).toBe(true);
      expect(result[0].props.children).toEqual(['HELLO WORLD']);
    });

    it('should handle multiple children', () => {
      const callback = (text) => text.toUpperCase();
      const children = [
        'hello',
        <span key="1">world</span>,
        'test'
      ];
      const result = transformJSXTextNodes(children, callback);

      expect(result).toHaveLength(3);
      expect(result[0]).toBe('HELLO');
      expect(isValidElement(result[1])).toBe(true);
      expect(result[2]).toBe('TEST');
    });
  });

  describe('nested elements', () => {
    it('should recursively transform nested text nodes', () => {
      const callback = (text) => text.toUpperCase();
      const children = (
        <div>
          hello <span>world</span>
        </div>
      );
      const result = transformJSXTextNodes(children, callback);

      expect(result).toHaveLength(1);
      expect(isValidElement(result[0])).toBe(true);

      const divChildren = result[0].props.children;
      expect(divChildren).toHaveLength(2);
      expect(divChildren[0]).toBe('HELLO ');
      expect(isValidElement(divChildren[1])).toBe(true);
      expect(divChildren[1].props.children).toEqual(['WORLD']);
    });

    it('should handle deeply nested elements', () => {
      const callback = (text) => text.toUpperCase();
      const children = (
        <div>
          <p>
            <span>hello</span>
          </p>
        </div>
      );
      const result = transformJSXTextNodes(children, callback);

      expect(result).toHaveLength(1);
      expect(isValidElement(result[0])).toBe(true);
    });

    it('should preserve element structure', () => {
      const callback = (text) => text.toUpperCase();
      const children = (
        <div className="container">
          <p id="paragraph">
            hello <strong>world</strong>
          </p>
        </div>
      );
      const result = transformJSXTextNodes(children, callback);

      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('div');
      expect(result[0].props.className).toBe('container');

      const pElement = result[0].props.children[0];
      expect(pElement.type).toBe('p');
      expect(pElement.props.id).toBe('paragraph');
    });
  });

  describe('callback return values', () => {
    it('should handle callback returning React elements', () => {
      const callback = (text) => <mark>{text}</mark>;
      const children = 'hello world';
      const result = transformJSXTextNodes(children, callback);

      expect(result).toHaveLength(1);
      expect(isValidElement(result[0])).toBe(true);
      expect(result[0].type).toBe('mark');
    });

    it('should handle callback returning arrays', () => {
      const callback = (text) => text.split(' ').map((word) => (
        <span key={word}>{word}</span>
      ));
      const children = 'hello world';
      const result = transformJSXTextNodes(children, callback);

      // The callback returns an array, which becomes a nested array in the result
      expect(result).toHaveLength(1);
      expect(Array.isArray(result[0])).toBe(true);
      expect(result[0]).toHaveLength(2);
      expect(isValidElement(result[0][0])).toBe(true);
      expect(isValidElement(result[0][1])).toBe(true);
    });

    it('should filter out null values returned by callback', () => {
      const callback = (text) => (text === 'remove' ? null : text);
      const children = ['keep', 'remove', 'keep'];
      const result = transformJSXTextNodes(children, callback);

      expect(result).toHaveLength(2);
      expect(result[0]).toBe('keep');
      expect(result[1]).toBe('keep');
    });

    it('should filter out undefined values returned by callback', () => {
      const callback = (text) => (text === 'remove' ? undefined : text);
      const children = ['keep', 'remove', 'keep'];
      const result = transformJSXTextNodes(children, callback);

      expect(result).toHaveLength(2);
      expect(result[0]).toBe('keep');
      expect(result[1]).toBe('keep');
    });
  });

  describe('edge cases', () => {
    it('should handle empty children', () => {
      const callback = (text) => text.toUpperCase();
      const result = transformJSXTextNodes([], callback);

      expect(result).toEqual([]);
    });

    it('should handle null children', () => {
      const callback = (text) => text.toUpperCase();
      const result = transformJSXTextNodes(null, callback);

      expect(result).toEqual([]);
    });

    it('should handle undefined children', () => {
      const callback = (text) => text.toUpperCase();
      const result = transformJSXTextNodes(undefined, callback);

      expect(result).toEqual([]);
    });

    it('should handle number children', () => {
      const callback = (text) => text;
      const result = transformJSXTextNodes(123, callback);

      // React.Children.toArray keeps numbers as numbers
      expect(result).toEqual([123]);
    });

    it('should handle boolean children', () => {
      const callback = (text) => text;
      const result = transformJSXTextNodes([true, false], callback);

      // React.Children.toArray filters out booleans
      expect(result).toEqual([]);
    });

    it('should handle mixed content types', () => {
      const callback = (text) => text.toUpperCase();
      const children = [
        'text',
        123,
        <span key="1">element</span>,
        null,
        undefined,
        true,
        false
      ];
      const result = transformJSXTextNodes(children, callback);

      expect(result.length).toBeGreaterThan(0);
      expect(result.some(child => typeof child === 'string')).toBe(true);
      expect(result.some(child => isValidElement(child))).toBe(true);
    });

    it('should handle elements with no children', () => {
      const callback = (text) => text.toUpperCase();
      const children = <div />;
      const result = transformJSXTextNodes(children, callback);

      expect(result).toHaveLength(1);
      expect(isValidElement(result[0])).toBe(true);
    });

    it('should handle elements with empty string children', () => {
      const callback = (text) => text.toUpperCase();
      const children = <div />;
      const result = transformJSXTextNodes(children, callback);

      expect(result).toHaveLength(1);
      expect(isValidElement(result[0])).toBe(true);
    });

    it('should handle fragments', () => {
      const callback = (text) => text.toUpperCase();
      const children = (
        <>
          hello <span>world</span>
        </>
      );
      const result = transformJSXTextNodes(children, callback);

      expect(result.length).toBeGreaterThan(0);
    });

    it('should preserve keys on elements', () => {
      const callback = (text) => text.toUpperCase();
      const children = [
        <div key="1">hello</div>,
        <div key="2">world</div>
      ];
      const result = transformJSXTextNodes(children, callback);

      expect(result).toHaveLength(2);
      // React prefixes keys internally
      expect(result[0].key).toContain('1');
      expect(result[1].key).toContain('2');
    });
  });

  describe('complex transformations', () => {
    it('should handle callback that wraps text in multiple elements', () => {
      const callback = (text) => (
        <span className="wrapper">
          <strong>{text}</strong>
        </span>
      );
      const children = 'hello world';
      const result = transformJSXTextNodes(children, callback);

      expect(result).toHaveLength(1);
      expect(isValidElement(result[0])).toBe(true);
      expect(result[0].type).toBe('span');
      expect(result[0].props.className).toBe('wrapper');
    });

    it('should handle callback that splits and transforms text', () => {
      const callback = (text) => {
        return text.split(' ').map((word) => (
          <mark key={word}>{word.toUpperCase()}</mark>
        ));
      };
      const children = <div>hello world test</div>;
      const result = transformJSXTextNodes(children, callback);

      expect(result).toHaveLength(1);
      expect(isValidElement(result[0])).toBe(true);

      const divChildren = result[0].props.children;
      // The callback returns an array which gets wrapped
      expect(Array.isArray(divChildren)).toBe(true);
      expect(divChildren.length).toBeGreaterThan(0);

      // Flatten to check the mark elements
      const flatChildren = divChildren.flat();
      expect(flatChildren.length).toBe(3);
      flatChildren.forEach(child => {
        expect(isValidElement(child)).toBe(true);
        expect(child.type).toBe('mark');
      });
    });

    it('should handle callback with conditional logic', () => {
      const callback = (text) => {
        if (text.includes('important')) {
          return <strong>{text}</strong>;
        }
        return text;
      };
      const children = (
        <div>
          This is important text and this is normal text
        </div>
      );
      const result = transformJSXTextNodes(children, callback);

      expect(result).toHaveLength(1);
      expect(isValidElement(result[0])).toBe(true);
    });
  });
});
