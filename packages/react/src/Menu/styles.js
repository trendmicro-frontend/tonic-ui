import { setColorWithOpacity } from '../theme/colors';
import useTheme from '../useTheme';
import useColorMode from '../useColorMode';
import useColorStyle from '../useColorStyle';

export const useMenuButtonStyle = () => {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: '1x',
  };
};

export const useMenuToggleStyle = () => {
  return {
    cursor: 'pointer',
    display: 'inline-flex',
  };
};

export const useMenuToggleIconStyle = () => {
  return {
    display: 'inline-flex',
    _disabled: {
      opacity: '.28',
    },
  };
};

export const useMenuListStyle = () => {
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

/**
|--------------------------------------------------
| Styles for MenuGroup
|--------------------------------------------------
*/

export const useMenuGroupStyle = () => {
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

/**
|--------------------------------------------------
| Styles for MenuItem
|--------------------------------------------------
*/

const baseProps = () => {
  return {
    flex: ' 0 0 auto',
    userSelect: 'none',
    px: '3x',
    py: '2x',
    color: 'inherit',
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
    textAlign: 'left',
    outline: 'none'
  };
};

const menuItemProps = ({ colorMode }) => {
  const hoverBackground = { light: 'black:disabled', dark: setColorWithOpacity('white', 0.12) }[colorMode];
  const activeBackground = { light: 'gray:20', dark: setColorWithOpacity('white', 0.08) }[colorMode];
  const disabledColor = { light: 'black:disabled', dark: 'white:disabled' }[colorMode];
  const disabledBackground = { light: 'white', dark: 'gray:80' }[colorMode];
  const focusBackground = activeBackground;
  return {
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

export const useMenuItemStyle = () => {
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const props = { theme, colorMode };

  return {
    ...baseProps(props),
    ...menuItemProps(props)
  };
};

/**
|--------------------------------------------------
| Styles for Divider
|--------------------------------------------------
*/
const menuItemDividerProps = () => ({
  my: '2x'
});

export const useMenuItemDividerStyle = () => {
  return {
    ...menuItemDividerProps()
  };
};

/**
|--------------------------------------------------
| Styles for Submenu
|--------------------------------------------------
*/
export const useSubmenuStyle = () => {
  return {
    position: 'relative',
  };
};

export const useSubmenuListStyle = ({
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
    zIndex: 'dropdown',
    _focus: {
      outline: 'none',
    },
  };
};

export const useSubmenuToggleStyle = () => {
  return {
    cursor: 'pointer',
    display: 'inline-flex',
  };
};
