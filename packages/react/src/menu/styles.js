import { sx } from '@tonic-ui/styled-system';
import { useColorMode } from '../color-mode';
import { useColorStyle } from '../color-style';
import { useTheme } from '../theme';

const useMenuStyle = () => {
  return {
    position: 'relative',
    display: 'inline-flex',
  };
};

const useMenuButtonCSS = ({ variant }) => {
  const [colorMode] = useColorMode();
  const primaryColor = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];
  // Override the color in hover and active states
  const variantCSS = {
    'ghost': {
      '&:hover': {
        color: primaryColor,
      },
      '&:active': {
        color: primaryColor,
      },
    },
    'secondary': {
      '&:hover': {
        color: primaryColor,
      },
      '&:active': {
        color: primaryColor,
      },
    },
  }[variant];

  return sx({
    ...variantCSS,
  });
};

const useMenuButtonStyle = () => {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: '1x',
  };
};

const useMenuContentStyle = ({
  tabIndex,
}) => {
  return {
    outline: (tabIndex < 0) ? 0 : undefined, // Remove the default outline for tabindex="-1"
  };
};

const useMenuListStyle = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const colorModeStyle = {
    dark: {
      backgroundColor: 'gray:80',
      boxShadow: colorStyle?.shadow?.medium,
    },
    light: {
      backgroundColor: 'white',
      boxShadow: colorStyle?.shadow?.medium,
    },
  }[colorMode];

  return {
    ...colorModeStyle,
    color: 'inherit',
    m: '0',
    p: '0',
    py: '2x',
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

const useMenuItemStyle = ({ tabIndex }) => {
  const { colors, sizes } = useTheme();
  const [colorMode] = useColorMode();
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];
  const hoverBackgroundColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];
  const focusBoxShadowColor = {
    dark: 'blue:60',
    light: 'blue:60',
  }[colorMode];
  const disabledColor = {
    dark: 'white:disabled',
    light: 'black:disabled',
  }[colorMode];
  const selectedBackgroundColor = {
    dark: 'rgba(255, 255, 255, 0.08)',
    light: 'rgba(0, 0, 0, 0.08)',
  }[colorMode];

  return {
    fontSize: 'sm',
    lineHeight: 'sm',
    color: color,
    cursor: 'pointer',
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
    textAlign: 'left',
    outline: (tabIndex < 0) ? 0 : undefined, // Remove the default outline for tabindex="-1"
    px: '3x',
    py: '2x',
    userSelect: 'none',
    width: '100%',
    _focusVisible: {
      boxShadow: `inset 0 0 0 ${sizes?.['1h']} ${colors?.[focusBoxShadowColor]}`,
    },
    _hover: {
      backgroundColor: hoverBackgroundColor,
    },
    _selected: {
      backgroundColor: selectedBackgroundColor,
    },
    _disabled: {
      backgroundColor: 'inherit',
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

const useSubmenuStyle = () => {
  return {
    position: 'relative',
  };
};

const useSubmenuContentStyle = ({
  tabIndex,
}) => {
  return {
    outline: (tabIndex < 0) ? 0 : undefined, // Remove the default outline for tabindex="-1"
  };
};

const useSubmenuListStyle = ({
  isOpen,
  placement,
}) => {
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
  const mapPlacementToStyle = (placement) => {
    return {
      'right-start': {
        position: 'absolute',
        top: 0,
        left: '100%',
      },
      'right-end': {
        position: 'absolute',
        bottom: 0,
        left: '100%',
      },
      'left-start': {
        position: 'absolute',
        top: 0,
        right: '100%',
      },
      'left-end': {
        position: 'absolute',
        bottom: 0,
        right: '100%',
      },
    }[placement];
  };
  const placementStyle = mapPlacementToStyle(placement) ?? mapPlacementToStyle('right-start');

  return {
    ...colorModeStyle,
    ...placementStyle,
    color: 'inherit',
    display: isOpen ? 'block' : 'none',
    m: '0',
    p: '0',
    py: '2x',
  };
};

const useSubmenuToggleStyle = () => {
  return {
    cursor: 'pointer',
    display: 'inline-flex',
  };
};

export {
  useMenuStyle,
  useMenuButtonCSS,
  useMenuButtonStyle,
  useMenuContentStyle,
  useMenuListStyle,
  useMenuGroupStyle,
  useMenuItemStyle,
  useMenuItemDividerStyle,
  useMenuToggleStyle,
  useMenuToggleIconStyle,
  useSubmenuStyle,
  useSubmenuContentStyle,
  useSubmenuListStyle,
  useSubmenuToggleStyle,
};
