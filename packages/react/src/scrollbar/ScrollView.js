import React, { forwardRef } from 'react';
import { Box } from '../box';

/**
 * @typedef {Object} ScrollViewProps
 * @property {React.ReactNode} [children] -
 */

/**
 * @type {ForwardRefComponent<'div', ScrollViewProps>}
 */
const ScrollView = forwardRef((props, ref) => {
  // Styling (scrollbar-hiding base + overflow/size) is provided by the parent
  // `Scrollbar` via `getScrollViewProps()`'s `__sx`; `ScrollView` just forwards it.
  return (
    <Box
      ref={ref}
      {...props}
    />
  );
});

ScrollView.displayName = 'ScrollView';

export default ScrollView;
