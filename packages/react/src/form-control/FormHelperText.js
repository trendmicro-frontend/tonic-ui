import React, { forwardRef } from 'react';
import { useId } from '@tonic-ui/react-hooks';
import { Text } from '../text';
import useFormControl from './useFormControl';
import { useFormHelperTextStyle } from './styles';

/**
 * @typedef {Object} FormHelperTextProps
 * @property {React.ReactNode} [children] -
 */

/**
 * @type {ForwardRefComponent<'div', FormHelperTextProps>}
 */
const FormHelperText = forwardRef(({ children, ...rest }, ref) => {
  const defaultId = useId();
  const { formHelperTextId } = useFormControl() ?? {};
  const id = formHelperTextId ?? defaultId;
  const styleProps = useFormHelperTextStyle();

  return (
    <Text
      ref={ref}
      id={id}
      role="note"
      {...styleProps}
      {...rest}
    >
      {children}
    </Text>
  );
});

FormHelperText.displayName = 'FormHelperText';

export default FormHelperText;
