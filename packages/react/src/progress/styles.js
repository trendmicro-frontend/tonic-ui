import { keyframes } from '@emotion/react';
import { createTransitionStyle } from '@tonic-ui/utils';
import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';

const progress = keyframes`
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
  const theme = useTheme();

  if (variant === 'determinate') {
    const startColor = theme?.colors?.['blue:60'];
    const endColor = theme?.colors?.['teal:40'];
    return {
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(90deg, ${startColor} 0%, ${endColor} 100%)`,
      transition: createTransitionStyle('all', { duration: 200, easing: 'linear' }),
    };
  }

  if (variant === 'indeterminate') {
    const startColor = theme?.colors?.['blue:60'];
    const endColor = theme?.colors?.['blue:60'];
    return {
      position: 'absolute',
      inset: 0,
      animation: `${progress} 1.6s linear .5s infinite`,
      background: [
        'linear-gradient(90deg, transparent, rgba(255, 255, 255, .12), transparent)',
        `linear-gradient(90deg, ${startColor}, ${endColor})`,
      ].join(','),
      width: 'auto',
      transition: createTransitionStyle('all', { duration: 200, easing: 'linear' }),
    };
  }

  return {};
};

export {
  useLinearProgressRootStyle,
  useLinearProgressIndicatorStyle,
};
