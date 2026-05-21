import { ensureArray } from 'ensure-type';
import { forwardRef, useMemo } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { Mark } from '../mark';
import { VARIANT_HIGHLIGHT } from '../mark/constants';
import { findAllChunks, transformJSXTextNodes } from './utils';
import { useHighlightStyle } from './styles';

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
