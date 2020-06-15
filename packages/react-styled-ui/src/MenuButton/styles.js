import { setColorWithOpacity } from '../theme/colors';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const getIconWrapperProps = () => {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    pointerEvents: 'none',
    pr: 'calc(.75rem - 1px)', // 12px - 1px
    pl: '1x',
    color: 'inherit',
    _disabled: {
      opacity: '.28',
    },
  };
};

const menuButtonProps = ({ colorMode, theme: { colors } }) => {
  const isDarkMode = (colorMode === 'dark');
  const outerBorderColor = colors['blue:60'];
  const fontColor = isDarkMode ? 'white:primary' : 'black:primary';
  const style = {
    justifyContent: 'left',
    pr: 'calc(2rem - 1px)', // 32px - 1px
    borderColor: 'gray:60',
    color: fontColor,
    _focus: {
      borderColor: outerBorderColor,
      boxShadow: `inset 0 0 0 1px ${outerBorderColor}`,
      zIndex: 1,
    },
    _hover: {
      '&:not(:focus)': {
        borderColor: 'blue:50',
      },
      zIndex: 2,
    },
    _active: {
      '&:not(:focus)': {
        borderColor: 'blue:50',
      },
      bg: setColorWithOpacity('black', 0.12),
    },
    _disabled: {
      borderColor: 'gray:60',
      color: isDarkMode ? 'white:emphasis' : 'black',
      cursor: 'not-allowed',
      opacity: 0.28,
    },
  };

  return style;
};

const useMenuButtonStyle = props => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const _props = { ...props, colorMode, theme };

  return {
    ...menuButtonProps(_props),
  };
};

export { useMenuButtonStyle, getIconWrapperProps };
