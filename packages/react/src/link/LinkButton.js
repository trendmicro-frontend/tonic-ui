import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { useDefaultProps } from '../default-props';
import Link from './Link';
import { useLinkButtonStyle } from './styles';

const LinkButton = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'LinkButton' });
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
