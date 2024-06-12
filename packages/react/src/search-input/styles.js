import { createTransitionStyle } from '@tonic-ui/utils';
import { useTheme } from '../theme';
import { useColorMode } from '../color-mode';
import {
  VARIANT_OUTLINE,
  VARIANT_FILLED,
  VARIANT_FLUSH,
  VARIANT_UNSTYLED,
} from '../input/constants';

const useSearchInputAdornmentStyle = () => {
  return {
    flex: 'none',
  };
};

const useSearchInputClearButtonStyle = ({ variant, size }) => {
  const [colorMode] = useColorMode();
  const { colors } = useTheme();
  const color = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const activeColor = color;
  const borderColor = 'transparent';
  const borderStyle = 'solid';
  const borderWidth = '1q';
  const hoverColor = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];
  const focusColor = color;
  const focusHoverColor = hoverColor;
  const focusActiveColor = activeColor;
  const focusBorderColor = colors['blue:60'];
  const focusBoxShadowBorderColor = colors['blue:60'];
  const sizeStyle = (() => {
    const width = {
      sm: '6x',
      md: '8x', // default width
      lg: '8x',
    }[size] ?? '8x';
    const height = {
      sm: '6x',
      md: '8x', // default height
      lg: '8x',
    }[size] ?? '8x';

    const _style = {
      width,
      height,
    };

    if (variant === VARIANT_OUTLINE || variant === VARIANT_FILLED) {
      _style.ml = (size === 'sm') ? '1x' : undefined;
      _style.mr = (size === 'sm') ? '3q' : '-1q'; // right border
      _style.my = (size === 'sm' || size === 'md') ? '-1q' : undefined; // top and bottom borders
    } else if (variant === VARIANT_FLUSH) {
      _style.mx = (size === 'sm') ? '1x' : undefined;
      _style.mb = (size === 'sm' || size === 'md') ? '-1q' : undefined; // bottom border
    } else if (variant === VARIANT_UNSTYLED) {
      _style.mx = (size === 'sm') ? '1x' : undefined;
    }

    return _style;
  })();

  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor,
    borderStyle,
    borderWidth,
    color,
    ...sizeStyle,
    transition: createTransitionStyle(['border-color', 'box-shadow', 'color'], { duration: 200 }),
    _hover: {
      color: hoverColor,
    },
    _active: {
      color: activeColor,
    },
    _focus: {
      borderColor: focusBorderColor,
      boxShadow: focusBoxShadowBorderColor ? `inset 0 0 0 1px ${focusBoxShadowBorderColor}` : undefined,
      color: focusColor,
    },
    _focusHover: {
      color: focusHoverColor,
    },
    _focusActive: {
      borderColor: focusBorderColor,
      boxShadow: focusBoxShadowBorderColor ? `inset 0 0 0 1px ${focusBoxShadowBorderColor}` : undefined,
      color: focusActiveColor,
    },
  };

  return {
    ...baseStyle,
  };
};

const useSearchInputLoadingIconStyle = ({ variant }) => {
  const { sizes } = useTheme();
  const pl = '2x';
  const pr = (variant === VARIANT_OUTLINE || variant === VARIANT_FILLED)
    ? `calc(${sizes['2x']} - ${sizes['1q']})`
    : '2x';

  return {
    display: 'flex',
    alignItems: 'center',
    pl,
    pr,
  };
};

const useSearchInputSearchIconStyle = ({ variant }) => {
  const { sizes } = useTheme();
  const pl = (variant === VARIANT_OUTLINE || variant === VARIANT_FILLED)
    ? `calc(${sizes['3x']} - ${sizes['1q']})`
    : '3x';
  const pr = '2x';

  return {
    display: 'flex',
    alignItems: 'center',
    pl,
    pr,
  };
};

export {
  useSearchInputAdornmentStyle,
  useSearchInputClearButtonStyle,
  useSearchInputLoadingIconStyle,
  useSearchInputSearchIconStyle,
};
