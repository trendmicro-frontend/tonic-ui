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
    minHeight: '8x',
    px: '3x',
    py: '.3125rem',
  },
};

const getOutlinedStyle = ({
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

const getSizeProps = () => {
  const defaultSize = 'md';
  return sizes[defaultSize];
};

const getVariantProps = ({
  variant,
  ...props
}) => {
  if (variant === 'outline') {
    return getOutlinedStyle(props);
  }

  if (variant === 'filled') {
    return getFilledStyle(props);
  }

  if (variant === 'unstyled') {
    return getUnstyledStyle(props);
  }

  return {};
};

export {
  baseProps,
  getSizeProps,
  getVariantProps,
};
