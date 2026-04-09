import { ensureArray } from 'ensure-type';
import React from 'react';

/**
 * Escape RegExp special characters in a string.
 * @param {string} string
 * @returns {string}
 */
function escapeRegExpFn(string) {
  return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

/**
 * Finds all chunks of text to highlight, returning both highlightable and non-highlightable pieces.
 * @param {Object} options
 * @param {string[]} options.searchWords - Words to search for.
 * @param {string} options.text - Text to examine.
 * @param {boolean} [options.caseSensitive=false] - Whether matching is case-sensitive.
 * @param {boolean} [options.autoEscape=false] - Whether to escape RegExp characters in search words.
 * @param {(string) => string} [options.transform] - Function to transform text and search words.
 * @returns {Array<{start:number, end:number, match:boolean}>}
 */
function findAllChunks({
  searchWords = [],
  text = '',
  caseSensitive = false,
  autoEscape = false,
  transform = (s) => s
}) {
  if (!text) {
    return [];
  }

  const transformedText = transform(text);

  // 1. Collect all matching chunks
  const rawChunks = ensureArray(searchWords)
    .filter(Boolean)
    .flatMap((word) => {
      word = transform(word);
      if (autoEscape) {
        word = escapeRegExpFn(word);
      }
      const regex = new RegExp(word, caseSensitive ? 'g' : 'gi');
      const chunks = [];
      let match;
      while ((match = regex.exec(transformedText))) {
        const start = match.index;
        const end = regex.lastIndex;
        if (end > start) {
          chunks.push({ start, end, match: true });
        }
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
      }
      return chunks;
    });

  // 2. Combine overlapping chunks
  const combined = rawChunks
    .sort((a, b) => a.start - b.start)
    .reduce((acc, chunk) => {
      if (acc.length === 0) {
        return [chunk];
      }
      const prev = acc[acc.length - 1];
      if (chunk.start <= prev.end) {
        prev.end = Math.max(prev.end, chunk.end);
        prev.match = true;
      } else {
        acc.push(chunk);
      }
      return acc;
    }, []);

  // 3. Fill in non-highlighted chunks
  if (combined.length === 0) {
    return [
      { start: 0, end: transformedText.length, match: false }
    ];
  }

  const allChunks = [];
  let lastIndex = 0;
  combined.forEach((chunk) => {
    if (chunk.start > lastIndex) {
      allChunks.push({ start: lastIndex, end: chunk.start, match: false });
    }
    allChunks.push(chunk);
    lastIndex = chunk.end;
  });
  if (lastIndex < transformedText.length) {
    allChunks.push({ start: lastIndex, end: transformedText.length, match: false });
  }

  return allChunks;
}

/**
 * Transforms text nodes (string content) in JSX children while preserving JSX elements
 * @param {React.ReactNode} children - JSX children
 * @param {(text: string) => React.ReactNode | null} callback - Function to transform text content
 * @returns {React.ReactNode} - JSX with transformed text nodes
 */
function transformJSXTextNodes(children, callback) {
  return React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string') {
        // Apply callback to text nodes
        return callback(child);
      } else if (React.isValidElement(child)) {
        // Recursively transform nested children
        return React.cloneElement(child, {
          children: transformJSXTextNodes(child.props.children, callback),
        });
      }
      return child; // leave non-text, non-element nodes as-is
    })
    .filter((child) => child !== null && child !== undefined); // remove null/undefined if callback returns null
}

export {
  findAllChunks,
  transformJSXTextNodes,
};
