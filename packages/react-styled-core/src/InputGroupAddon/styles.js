const baseProps = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  outline: 0,
};

const sizes = {
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

const getSizeProps = ({
  size,
}) => {
  const defaultSize = 'md';
  return sizes[size] ?? sizes[defaultSize];
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
