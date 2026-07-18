import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useOptionGroupStyle } from './styles';

/**
 * @typedef {Object} OptionGroupProps
 * @property {React.ReactNode} [children] - The content of the option group.
 */

/**
 * @type {ForwardRefComponent<'optgroup', OptionGroupProps>}
 */
const OptionGroup = forwardRef((props, ref) => {
  const styleProps = useOptionGroupStyle();

  return (
    <Box
      as="optgroup"
      {...styleProps}
      {...props}
    />
  );
});

OptionGroup.displayName = 'OptionGroup';

export default OptionGroup;
