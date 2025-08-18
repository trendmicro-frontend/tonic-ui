import { TextLabel, Box } from '@tonic-ui/react';
import { ariaAttr } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import useFormControl from './useFormControl';
import { useFormLabelStyle, useFormLabelRequiredStyle } from './styles';

const FormLabel = forwardRef(({
  children,
  required = false,
  ...rest
}, ref) => {
  const { formInputId } = useFormControl() ?? {};
  const labelStyleProps = useFormLabelStyle();
  const requiredStyleProps = useFormLabelRequiredStyle();
  const ariaProps = {
    'aria-required': ariaAttr(required),
  };

  return (
    <TextLabel
      ref={ref}
      htmlFor={formInputId}
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
