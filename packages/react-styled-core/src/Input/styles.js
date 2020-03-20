import useColorMode from '../useColorMode';

const defaultSize = 'md';
const defaultVariant = 'outline';

const baseProps = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  transition: 'all .2s',
  outline: 0,
  appearance: 'none',
  width: '100%',
};

const inputSizes = {
  'lg': {
    borderRadius: 'sm',
    fontSize: 'md',
    lineHeight: 'md',
    px: '.75rem',
    py: '.5rem',
  },
  'md': {
    borderRadius: 'sm',
    fontSize: 'sm',
    lineHeight: 'sm',
    px: '.75rem',
    py: '.3125rem',
  },
  'sm': {
    borderRadius: 'sm',
    fontSize: 'sm',
    lineHeight: 'sm',
    px: '.75rem',
    py: '.0625rem',
  }
};

const getOutlinedStyle = ({
  colorMode,
  invalid,
}) => {
  const backgroundColor = {
    light: 'white',
    dark: 'gray:100',
  }[colorMode];
  const borderColor = {
    dark: 'gray:60',
    light: 'gray:60',
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
    light: 'gray:60',
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

const getUnstyledStyle = ({
  colorMode,
}) => {
  const backgroundColor = 'transparent';
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];

  return {
    backgroundColor,
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
  return inputSizes[size] ?? inputSizes[defaultSize];
};

const getVariantProps = ({
  variant,
  ...props
}) => {
  if (variant === 'outline') {
    return getOutlinedStyle(props);
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
