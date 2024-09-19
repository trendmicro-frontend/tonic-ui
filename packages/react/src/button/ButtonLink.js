import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import Button from './Button';

const ButtonLink = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'ButtonLink' });

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
