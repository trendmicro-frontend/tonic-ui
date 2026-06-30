import { sx } from '@tonic-ui/styled-system';
import { createTransitionStyle } from '@tonic-ui/utils';
import { useTheme } from '../theme';
import {
  VARIANT_OUTLINE,
  VARIANT_FILLED,
  VARIANT_FLUSH,
  VARIANT_UNSTYLED,
} from './constants';

const color = 'text.primary';
const disabledColor = 'text.disabled';
const borderColor = 'border._primary.enabled';
const hoverBorderColor = 'border._primary.hovered';
const focusBorderColor = 'border._primary.focused';
const disabledBorderColor = 'border._primary.disabled';
const invalidBorderColor = 'border._negative.enabled';

const backgroundColor = '_foreground.subtle.enabled';
const hoverBackgroundColor = '_foreground.subtle.hovered';
const disabledBackgroundColor = '_foreground.subtle.disabled';

const placeholderColor = 'text.tertiary';

/**
 * Input
 */

const getInputOutlineStyle = () => {
  const _disabledStyle = {
    color: disabledColor,
    backgroundColor: disabledBackgroundColor,
    borderColor: disabledBorderColor,
    cursor: 'not-allowed',
  };
  const _focusStyle = {
    borderColor: focusBorderColor,
    // Bring overlapping border to front when focused
    zIndex: 1,
  };
  const _hoverStyle = {
    borderColor: hoverBorderColor,
    backgroundColor: hoverBackgroundColor,
    // Use a higher z-index value to bring overlapping border to front when hovered
    zIndex: 2,
  };
  const _invalidStyle = {
    borderColor: invalidBorderColor,
    '&:focus:hover': {
      borderColor: focusBorderColor,
    },
    '&:hover': {
      borderColor: invalidBorderColor,
    },
  };
  const _validStyle = {
    // XXX - border color for valid input is not defined
  };
  const __placeholderStyle = {
    color: placeholderColor,
    // Override Firefox's unusual default opacity
    opacity: 1,
  };

  return {
    backgroundColor,
    border: 1,
    borderColor,
    borderRadius: 'sm',
    color,
    _disabled: {
      ...(_disabledStyle),
      __placeholder: {
        color: disabledColor,
      },
    },
    _focus: _focusStyle,
    _hover: _hoverStyle,
    _invalid: _invalidStyle,
    _valid: _validStyle,
    __placeholder: __placeholderStyle,
  };
};

const getInputFilledStyle = () => {
  const outlineStyle = getInputOutlineStyle();
  const backgroundColor = '_foreground.secondary.enabled';

  return {
    ...outlineStyle,
    backgroundColor,
    _hover: {
      ...outlineStyle._hover,
      backgroundColor,
    }
  };
};

const getInputFlushStyle = () => {
  const _disabledStyle = {
    color: disabledColor,
    backgroundColor: disabledBackgroundColor,
    borderBottomColor: disabledBorderColor,
    cursor: 'not-allowed',
  };
  const _focusStyle = {
    borderBottomColor: focusBorderColor,
    // Bring overlapping border to front when focused
    zIndex: 1,
  };
  const _hoverStyle = {
    borderBottomColor: hoverBorderColor,
    // Use a higher z-index value to bring overlapping border to front when hovered
    zIndex: 2,
  };
  const _invalidStyle = {
    borderBottomColor: invalidBorderColor,
    '&:focus:hover': {
      borderBottomColor: focusBorderColor,
    },
    '&:hover': {
      borderBottomColor: invalidBorderColor,
    },
  };
  const _validStyle = {
    // XXX - border color for valid input is not defined
  };
  const __placeholderStyle = {
    color: placeholderColor,
    // Override Firefox's unusual default opacity
    opacity: 1,
  };

  return {
    backgroundColor,
    borderBottom: 1,
    borderBottomColor: borderColor,
    color,
    _disabled: {
      ...(_disabledStyle),
      __placeholder: {
        color: disabledColor,
      },
    },
    _focus: _focusStyle,
    _hover: _hoverStyle,
    _invalid: _invalidStyle,
    _valid: _validStyle,
    __placeholder: __placeholderStyle,
  };
};

const getInputUnstyledStyle = () => {
  return {
    backgroundColor,
    border: 0,
    color,
  };
};

const getInputVariantStyle = variant => {
  if (variant === VARIANT_OUTLINE) {
    return getInputOutlineStyle();
  }

  if (variant === VARIANT_FILLED) {
    return getInputFilledStyle();
  }

  if (variant === VARIANT_FLUSH) {
    return getInputFlushStyle();
  }

  if (variant === VARIANT_UNSTYLED) {
    return getInputUnstyledStyle();
  }

  return {};
};

/**
 * InputControl
 */

const getInputControlOutlineStyle = inputState => {
  const _disabledStyle = {
    color: disabledColor,
    backgroundColor: disabledBackgroundColor,
    borderColor: disabledBorderColor,
    cursor: 'not-allowed',
  };
  const _focusStyle = {
    borderColor: focusBorderColor,
    // Bring overlapping border to front when focused
    zIndex: 1,
  };
  const _hoverStyle = {
    borderColor: hoverBorderColor,
    // Use a higher z-index value to bring overlapping border to front when hovered
    zIndex: 2,
  };
  const _invalidStyle = {
    borderColor: invalidBorderColor,
  };
  const _validStyle = {
    // XXX - border color for valid input is not defined
  };
  const __placeholderStyle = {
    color: placeholderColor,
    // Override Firefox's unusual default opacity
    opacity: 1,
  };

  const inputStateStyle = (() => {
    const { disabled, focused, valid } = { ...inputState };

    if ((disabled !== undefined) && (!!disabled)) {
      return {
        _disabled: undefined,
        _focus: undefined,
        _hover: undefined,
        _invalid: undefined,
        _valid: undefined,
        ..._disabledStyle,
        __placeholder: {
          color: disabledColor,
        },
      };
    }

    return {
      ...((focused !== undefined && !!focused) && _focusStyle),
      ...((valid !== undefined) && (!!valid ? _validStyle : _invalidStyle)),
    };
  })();

  return {
    backgroundColor,
    border: 1,
    borderColor,
    borderRadius: 'sm',
    color,
    _disabled: {
      ...(_disabledStyle),
      __placeholder: {
        color: disabledColor,
      },
    },
    _focus: _focusStyle,
    _hover: _hoverStyle,
    _invalid: _invalidStyle,
    _valid: _validStyle,
    __placeholder: __placeholderStyle,

    // This may override _disabled, _focus, _hover, _invalid, _valid when necessary
    ...inputStateStyle,
  };
};

const getInputControlFilledStyle = inputState => {
  const outlineStyle = getInputControlOutlineStyle(inputState);
  const backgroundColor = '_foreground.secondary.enabled';

  return {
    ...outlineStyle,
    backgroundColor,
    _hover: {
      ...outlineStyle._hover,
      backgroundColor,
    }
  };
};

const getInputControlFlushStyle = inputState => {
  const _disabledStyle = {
    color: disabledColor,
    backgroundColor: disabledBackgroundColor,
    borderBottomColor: disabledBorderColor,
    cursor: 'not-allowed',
  };
  const _focusStyle = {
    borderBottomColor: focusBorderColor,
    // Bring overlapping border to front when focused
    zIndex: 1,
  };
  const _hoverStyle = {
    borderBottomColor: hoverBorderColor,
    // Use a higher z-index value to bring overlapping border to front when hovered
    zIndex: 2,
  };
  const _invalidStyle = {
    borderBottomColor: invalidBorderColor,
  };
  const _validStyle = {
    // XXX - border color for valid input is not defined
  };
  const __placeholderStyle = {
    color: placeholderColor,
    // Override Firefox's unusual default opacity
    opacity: 1,
  };

  const inputStateStyle = (() => {
    const { disabled, focused, valid } = { ...inputState };

    if ((disabled !== undefined) && (!!disabled)) {
      return {
        _disabled: undefined,
        _focus: undefined,
        _hover: undefined,
        _invalid: undefined,
        _valid: undefined,
        ..._disabledStyle,
        __placeholder: {
          color: disabledColor,
        },
      };
    }

    return {
      ...((focused !== undefined && !!focused) && _focusStyle),
      ...((valid !== undefined) && (!!valid ? _validStyle : _invalidStyle)),
    };
  })();

  return {
    backgroundColor,
    borderBottom: 1,
    borderBottomColor: borderColor,
    color,
    _disabled: {
      ...(_disabledStyle),
      __placeholder: {
        color: disabledColor,
      },
    },
    _focus: _focusStyle,
    _hover: _hoverStyle,
    _invalid: _invalidStyle,
    _valid: _validStyle,
    __placeholder: __placeholderStyle,

    // This may override _disabled, _focus, _hover, _invalid, _valid when necessary
    ...inputStateStyle,
  };
};

const getInputControlUnstyledStyle = inputState => {
  return {
    backgroundColor,
    border: 0,
    color,
  };
};

const getInputControlVariantStyle = ({
  inputState,
  variant,
}) => {
  if (variant === VARIANT_OUTLINE) {
    return getInputControlOutlineStyle(inputState);
  }

  if (variant === VARIANT_FILLED) {
    return getInputControlFilledStyle(inputState);
  }

  if (variant === VARIANT_FLUSH) {
    return getInputControlFlushStyle(inputState);
  }

  if (variant === VARIANT_UNSTYLED) {
    return getInputControlUnstyledStyle(inputState);
  }

  return {};
};

/**
 * InputGroup
 */

const getInputGroupAddonOutlineStyle = () => {
  return {
    border: 1,
    borderColor,
    borderRadius: 'sm',
    color,
  };
};

const getInputGroupAddonFilledStyle = () => {
  const backgroundColor = '_foreground.secondary.enabled';

  return {
    ...getInputGroupAddonOutlineStyle(),
    backgroundColor,
  };
};

const getInputGroupAddonFlushStyle = () => {
  const borderColor = 'transparent';

  return {
    borderBottom: 1,
    borderBottomColor: borderColor,
    color,
  };
};

const getInputGroupAddonUnstyledStyle = () => {
  return {
    border: 0,
    borderRadius: 0,
    color,
  };
};

const getInputGroupAddonVariantStyle = variant => {
  if (variant === VARIANT_OUTLINE) {
    return getInputGroupAddonOutlineStyle();
  }

  if (variant === VARIANT_FILLED) {
    return getInputGroupAddonFilledStyle();
  }

  if (variant === VARIANT_FLUSH) {
    return getInputGroupAddonFlushStyle();
  }

  if (variant === VARIANT_UNSTYLED) {
    return getInputGroupAddonUnstyledStyle();
  }

  return {};
};

const useInputStyle = ({
  size,
  variant,
}) => {
  const { sizes } = useTheme();
  const baseStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    transition: createTransitionStyle('border-color', { duration: 200 }),
    width: '100%',
  };
  const sizeStyle = (() => {
    const _style = {
      'sm': {
        fontSize: 'sm',
        lineHeight: 'sm',
        height: '6x',
      },
      'md': {
        fontSize: 'sm',
        lineHeight: 'sm',
        height: '8x',
      },
      'lg': {
        fontSize: 'md',
        lineHeight: 'md',
        height: '10x',
      },
    }[size];

    // Do not override the height if the input variant is `unstyled`
    if (variant === VARIANT_UNSTYLED) {
      _style.height = undefined;
    }

    // Adjust the padding based on the input variant
    if (variant === VARIANT_OUTLINE || variant === VARIANT_FILLED) {
      _style.px = `calc(${sizes['3x']} - ${sizes['1q']})`;
    } else if (variant === VARIANT_FLUSH) {
      // Set no padding
    }

    return _style;
  })();
  const variantStyle = getInputVariantStyle(variant);

  return {
    ...baseStyle,
    ...sizeStyle,
    ...variantStyle,
  };
};

const useInputAdornmentStyle = () => {
  return {
    flex: 'none',
    px: '3x',
  };
};

const useInputBaseStyle = () => {
  return {
    appearance: 'none',
    backgroundColor: 'inherit',
    border: 'none',
    color: 'inherit',
    outline: 0,
    padding: 0,
  };
};

const getInputGroupCSS = ({
  variant,
}) => {
  const useNegativeMargin = (variant === VARIANT_OUTLINE || variant === VARIANT_FILLED);

  return sx({
    '&:not(:first-child)': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    '&:not(:last-child)': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    // adjacent sibling
    '&+&': {
      marginLeft: useNegativeMargin ? -1 : 0,
    },
  });
};

const useInputGroupStyle = () => {
  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'stretch',
    width: '100%',
  };
};

const useInputGroupAddonStyle = ({
  size,
  variant,
}) => {
  const { sizes } = useTheme();
  const baseStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    outline: 0,
  };
  const sizeStyle = (() => {
    const _style = {
      'sm': {
        fontSize: 'sm',
        lineHeight: 'sm',
        height: '6x',
      },
      'md': {
        fontSize: 'sm',
        lineHeight: 'sm',
        height: '8x',
      },
      'lg': {
        fontSize: 'md',
        lineHeight: 'md',
        height: '10x',
      },
    }[size];

    // Do not override the height if the input variant is `unstyled`
    if (variant === VARIANT_UNSTYLED) {
      _style.height = undefined;
    }

    // Adjust the padding based on the input variant
    if (variant === VARIANT_OUTLINE || variant === VARIANT_FILLED) {
      _style.px = `calc(${sizes['3x']} - ${sizes['1q']})`;
    } else if (variant === VARIANT_FLUSH) {
      _style.px = '3x';
    }

    return _style;
  })();
  const variantStyle = getInputGroupAddonVariantStyle(variant);

  return {
    ...baseStyle,
    ...sizeStyle,
    ...variantStyle,
  };
};

const getInputGroupAppendCSS = () => {
  const notFirstChildStyle = {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  };
  const notLastChildStyle = {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  };

  return sx({
    '& > *:first-of-type': notFirstChildStyle,
    '&:not(:last-child) > *:first-of-type': notLastChildStyle,
  });
};

const useInputGroupAppendStyle = () => {
  return {
    display: 'flex',
    ml: -1,
  };
};

const getInputGroupPrependCSS = () => {
  const notFirstChildStyle = {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  };
  const notLastChildStyle = {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  };

  return sx({
    '& > *:first-of-type': notLastChildStyle,
    '&:not(:first-of-type) > *:first-of-type': notFirstChildStyle,
  });
};

const useInputGroupPrependStyle = () => {
  return {
    display: 'flex',
    mr: -1,
  };
};

const useInputControlBaseCSS = ({ variant }) => {
  const borderKey = {
    [VARIANT_OUTLINE]: 'border',
    [VARIANT_FILLED]: 'border',
    [VARIANT_FLUSH]: 'borderBottom',
  }[variant];

  // No need to set the border color if the input variant is not `outline`, `filled`, or `flush`
  if (!borderKey) {
    return {};
  }

  const borderColorKey = `${borderKey}Color`; // e.g. "borderColor" or "borderBottomColor"

  return sx({
    '&:has(> input:focus:invalid), &:has(> input:focus[aria-invalid=true])': {
      [borderColorKey]: focusBorderColor,
    },
    '&:hover:has(> input:invalid), &:hover:has(> input[aria-invalid=true])': {
      [borderColorKey]: invalidBorderColor,
    },
    '&:hover:has(> input:focus:invalid), &:hover:has(> input:focus[aria-invalid=true])': {
      [borderColorKey]: focusBorderColor,
    },
  });
};

const useInputControlBaseStyle = ({
  inputState,
  size,
  variant,
}) => {
  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    outline: 0,
    position: 'relative',
    transition: createTransitionStyle('border-color', { duration: 200 }),
  };
  const sizeStyle = (() => {
    const _style = {
      'sm': {
        fontSize: 'sm',
        lineHeight: 'sm',
        height: '6x',
      },
      'md': {
        fontSize: 'sm',
        lineHeight: 'sm',
        height: '8x',
      },
      'lg': {
        fontSize: 'md',
        lineHeight: 'md',
        height: '10x',
      },
    }[size];

    // Do not override the height if the input variant is `unstyled`
    if (variant === VARIANT_UNSTYLED) {
      _style.height = undefined;
    }

    return _style;
  })();
  const variantStyle = getInputControlVariantStyle({ inputState, variant });

  return {
    ...baseStyle,
    ...sizeStyle,
    ...variantStyle,
  };
};

const useInputControlInputStyle = ({
  inputState,
  size,
  variant,
  startAdornment,
  endAdornment,
}) => {
  const { sizes } = useTheme();
  const baseStyle = {
    cursor: inputState?.disabled ? 'not-allowed' : undefined,
    width: '100%',
  };
  const sizeStyle = (() => {
    const _style = {
      'sm': {
        fontSize: 'sm',
        lineHeight: 'sm',
      },
      'md': {
        fontSize: 'sm',
        lineHeight: 'sm',
      },
      'lg': {
        fontSize: 'md',
        lineHeight: 'md',
      },
    }[size];

    // Adjust the padding based on the input variant
    if (variant === VARIANT_OUTLINE || variant === VARIANT_FILLED) {
      _style.px = `calc(${sizes['3x']} - ${sizes['1q']})`;
    }

    // Adjust padding based on the input adornments
    if (startAdornment && endAdornment) {
      _style.px = undefined;
    }
    if (startAdornment && !endAdornment) {
      _style.pr = _style.px;
      _style.px = undefined;
    }
    if (!startAdornment && endAdornment) {
      _style.pl = _style.px;
      _style.px = undefined;
    }

    return _style;
  })();

  return {
    ...baseStyle,
    ...sizeStyle,
  };
};

export {
  getInputGroupCSS,
  getInputGroupAppendCSS,
  getInputGroupPrependCSS,
  useInputStyle,
  useInputAdornmentStyle,
  useInputBaseStyle,
  useInputControlBaseCSS,
  useInputControlBaseStyle,
  useInputControlInputStyle,
  useInputGroupStyle,
  useInputGroupAddonStyle,
  useInputGroupAppendStyle,
  useInputGroupPrependStyle,
};
