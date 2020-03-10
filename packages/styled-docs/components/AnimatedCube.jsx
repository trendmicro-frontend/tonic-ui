import { keyframes } from '@emotion/core';
import React from 'react';
import Cube from './Cube';

const cubeSpin = keyframes`
  from { transform: rotateY(0); }
  to { transform: rotateY(360deg); }
`;

/**
 * CSS Cube
 * https://davidwalsh.name/css-cube
 */
const AnimatedCube = (props) => {
  return (
    <Cube
      animation={`${cubeSpin} 8s infinite linear`}
      {...props}
    />
  );
};

export default AnimatedCube;
