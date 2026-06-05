import { forwardRef, useMemo } from 'react';
import { useId } from '@tonic-ui/react-hooks';
import { Stack } from '../stack';
import { FormControlContext } from './context';
import { useFormControlStyle } from './styles';

const FormControl = forwardRef(
  (
    {
      children,
      error = false,
      disabled = false,
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
    const fieldId = useId();

    const contextValue = useMemo(
      () => ({
        disabled,
        error,
        readOnly,
        formCharacterCountId,
        formErrorMessageId,
        formHelperTextId,
        fieldId,
        orientation,
      }),
      [
        disabled,
        error,
        readOnly,
        formCharacterCountId,
        formErrorMessageId,
        formHelperTextId,
        fieldId,
        orientation,
      ]
    );

    return (
      <FormControlContext.Provider value={contextValue}>
        <Stack ref={ref} {...styleProps} {...rest}>
          {children}
        </Stack>
      </FormControlContext.Provider>
    );
  }
);

FormControl.displayName = 'FormControl';

export default FormControl;
