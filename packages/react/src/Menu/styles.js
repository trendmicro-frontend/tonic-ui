import { setColorWithOpacity } from '../theme/colors';
import useColorMode from '../useColorMode';
import useColorStyle from '../useColorStyle';

const useMenuListStyle = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const colorModeStyle = {
    light: {
      bg: 'white',
      boxShadow: colorStyle?.shadow?.medium,
    },
    dark: {
      bg: 'gray:80',
      boxShadow: colorStyle?.shadow?.medium,
    },
  }[colorMode];

  return {
    color: 'inherit',
    m: '0',
    p: '0',
    py: '2x',
    ...colorModeStyle,
  };
};

const useMenuGroupStyle = () => {
  const [colorMode] = useColorMode();
  const color = {
    dark: 'white:secondary',
    light: 'black:secondary',
  }[colorMode];

  return {
    px: '3x',
    py: '2x',
    color
  };
};

const useMenuItemStyle = () => {
  const [colorMode] = useColorMode();
  const hoverBackground = {
    light: 'black:disabled',
    dark: setColorWithOpacity('white', 0.12),
  }[colorMode];
  const activeBackground = {
    light: 'gray:20',
    dark: setColorWithOpacity('white', 0.08),
  }[colorMode];
  const disabledColor = {
    light: 'black:disabled',
    dark: 'white:disabled',
  }[colorMode];
  const disabledBackground = {
    light: 'white',
    dark: 'gray:80',
  }[colorMode];
  const focusBackground = activeBackground;

  return {
    flex: ' 0 0 auto',
    userSelect: 'none',
    px: '3x',
    py: '2x',
    color: 'inherit',
    cursor: 'pointer',
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
    textAlign: 'left',
    outline: 'none',
    _hover: {
      bg: hoverBackground,
    },
    _active: {
      bg: activeBackground,
    },
    _focus: {
      bg: focusBackground,
      outline: 0,
    },
    _disabled: {
      bg: disabledBackground,
      color: disabledColor,
      cursor: 'not-allowed',
    },
  };
};

const useMenuItemDividerStyle = () => {
  return {
    my: '2x'
  };
};

const useMenuButtonStyle = (props) => {
  const [colorMode] = useColorMode();
  const hoverBorderColor = {
    dark: 'blue:50',
    light: 'blue:50',
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

const useMenuIndicatorStyle = (props) => {
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

export {
  useMenuListStyle,
  useMenuGroupStyle,
  useMenuItemStyle,
  useMenuItemDividerStyle,
  useMenuButtonStyle,
  useMenuIndicatorStyle,
};
