import useColorMode from '../useColorMode';

const baseProps = {
  display: 'block',
  width: '100%',
  fontWeight: 'normal',
  backgroundColor: 'inherit',
  backgroundClip: 'padding-box',
};

const getSizeProps = ({ size }) => {
  const defaultSize = 'md';
  const sizes = {
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
      py: '.375rem',
    },
    'sm': {
      borderRadius: 'sm',
      fontSize: 'sm',
      lineHeight: 'sm',
      px: '.75rem',
    }
  };

  return sizes[size] || sizes[defaultSize];
};

const getVariantProps = ({ colorMode, variant }) => {
  const variants = {
    error: {
      borderColor: colorMode === 'dark' ? 'red:50' : 'red:50',
    },
    skeleton: {
      borderColor: colorMode === 'dark' ? 'gray:80' : 'gray:80',
      backgroundColor: colorMode === 'dark' ? 'gray:80' : 'gray:80',
    },
  };

  return variants[variant];
};

const useInputStyleProps = ({
  size,
  variant,
}) => {
  const { colorMode } = useColorMode();
  const defaultBorder = 1;
  const defaultBorderColor = colorMode === 'dark' ? 'gray:60' : 'gray:60';
  const defaultColor = colorMode === 'dark' ? 'white:primary' : 'black:primary';
  const _hoverProps = {
    borderColor: colorMode === 'dark' ? 'blue:50' : 'blue:50',
  };
  const _focusProps = {
    borderColor: colorMode === 'dark' ? 'blue:60' : 'blue:60',
    outline: 0,
  };
  const _disabledProps = {
    cursor: 'not-allowed',
    // iOS fix for unreadable disabled content
    opacity: '.28',
  };
  const _readOnlyProps = _disabledProps;
  const __placeholderProps = {
    color: colorMode === 'dark' ? 'white:tertiary' : 'black:tertiary',
    // Override Firefox's unusual default opacity
    opacity: 1,
  };

  // size
  const sizeProps = getSizeProps({ size });

  // variant
  const variantProps = getVariantProps({ colorMode, variant });

  const styleProps = {
    ...baseProps,
    ...sizeProps,
    border: defaultBorder,
    borderColor: defaultBorderColor,
    color: defaultColor,
    _hover: _hoverProps,
    _focus: _focusProps,
    _disabled: _disabledProps,
    _readOnly: _readOnlyProps,
    __placeholder: __placeholderProps,
    ...variantProps,
  };

  return styleProps;
};

export default useInputStyleProps;
