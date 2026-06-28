import { useTheme } from '../theme';

const useTextStyle = ({ size }) => {
  const { fontSizes, lineHeights } = useTheme();

  return {
    display: 'block', // Apply 'display: block' to ensure Text-based components behave as block-level elements
    fontSize: fontSizes?.[size],
    lineHeight: lineHeights?.[size],
  };
};

const useTextLabelStyle = ({ size }) => {
  const textStyle = useTextStyle({ size });
  const color = 'text.secondary';

  return {
    ...textStyle,
    color,
  };
};

export {
  useTextStyle,
  useTextLabelStyle,
};
