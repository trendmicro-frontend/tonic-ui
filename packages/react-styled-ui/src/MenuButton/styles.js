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

const menuButtonProps = ({ colorMode, color }) => {
  const hoverBorderColor = {
    dark: `${color}:50`,
    light: `${color}:50`,
  }[colorMode];
  const activeBorderColor = hoverBorderColor;
  return {
    justifyContent: 'left',
    pr: 'calc(2rem - 1px)', // 32px - 1px
    _hover: {
      '&:not(:focus)': {
        borderColor: hoverBorderColor,
      },
      zIndex: 2,
    },
    _active: {
      '&:not(:focus)': {
        borderColor: activeBorderColor,
      },
      bg: setColorWithOpacity('black', 0.12),
    },
  };
};

const useMenuButtonStyle = props => {
  const [colorMode] = useColorMode();
  const theme = useTheme();
  const _props = { ...props, colorMode, theme, color: 'blue' };

  return {
    ...menuButtonProps(_props),
  };
};

export { useMenuButtonStyle, getIconWrapperProps };
