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
    height: undefined,
    px: undefined,
    py: undefined,
  };
};

const getInputSizeStyle = (props) => {
  const { size } = props;
  const defaultSize = 'md';
  const sizes = {
    'sm': {
      borderRadius: 'sm',
      fontSize: 'sm',
      lineHeight: 'sm',
      px: 'calc(.75rem - 1px)', // 12px - 1px
      py: '1px',
    },
    'md': {
      borderRadius: 'sm',
      fontSize: 'sm',
      lineHeight: 'sm',
      px: 'calc(.75rem - 1px)', // 12px - 1px
      py: 'calc(.375rem - 1px)', // 6px - 1px
    },
    'lg': {
      borderRadius: 'sm',
      fontSize: 'md',
      lineHeight: 'md',
      px: 'calc(.75rem - 1px)', // 12px - 1px
      py: 'calc(.5625rem - 1px)', // 9px - 1px
    },
  };

  return sizes[size] ?? sizes[defaultSize];
};

const getInputVariantStyle = (props) => {
  const { colorMode, variant } = props;

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
    color,
    border: 0,
    borderRadius: 0,
    px: undefined,
    py: undefined,
  };
};

const getInputGroupAddonSizeStyle = (props) => {
  const { size } = props;
  const defaultSize = 'md';
  const sizes = {
    'sm': {
      borderRadius: 'sm',
      fontSize: 'sm',
      lineHeight: 'sm',
      height: '6x',
      px: 'calc(.75rem - 1px)', // 12px - 1px
    },
    'md': {
      borderRadius: 'sm',
      fontSize: 'sm',
      lineHeight: 'sm',
      height: '8x',
      px: 'calc(.75rem - 1px)', // 12px - 1px
    },
    'lg': {
      borderRadius: 'sm',
      fontSize: 'md',
      lineHeight: 'md',
      height: '10x',
      px: 'calc(.75rem - 1px)', // 12px - 1px
    },
  };

  return sizes[size] ?? sizes[defaultSize];
};

const getInputGroupAddonVariantStyle = (props) => {
  const { colorMode, variant } = props;

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

const useInputStyle = ({
  size,
  variant,
}) => {
  const [colorMode] = useColorMode();
  const _props = {
    colorMode,
    size,
    variant,
  };
  const baseStyle = {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    transition: 'all .2s',
  };
  const sizeStyle = getInputSizeStyle(_props);
  const variantStyle = getInputVariantStyle(_props);

  return {
    ...baseStyle,
    ...sizeStyle,
    ...variantStyle,
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
    width: 'auto',
  };
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
  const _props = {
    colorMode,
    size,
    variant,
  };
  const baseStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    outline: 0,
  };
  const sizeStyle = getInputGroupAddonSizeStyle(_props);
  const variantStyle = getInputGroupAddonVariantStyle(_props);

  return {
    ...baseStyle,
    ...sizeStyle,
    ...variantStyle,
  };
};

const useInputGroupAppendStyle = () => {
  const notFirstChildStyle = {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  };

  const notLastChildStyle = {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  };

  return {
    display: 'flex',
    ml: -1,
    css: {
      '& > *:first-of-type': notFirstChildStyle,
      '&:not(:last-child) > *:first-of-type': notLastChildStyle,
    }
  };
};

const useInputGroupPrependStyle = () => {
  const notFirstChildStyle = {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  };

  const notLastChildStyle = {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  };

  return {
    display: 'flex',
    mr: -1,
    css: {
      '& > *:first-of-type': notLastChildStyle,
      '&:not(:first-of-type) > *:first-of-type': notFirstChildStyle,
    },
  };
};

export {
  getInputGroupCSS,
  useInputStyle,
  useInputBaseStyle,
  useInputGroupStyle,
  useInputGroupAddonStyle,
  useInputGroupAppendStyle,
  useInputGroupPrependStyle,
};
