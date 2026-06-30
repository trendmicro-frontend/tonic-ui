import { sx } from '@tonic-ui/styled-system';
import React, { forwardRef } from 'react';
import { Box } from '../box';

/**
 * @typedef {Object} ScrollViewProps
 * @property {React.ReactNode} [children] -
 */

/**
 * @type {ForwardRefComponent<'div', ScrollViewProps>}
 */
const ScrollView = forwardRef((
  {
    css,
    ...rest
  },
  ref,
) => {
  css = [
    sx({ // Hide the browser scrollbar
      // Chrome, Safari and Opera
      '::-webkit-scrollbar': {
        display: 'none',
      },
      // IE and Edge
      msOverflowStyle: 'none',
      // Firefox
      scrollbarWidth: 'none',
    }),
    css
  ];

  return (
    <Box
      ref={ref}
      css={css}
      {...rest}
    />
  );
});

ScrollView.displayName = 'ScrollView';

export default ScrollView;
