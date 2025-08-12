import React, { forwardRef } from 'react';
import { Text, Box } from '@tonic-ui/react';
import { ensureArray } from 'ensure-type';
import useFormControl from './useFormControl';
import {
  useFormErrorMessageStyle,
  useFormErrorMessageListStyle,
} from './styles';

const FormErrorMessage = forwardRef(({ errors = [], ...rest }, ref) => {
  const { error, errorId } = useFormControl();
  const styleProps = useFormErrorMessageStyle();
  const listStyleProps = useFormErrorMessageListStyle();

  if (!error) {
    return null;
  }

  const normalizedErrors = ensureArray(errors);

  if (normalizedErrors.length === 0) {
    return null;
  }

  const isSingleError = normalizedErrors.length === 1;

  return (
    <Text ref={ref} id={errorId} role="alert" {...styleProps} {...rest}>
      {isSingleError ? (
        normalizedErrors[0]
      ) : (
        <Box as="ul" {...listStyleProps}>
          {normalizedErrors.map((error, index) => (
            <Box as="li" key={index}>
              {error}
            </Box>
          ))}
        </Box>
      )}
    </Text>
  );
});

FormErrorMessage.displayName = 'FormErrorMessage';

export default FormErrorMessage;
