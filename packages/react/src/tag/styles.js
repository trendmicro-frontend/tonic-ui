import { useIconButtonStyle } from '../shared/styles';
import { useTheme } from '../theme';

const getSolidTagStyle = ({
  theme,
}) => {
  // Normal
  const backgroundColor = '_component.tags.foreground.gray';
  const color = 'text.primary';
  const focusVisibleOutlineColor = 'border._primary.focused';

  // Hover
  const hoverBackgroundColor = backgroundColor;
  const hoverColor = color;

  // Disable
  const disabledBackgroundColor = '_foreground.tertiary.disabled';
  const disabledColor = 'text.disabled';

  // Invalid
  const invalidBackgroundColor = '_foreground.negative.enabled';
  const invalidColor = 'text._fixed.dark.accent';

  return {
    backgroundColor,
    color,
    _hover: {
      color: hoverColor,
      backgroundColor: hoverBackgroundColor,
    },
    _focusVisible: {
      outlineColor: focusVisibleOutlineColor,
      outlineOffset: '-1h',
      outlineStyle: 'solid',
      outlineWidth: '1h',
    },
    _invalid: {
      _hover: {
        color: invalidColor,
        backgroundColor: invalidBackgroundColor,
      },
      backgroundColor: invalidBackgroundColor,
      color: invalidColor,
    },
    _disabled: {
      backgroundColor: disabledBackgroundColor,
      color: disabledColor,
      cursor: 'not-allowed',
    },
  };
};

const getOutlineTagStyle = ({
  theme,
}) => {
  // Normal
  const borderColor = '_component.tags.border.gray';
  const color = '_component.tags.onBackground.gray';
  const focusVisibleOutlineColor = 'border._primary.focused';

  // Hover
  const hoverBorderColor = borderColor;
  const hoverColor = color;
  // Disable
  const disabledColor = 'text.disabled';
  const disabledBorderColor = '_foreground.tertiary.disabled';
  // Invalid
  const invalidBorderColor = '_foreground.negative.enabled';
  const invalidColor = 'text._fixed.dark.primary';

  return {
    borderColor,
    color,
    _hover: {
      color: hoverColor,
      borderColor: hoverBorderColor,
    },
    _focusVisible: {
      outlineColor: focusVisibleOutlineColor,
      outlineOffset: '-1h',
      outlineStyle: 'solid',
      outlineWidth: '1h',
    },
    _invalid: {
      borderColor: invalidBorderColor,
      color: invalidColor,
      _hover: {
        color: invalidColor,
        borderColor: invalidBorderColor,
      },
    },
    _disabled: {
      color: disabledColor,
      cursor: 'not-allowed',
      borderColor: disabledBorderColor,
    },
  };
};

const useTagStyle = ({
  size,
  variant,
}) => {
  const theme = useTheme();
  const { sizes } = theme;
  const borderWidth = sizes['1q'];
  const px = `calc(${sizes['2x']} - ${borderWidth})`;
  const baseStyle = {
    alignItems: 'center',
    borderColor: 'transparent',
    borderRadius: 'calc(infinity * 1px)', // creates a fully rounded (pill) shape
    borderStyle: 'solid',
    borderWidth,
    display: 'inline-flex',
    position: 'relative',
    px,
  };
  const sizeStyle = {
    sm: {
      fontSize: 'xs',
      lineHeight: 1,
      minHeight: '4x',
    },
    md: {
      fontSize: 'xs',
      lineHeight: 'xs',
      minHeight: '6x',
      py: `calc(${sizes['1h']} - ${borderWidth})`,
    },
    lg: {
      fontSize: 'md',
      lineHeight: 'md',
      minHeight: '8x',
      py: `calc(${sizes['1x']} - ${borderWidth})`,
    },
  }[size];
  const variantStyle = {
    'solid': getSolidTagStyle({ theme }),
    'outline': getOutlineTagStyle({ theme }),
  }[variant];

  return {
    ...baseStyle,
    ...sizeStyle,
    ...variantStyle,
  };
};

const useTagCloseButtonStyle = ({
  isClosable,
}) => {
  const color = 'text.secondary';
  const hoverColor = 'text.accent';
  const hoverBackgroundColor = '_foreground.subtle.hovered';
  const focusVisibleOutlineColor = '_component.keyboardFocused.outerFocusRing';
  const disabledColor = 'text.disabled';
  const size = '4x';
  const iconButtonStyle = useIconButtonStyle({ color, size });

  const baseStyle = {
    ...iconButtonStyle,
    // Set the background color to transparent to prevent the parent opacity from being applied twice
    backgroundColor: 'transparent',
    _disabled: {
      backgroundColor: 'transparent',
      color: disabledColor,
      cursor: 'not-allowed',
    },
    _focusVisible: {
      outlineColor: focusVisibleOutlineColor,
      outlineOffset: '-1q',
      outlineStyle: 'solid',
      outlineWidth: '1q',
    },
    _hover: {
      // The close button applies a background color when hovered
      backgroundColor: hoverBackgroundColor,
      color: hoverColor,
    },
  };

  if (isClosable) {
    return {
      ...baseStyle,
      ml: '2x',
    };
  }

  return baseStyle;
};

export {
  useTagStyle,
  useTagCloseButtonStyle,
};
