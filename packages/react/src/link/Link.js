import React, { forwardRef, useCallback } from 'react';
import { Box } from '../box';
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
  const preventDefaultCallback = useCallback((event) => event.preventDefault(), []);

  return (
    <Box
      as="a"
      ref={ref}
      aria-disabled={disabled}
      onClick={disabled ? preventDefaultCallback : onClick}
      {...styleProps}
      {...rest}
    />
  );
});

Link.displayName = 'Link';

export default Link;
