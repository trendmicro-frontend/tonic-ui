import { Box, useColorMode } from '@trendmicro/react-styled-ui';
import React, { useContext } from 'react';

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

export default Cube;
