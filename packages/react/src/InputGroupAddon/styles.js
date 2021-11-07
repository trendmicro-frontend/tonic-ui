import useColorMode from '../useColorMode';

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
  const sizeProps = getSizeProps(_props);
  const variantProps = getVariantProps(_props);

  return {
    ...baseProps,
    ...sizeProps,
    ...variantProps,
  };
};

export {
  useInputGroupAddonStyle,
};
