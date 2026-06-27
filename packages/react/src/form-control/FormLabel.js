import React, { forwardRef } from 'react';
import { ariaAttr } from '@tonic-ui/utils';
import { TextLabel } from '../text';
import { Box } from '../box';
import useFormControl from './useFormControl';
import { useFormLabelStyle, useFormLabelRequiredStyle } from './styles';

/**
 * @typedef {Object} FormLabelProps
 * @property {React.ReactNode} [children] -
 * @property {boolean} [required=false] - If `true`, shows a red asterisk indicator next to the label.
 */

/**
 * @type {ForwardRefComponent<'label', FormLabelProps>}
 */
const FormLabel = forwardRef(({ children, required = false, ...rest }, ref) => {
  const { fieldId } = useFormControl() ?? {};
  const labelStyleProps = useFormLabelStyle();
  const requiredStyleProps = useFormLabelRequiredStyle();
  const ariaProps = {
    'aria-required': ariaAttr(required),
  };

  return (
    <TextLabel
      ref={ref}
      htmlFor={fieldId}
      {...ariaProps}
      {...labelStyleProps}
      {...rest}
    >
      {children}
      {required ? <Box {...requiredStyleProps}>*</Box> : null}
    </TextLabel>
  );
});

FormLabel.displayName = 'FormLabel';

export default FormLabel;
