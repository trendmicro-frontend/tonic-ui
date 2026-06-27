import React, { forwardRef } from 'react';
import { Box } from '../box';

/**
 * @typedef {Object} VerticalThumbProps
 * @property {React.ReactNode} [children] -
 */

/**
 * @type {ForwardRefComponent<'div', VerticalThumbProps>}
 */
const VerticalThumb = forwardRef((props, ref) => (
  <Box
    data-scrollbar-thumb="vertical"
    ref={ref}
    {...props}
  />
));

VerticalThumb.displayName = 'VerticalThumb';

export default VerticalThumb;
