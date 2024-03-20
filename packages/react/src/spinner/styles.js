import { ensurePositiveInteger } from 'ensure-type';
import { keyframes } from '@emotion/react';
import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';

const defaultRadius = 24;
const defaultStrokeWidth = 4;

const baseAnimationDuration = 2; // in seconds
const baseAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const lineAnimationDuration = Math.floor(baseAnimationDuration * 0.75 * 100) / 100; // in seconds
const getLineAnimation = ({
  circumference,
  strokeWidth,
}) => {
  return keyframes`
    0% {
      stroke-dasharray: 0, ${circumference};
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: ${circumference * 0.6}, ${circumference};
      stroke-dashoffset: -${circumference * (1 - 0.6) - strokeWidth * 4};
    }
    100% {
      stroke-dasharray: ${circumference * 0.6}, ${circumference};
      stroke-dashoffset: -${(circumference * 1 - strokeWidth * 4)};
    }
  `;
};

const mapSizeToRadius = (size) => {
  return {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
  }[size] ?? defaultRadius;
};

const mapSizeToStrokeWidth = (size) => {
  return {
    xs: 2,
    sm: 2,
    md: 4,
    lg: 4,
    xl: 4,
  }[size] ?? defaultStrokeWidth;
};

const useSpinnerStyle = ({
  size,
}) => {
  const outerRadius = mapSizeToRadius(size);
  const width = outerRadius * 2;
  const height = outerRadius * 2;

  return {
    width,
    height,
  };
};

const useSpinnerSVGBaseStyle = ({
  size,
}) => {
  const outerRadius = mapSizeToRadius(size);

  return {
    viewBox: `0 0 ${outerRadius * 2} ${outerRadius * 2}`,
    animation: `${baseAnimation} ${baseAnimationDuration}s linear infinite`,
  };
};

const useSpinnerSVGTrackStyle = ({
  size,
  trackColor,
  trackWidth,
}) => {
  const { colors } = useTheme();
  const [colorMode] = useColorMode();
  const stroke = trackColor ?? {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];
  const strokeWidth = ensurePositiveInteger(trackWidth ?? mapSizeToStrokeWidth(size));
  const outerRadius = mapSizeToRadius(size);
  const centerRadius = outerRadius - strokeWidth / 2;

  return {
    fill: 'none',
    stroke: colors?.[stroke] ?? stroke,
    strokeWidth,
    cx: outerRadius,
    cy: outerRadius,
    r: centerRadius,
    strokeLinecap: 'round',
  };
};

const useSpinnerSVGLineStyle = ({
  size,
  lineColor,
  lineWidth,
}) => {
  const { colors } = useTheme();
  const stroke = lineColor ?? 'blue:60';
  const strokeWidth = ensurePositiveInteger(lineWidth ?? mapSizeToStrokeWidth(size));
  const outerRadius = mapSizeToRadius(size);
  const centerRadius = outerRadius - strokeWidth / 2;
  const circumference = Math.floor(outerRadius * Math.PI * 2);
  const lineAnimation = getLineAnimation({ circumference, strokeWidth });

  return {
    animation: `${lineAnimation} ${lineAnimationDuration}s ease-in-out infinite`,
    fill: 'none',
    stroke: colors?.[stroke] ?? stroke,
    strokeWidth,
    cx: outerRadius,
    cy: outerRadius,
    r: centerRadius,
    strokeLinecap: 'round',
  };
};

export {
  useSpinnerStyle,
  useSpinnerSVGBaseStyle,
  useSpinnerSVGTrackStyle,
  useSpinnerSVGLineStyle,
};
