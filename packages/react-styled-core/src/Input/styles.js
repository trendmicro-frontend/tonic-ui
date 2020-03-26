const baseProps = {
  appearance: 'none',
  background: 'inherit',
  position: 'relative',
  outline: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  transition: 'all .2s',
};

const inputSizes = {
  'sm': {
    borderRadius: 'sm',
    fontSize: 'sm',
    lineHeight: 'sm',
    height: '6x',
    px: '3x',
  },
  'md': {
    borderRadius: 'sm',
    fontSize: 'sm',
    lineHeight: 'sm',
    height: '8x',
    px: '3x',
  },
  'lg': {
    borderRadius: 'sm',
    fontSize: 'md',
    lineHeight: 'md',
    height: '10x',
    px: '3x',
  },
};

const getOutlinedStyle = ({
  colorMode,
  invalid,
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

const getFilledStyle = ({
  colorMode,
  invalid,
}) => {
  const backgroundColor = {
    dark: 'gray:80',
    light: 'gray:10',
  }[colorMode];

  return {
    ...getOutlinedStyle({ colorMode, invalid }),
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

const getSizeProps = ({
  size,
}) => {
  const defaultSize = 'md';
  return inputSizes[size] ?? inputSizes[defaultSize];
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
