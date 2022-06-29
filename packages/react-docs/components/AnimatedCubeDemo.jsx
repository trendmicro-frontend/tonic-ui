import { keyframes } from '@emotion/react';
import { Box, Flex, Image, Text, Icon, useColorMode } from '@tonic-ui/react';
import { ensureString } from 'ensure-type';
import React from 'react';
import Cube from './Cube';

const BASE_PATH = ensureString(process.env.BASE_PATH);

const cubeSpin = keyframes`
  from { transform: rotateY(360deg); }
  to { transform: rotateY(0deg); }
`;

const AnimatedCubeDemo = ({ size = 128, ...rest }) => {
  const [colorMode] = useColorMode();
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
          <Image alt="" src={`${BASE_PATH}/images/Trend-Micro-Logo.svg`} width="80%" />
        </Cube.Front>
        <Cube.Back>
          <Box
            textShadow={textShadow}
          >
            {colorMode === 'dark' && (
              <Flex direction="column" spacing="3x">
                <Icon icon="moon" size={24} mx="auto" />
                <Text>Dark Mode</Text>
              </Flex>
            )}
            {colorMode === 'light' && (
              <Flex direction="column" spacing="3x">
                <Icon icon="sun" size={24} mx="auto" />
                <Text>Light Mode</Text>
              </Flex>
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
            Tonic UI
          </Text>
        </Cube.Right>
      </Cube>
    </Box>
  );
};

export default AnimatedCubeDemo;
