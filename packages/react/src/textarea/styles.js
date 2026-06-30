import { createTransitionStyle } from '@tonic-ui/utils';
import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';

const getOutlinedStyle = () => {
  // Normal
  const backgroundColor = '_foreground.subtle.enabled';
  const borderColor = 'border._primary.enabled';
  const color = 'text.primary';
  const placeholderColor = 'text.tertiary';

  // Hover
  const hoverBorderColor = 'border._primary.hovered';
  const hoverBackgroundColor = '_foreground.subtle.hovered';

  // Focus
  const focusBorderColor = 'border._primary.focused';
  const focusBackgroundColor = '_foreground.subtle.active';

  // Disabled
  const disabledColor = 'text.disabled';
  const disabledBackgroundColor = '_foreground.subtle.disabled';
  const disabledBorderColor = 'border._primary.disabled';
  const disabledPlaceholderColor = disabledColor;

  // Invalid
  const invalidBorderColor = 'border._negative.enabled';

  return {
    backgroundColor,
    border: 1,
    borderColor,
    color,
    _hover: {
      borderColor: hoverBorderColor,
      backgroundColor: hoverBackgroundColor,
    },
    _focus: {
      borderColor: focusBorderColor,
      backgroundColor: focusBackgroundColor,
    },
    _disabled: {
      color: disabledColor,
      borderColor: disabledBorderColor,
      backgroundColor: disabledBackgroundColor,
      cursor: 'not-allowed',
      '&::placeholder': {
        color: disabledPlaceholderColor,
      },
    },
    _readOnly: {
      backgroundColor: disabledBackgroundColor,
      borderColor: disabledBorderColor,
      color,
      '&:hover': {
        backgroundColor: disabledBackgroundColor,
        borderColor: disabledBorderColor,
      },
      '&:focus': {
        backgroundColor: disabledBackgroundColor,
        borderColor: disabledBorderColor,
      },
    },
    _valid: {
      // XXX - border color for valid input is not defined
    },
    _invalid: {
      borderColor: invalidBorderColor,
      '&:focus:hover': {
        borderColor: focusBorderColor,
      },
      '&:hover': {
        borderColor: invalidBorderColor,
      },
    },
    __placeholder: {
      color: placeholderColor,
    },
  };
};

const getUnstyledStyle = colorMode => {
  const backgroundColor = {
    dark: 'transparent',
    light: 'white.100',
  }[colorMode];
  const color = 'text.primary';

  return {
    backgroundColor,
    border: 0,
    borderRadius: 0,
    color,
    px: undefined,
    py: undefined,
  };
};

const useTextareaStyle = ({
  variant,
}) => {
  const { sizes } = useTheme();
  const [colorMode] = useColorMode();
  const sizeStyle = (() => {
    const borderWidth = sizes['1q'];
    const defaultSize = 'md';
    const style = {
      'md': {
        borderRadius: 'sm',
        fontSize: 'sm',
        lineHeight: 'sm',
        minHeight: '9x', // 6px (top) + 20px + 10px (bottom) = 36px
        px: '3x',
        pt: `calc(${sizes['3h']} - ${borderWidth})`, // 6px - 1px
        pb: `calc(${sizes['5h']} - ${borderWidth})`, // 10px - 1px
        width: '100%',
      },
    }[defaultSize];
    return style;
  })();
  const variantStyle = (() => {
    if (variant === 'outline') {
      return getOutlinedStyle();
    }
    if (variant === 'unstyled') {
      return getUnstyledStyle(colorMode);
    }
    return {};
  })();
  const baseStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    transition: createTransitionStyle('border-color', { duration: 200 }),
  };

  return {
    ...baseStyle,
    ...sizeStyle,
    ...variantStyle,
  };
};

export {
  useTextareaStyle,
};
