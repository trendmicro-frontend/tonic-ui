import React, { forwardRef } from 'react';
import Button from './Button';

const ButtonLink = forwardRef((props, ref) => {
  return (
    <Button
      as="a"
      ref={ref}
      {...props}
    />
  );
});

ButtonLink.displayName = 'ButtonLink';

export default ButtonLink;
