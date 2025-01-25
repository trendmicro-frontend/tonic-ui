import { keyframes } from '@emotion/react';
import { createTransitionStyle } from '@tonic-ui/utils';
import { ensureArray } from 'ensure-type';
import { useMemo } from 'react';
import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';

const baseAnimationDuration = 2; // in seconds

const linearProgressBarKeyframe = keyframes`
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

const circularProgressRootKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const useLinearProgressRootStyle = () => {
  const [colorMode] = useColorMode();
  const backgroundColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];

  return {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor,
    height: '1x',
  };
};

const useLinearProgressBarStyle = ({
  color,
  variant,
}) => {
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
      animation: `${linearProgressBarKeyframe} 1.6s linear .5s infinite`,
      background: (colors.length > 1)
        ? `linear-gradient(90deg,${colors.join(',')})`
        : colors[0],
      transition: createTransitionStyle('all', { duration: 200, easing: 'linear' }),
    };
  }

  return {};
};

const useCircularProgressRootStyle = ({
  color,
  size,
  variant,
}) => {
  const baseStyle = {
    color,
    display: 'inline-block',
    width: size,
    height: size,
  };

  if (variant === 'determinate') {
    return {
      ...baseStyle,
      transform: 'rotate(-90deg)',
      transition: createTransitionStyle('transform'),
    };
  }

  if (variant === 'indeterminate') {
    return {
      ...baseStyle,
      animation: `${circularProgressRootKeyframe} ${baseAnimationDuration}s linear infinite`,
    };
  }

  return baseStyle;
};

const useCircularProgressSVGStyle = ({
  size,
}) => {
  const viewBox = `0 0 ${size} ${size}`;
  return {
    display: 'block',
    viewBox,
  };
};

const useCircularProgressTrackStyle = ({
  size,
  thickness,
  trackColor,
}) => {
  const [colorMode] = useColorMode();
  const color = trackColor ?? {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];
  const radius = (size - thickness) / 2;
  const baseStyle = {
    color,
    fill: 'none',
    cx: size / 2,
    cy: size / 2,
    r: radius,
    stroke: 'currentColor',
    strokeWidth: thickness,
  };

  return baseStyle;
};

const useCircularProgressIndicatorStyle = ({
  color,
  scale, // between 0 and 1 inclusive (0 ≤ scale ≤ 1)
  size,
  thickness,
  variant,
}) => {
  const radius = (size - thickness) / 2;
  const circumference = radius * 2 * Math.PI;
  const animationKeyframe = useMemo(() => {
    return keyframes`
      0% {
        stroke-dasharray: 0, ${circumference};
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: ${circumference * 0.6}, ${circumference};
        stroke-dashoffset: -${circumference * (1 - 0.6) - thickness * 4};
      }
      100% {
        stroke-dasharray: ${circumference * 0.6}, ${circumference};
        stroke-dashoffset: -${(circumference * 1 - thickness * 4)};
      }
    `;
  }, [circumference, thickness]);
  const baseStyle = {
    color,
    fill: 'none',
    cx: size / 2,
    cy: size / 2,
    r: radius,
    stroke: 'currentColor',
    strokeWidth: thickness,
  };

  if (variant === 'determinate') {
    const percentage = 100 - scale * 100;
    const strokeDasharray = circumference.toFixed(3);
    const strokeDashoffset = ((percentage / 100) * circumference).toFixed(3) + 'px';

    return {
      ...baseStyle,
      strokeDasharray,
      strokeDashoffset,
      transition: createTransitionStyle('stroke-dashoffset'),
    };
  }

  if (variant === 'indeterminate') {
    const animationDuration = Math.floor(baseAnimationDuration * 0.75 * 100) / 100; // in seconds

    return {
      ...baseStyle,
      animation: `${animationKeyframe} ${animationDuration}s ease-in-out infinite`,
      strokeLinecap: 'round',
    };
  }

  return baseStyle;
};

export {
  useLinearProgressRootStyle,
  useLinearProgressBarStyle,
  useCircularProgressRootStyle,
  useCircularProgressSVGStyle,
  useCircularProgressTrackStyle,
  useCircularProgressIndicatorStyle,
};
