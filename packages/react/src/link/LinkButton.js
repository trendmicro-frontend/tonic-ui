import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import Link from './Link';

const LinkButton = forwardRef((props, ref) => {
  return (
    <Link
      as={ButtonBase}
      ref={ref}
      {...props}
    />
  );
});

LinkButton.displayName = 'LinkButton';

export default LinkButton;
