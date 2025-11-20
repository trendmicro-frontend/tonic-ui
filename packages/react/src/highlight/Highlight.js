import { ensureArray } from 'ensure-type';
import { findAll } from 'highlight-words-core';
import React, { forwardRef, useMemo } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { Mark } from '../mark';
import { VARIANT_HIGHLIGHT } from '../mark/constants';
import { transformJSXTextNodes } from './utils';

const defaultCaseSensitive = false;

const Highlight = forwardRef((inProps, ref) => {
  const {
    caseSensitive = defaultCaseSensitive,
    children,
    query,
    slots = {},
    slotProps = {},
    transform,
    variant = VARIANT_HIGHLIGHT,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Highlight' });

  // Memoize processed search words once
  const searchWords = useMemo(() => ensureArray(query).filter(Boolean), [query]);

  const transformedChildren = useMemo(() => {
    if (searchWords.length === 0) {
      return children;
    }

    const MarkComponent = slots?.mark ?? Mark;

    return transformJSXTextNodes(children, (text) => {
      const chunks = findAll({
        autoEscape: true,
        caseSensitive,
        sanitize: transform,
        searchWords,
        textToHighlight: text,
      });

      return chunks.map(({ start, end, highlight: match }, chunkIndex) => {
        const chunkText = text.slice(start, end);
        const key = `${start}-${end}-${chunkIndex}`;

        if (match) {
          return (
            <MarkComponent key={key} variant={variant} {...slotProps.mark}>
              {chunkText}
            </MarkComponent>
          );
        }
        return chunkText;
      });
    });
  }, [children, searchWords, caseSensitive, transform, variant, slots, slotProps]);

  return (
    <Box ref={ref} {...rest}>
      {transformedChildren}
    </Box>
  );
});

Highlight.displayName = 'Highlight';

export default Highlight;
