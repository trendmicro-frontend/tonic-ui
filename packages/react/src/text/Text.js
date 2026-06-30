import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useTextStyle } from './styles';

/**
 * @typedef {Object} TextProps
 * @property {React.ReactNode} [children] -
 * @property {'4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'} [size] -
 */

/**
 * @type {ForwardRefComponent<'div', TextProps>}
 */
const Text = forwardRef((inProps, ref) => {
  const {
    size,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Text' });
  const styleProps = useTextStyle({ size });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});

Text.displayName = 'Text';

export default Text;
