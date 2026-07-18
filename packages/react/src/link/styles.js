import { VARIANT_INLINE, VARIANT_SUBTLE } from './constants';

const useLinkStyle = ({
  disabled,
  variant,
}) => {
  const color = '_link.enabled';
  const secondaryColor = 'text.secondary';
  const hoverColor = '_link.hovered';
  const activeColor = '_link.active';
  const visitedColor = '_link.visited';
  const disabledColor = '_link.disabled';
  const focusVisibleOutlineColor = '_component.keyboardFocused.outerFocusRing';

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

  if (variant === VARIANT_INLINE) {
    variantStyle.textDecoration = 'underline';
    variantStyle._hover.textDecoration = 'none';
    variantStyle._active.textDecoration = 'none';
  } else if (variant === VARIANT_SUBTLE) {
    variantStyle.color = secondaryColor;
    variantStyle.textDecoration = 'underline';
    variantStyle._hover.textDecoration = 'underline';
    variantStyle._active.textDecoration = 'underline';
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
