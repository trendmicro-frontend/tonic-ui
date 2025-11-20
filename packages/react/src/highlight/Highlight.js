import React, { Fragment, forwardRef } from 'react';
import { ensureString } from 'ensure-type';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { Mark } from '../mark';
import { VARIANT_HIGHLIGHT } from '../mark/constants';
import useHighlight from './useHighlight';

const defaultCaseSensitive = false;

const Highlight = forwardRef((inProps, ref) => {
  const {
    children,
    caseSensitive = defaultCaseSensitive,
    query,
    slots = {},
    slotProps = {},
    transform,
    variant = VARIANT_HIGHLIGHT,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Highlight' });

  /*
  if (typeof children !== 'string') {
    throw new Error('The children prop of `Highlight` must be a string');
  }
  */
  const text = ensureString(children);

  const chunks = useHighlight({
    text,
    query,
    caseSensitive,
    transform,
  });

  const MarkComponent = slots?.mark ?? Mark;

  return (
    <Box ref={ref} {...rest}>
      {chunks.map((chunk, index) => {
        const key = `chunk_${index}`;
        if (chunk.match) {
          return (
            <MarkComponent key={key} variant={variant} {...slotProps?.mark}>
              {chunk.text}
            </MarkComponent>
          );
        }
        return <Fragment key={key}>{chunk.text}</Fragment>;
      })}
    </Box>
  );
});

Highlight.displayName = 'Highlight';

export default Highlight;
