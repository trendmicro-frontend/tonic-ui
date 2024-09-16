import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import { InputBase } from '../input';
import { useTextareaStyle } from './styles';

const defaultVariant = 'outline';

const Textarea = forwardRef((inProps, ref) => {
  const {
    variant = defaultVariant,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Textarea' });
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
