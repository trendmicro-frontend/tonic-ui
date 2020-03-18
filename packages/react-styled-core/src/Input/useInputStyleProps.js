import useColorMode from '../useColorMode';

const defaultSize = 'md';
const defaultVariant = 'outline';

const baseProps = {
  display: 'block',
  width: '100%',
  fontWeight: 'normal',
  appearance: 'none',
  backgroundColor: 'inherit',
  backgroundClip: 'padding-box',
};

const getSizeProps = ({
  size,
}) => {
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

  return sizes[size] ?? sizes[defaultSize];
};

const getVariantProps = ({
  colorMode,
  error,
  variant,
}) => {
  const variants = {
    outline: (() => {
      const border = 1;
      const borderColor = colorMode === 'dark' ? 'gray:60' : 'gray:60';
      const color = colorMode === 'dark' ? 'white:primary' : 'black:primary';
      const _hoverProps = {
        borderColor: colorMode === 'dark' ? 'blue:50' : 'blue:50',
      };
      const _focusProps = {
        borderColor: colorMode === 'dark' ? 'blue:60' : 'blue:60',
      };
      const _disabledProps = {
        borderColor: colorMode === 'dark' ? 'gray:60' : 'gray:60',
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

      const variantProps = {
        border,
        borderColor,
        color,
        outline: 0,
        _hover: _hoverProps,
        _focus: _focusProps,
        _disabled: _disabledProps,
        _readOnly: _readOnlyProps,
        __placeholder: __placeholderProps,
      };

      if (error) {
        variantProps.borderColor = colorMode === 'dark' ? 'red:50' : 'red:50';
        variantProps._hover.borderColor = colorMode === 'dark' ? 'red:50' : 'red:50';
        variantProps._focus.borderColor = colorMode === 'dark' ? 'red:50' : 'red:50';
        variantProps._disabled.borderColor = colorMode === 'dark' ? 'red:50' : 'red:50';
      }

      return variantProps;
    })(),
    unstyled: (() => {
      const variantProps = {
        border: 1,
        borderColor: 'transparent',
        color: colorMode === 'dark' ? 'white:primary' : 'black:primary',
        outline: 0,
      };

      return variantProps;
    })(),
  };

  return variants[variant] ?? variants[defaultVariant];
};

const useInputStyleProps = ({
  error,
  size,
  variant,
}) => {
  const { colorMode } = useColorMode();

  // size
  const sizeProps = getSizeProps({ size });

  // variant
  const variantProps = getVariantProps({ colorMode, error, variant });

  const styleProps = {
    ...baseProps,
    ...sizeProps,
    ...variantProps,
  };

  return styleProps;
};

export default useInputStyleProps;
