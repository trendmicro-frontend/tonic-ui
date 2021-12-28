import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const useAccordionStyle = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
  };
};

const useAccordionHeaderStyle = ({ disabled }) => {
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
  const py = `calc(${sizes['2x']} - ${borderWidth})`;

  return {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor,
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth,
    color: disabled ? disabledColor : color,
    px,
    py,
    width: '100%',
  };
};

const useAccordionToggleIndicatorStyle = () => {
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
  useAccordionToggleIndicatorStyle,
};
