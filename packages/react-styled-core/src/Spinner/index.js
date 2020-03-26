import { forwardRef } from 'react';
import { keyframes } from '@emotion/core';
import useTheme from '../useTheme';
import Box from '../Box';
import PseudoBox from '../PseudoBox';

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
    strokeWidth: 2,
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
      color,
      ...props
    },
    ref,
  ) => {
    const { colors } = useTheme();
    const _width = sizes[size] ? sizes[size].width : sizes.md.width;
    const _strokeWidth = sizes[size] ? sizes[size].strokeWidth : sizes.md.strokeWidth;
    const _strokeColor = color ? (colors[color] || color) : colors['blue:60'];

    return (
      <PseudoBox
        position="relative"
        width={_width}
        __before={{
          content: '""',
          display: 'block',
          paddingTop: '100%',
        }}
        {...props}
      >
        <Box
          as="svg"
          viewBox="25 25 50 50"
          animation={`${rotate} 2s linear infinite`}
          height="100%"
          width="100%"
          transformOrigin=" center center"
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
            strokeWidth={_strokeWidth}
            strokeMiterlimit="10"
            strokeDasharray="1, 200"
            strokeDashoffset={0}
            strokeLinecap="round"
            stroke={_strokeColor}
            animation={`${dash} 1.5s ease-in-out infinite, color 6s ease-in-out infinite`}
          >
          </Box>
        </Box>
      </PseudoBox>
    );
  },
);

Spinner.displayName = 'Spinner';

export default Spinner;
