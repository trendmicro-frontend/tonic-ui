import { keyframes } from '@emotion/core';
import { Box, useColorMode } from '@trendmicro/react-styled-core';
import cx from 'classnames';
import React from 'react';

const spinKeyframes = keyframes`
  0% {
    transform: rotate(0eg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

const spinReverseKeyframes = keyframes`
  0% {
    transform: rotate(359deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const TMIcon = React.forwardRef(({
  spin,
  spinReverse,
  fontSize = 'md',
  className,
  name,
  ...props
}, ref) => {
  const { colorMode } = useColorMode();
  const color = {
    light: '#666666',
    dark: '#bbbbbb',
  }[colorMode];

  return (
    <Box
      ref={ref}
      as="i"
      name={name}
      className={cx(className, 'tmicon', { [`tmicon-${name}`]: !!name })}
      color={color}
      display="inline-block"
      fontSize={fontSize}
      verticalAlign="top"
      animation={
        (spin && `${spinKeyframes} 2s infinite linear`) ||
        (spinReverse && `${spinReverseKeyframes} 2s infinite linear`) ||
        ''
      }
      {...props}
    />
  );
});

export default TMIcon;
