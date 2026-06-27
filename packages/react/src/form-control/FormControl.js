import React, { forwardRef, useMemo } from 'react';
import { useId } from '@tonic-ui/react-hooks';
import { Stack } from '../stack';
import { FormControlContext } from './context';
import { useFormControlStyle } from './styles';

/**
 * @typedef {Object} FormControlProps
 * @property {React.ReactNode} [children] -
 * @property {boolean} [disabled=false] - If `true`, all form elements will be disabled.
 * @property {boolean} [error=false] - If `true`, indicates error state for all form elements.
 * @property {'vertical' | 'horizontal'} [orientation='vertical'] - The layout orientation of the form control.
 * @property {boolean} [readOnly=false] - If `true`, all form elements will be read-only.
 */

/**
 * @type {ForwardRefComponent<'div', FormControlProps>}
 */
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
