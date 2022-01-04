import React, { forwardRef } from 'react';
import { css } from '@emotion/react';
import { Box } from '@tonic-ui/react';

const Content = forwardRef((props, ref) => {
  return (
    <Box
      ref={ref}
      css={css`
        >:first-of-type {
          margin-top: 0!important;
        }
        >:last-child {
          margin-bottom: 0!important;
        }
      `}
      py="3x"
      px="4x"
      {...props}
    />
  );
});

Content.displayName = 'Content';

export default Content;

