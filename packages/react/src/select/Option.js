import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useOptionStyle } from './styles';

/**
 * @typedef {Object} OptionProps
 * @property {React.ReactNode} [children] - The content of the option.
 */

/**
 * @type {ForwardRefComponent<'option', OptionProps>}
 */
const Option = forwardRef((props, ref) => {
  const styleProps = useOptionStyle();

  return (
    <Box
      as="option"
      {...styleProps}
      {...props}
    />
  );
});

Option.displayName = 'Option';

export default Option;
