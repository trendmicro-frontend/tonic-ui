import { keyframes } from '@emotion/core';
import { Box } from '@trendmicro/react-styled-ui';
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
  size,
  ...props
}, ref) => {
  if (size !== undefined) {
    if (typeof size === 'number') {
      size = `${size || 0}px`;
    }
    fontSize = size;
  }

  return (
    <Box
      ref={ref}
      as="i"
      name={name}
      className={cx(className, 'tmicon', { [`tmicon-${name}`]: !!name })}
      display="inline-block"
      fontSize={fontSize}
      lineHeight="1"
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
