import { keyframes } from '@emotion/react';
import { useColorMode } from '../color-mode';

const pulseKeyframe = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: .4;
  }
  100% {
    opacity: 1;
  }
`;

const waveKeyframe = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    // +0.5s of delay between each loop
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const getAnimationProps = ({ animation, colorMode }) => {
  if (animation === 'pulse') {
    return {
<<<<<<< HEAD
      animation: `${pulseKeyframe} 1.5s ease-in-out .5s infinite`,
=======
      animation: `${pulse} 1.5s ease-in-out .5s infinite`,
>>>>>>> 411e3a43 (feat: rework Skeleton component)
    };
  }

  if (animation === 'wave') {
    const opacity = {
      dark: 0.08,
      light: 0.32,
    }[colorMode];
<<<<<<< HEAD
    const colors = [
      'transparent',
      `rgba(255, 255, 255, ${opacity})`,
      'transparent',
    ].join(',');

    return {
      position: 'relative',
      overflow: 'hidden',
      __after: {
        animation: `${waveKeyframe} 1.6s linear .5s infinite`,
        background: `linear-gradient(90deg,${colors.join(',')})`,
        content: '""',
        position: 'absolute',
        inset: 0,
        transform: 'translateX(-100%)', // Avoid flash during server-side hydration
=======

    return {
      overflow: 'hidden',
      position: 'relative',
      __after: {
        position: 'absolute',
        inset: 0,
        content: '""',
        animation: `${wave} 1.6s linear .5s infinite`,
        transform: 'translateX(-100%)',
        background: 'linear-gradient(90deg, transparent, #FFFFFF, transparent)',
        opacity,
>>>>>>> 411e3a43 (feat: rework Skeleton component)
      },
    };
  }

  return {
    animation,
  };
};

const getVariantProps = ({ variant }) => {
  if (variant === 'text') {
    return {
      height: '3x',
      borderRadius: 'sm',
      _empty: {
        '::before': {
          content: '"\\00a0"',
        },
      },
    };
  }

  if (variant === 'rect') {
    return {}; // empty
  }

  if (variant === 'circle') {
    return {
      borderRadius: '50%',
    };
  }

  return {};
};

const useSkeletonStyle = ({
  animation,
  variant,
}) => {
  const [colorMode] = useColorMode();
  const backgroundColor = {
    dark: 'rgba(255, 255, 255, 0.08)',
    light: 'rgba(0, 0, 0, 0.08)',
  }[colorMode];
  const animationProps = getAnimationProps({ animation, colorMode });
  const variantProps = getVariantProps({ variant });

  return {
    display: 'block',
    backgroundColor,
    ...animationProps,
    ...variantProps,
  };
};

export {
  useSkeletonStyle,
};
