import React, { forwardRef } from 'react';
import { TextLabel, Box } from '@tonic-ui/react';
import { ariaAttr } from '@tonic-ui/utils';
import useFormControl from './useFormControl';
import { useFormLabelStyle, useFormLabelRequiredStyle } from './styles';

const FormLabel = forwardRef(({ children, required = false, ...rest }, ref) => {
  const { id } = useFormControl();
  const labelStyleProps = useFormLabelStyle();
  const requiredStyleProps = useFormLabelRequiredStyle();

  const ariaProps = {
    'aria-required': ariaAttr(required),
  };

  return (
    <TextLabel
      ref={ref}
      htmlFor={id}
      {...ariaProps}
      {...labelStyleProps}
      {...rest}
    >
      {children}
      {required && <Box {...requiredStyleProps}>*</Box>}
    </TextLabel>
  );
});

FormLabel.displayName = 'FormLabel';

export default FormLabel;
