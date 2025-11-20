import { ensureArray, ensureString } from 'ensure-type';
import { findAll } from 'highlight-words-core';

const useHighlight = ({
  caseSensitive,
  query: queryProp,
  transform,
  text: textProp,
}) => {
  const query = ensureArray(queryProp);
  const text = ensureString(textProp);

  // Use highlight-words-core to find chunks
  const chunks = findAll({
    autoEscape: true,
    caseSensitive,
    sanitize: transform,
    searchWords: query,
    textToHighlight: text,
  });

  // Return chunks in the format { start, end, text, match }
  return chunks.map((chunk) => ({
    start: chunk.start,
    end: chunk.end,
    text: text.slice(chunk.start, chunk.end),
    match: chunk.highlight,
  }));
};

export default useHighlight;
