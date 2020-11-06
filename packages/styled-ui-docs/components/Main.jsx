/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Box, useColorMode } from '@trendmicro/react-styled-ui';
import React from 'react';

const Main = React.forwardRef(({ children, ...props }, ref) => {
  const { colorMode } = useColorMode();
  const backgroundColor = {
    light: 'white',
    dark: 'gray:100',
  }[colorMode];

  return (
    <Box
      as="main"
      pt="3x"
      pb="6x"
      px="6x"
      backgroundColor={backgroundColor}
      css={css`
        >:first-of-type {
          margin-top: 0!important;
        }
        >:last-child {
          margin-bottom: 0!important;
        }
      `}
      {...props}
    >
      {children}
    </Box>
  );
});

export default Main;
