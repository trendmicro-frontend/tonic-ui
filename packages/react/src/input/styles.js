import { sx } from '@tonic-ui/styled-system';
import { useColorMode } from '../color-mode';

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

  return {
    backgroundColor,
    border: 1,
    borderColor,
    borderRadius: 'sm',
    color,
    _hover: {
      borderColor: hoverBorderColor,

      // Use a higher z-index value to bring overlapping border to front when hovered
      zIndex: 2,
    },
    _focus: {
      borderColor: focusBorderColor,

      // Bring overlapping border to front when focused
      zIndex: 1,
    },
    _disabled: {
      borderColor: disabledBorderColor,
      cursor: 'not-allowed',
      opacity: '.28',
    },
    _valid: {
      // XXX - border color for valid input is not defined
    },
    _invalid: {
      borderColor: invalidBorderColor,
    },
    __placeholder: {
      color: placeholderColor,
      // Override Firefox's unusual default opacity
      opacity: 1,
    },
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

const getInputAdornmentSizeStyle = ({
  size,
  variant,
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

  if (variant === 'unstyled') {
    sizeStyle.px = undefined;
  }

  return sizeStyle;
};

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
  variant,
}) => {
  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
  };
  const sizeStyle = getInputAdornmentSizeStyle({ size, variant });

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

const useInputRootBaseStyle = ({
  variant,
}) => {
  const [colorMode] = useColorMode();
  const baseStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    transition: 'all .2s',
  };
  const variantStyle = getInputVariantStyle({ colorMode, variant });

  return {
    ...baseStyle,
    ...variantStyle,
  };
};

const useInputRootInputStyle = ({
  size,
  variant,
  startAdornment,
  endAdornment,
}) => {
  const sizeStyle = getInputSizeStyle({ size, variant });

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
  useInputRootBaseStyle,
  useInputRootInputStyle,
};
