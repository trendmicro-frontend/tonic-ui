import { createTransitionStyle } from '@tonic-ui/utils';
import { useTheme } from '../theme';

const useIconButtonStyle = ({
  color: colorProp,
  size = '8x',
  _focusBorderColor: focusBorderColorProp,
  _focusBoxShadowBorderColor: focusBoxShadowBorderColorProp,
  _hoverColor: hoverColorProp,
}) => {
  const { colors } = useTheme();
  const color = colors?.[colorProp] ?? colorProp;
  const activeColor = color;
  const hoverColor = colors?.[hoverColorProp] ?? hoverColorProp;
  const focusColor = color;
  const focusHoverColor = hoverColor;
  const focusActiveColor = activeColor;
  const focusBorderColor = colors?.[focusBorderColorProp] ?? focusBorderColorProp;
  const focusBoxShadowBorderColor = colors?.[focusBoxShadowBorderColorProp] ?? focusBoxShadowBorderColorProp;

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 1,
    borderColor: 'transparent',
    color,
    width: size,
    height: size,
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
};

export {
  useIconButtonStyle,
};
