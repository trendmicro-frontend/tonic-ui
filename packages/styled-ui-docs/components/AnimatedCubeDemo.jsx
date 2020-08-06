import { keyframes } from '@emotion/core';
import { Box, Image, Stack, Text, TMIcon, useColorMode } from '@trendmicro/react-styled-ui';
import React from 'react';
import Cube from './Cube';

const cubeSpin = keyframes`
  from { transform: rotateY(360deg); }
  to { transform: rotateY(0deg); }
`;

const AnimatedCubeDemo = ({ size = 128, ...rest }) => {
  const { colorMode } = useColorMode();
  const textShadow = colorMode === 'dark'
    ? `
      -1px -1px 2px rgba(0,0,0,.4),
      1px -1px 2px rgba(0,0,0,.4),
      -1px 1px 2px rgba(0,0,0,.4),
      1px 1px 2px rgba(0,0,0,.4)
      `
    : 'none';

  return (
    <Box
      display="inline-block"
      py="16x"
      px="8x"
      perspective="100vw"
      perspectiveOrigin="center 250%"
      {...rest}
    >
      <Cube
        animation={`${cubeSpin} 8s infinite linear`}
        size={size}
      >
        <Cube.Front
          backgroundColor="white"
        >
          <Image src="images/Trend-Micro-Logo.svg" width="80%" />
        </Cube.Front>
        <Cube.Back>
          <Box
            textShadow={textShadow}
          >
            {colorMode === 'dark' && (
              <Stack direction="column" spacing="3x" textAlign="center">
                <TMIcon icon="moon" size={24} mx="auto" />
                <Text>Dark Mode</Text>
              </Stack>
            )}
            {colorMode === 'light' && (
              <Stack direction="column" spacing="3x" textAlign="center">
                <TMIcon icon="sun" size={24} mx="auto" />
                <Text>Light Mode</Text>
              </Stack>
            )}
          </Box>
        </Cube.Back>
        <Cube.Top
          backfaceVisibility="visible"
        />
        <Cube.Bottom
          backfaceVisibility="visible"
        />
        <Cube.Left>
          <Text
            fontSize="2xl"
            fontWeight="semibold"
            textShadow={textShadow}
          >
            Box
          </Text>
        </Cube.Left>
        <Cube.Right>
          <Text
            fontSize="lg"
            textShadow={textShadow}
          >
            Styled UI
          </Text>
        </Cube.Right>
      </Cube>
    </Box>
  );
};

export default AnimatedCubeDemo;
