import React, { forwardRef } from 'react';
import Box from '../Box';
import { useLinkStyle } from './styles';

const Link = forwardRef((
  {
    disabled,
    onClick,
    textDecoration,
    ...rest
  },
  ref
) => {
  const styleProps = useLinkStyle({
    disabled,
    textDecoration,
  });

  return (
    <Box
      as="a"
      ref={ref}
      aria-disabled={disabled}
      onClick={disabled ? event => event.preventDefault() : onClick}
      {...styleProps}
      {...rest}
    />
  );
});

Link.displayName = 'Link';

export default Link;
