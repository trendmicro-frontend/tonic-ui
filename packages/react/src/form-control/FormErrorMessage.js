import React, { forwardRef } from 'react';
import { ensureArray } from 'ensure-type';
import { useId } from '@tonic-ui/react-hooks';
import { Text } from '../text';
import { Box } from '../box';
import useFormControl from './useFormControl';
import {
  useFormErrorMessageStyle,
  useFormErrorMessageListStyle,
} from './styles';

/**
 * @typedef {Object} FormErrorMessageProps
 * @property {React.ReactNode | React.ReactNode[]} [errors=[]] - The error message(s) to display. Can be a single message or an array of messages.
 */

/**
 * @type {ForwardRefComponent<'div', FormErrorMessageProps>}
 */
const FormErrorMessage = forwardRef(({ errors = [], ...rest }, ref) => {
  const defaultId = useId();
  const { error, formErrorMessageId } = useFormControl() ?? {};
  const id = formErrorMessageId ?? defaultId;
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
    <Text ref={ref} id={id} role="alert" {...styleProps} {...rest}>
      {isSingleError ? (
        normalizedErrors[0]
      ) : (
        <Box as="ul" {...listStyleProps}>
          {normalizedErrors.map((error, index) => (
            // Use index as key because errors may be React nodes, which would
            // collide as `[object Object]` when used as keys directly.
            // eslint-disable-next-line react/no-array-index-key
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
