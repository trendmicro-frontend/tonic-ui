import { keyframes } from '@emotion/react';
import { Box, Flex, Image, Text, Icon, useColorMode } from '@tonic-ui/react';
import { ensureString } from 'ensure-type';
import React, { useContext } from 'react';

const BASE_PATH = ensureString(process.env.TONIC_UI_REACT_DOCS_BASE_PATH);

const cubeSpin = keyframes`
  from { transform: rotateY(360deg); }
  to { transform: rotateY(0deg); }
`;

const AnimatedCube = ({ size = 128, ...rest }) => {
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

const CubeContext = React.createContext();

/**
 * CSS Cube
 * https://davidwalsh.name/css-cube
 */
const Cube = ({
  size,
  ...rest
}) => {
  size = Number(size) || 0;
  if (size < 0) {
    size = 0;
  }
  return (
    <CubeContext.Provider value={size}>
      <CubeObject {...rest} />
    </CubeContext.Provider>
  );
};

const CubeObject = (props) => {
  const size = useContext(CubeContext);
  return (
    <Box
      position="relative"
      width={size}
      height={size}
      my={0}
      mx="auto"
      transformStyle="preserve-3d"
      {...props}
    />
  );
};

const CubePlane = (props) => {
  const [colorMode] = useColorMode();
  const backgroundColor = colorMode === 'dark'
    ? 'rgba(255,255,255,.05)'
    : 'rgba(0,0,0,.05)';
  const boxShadow = colorMode === 'dark'
    ? 'dark.sm'
    : 'light.sm';

  return (
    <Box
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
      backgroundColor={backgroundColor}
      boxShadow={boxShadow}
      display="flex"
      justifyContent="center"
      alignItems="center"
      backfaceVisibility="hidden"
      {...props}
    />
  );
};

const Front = (props) => {
  const size = useContext(CubeContext);
  return (
    <CubePlane
      transform={`translateZ(${size / 2}px)`}
      {...props}
    />
  );
};

const Back = (props) => {
  const size = useContext(CubeContext);
  return (
    <CubePlane
      transform={`translateZ(-${size / 2}px) rotateY(180deg)`}
      {...props}
    />
  );
};

const Top = (props) => {
  const size = useContext(CubeContext);
  return (
    <CubePlane
      transform={`rotateX(-90deg) translateY(-${size / 2}px)`}
      transformOrigin="top center"
      {...props}
    />
  );
};

const Bottom = (props) => {
  const size = useContext(CubeContext);
  return (
    <CubePlane
      transform={`rotateX(90deg) translateY(${size / 2}px)`}
      transformOrigin="bottom center"
      {...props}
    />
  );
};

const Left = (props) => {
  const size = useContext(CubeContext);
  return (
    <CubePlane
      transform={`rotateY(270deg) translateX(-${size / 2}px)`}
      transformOrigin="center left"
      {...props}
    />
  );
};

const Right = (props) => {
  const size = useContext(CubeContext);
  return (
    <CubePlane
      transform={`rotateY(-270deg) translateX(${size / 2}px)`}
      transformOrigin="top right"
      {...props}
    />
  );
};

Cube.Front = Front;
Cube.Back = Back;
Cube.Top = Top;
Cube.Bottom = Bottom;
Cube.Left = Left;
Cube.Right = Right;

export default AnimatedCube;
