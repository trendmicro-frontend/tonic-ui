import { useColorMode } from '../color-mode';
import { VARIANT_UNDERLINE } from './constants';

const useLinkStyle = ({
  disabled,
  variant,
}) => {
  const [colorMode] = useColorMode();
  const color = {
    dark: 'blue:40',
    light: 'blue:60',
  }[colorMode];
  const visitedColor = {
    dark: 'purple:50',
    light: 'purple:60',
  }[colorMode];
  const disabledColor = {
    dark: 'white:disabled',
    light: 'black:disabled',
  }[colorMode];
  const hoverColor = {
    dark: 'blue:40',
    light: 'blue:60',
  }[colorMode];
  const activeColor = {
    dark: 'blue:60',
    light: 'blue:70',
  }[colorMode];
  const focusVisibleOutlineColor = {
    dark: 'blue:60',
    light: 'blue:70',
  }[colorMode];

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    color,
    cursor: 'pointer',
    ...(disabled && {
      _disabled: {
        color: disabledColor,
        cursor: 'not-allowed',
      },
    }),
    _visited: {
      color: visitedColor,
    },
    _hover: {
      color: hoverColor,
    },
    _active: {
      color: activeColor,
    },
    _focusVisible: {
      outlineColor: focusVisibleOutlineColor,
      outlineOffset: 0,
      outlineStyle: 'solid',
      outlineWidth: '1q',
    },
  };
  const variantStyle = { ...baseStyle };

  if (variant === VARIANT_UNDERLINE) {
    variantStyle.textDecoration = 'underline';
    variantStyle._hover.textDecoration = 'none';
    variantStyle._active.textDecoration = 'none';
  } else {
    variantStyle.textDecoration = 'none';
    variantStyle._hover.textDecoration = 'underline';
    variantStyle._active.textDecoration = 'underline';
  }

  return {
    ...variantStyle,
  };
};

const useLinkButtonStyle = useLinkStyle;

export {
  useLinkStyle,
  useLinkButtonStyle,
};
