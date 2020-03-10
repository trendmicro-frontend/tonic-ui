import styled from '@emotion/styled';
import { Box, useColorMode } from '@trendmicro/react-styled-core';
import React from 'react';

/**
 * CSS Cube
 * https://davidwalsh.name/css-cube
 */
const Cube = ({
  size = 100,
  frontPane,
  backPane,
  topPane,
  bottomPane,
  leftPane,
  rightPane,
  ...rest
}) => {
  size = Number(size) || 0;
  const half = size / 2;
  const { colorMode } = useColorMode();
  const backgroundColor = colorMode === 'dark'
    ? 'rgba(255,255,255,.05)'
    : 'rgba(0,0,0,.05)';
  const boxShadow = colorMode === 'dark'
    ? 'dark.sm'
    : 'light.sm';

  const CubeEntity = styled(Box)`
    position: relative;
    width: ${size}px;
    height: ${size}px;
    margin: 0 auto;
    transform-style: preserve-3d;
  `;

  const CubePane = (props) => (
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
      {...props}
    />
  );

  const FrontPane = styled(CubePane)`
    transform: translateZ(${half}px);
  `;

  const BackPane = styled(CubePane)`
    transform: translateZ(-${half}px) rotateY(180deg);
  `;

  const TopPane = styled(CubePane)`
    transform: rotateX(-90deg) translateY(-${half}px);
    transform-origin: top center;
  `;

  const BottomPane = styled(CubePane)`
    transform: rotateX(90deg) translateY(${half}px);
    transform-origin: bottom center;
  `;

  const LeftPane = styled(CubePane)`
    transform: rotateY(270deg) translateX(-${half}px);
    transform-origin: center left;
  `;

  const RightPane = styled(CubePane)`
    transform: rotateY(-270deg) translateX(${half}px);
    transform-origin: top right;
  `;

  return (
    <CubeEntity {...rest}>
      <FrontPane>{frontPane}</FrontPane>
      <BackPane>{backPane}</BackPane>
      <TopPane>{topPane}</TopPane>
      <BottomPane>{bottomPane}</BottomPane>
      <LeftPane>{leftPane}</LeftPane>
      <RightPane>{rightPane}</RightPane>
    </CubeEntity>
  );
};

export default Cube;
