import React, { forwardRef } from 'react';
import InputBase from '../InputBase';
import { useTextareaStyle } from './styles';

const defaultVariant = 'outline';

const Textarea = forwardRef((
  {
    variant,
    ...rest
  },
  ref,
) => {
  // Use the default variant if variant is null or undefined
  variant = variant ?? defaultVariant;

  const styleProps = useTextareaStyle({ variant });

  return (
    <InputBase
      ref={ref}
      as="textarea"
      {...styleProps}
      {...rest}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
