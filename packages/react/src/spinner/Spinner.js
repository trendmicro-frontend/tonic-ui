import { keyframes } from '@emotion/react';
import { ensurePositiveFiniteNumber } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useColorMode } from '../color-mode';

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;

const sizes = {
  xs: {
    width: 16,
    strokeWidth: 2,
  },
  sm: {
    width: 32,
    strokeWidth: 2,
  },
  md: {
    width: 48,
    strokeWidth: 4,
  },
  lg: {
    width: 64,
    strokeWidth: 4,
  },
  xl: {
    width: 80,
    strokeWidth: 4,
  },
};

const Spinner = forwardRef(
  (
    {
      size = 'md',
      label = 'Loading...',
      strokeWidth,
      color,
      speed = 2,
      ...rest
    },
    ref,
  ) => {
    const _width = sizes[size] ? sizes[size].width : sizes.md.width;
    const _strokeWidth = sizes[size] ? sizes[size].strokeWidth : sizes.md.strokeWidth;
    const _strokeColor = color ?? 'blue:60';

    /***** speed setting *****/
    const _speed = ensurePositiveFiniteNumber(speed);
    const _dashSpeed = Math.floor(_speed * 0.75 * 100) / 100;

    /***** full circle color *****/
    const [colorMode] = useColorMode();
    const _secondCircleColor = {
      light: 'rgba(0, 0, 0, 0.12)',
      dark: 'rgba(255, 255, 255, 0.12)',
    }[colorMode];
    return (
      <Box
        position="relative"
        width={_width}
        __before={{
          content: '""',
          display: 'block',
          paddingTop: '100%',
        }}
        {...rest}
      >
        <Box
          as="svg"
          viewBox="25 25 50 50"
          animation={`${rotate} ${_speed}s linear infinite`}
          height="100%"
          width="100%"
          transformOrigin="center center"
          position="absolute"
          top={0}
          bottom={0}
          right={0}
          left={0}
          margin="auto"
        >
          <Box
            as="circle"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth={strokeWidth ?? _strokeWidth}
            strokeDasharray="200, 200"
            strokeDashoffset={0}
            strokeLinecap="round"
            stroke={_secondCircleColor}
          />
          <Box
            as="circle"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth={strokeWidth ?? _strokeWidth}
            strokeMiterlimit="10"
            strokeDasharray="1, 200"
            strokeDashoffset={0}
            strokeLinecap="round"
            stroke={_strokeColor}
            animation={`${dash} ${_dashSpeed}s ease-in-out infinite`}
          />
        </Box>
      </Box>
    );
  },
);

Spinner.displayName = 'Spinner';

export default Spinner;
