import { css } from '@emotion/react';
import { Box, useColorMode } from '@trendmicro/react-styled-ui';
import React from 'react';

const Main = React.forwardRef(({ children, ...props }, ref) => {
  const [colorMode] = useColorMode();
  const backgroundColor = {
    light: 'white',
    dark: 'gray:100',
  }[colorMode];

  return (
    <Box
      ref={ref}
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

Main.displayName = 'Main';

export default Main;
