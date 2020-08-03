import useColorMode from '../useColorMode';

const baseProps = {
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  transition: 'all .2s',
};

const sizes = {
  'md': {
    borderRadius: 'sm',
    fontSize: 'sm',
    lineHeight: 'sm',
    minHeight: '9x', // 6px (top) + 20px + 10px (bottom) = 36px
    px: 'calc(.75rem - 1px)', // 12px - 1px
    pt: 'calc(.375rem - 1px)', // 6px - 1px
    pb: 'calc(.625rem - 1px)', // 10px - 1px
  },
};

const getOutlinedStyle = ({
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
    light: 'red:50',
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
    },
    _focus: {
      borderColor: focusBorderColor,
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

const getFilledStyle = ({
  colorMode,
}) => {
  const backgroundColor = {
    dark: 'gray:80',
    light: 'gray:10',
  }[colorMode];

  return {
    ...getOutlinedStyle({ colorMode }),
    backgroundColor,
  };
};

const getUnstyledStyle = ({
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
    px: undefined,
    py: undefined,
  };
};

const getSizeProps = (props) => {
  const defaultSize = 'md';

  return sizes[defaultSize];
};

const getVariantProps = (props) => {
  const { colorMode, variant } = props;

  if (variant === 'outline') {
    return getOutlinedStyle({ colorMode });
  }

  if (variant === 'filled') {
    return getFilledStyle({ colorMode });
  }

  if (variant === 'unstyled') {
    return getUnstyledStyle({ colorMode });
  }

  return {};
};

const useTextareaStyle = ({
  variant,
}) => {
  const { colorMode } = useColorMode();
  const _props = {
    colorMode,
    variant,
  };
  const sizeProps = getSizeProps(_props); // use default size
  const variantProps = getVariantProps(_props);

  return {
    ...baseProps,
    ...sizeProps,
    ...variantProps,
  };
};

export {
  useTextareaStyle,
};
