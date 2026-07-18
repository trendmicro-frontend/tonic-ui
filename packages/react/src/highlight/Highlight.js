import { ensureArray } from 'ensure-type';
import React, { forwardRef, useMemo } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { Mark } from '../mark';
import { VARIANT_HIGHLIGHT } from '../mark/constants';
import { findAllChunks, transformJSXTextNodes } from './utils';
import { useHighlightStyle } from './styles';

const defaultCaseSensitive = false;

/**
 * @typedef {Object} HighlightProps
 * @property {boolean} [caseSensitive=false] - Whether matching should be case-sensitive.
 * @property {React.ReactNode} [children] - The content to search and highlight. It can be a plain string or React elements containing text.
 * @property {string | string[]} query - The search word(s) to highlight within the content.
 * @property {{ mark?: React.ElementType }} [slots={}] - Custom components used for rendering. Use `slots.mark` to replace the default `Mark` component.
 * @property {{ mark?: { variant?: 'highlight' | 'emphasis' | 'none' } }} [slotProps={}] - Props forwarded to slot components. Use `slotProps.mark` to pass additional props to the `Mark` component.
 * @property {(searchWord: string) => string} [transform] - A function that transforms each search word before matching. Useful for implementing custom matching behavior such as accent-insensitive search, text normalization, or other preprocessing.
 * @property {'highlight' | 'emphasis' | 'none'} [variant='highlight'] - The visual style applied to highlighted text. Passed to the `Mark` component. Supported variants: 'highlight', 'emphasis', 'none'.
 */

/**
 * @type {ForwardRefComponent<'div', HighlightProps>}
 */
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

  const styleProps = useHighlightStyle();

  const transformedChildren = useMemo(() => {
    const MarkComponent = slots?.mark ?? Mark;

    return transformJSXTextNodes(children, (text) => {
      const chunks = findAllChunks({
        autoEscape: true,
        caseSensitive,
        transform,
        searchWords: ensureArray(query),
        text,
      });

      return chunks.map(({ start, end, match }, chunkIndex) => {
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
  }, [children, query, caseSensitive, transform, variant, slots, slotProps]);

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    >
      {transformedChildren}
    </Box>
  );
});

Highlight.displayName = 'Highlight';

export default Highlight;
