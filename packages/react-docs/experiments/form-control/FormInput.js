import { ariaAttr } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import useFormControl from './useFormControl';

const FormInput = forwardRef((props, ref) => {
  const defaultId = useId();
  const {
    disabled,
    error,
    readOnly,

    // IDs for associated form control elements
    formInputId,
    formErrorMessageId,
    formHelperTextId,
    formCharacterCountId,
  } = useFormControl() ?? {};
  const id = formInputId ?? defaultId;
  const describedByIds = [];
  if (formErrorMessageId) {
    describedByIds.push(formErrorMessageId);
  }
  if (formHelperTextId) {
    describedByIds.push(formHelperTextId);
  }
  if (formCharacterCountId) {
    describedByIds.push(formCharacterCountId);
  }

  return (
    <Input
      ref={ref}
      id={id}
      aria-describedby={ariaAttr(describedByIds.join(' '))}
      disabled={disabled}
      error={error}
      readOnly={readOnly}
      {...props}
    />
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
