import { useColorMode } from '../color-mode';
import { useColorStyle } from '../color-style';
import { useTheme } from '../theme';

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
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const color = {
    light: 'black:primary',
    dark: 'white:primary',
  }[colorMode];
  const hoverBackgroundColor = {
    light: 'rgba(0, 0, 0, 0.12)',
    dark: 'rgba(255, 255, 255, 0.12)',
  }[colorMode];
  const focusBorderColor = {
    light: 'blue:60',
    dark: 'blue:60',
  }[colorMode];
  const disabledColor = {
    light: 'black:disabled',
    dark: 'white:disabled',
  }[colorMode];
  const selectedBackgroundColor = {
    light: 'white',
    dark: 'rgba(255, 255, 255, 0.08)',
  }[colorMode];

  return {
    color: color,
    cursor: 'pointer',
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
    textAlign: 'left',
    outline: 'none',
    px: '3x',
    py: '2x',
    userSelect: 'none',
    _disabled: {
      color: disabledColor,
      cursor: 'not-allowed',
    },
    _focus: {
      borderColor: focusBorderColor,
      borderStyle: 'solid',
      borderWidth: '1h',
      px: `calc(${theme?.space['3x']} - ${theme?.space['1h']})`,
      py: `calc(${theme?.space['2x']} - ${theme?.space['1h']})`,
    },
    _hover: {
      backgroundColor: hoverBackgroundColor,
    },
    _selected: {
      backgroundColor: selectedBackgroundColor,
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
