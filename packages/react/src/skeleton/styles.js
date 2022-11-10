import { keyframes } from '@emotion/react';
import { useColorMode } from '../color-mode';

const pulse = keyframes`
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

const wave = keyframes`
  0% {
    transform: translateX(-100%);
  }
  60% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const getAnimationProps = ({ animation, colorMode }) => {
  if (animation === 'pulse') {
    return {
      animation: `${pulse} 1.5s ease-in-out .5s infinite`,
    };
  }

  if (animation === 'wave') {
    const opacity = {
      dark: 0.08,
      light: 0.32,
    }[colorMode];

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
