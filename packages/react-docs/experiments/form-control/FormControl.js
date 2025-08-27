import { Stack } from '@tonic-ui/react';
import { useId } from '@tonic-ui/react-hooks';
import React, { forwardRef, useMemo } from 'react';
import { FormControlContext } from './context';
import { useFormControlStyle } from './styles';

const FormControl = forwardRef((
  {
    children,
    disabled = false,
    error = false,
    readOnly = false,
    orientation = 'vertical',
    ...rest
  },
  ref
) => {
  const styleProps = useFormControlStyle({ orientation });
  const formCharacterCountId = useId();
  const formErrorMessageId = useId();
  const formHelperTextId = useId();
  const formInputId = useId();

  const contextValue = useMemo(() => ({
    disabled,
    error,
    readOnly,
    formCharacterCountId,
    formErrorMessageId,
    formHelperTextId,
    formInputId,
    orientation,
  }), [
    disabled,
    error,
    readOnly,
    formCharacterCountId,
    formErrorMessageId,
    formHelperTextId,
    formInputId,
    orientation,
  ]);

  return (
    <FormControlContext.Provider value={contextValue}>
      <Stack ref={ref} {...styleProps} {...rest}>
        {children}
      </Stack>
    </FormControlContext.Provider>
  );
});

FormControl.displayName = 'FormControl';

export default FormControl;
