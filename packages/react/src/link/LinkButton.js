import React, { forwardRef } from 'react';
import { Box } from '../box';
import { ButtonBase } from '../button';
import { useDefaultProps } from '../default-props';
import { useLinkButtonStyle } from './styles';

const LinkButton = forwardRef((inProps, ref) => {
  const {
    disabled,
    textDecoration,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'LinkButton' });
  const styleProps = useLinkButtonStyle({ disabled, textDecoration });

  return (
    <Box
      as={ButtonBase}
      ref={ref}
      disabled={disabled}
      {...styleProps}
      {...rest}
    />
  );
});

LinkButton.displayName = 'LinkButton';

export default LinkButton;
