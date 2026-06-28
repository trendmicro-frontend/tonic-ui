import { useFormControl } from '@tonic-ui/react';

function UseFormControlExample() {
  const formControl = useFormControl();

  if (formControl) {
    // Properties
    const disabled = formControl.disabled;
    const error = formControl.error;
    const readOnly = formControl.readOnly;
    const fieldId = formControl.fieldId;
    const orientation = formControl.orientation;
    const formCharacterCountId = formControl.formCharacterCountId;
    const formErrorMessageId = formControl.formErrorMessageId;
    const formHelperTextId = formControl.formHelperTextId;
  }

  return null;
}
