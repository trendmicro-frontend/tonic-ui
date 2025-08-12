import React, { forwardRef, useMemo } from 'react';
import { Stack } from '@tonic-ui/react';
import { FormControlContext } from './context';
import { useFormControlStyle } from './styles';
import useAutoId from '@tonic-ui/react/src/utils/useAutoId';

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
    const fieldId = useAutoId();

    const errorId = `${fieldId}-error`;
    const helperId = `${fieldId}-helper`;
    const countId = `${fieldId}-charcount`;

    const contextValue = useMemo(
      () => ({
        id: fieldId,
        error: !!error,
        disabled: !!disabled,
        readOnly: !!readOnly,
        errorId,
        helperId,
        countId,
        orientation,
      }),
      [
        error,
        disabled,
        readOnly,
        fieldId,
        errorId,
        helperId,
        countId,
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
