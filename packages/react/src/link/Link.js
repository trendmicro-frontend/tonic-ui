import { ariaAttr } from '@tonic-ui/utils';
import React, { forwardRef, useCallback } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { defaultVariant } from './constants';
import { useLinkStyle } from './styles';

const Link = forwardRef((inProps, ref) => {
  const {
    disabled,
    onClick,
    textDecoration,
    variant = defaultVariant,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Link' });
  const styleProps = useLinkStyle({
    disabled,
    textDecoration,
    variant,
  });
  const preventDefaultCallback = useCallback((event) => event.preventDefault(), []);

  return (
    <Box
      as="a"
      ref={ref}
      aria-disabled={ariaAttr(disabled)}
      onClick={disabled ? preventDefaultCallback : onClick}
      {...styleProps}
      {...rest}
    />
  );
});

Link.displayName = 'Link';

export default Link;
