import { createTransitionStyle } from '@tonic-ui/utils';
import { ensureBoolean } from 'ensure-type';
import { useTheme } from '../theme';

// ---------------- Default Button ----------------//
const defaultVariantStyle = ({
  theme,
  isInButtonGroup = false,
}) => {
  // normal
  const backgroundColor = isInButtonGroup
    ? '_foreground.tertiary.enabled'
    : '_foreground.secondary.enabled';
  const color = isInButtonGroup
    ? 'text.secondary'
    : 'text.accent';

  // hover
  const hoverBackgroundColor = isInButtonGroup
    ? '_foreground.tertiary.hovered'
    : '_foreground.secondary.hovered';
  const hoverColor = 'text.accent';

  // active
  const activeBackgroundColor = isInButtonGroup
    ? '_foreground.tertiary.active'
    : '_foreground.secondary.active';

  // focusVisible
  const focusVisibleBorderColor = '_component.keyboardFocused.outerFocusRing';
  const focusVisibleBoxShadow = [
    `inset 0 0 0 ${theme.get('sizes.1q')} ${theme.get('colors._component.keyboardFocused.outerFocusRing')}`,
    `inset 0 0 0 ${theme.get('sizes.2q')} ${theme.get('colors._component.keyboardFocused.innerFocusRing')}`,
  ].join(', ');

  // disabled
  const disabledBackgroundColor = isInButtonGroup
    ? '_foreground.tertiary.disabled'
    : '_foreground.secondary.disabled';
  const disabledColor = 'text.disabled';

  // selected (only for ButtonGroup)
  const selectedBackgroundColor = '_foreground.tertiary.selected';
  const selectedColor = 'text._inverse.accent';

  return {
    backgroundColor,
    borderColor: 'transparent',
    color,
    _focusVisible: {
      borderColor: focusVisibleBorderColor,
      boxShadow: focusVisibleBoxShadow,
      // Bring overlapping border to front when focused
      zIndex: 1,
    },
    _hover: {
      backgroundColor: hoverBackgroundColor,
      color: hoverColor,
      // Use a higher z-index value to bring overlapping border to front when hovered
      zIndex: 2,
    },
    _active: {
      backgroundColor: activeBackgroundColor,
    },
    _disabled: {
      backgroundColor: disabledBackgroundColor,
      color: disabledColor,
      cursor: 'not-allowed',
    },
    // Only add _selected style when in ButtonGroup
    ...(isInButtonGroup && {
      _selected: {
        backgroundColor: selectedBackgroundColor,
        color: selectedColor,
        pointerEvents: 'none',
      },
    }),
  };
};

// ---------------- Secondary Button ----------------//
const secondaryVariantStyle = ({
  theme,
  isInButtonGroup = false,
}) => {
  // normal
  const borderColor = 'border._primary.enabled';
  const backgroundColor = '_foreground.subtle.enabled';
  const color = isInButtonGroup ? 'text.secondary' : 'text.accent';

  // hover
  const hoverBorderColor = 'border._primary.hovered';
  const hoverBackgroundColor = '_foreground.subtle.hovered';
  const hoverColor = 'text.accent';

  // active
  const activeBorderColor = 'border._primary.active';
  const activeBackgroundColor = '_foreground.subtle.active';
  const activeColor = 'text.accent';

  // focusVisible
  const focusVisibleBorderColor = '_component.keyboardFocused.outerFocusRing';
  const focusVisibleBoxShadow = [
    `inset 0 0 0 ${theme.get('sizes.1q')} ${theme.get('colors._component.keyboardFocused.outerFocusRing')}`,
    `inset 0 0 0 ${theme.get('sizes.2q')} ${theme.get('colors._component.keyboardFocused.innerFocusRing')}`,
    `inset 0 0 0 ${theme.get('sizes.3q')} ${theme.get('colors.border._primary.enabled')}`,
  ].join(', ');

  // disabled
  const disabledBorderColor = 'border._primary.disabled';
  const disabledBackgroundColor = '_foreground.subtle.disabled';
  const disabledColor = 'text.disabled';

  // selected (only for ButtonGroup)
  const selectedBorderColor = 'border._primary.enabled';
  const selectedBackgroundColor = '_foreground.subtle.selected';
  const selectedColor = 'text.accent';

  return {
    borderColor,
    backgroundColor,
    color,
    _focusVisible: {
      borderColor: focusVisibleBorderColor,
      boxShadow: focusVisibleBoxShadow,
      // Bring overlapping border to front when focused
      zIndex: 1,
    },
    _hover: {
      color: hoverColor,
      '&:not(:focus-visible)': {
        borderColor: hoverBorderColor,
      },
      backgroundColor: hoverBackgroundColor,
      // Use a higher z-index value to bring overlapping border to front when hovered
      zIndex: 2,
    },
    _active: {
      borderColor: activeBorderColor,
      backgroundColor: activeBackgroundColor,
      color: activeColor,
    },
    _disabled: {
      borderColor: disabledBorderColor,
      backgroundColor: disabledBackgroundColor,
      color: disabledColor,
      cursor: 'not-allowed',
    },
    // Only add _selected style when in ButtonGroup
    ...(isInButtonGroup && {
      _selected: {
        borderColor: selectedBorderColor,
        backgroundColor: selectedBackgroundColor,
        color: selectedColor,
        pointerEvents: 'none',
      },
    }),
  };
};

// ---------------- Ghost Button ----------------//
const ghostVariantStyle = ({
  theme,
}) => {
  const style = secondaryVariantStyle({
    theme,
  });
  const color = 'text.secondary';
  const hoverColor = 'text.accent';
  const activeColor = 'text.accent';

  // focusVisible
  const focusVisibleBorderColor = '_component.keyboardFocused.outerFocusRing';
  const focusVisibleBoxShadow = [
    `inset 0 0 0 ${theme.get('sizes.1q')} ${theme.get('colors._component.keyboardFocused.outerFocusRing')}`,
  ].join(', ');

  return {
    ...style,
    borderColor: 'transparent',
    color,
    _focusVisible: {
      borderColor: focusVisibleBorderColor,
      boxShadow: focusVisibleBoxShadow,
      // Bring overlapping border to front when focused
      zIndex: 1,
    },
    _hover: {
      ...style._hover,
      color: hoverColor,
      '&:not(:focus-visible)': {
        borderColor: 'transparent',
      },
    },
    _disabled: {
      ...style._disabled,
      borderColor: 'transparent',
      cursor: 'not-allowed',
    },
    _active: {
      ...style._active,
      color: activeColor,
      borderColor: 'transparent',
    },
  };
};

// ---------------- Emphasis / Primary Button ----------------//
const fillColorVariantStyle = ({
  type, // 'emphasis' | 'primary'
  theme,
}) => {
  // normal
  const backgroundColor = (type === 'primary') ? '_foreground.primary.enabled' : 'red.600';
  const color = 'text._fixed.dark.accent';

  // hover
  const hoverBackgroundColor = (type === 'primary') ? '_foreground.primary.hovered' : 'red.500';

  // active
  const activeBackgroundColor = (type === 'primary') ? '_foreground.primary.active' : 'red.700';

  // focusVisible
  const focusVisibleBorderColor = '_component.keyboardFocused.outerFocusRing';
  const focusVisibleBoxShadow = [
    `inset 0 0 0 ${theme.get('sizes.1q')} ${theme.get('colors._component.keyboardFocused.outerFocusRing')}`,
    `inset 0 0 0 ${theme.get('sizes.2q')} ${theme.get('colors._component.keyboardFocused.innerFocusRing')}`,
  ].join(', ');

  // disabled
  const disabledBackgroundColor = '_foreground.primary.disabled';
  const disabledColor = 'text.disabled';

  return {
    backgroundColor,
    borderColor: 'transparent',
    color,
    _focusVisible: {
      borderColor: focusVisibleBorderColor,
      boxShadow: focusVisibleBoxShadow,
      // Bring overlapping border to front when focused
      zIndex: 1,
    },
    _hover: {
      backgroundColor: hoverBackgroundColor,
      // Use a higher z-index value to bring overlapping border to front when hovered
      zIndex: 2,
    },
    _active: {
      backgroundColor: activeBackgroundColor,
    },
    _disabled: {
      backgroundColor: disabledBackgroundColor,
      color: disabledColor,
      cursor: 'not-allowed',
    },
  };
};

const useButtonStyle = ({
  isInButtonGroup = false,
  orientation, // No default value if not specified
  size,
  variant,
}) => {
  const theme = useTheme();
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    appearance: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    border: 1,
    borderRadius: 'sm',
    px: '3x',
    transition: createTransitionStyle(['background-color', 'border-color', 'box-shadow', 'color'], { duration: 200 }),
  };
  const orientationStyle = {
    'horizontal': {
      _not: {
        ':first-of-type': {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
        ':last-of-type': {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
    },
    'vertical': {
      _not: {
        ':first-of-type': {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },
        ':last-of-type': {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
    },
  }[orientation];
  const sizeStyle = {
    lg: {
      minHeight: '10x',
      fontSize: 'md',
      lineHeight: 'md',
    },
    md: {
      minHeight: '8x',
      fontSize: 'sm',
      lineHeight: 'sm',
    },
    sm: {
      minHeight: '6x',
      fontSize: 'sm',
      lineHeight: 'sm',
    },
  }[size];

  const variantStyle = {
    'secondary': secondaryVariantStyle({ theme, isInButtonGroup }),
    'ghost': ghostVariantStyle({ theme }),
    'emphasis': fillColorVariantStyle({ type: 'emphasis', theme }),
    'primary': fillColorVariantStyle({ type: 'primary', theme }),
    'default': defaultVariantStyle({ theme, isInButtonGroup }),
  }[variant];

  return {
    ...baseStyle,
    ...orientationStyle,
    ...sizeStyle,
    ...variantStyle,
  };
};

const useButtonBaseStyle = ({ disabled }) => {
  return {
    appearance: 'none',
    backgroundColor: 'inherit',
    border: 'none',
    color: 'inherit',
    // Use the `disabled` prop to conditionally set the cursor to 'not-allowed', allowing for easy style overrides without using the specific "_disabled" style prop.
    cursor: ensureBoolean(disabled) ? 'not-allowed' : 'pointer',
    outline: 0,
    padding: 0,
  };
};

const useButtonGroupStyle = ({ orientation }) => {
  const orientationStyle = {
    vertical: {
      flexDirection: 'column',
    },
    horizontal: {
      flexDirection: 'row',
    },
  }[orientation];

  return {
    display: 'inline-flex',
    ...orientationStyle,
  };
};

export {
  useButtonStyle,
  useButtonBaseStyle,
  useButtonGroupStyle,
};
