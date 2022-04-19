import { useOnceWhen } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import warnDeprecatedProps from '../utils/warnDeprecatedProps';
import { useInputBaseStyle } from './styles';

/**
 * `InputBase` does not have appearance settings including default color, padding, outline, and border
 */
const InputBase = forwardRef((
  {
    isInvalid, // deprecated

    children,
    error,
    ...rest
  },
  ref,
) => {
  { // deprecation warning
    const prefix = `${InputBase.displayName}:`;

    useOnceWhen(() => {
      warnDeprecatedProps('isInvalid', {
        prefix,
        alternative: 'error',
        willRemove: true,
      });
    }, (isInvalid !== undefined));

    error = error || isInvalid; // TODO: remove this line after deprecation
  }

  const ariaProps = {
    'aria-disabled': rest.disabled,
    'aria-invalid': error,
    'aria-readonly': rest.readOnly,
    'aria-required': rest.required,
  };
  const styleProps = useInputBaseStyle();

  return (
    <Box
      as="input"
      ref={ref}
      {...ariaProps}
      {...styleProps}
      {...rest}
    >
      {children}
    </Box>
  );
});

InputBase.displayName = 'InputBase';

export default InputBase;
