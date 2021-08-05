import useColorMode from '../useColorMode';

const colorProps = {
  light: {
    color: 'black:secondary'
  },
  dark: {
    color: 'white:secondary'
  }
};

const baseProps = {
  position: 'relative',
  width: 'auto',
  display: 'inline-flex',
  alignItems: 'center',
  transition: 'all .2s'
};

const sizes = {
  sm: {
    borderRadius: 'sm',
    fontSize: 'sm',
    lineHeight: 'sm',
    px: 'calc(.75rem - 1px)', // 12px - 1px
    py: '1px'
  },
  md: {
    borderRadius: 'sm',
    fontSize: 'sm',
    lineHeight: 'sm',
    px: 'calc(.75rem - 1px)', // 12px - 1px
    py: 'calc(.375rem - 1px)' // 6px - 1px
  },
  lg: {
    borderRadius: 'sm',
    fontSize: 'md',
    lineHeight: 'md',
    px: 'calc(.75rem - 1px)', // 12px - 1px
    py: 'calc(.5625rem - 1px)' // 9px - 1px
  }
};

const getOutlinedStyle = ({ colorMode }) => {
  const backgroundColor = {
    dark: 'transparent',
    light: 'white'
  }[colorMode];
  const borderColor = {
    dark: 'gray:60',
    light: 'gray:30'
  }[colorMode];
  const color = {
    dark: 'white:primary',
    light: 'black:primary'
  }[colorMode];
  const hoverBorderColor = {
    dark: 'blue:50',
    light: 'blue:50'
  }[colorMode];
  const focusBorderColor = {
    dark: 'blue:60',
    light: 'blue:60'
  }[colorMode];
  const disabledBorderColor = {
    dark: 'gray:60',
    light: 'gray:30'
  }[colorMode];
  const invalidBorderColor = {
    dark: 'red:50',
    light: 'red:60'
  }[colorMode];
  const placeholderColor = {
    dark: 'white:tertiary',
    light: 'black:tertiary'
  }[colorMode];

  return {
    backgroundColor,
    border: 1,
    borderColor,
    color,
    _hover: {
      borderColor: hoverBorderColor,

      // Use a higher z-index value to bring overlapping border to front when hovered
      zIndex: 2
    },
    _focus: {
      borderColor: focusBorderColor,

      // Bring overlapping border to front when focused
      zIndex: 1
    },
    _disabled: {
      borderColor: disabledBorderColor,
      cursor: 'not-allowed',
      opacity: '.28'
    },
    _valid: {
      // XXX - border color for valid input is not defined
    },
    _invalid: {
      borderColor: invalidBorderColor
    },
    __placeholder: {
      color: placeholderColor,
      // Override Firefox's unusual default opacity
      opacity: 1
    }
  };
};

const getFilledStyle = ({ colorMode }) => {
  const backgroundColor = {
    dark: 'gray:80',
    light: 'gray:10'
  }[colorMode];

  return {
    ...getOutlinedStyle({ colorMode }),
    backgroundColor
  };
};

const getUnstyledStyle = ({ colorMode }) => {
  const backgroundColor = {
    dark: 'transparent',
    light: 'white'
  }[colorMode];
  const color = {
    dark: 'white:primary',
    light: 'black:primary'
  }[colorMode];

  return {
    backgroundColor,
    border: 0,
    borderRadius: 0,
    color,
    height: undefined,
    px: undefined,
    py: undefined
  };
};

const getSizeProps = (props) => {
  const { size } = props;
  const defaultSize = 'md';

  return sizes[size] ?? sizes[defaultSize];
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

const useIconStyle = (props) => {
  const [colorMode] = useColorMode();
  return {
    color: colorProps[colorMode]
  };
};

const useInputErrorStyle = (props) => {
  return {
    borderColor: 'red:50',
    _focus: {
      borderColor: 'red:50'
    },
    _hover: {
      borderColor: 'red:50'
    }
  };
};

const useInputStyle = ({ size, variant }) => {
  const [colorMode] = useColorMode();
  const _props = {
    colorMode,
    size,
    variant
  };
  const sizeProps = getSizeProps(_props);
  const variantProps = getVariantProps(_props);

  return {
    ...baseProps,
    ...sizeProps,
    ...variantProps
  };
};

export { useIconStyle, useInputErrorStyle, useInputStyle };
