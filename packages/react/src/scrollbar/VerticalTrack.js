import React, { forwardRef } from 'react';
import { Box } from '../box';

/**
 * @typedef {Object} VerticalTrackProps
 * @property {React.ReactNode} [children] -
 */

/**
 * @type {ForwardRefComponent<'div', VerticalTrackProps>}
 */
const VerticalTrack = forwardRef((props, ref) => (
  <Box
    data-scrollbar-track="vertical"
    ref={ref}
    {...props}
  />
));

VerticalTrack.displayName = 'VerticalTrack';

export default VerticalTrack;
