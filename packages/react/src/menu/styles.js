import { useColorMode } from '../color-mode';
import { useColorStyle } from '../color-style';
import { setColorWithOpacity } from '../utils/colors';

const useMenuStyle = () => {
  return {
    position: 'relative',
    display: 'inline-flex',
  };
};

const useMenuButtonStyle = () => {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: '1x',
  };
};

const useMenuListStyle = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const colorModeStyle = {
    light: {
      backgroundColor: 'white',
      boxShadow: colorStyle?.shadow?.medium,
    },
    dark: {
      backgroundColor: 'gray:80',
      boxShadow: colorStyle?.shadow?.medium,
    },
  }[colorMode];

  return {
    color: 'inherit',
    m: '0',
    p: '0',
    py: '2x',
    _focus: {
      outline: 'none',
    },
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
    color,
  };
};

const useMenuItemStyle = () => {
  const [colorMode] = useColorMode();
  const hoverBackgroundColor = {
    light: 'black:disabled',
    dark: setColorWithOpacity('white', 0.12),
  }[colorMode];
  const activeBackgroundColor = {
    light: 'gray:20',
    dark: setColorWithOpacity('white', 0.08),
  }[colorMode];
  const disabledColor = {
    light: 'black:disabled',
    dark: 'white:disabled',
  }[colorMode];
  const disabledBackgroundColor = {
    light: 'white',
    dark: 'gray:80',
  }[colorMode];
  const focusBackgroundColor = activeBackgroundColor;

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
      backgroundColor: hoverBackgroundColor,
    },
    _active: {
      backgroundColor: activeBackgroundColor,
    },
    _focus: {
      backgroundColor: focusBackgroundColor,
    },
    _disabled: {
      backgroundColor: disabledBackgroundColor,
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

const useMenuToggleStyle = () => {
  return {
    cursor: 'pointer',
    display: 'inline-flex',
  };
};

const useMenuToggleIconStyle = () => {
  return {
    display: 'inline-flex',
    _disabled: {
      opacity: '.28',
    },
  };
};

export {
  useMenuStyle,
  useMenuButtonStyle,
  useMenuListStyle,
  useMenuGroupStyle,
  useMenuItemStyle,
  useMenuItemDividerStyle,
  useMenuToggleStyle,
  useMenuToggleIconStyle,
};
