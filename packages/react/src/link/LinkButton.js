import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import Link from './Link';
import { useLinkButtonStyle } from './styles';

const LinkButton = forwardRef((props, ref) => {
  const styleProps = useLinkButtonStyle();

  return (
    <Link
      as={ButtonBase}
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

LinkButton.displayName = 'LinkButton';

export default LinkButton;
