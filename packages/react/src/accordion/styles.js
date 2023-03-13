import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';

const useAccordionStyle = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
  };
};

const useAccordionHeaderStyle = () => {
  const [colorMode] = useColorMode();
  const { sizes } = useTheme();
  const backgroundColor = {
    dark: 'gray:90',
    light: 'white',
  }[colorMode];
  const borderWidth = sizes['1q'];
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];
  const disabledColor = {
    dark: 'white:disabled',
    light: 'black:disabled',
  }[colorMode];
  const px = sizes['4x'];
  const py = `calc(${sizes['3x']} - ${borderWidth})`;

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: '4x',
    backgroundColor,
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth,
    color,
    _disabled: {
      color: disabledColor,
    },
    px,
    py,
    width: '100%',
  };
};

const useAccordionBodyStyle = () => {
  return {
  };
};

const useAccordionToggleStyle = () => {
  return {
    width: '100%',
  };
};

const useAccordionToggleIconStyle = () => {
  return {
    display: 'inline-flex',
    _disabled: {
      opacity: '.28',
    },
  };
};

export {
  useAccordionStyle,
  useAccordionHeaderStyle,
  useAccordionBodyStyle,
  useAccordionToggleStyle,
  useAccordionToggleIconStyle,
};
