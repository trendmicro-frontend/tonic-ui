import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useSpaceStyle } from './styles';

/**
 * @typedef {Object} SpaceProps
 * @property {React.ReactNode} [children] -
 * @property {number | string} [height] -
 * @property {number | string} [width] -
 */

/**
 * @type {ForwardRefComponent<'div', SpaceProps>}
 */
const Space = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'Space' });
  const styleProps = useSpaceStyle();

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

Space.displayName = 'Space';

export default Space;
