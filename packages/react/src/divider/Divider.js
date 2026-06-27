import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useDividerStyle } from './styles';

/**
 * @typedef {Object} DividerProps
 * @property {'solid' | 'dashed' | 'dotted'} [variant='solid'] - The variant of the divider style to use.
 * @property {'horizontal' | 'vertical'} [orientation='horizontal'] - The orientation of the divider.
 */

/**
 * @type {ForwardRefComponent<'hr', DividerProps>}
 */
const Divider = forwardRef((inProps, ref) => {
  const {
    orientation = 'horizontal',
    variant = 'solid',
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Divider' });
  const styleProps = useDividerStyle({ orientation, variant });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});

Divider.displayName = 'Divider';

export default Divider;
