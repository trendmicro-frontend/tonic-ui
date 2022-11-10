import { keyframes } from '@emotion/react';
import { createTransitionStyle } from '@tonic-ui/utils';
import { ensureFiniteNumber } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useColorMode } from '../color-mode';

const defaultSize = 'sm';
const defaultVariant = 'indeterminate';

const progressKeyframe = keyframes`
  0% {
    left: -40%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -40%;
  }
  100% {
    left: 100%;
    right: -40%;
  }
`;

const useLinearProgressRootStyle = ({ size }) => {
  const [colorMode] = useColorMode();
  const backgroundColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];
  const height = {
    'xs': '1h',
    'sm': '1x',
    'md': '2x',
    'lg': '3x',
  }[size];

  return {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor,
    height,
  };
};

const useLinearProgressIndicatorStyle = ({ variant }) => {
  if (variant === 'determinate') {
    // | Start | End |
    // | :---- | :-- |
    // | Blue 60 (#1e5ede) | Teal 50 (#04caa1) |
    return {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, #1E5EDE 0%, #04CAA1 100%)',
      transition: createTransitionStyle('all', { duration: 200, easing: 'linear' }),
    };
  }

  if (variant === 'indeterminate') {
    return {
      position: 'absolute',
      inset: 0,
      backgroundColor: 'blue:60',
      width: 'auto',
      transition: createTransitionStyle('all', { duration: 200, easing: 'linear' }),
      animation: `${progressKeyframe} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`,
    };
  }

  return {};
};

const LinearProgress = forwardRef((
  {
    min = 0,
    max = 100,
    size = defaultSize,
    value,
    variant = defaultVariant,
    ...rest
  },
  ref,
) => {
  const rootStyleProps = useLinearProgressRootStyle({ size });
  const indicatorStyleProps = useLinearProgressIndicatorStyle({ variant });
  const rootProps = {
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': (variant === 'determinate') ? value : undefined,
    role: 'progressbar',
  };
  const indicatorProps = {};

  if (variant === 'determinate') {
    if ((process.env.NODE_ENV !== 'production') && (value === undefined)) {
      console.error('You need to provide a value prop when using the determinate variant of LinearProgress.');
    }

    const scale = (ensureFiniteNumber(value) - min) / (max - min);
    indicatorProps.style = {
      ...indicatorProps.style,
      clipPath: `inset(0 ${(1 - scale) * 100}% 0 0)`,
    };
  }

  return (
    <Box
      ref={ref}
      {...rootStyleProps}
      {...rootProps}
      {...rest}
    >
      <Box
        {...indicatorStyleProps}
        {...indicatorProps}
      />
    </Box>
  );
});

export default LinearProgress;
