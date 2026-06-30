import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { defaultVariant } from './constants';
import { useMarkStyle } from './styles';

/**
 * @typedef {Object} MarkProps
 * @property {React.ReactNode} [children] -
 * @property {'highlight' | 'emphasis' | 'none'} [variant='none'] - The variant to use. One of: 'highlight', 'emphasis', 'none'.
 */

/**
 * @type {ForwardRefComponent<'mark', MarkProps>}
 */
const Mark = forwardRef((inProps, ref) => {
  const {
    variant = defaultVariant,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Mark' });

  const styleProps = useMarkStyle({ variant });

  return (
    <Box
      as="mark"
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});

Mark.displayName = 'Mark';

export default Mark;
