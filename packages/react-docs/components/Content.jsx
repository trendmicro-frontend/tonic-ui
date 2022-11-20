import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { Box } from '@tonic-ui/react';

const Content = forwardRef((props, ref) => {
  return (
    <Box
      ref={ref}
      py="3x"
      px="4x"
      {...props}
    />
  );
});

Content.displayName = 'Content';

export default styled(Content)`
  >:first-child {
    margin-top: 0!important;
  }

  >:last-child {
    margin-bottom: 0!important;
  }
`;
