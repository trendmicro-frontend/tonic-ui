import { useColorMode } from '../color-mode';

const useDividerStyle = ({
  orientation,
  variant,
}) => {
  const [colorMode] = useColorMode();
  const dividerColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];
  const borderKey = {
    vertical: 'borderLeft',
    horizontal: 'borderTop',
  }[orientation];
  const borderColorKey = {
    vertical: 'borderLeftColor',
    horizontal: 'borderTopColor',
  }[orientation];
  const borderStyleKey = {
    vertical: 'borderLeftStyle',
    horizontal: 'borderTopStyle',
  }[orientation];

  return {
    [borderKey]: 1,
    [borderColorKey]: dividerColor,
    [borderStyleKey]: variant,
  };
};

export {
  useDividerStyle,
};
