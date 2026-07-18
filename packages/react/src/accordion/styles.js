import { useTheme } from '../theme';

const useAccordionStyle = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
  };
};

const useAccordionHeaderStyle = () => {
  const { sizes } = useTheme();
  const backgroundColor = '_overlay.thinner';
  const borderWidth = sizes['1q'];
  const color = 'text.primary';
  const disabledColor = 'text.disabled';
  const focusVisibleOutlineColor = '_component.keyboardFocused.outerFocusRing';
  const px = sizes['4x'];
  const py = `calc(${sizes['3x']} - ${borderWidth})`;

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: '4x',
    backgroundColor,
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth,
    color,
    _disabled: {
      color: disabledColor,
    },
    _focusVisible: {
      outlineColor: focusVisibleOutlineColor,
      outlineOffset: '-1h',
      outlineStyle: 'solid',
      outlineWidth: '1h',
    },
    px,
    py,
    width: '100%',
  };
};

const useAccordionBodyStyle = () => {
  return {
  };
};

const useAccordionToggleStyle = () => {
  return {
    width: '100%',
  };
};

const useAccordionToggleIconStyle = () => {
  return {
    display: 'inline-flex',
  };
};

export {
  useAccordionStyle,
  useAccordionHeaderStyle,
  useAccordionBodyStyle,
  useAccordionToggleStyle,
  useAccordionToggleIconStyle,
};
