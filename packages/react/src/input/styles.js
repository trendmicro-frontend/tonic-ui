import { sx } from '@tonic-ui/styled-system';
import { useColorMode } from '../color-mode';

/**
 * Input
 */

const getInputOutlinedStyle = ({
  colorMode,
}) => {
  const backgroundColor = {
    dark: 'transparent',
    light: 'white',
  }[colorMode];
  const borderColor = {
    dark: 'gray:60',
    light: 'gray:30',
  }[colorMode];
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];
  const hoverBorderColor = {
    dark: 'blue:50',
    light: 'blue:50',
  }[colorMode];
  const focusBorderColor = {
    dark: 'blue:60',
    light: 'blue:60',
  }[colorMode];
  const disabledBorderColor = {
    dark: 'gray:60',
    light: 'gray:30',
  }[colorMode];
  const invalidBorderColor = {
    dark: 'red:50',
    light: 'red:60',
  }[colorMode];
  const placeholderColor = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const _disabledStyle = {
    borderColor: disabledBorderColor,
    cursor: 'not-allowed',
    opacity: '.28',
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

  return {
    backgroundColor,
    border: 1,
    borderColor,
    borderRadius: 'sm',
    color,
    _disabled: _disabledStyle,
    _focus: _focusStyle,
    _hover: _hoverStyle,
    _invalid: _invalidStyle,
    _valid: _validStyle,
    __placeholder: __placeholderStyle,
  };
};

const getInputFilledStyle = ({
  colorMode,
}) => {
  const backgroundColor = {
    dark: 'gray:80',
    light: 'gray:10',
  }[colorMode];

  return {
    ...getInputOutlinedStyle({ colorMode }),
    backgroundColor,
  };
};

const getInputUnstyledStyle = ({
  colorMode,
}) => {
  const backgroundColor = {
    dark: 'transparent',
    light: 'white',
  }[colorMode];
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];

  return {
    backgroundColor,
    border: 0,
    borderRadius: 0,
    color,
  };
};

const getInputSizeStyle = ({
  size,
  variant,
}) => {
  const defaultSize = 'md';
  const sizes = {
    'sm': {
      fontSize: 'sm',
      lineHeight: 'sm',
      px: '3x',
      py: '1q', // (24px - 2px - 20px) / 2 = 1px
      width: '100%',
    },
    'md': {
      fontSize: 'sm',
      lineHeight: 'sm',
      px: '3x',
      py: '5q', // (32px - 2px - 20px) / 2 = 5px
      width: '100%',
    },
    'lg': {
      fontSize: 'md',
      lineHeight: 'md',
      px: '3x',
      py: '8q', // (40px - 2px - 22px) / 2 = 8px
      width: '100%',
    },
  };
  const sizeStyle = sizes[size] ?? sizes[defaultSize];

  if (variant === 'unstyled') {
    sizeStyle.px = undefined;
    sizeStyle.py = undefined;
  }

  return sizeStyle;
};

const getInputVariantStyle = ({
  colorMode,
  variant,
}) => {
  if (variant === 'outline') {
    return getInputOutlinedStyle({ colorMode });
  }

  if (variant === 'filled') {
    return getInputFilledStyle({ colorMode });
  }

  if (variant === 'unstyled') {
    return getInputUnstyledStyle({ colorMode });
  }

  return {};
};

/**
 * InputControl
 */

const getInputControlOutlinedStyle = ({
  colorMode,
  inputState,
}) => {
  const backgroundColor = {
    dark: 'transparent',
    light: 'white',
  }[colorMode];
  const borderColor = {
    dark: 'gray:60',
    light: 'gray:30',
  }[colorMode];
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];
  const hoverBorderColor = {
    dark: 'blue:50',
    light: 'blue:50',
  }[colorMode];
  const focusBorderColor = {
    dark: 'blue:60',
    light: 'blue:60',
  }[colorMode];
  const disabledBorderColor = {
    dark: 'gray:60',
    light: 'gray:30',
  }[colorMode];
  const invalidBorderColor = {
    dark: 'red:50',
    light: 'red:60',
  }[colorMode];
  const placeholderColor = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const _disabledStyle = {
    borderColor: disabledBorderColor,
    cursor: 'not-allowed',
    opacity: '.28',
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
      };
    }

    return {
      ...((focused !== undefined) && focused && _focusStyle),
      ...((valid !== undefined) && (valid ? _validStyle : _invalidStyle)),
    };
  })();

  return {
    backgroundColor,
    border: 1,
    borderColor,
    borderRadius: 'sm',
    color,
    _disabled: _disabledStyle,
    _focus: _focusStyle,
    _hover: _hoverStyle,
    _invalid: _invalidStyle,
    _valid: _validStyle,
    __placeholder: __placeholderStyle,

    // This may override _disabled, _focus, _hover, _invalid, _valid when necessary
    ...inputStateStyle,
  };
};

const getInputControlFilledStyle = ({
  colorMode,
  inputState,
}) => {
  const backgroundColor = {
    dark: 'gray:80',
    light: 'gray:10',
  }[colorMode];

  return {
    ...getInputControlOutlinedStyle({ colorMode, inputState }),
    backgroundColor,
  };
};

const getInputControlUnstyledStyle = ({
  colorMode,
  inputState,
}) => {
  const backgroundColor = {
    dark: 'transparent',
    light: 'white',
  }[colorMode];
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];

  return {
    backgroundColor,
    border: 0,
    borderRadius: 0,
    color,
  };
};

const getInputControlSizeStyle = ({
  size,
  variant,
}) => {
  return getInputSizeStyle({
    size,
    variant,
  });
};

const getInputControlVariantStyle = ({
  colorMode,
  inputState,
  variant,
}) => {
  if (variant === 'outline') {
    return getInputControlOutlinedStyle({ colorMode, inputState });
  }

  if (variant === 'filled') {
    return getInputControlFilledStyle({ colorMode, inputState });
  }

  if (variant === 'unstyled') {
    return getInputControlUnstyledStyle({ colorMode, inputState });
  }

  return {};
};

/**
 * InputAdornment
 */
const getInputAdornmentSizeStyle = ({
  size,
}) => {
  const defaultSize = 'md';
  const sizes = {
    'sm': {
      fontSize: 'sm',
      lineHeight: 'sm',
      px: '3x',
    },
    'md': {
      fontSize: 'sm',
      lineHeight: 'sm',
      px: '3x',
    },
    'lg': {
      fontSize: 'md',
      lineHeight: 'md',
      px: '3x',
    },
  };
  const sizeStyle = sizes[size] ?? sizes[defaultSize];

  return sizeStyle;
};

/**
 * InputGroup
 */

const getInputGroupAddonOutlinedStyle = ({
  colorMode,
}) => {
  const borderColor = {
    dark: 'gray:60',
    light: 'gray:30',
  }[colorMode];
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];

  return {
    border: 1,
    borderColor,
    borderRadius: 'sm',
    color,
  };
};

const getInputGroupAddonFilledStyle = ({
  colorMode,
}) => {
  const backgroundColor = {
    dark: 'gray:80',
    light: 'gray:10',
  }[colorMode];

  return {
    ...getInputGroupAddonOutlinedStyle({ colorMode }),
    backgroundColor,
  };
};

const getInputGroupAddonUnstyledStyle = ({
  colorMode,
}) => {
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];

  return {
    border: 0,
    borderRadius: 0,
    color,
  };
};

const getInputGroupAddonSizeStyle = ({
  size,
  variant,
}) => {
  const defaultSize = 'md';
  const sizes = {
    'sm': {
      fontSize: 'sm',
      lineHeight: 'sm',
      px: '3x',
      height: '6x',
    },
    'md': {
      fontSize: 'sm',
      lineHeight: 'sm',
      px: '3x',
      height: '8x',
    },
    'lg': {
      fontSize: 'md',
      lineHeight: 'md',
      px: '3x',
      height: '10x',
    },
  };
  const sizeStyle = sizes[size] ?? sizes[defaultSize];

  if (variant === 'unstyled') {
    sizeStyle.px = undefined;
  }

  return sizeStyle;
};

const getInputGroupAddonVariantStyle = ({
  colorMode,
  variant,
}) => {
  if (variant === 'outline') {
    return getInputGroupAddonOutlinedStyle({ colorMode });
  }

  if (variant === 'filled') {
    return getInputGroupAddonFilledStyle({ colorMode });
  }

  if (variant === 'unstyled') {
    return getInputGroupAddonUnstyledStyle({ colorMode });
  }

  return {};
};

const useInputStyle = ({
  size,
  variant,
}) => {
  const [colorMode] = useColorMode();
  const baseStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    transition: 'all .2s',
  };
  const sizeStyle = getInputSizeStyle({ size, variant });
  const variantStyle = getInputVariantStyle({ colorMode, variant });

  return {
    ...baseStyle,
    ...sizeStyle,
    ...variantStyle,
  };
};

const useInputAdornmentStyle = ({
  size,
}) => {
  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
  };
  const sizeStyle = getInputAdornmentSizeStyle({ size });

  return {
    ...baseStyle,
    ...sizeStyle,
  };
};

const useInputBaseStyle = () => {
  return {
    appearance: 'none',
    backgroundColor: 'inherit',
    border: 'none',
    color: 'inherit',
    lineHeight: 1,
    outline: 0,
    padding: 0,
  };
};

const getInputGroupCSS = ({
  variant,
}) => {
  const useNegativeMargin = (variant === 'outline' || variant === 'filled');

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
    display: 'inline-flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    cursor: 'text',
  };
};

const useInputGroupAddonStyle = ({
  size,
  variant,
}) => {
  const [colorMode] = useColorMode();
  const baseStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    outline: 0,
  };
  const sizeStyle = getInputGroupAddonSizeStyle({ size, variant });
  const variantStyle = getInputGroupAddonVariantStyle({ colorMode, variant });

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

const useInputControlBaseStyle = ({
  inputState,
  variant,
}) => {
  const [colorMode] = useColorMode();
  const baseStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    transition: 'all .2s',
  };
  const variantStyle = getInputControlVariantStyle({ colorMode, inputState, variant });

  return {
    ...baseStyle,
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
  const baseStyle = {
    cursor: inputState?.disabled ? 'not-allowed' : undefined,
  };
  const sizeStyle = getInputControlSizeStyle({ size, variant });

  if (startAdornment && endAdornment) {
    sizeStyle.px = undefined;
  }
  if (startAdornment && !endAdornment) {
    sizeStyle.pr = sizeStyle.px;
    sizeStyle.px = undefined;
  }
  if (!startAdornment && endAdornment) {
    sizeStyle.pl = sizeStyle.px;
    sizeStyle.px = undefined;
  }

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
  useInputGroupStyle,
  useInputGroupAddonStyle,
  useInputGroupAppendStyle,
  useInputGroupPrependStyle,
  useInputControlBaseStyle,
  useInputControlInputStyle,
};
