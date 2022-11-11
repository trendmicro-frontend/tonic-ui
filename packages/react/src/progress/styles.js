import { keyframes } from '@emotion/react';
import { createTransitionStyle } from '@tonic-ui/utils';
import { ensureArray } from 'ensure-type';
import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';

const indeterminateProgressAnimation = keyframes`
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

const useLinearProgressStyle = ({ size }) => {
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

const useLinearProgressBarStyle = ({ variant, color }) => {
  const theme = useTheme();
  const colors = ensureArray(color)
    .map(c => {
      // "blue"          => "blue"
      // "blue:60"       => "#1e5ede"
      // "black"         => "black"
      // "black:primary" => "rgba(0, 0, 0, .92)"
      return theme?.colors?.[c] ?? c;
    });

  if (variant === 'determinate') {
    return {
      position: 'absolute',
      inset: 0,
      background: (colors.length > 1)
        ? `linear-gradient(90deg,${colors.join(',')})`
        : colors[0],
      transition: createTransitionStyle('all', { duration: 200, easing: 'linear' }),
    };
  }

  if (variant === 'indeterminate') {
    return {
      position: 'absolute',
      inset: 0,
      animation: `${indeterminateProgressAnimation} 1.6s linear .5s infinite`,
      background: (colors.length > 1)
        ? `linear-gradient(90deg,${colors.join(',')})`
        : colors[0],
      transition: createTransitionStyle('all', { duration: 200, easing: 'linear' }),
    };
  }

  return {};
};

export {
  useLinearProgressStyle,
  useLinearProgressBarStyle,
};
