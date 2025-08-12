import React, { forwardRef } from 'react';
import { Text } from '@tonic-ui/react';
import useFormControl from './useFormControl';
import { useFormHelperTextStyle } from './styles';

const FormHelperText = forwardRef(({ children, ...rest }, ref) => {
  const { helperId } = useFormControl();
  const styleProps = useFormHelperTextStyle();

  return (
    <Text ref={ref} id={helperId} role="note" {...styleProps} {...rest}>
      {children}
    </Text>
  );
});

FormHelperText.displayName = 'FormHelperText';

export default FormHelperText;
