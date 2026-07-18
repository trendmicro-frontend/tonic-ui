import { sx } from '@tonic-ui/styled-system';
import { get } from '@tonic-ui/utils';
import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';

const useMenuStyle = () => {
  return {
    position: 'relative',
    display: 'inline-flex',
  };
};

const useMenuButtonCSS = ({ variant }) => {
  const [colorMode] = useColorMode();
  const theme = useTheme();
  const textPrimaryToken = get(theme.colors, 'text.primary');
  const primaryColor = textPrimaryToken?.[`_${colorMode}`];

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

  return sx({ ...variantCSS });
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
  return {
    backgroundColor: 'background.highest',
    boxShadow: 'high',
    color: 'inherit',
    m: '0',
    p: '0',
    py: '2x',
  };
};

const useMenuGroupStyle = () => {
  return {
    px: '3x',
    py: '2x',
    color: 'text.secondary',
  };
};

const useMenuItemStyle = ({ tabIndex }) => {
  const color = 'text.primary';
  const hoverBackgroundColor = 'actions.hovered';
  const focusVisibleOutlineColor = '_component.keyboardFocused.outerFocusRing';
  const disabledColor = 'text.disabled';
  const selectedColor = 'text.accent';
  const selectedBackgroundColor = 'actions.selected';

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
      outlineColor: focusVisibleOutlineColor,
      outlineOffset: '-1h',
      outlineStyle: 'solid',
      outlineWidth: '1h',
    },
    _hover: {
      backgroundColor: hoverBackgroundColor,
    },
    _selected: {
      color: selectedColor,
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
    ...placementStyle,
    backgroundColor: 'background.highest',
    boxShadow: 'high',
    color: 'inherit',
    display: isOpen ? 'block' : 'none',
    m: '0',
    p: '0',
    py: '2x',
  };
};

const useSubmenuTriggerStyle = ({ tabIndex }) => {
  const menuItemStyle = useMenuItemStyle({ tabIndex });

  return {
    ...menuItemStyle,
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
  useSubmenuTriggerStyle,
};
