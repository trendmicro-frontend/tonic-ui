import { useOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import { Button } from '../button';

const FlatButton = forwardRef((
  {
    variant: variantProp = 'solid',
    ...rest
  },
  ref,
) => {
  useOnce(() => {
    console.error('Warning: `FlatButton` is deprecated and will be removed in the next major release. Please use `Button` or `ButtonBase` instead.\n\nSee https://trendmicro-frontend.github.io/tonic-ui/react/latest/getting-started/migration-v0x for more information.');
  });

  const variant = {
    'solid': 'default',
    'outline': 'secondary',
  }[variantProp];

  return (
    <Button
      ref={ref}
      variant={variant}
      {...rest}
    />
  );
});

FlatButton.displayName = 'FlatButton';

export default FlatButton;
