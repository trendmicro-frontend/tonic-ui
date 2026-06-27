import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { usePopoverBodyStyle } from './styles';

/**
 * @typedef {Object} PopoverBodyProps
 * @property {React.ReactNode} [children] - The content of the popover body.
 */

/**
 * @type {ForwardRefComponent<'div', PopoverBodyProps>}
 */
const PopoverBody = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'PopoverBody' });
  const styleProps = usePopoverBodyStyle({});

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

PopoverBody.displayName = 'PopoverBody';

export default PopoverBody;
