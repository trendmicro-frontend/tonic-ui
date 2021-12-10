import { cx } from '../shared/styled-system';
import React, { forwardRef } from 'react';
import Box from '../Box';

const ScrollView = forwardRef((
  {
    css,
    ...rest
  },
  ref,
) => {
  css = [
    cx({ // Hide the browser scrollbar
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
