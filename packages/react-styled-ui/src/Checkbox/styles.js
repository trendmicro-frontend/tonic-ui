import useColorMode from '../useColorMode';

const baseProps = {
  userSelect: 'none',
  border: 1,
  transition: 'background-color 120ms',
};

const indeterminateProps = ({ color, colorMode }) => {
  // icon color
  const _color = {
    dark: `${color}:60`,
    light: `${color}:60`,
  }[colorMode];
  const hoverColor = {
    dark: `${color}:50`,
    light: `${color}:50`,
  }[colorMode];
  const disabledColor = {
    dark: 'gray:60',
    light: 'gray:40',
  }[colorMode];

  // border color
  const borderColor = {
    dark: 'gray:50',
    light: 'gray:40',
  }[colorMode];
  const hoverBorderColor = {
    dark: `${color}:50`,
    light: `${color}:50`,
  }[colorMode];
  const disabledBorderColor = {
    dark: 'gray:60',
    light: 'gray:40',
  }[colorMode];

  // outline color
  const focusOutlineColor = {
    dark: `${color}:60`,
    light: `${color}:60`,
  }[colorMode];

  return {
    _indeterminate: {
      borderColor: borderColor,
      color: _color, // Icon color
    },
    _indeterminateAndHover: {
      borderColor: hoverBorderColor,
      color: hoverColor,
    },
    _indeterminateAndFocus: {
      outlineStyle: 'solid',
      outlineColor: focusOutlineColor,
      outlineWidth: '2px',
    },
    _indeterminateAndDisabled: {
      borderColor: disabledBorderColor,
      color: disabledColor, // Icon color
      opacity: 0.28,
    },
  };
};

const interactionProps = ({ color, colorMode }) => {
  // icon color
  const _color = {
    dark: 'white:emphasis',
    light: 'white:emphasis',
  }[colorMode];
  const hoverColor = _color;
  const disabledColor = _color;
  const checkedColor = _color;
  const checkedAndHoverColor = _color;
  const checkedAndFocusColor = _color;
  const checkedAndDisabledColor = {
    dark: 'white:emphasis',
    light: 'black:primary',
  }[colorMode];

  // background color
  const bgColor = 'transparent';
  const hoverBgColor = bgColor;
  const disabledBgColor = bgColor;
  const checkedBgColor = {
    dark: `${color}:60`,
    light: `${color}:60`,
  }[colorMode];
  const checkedAndHoverBgColor = {
    dark: `${color}:50`,
    light: `${color}:50`,
  }[colorMode];
  const checkedAndFocusBgColor = checkedBgColor;
  const checkedAndDisabledBgColor = {
    dark: 'gray:60',
    light: 'gray:40',
  }[colorMode];

  // border color
  const borderColor = {
    dark: 'gray:50',
    light: 'gray:40',
  }[colorMode];
  const hoverBorderColor = {
    dark: `${color}:50`,
    light: `${color}:50`,
  }[colorMode];
  const disabledBorderColor = {
    dark: 'gray:60',
    light: 'gray:40',
  }[colorMode];
  const checkedBorderColor = {
    dark: `${color}:60`,
    light: `${color}:60`,
  }[colorMode];
  const checkedAndHoverBorderColor = hoverBorderColor;
  const checkedAndFocusBorderColor = 'transparent';
  const checkedAndDisabledBorderColor = disabledBorderColor;

  // outline color
  const focusOutlineColor = {
    dark: `${color}:60`,
    light: `${color}:60`,
  }[colorMode];

  return {
    bg: bgColor,
    borderColor: borderColor,
    color: _color, // Icon color
    _hover: {
      bg: hoverBgColor,
      borderColor: hoverBorderColor,
      color: hoverColor, // Icon color
    },
    _disabled: {
      bg: disabledBgColor,
      borderColor: disabledBorderColor,
      color: disabledColor, // Icon color
      opacity: 0.28,
    },
    _focus: {
      outlineStyle: 'solid',
      outlineColor: focusOutlineColor,
      outlineWidth: '2px',
    },
    _checked: {
      bg: checkedBgColor,
      borderColor: checkedBorderColor,
      color: checkedColor, // Icon color
    },
    _checkedAndHover: {
      bg: checkedAndHoverBgColor,
      borderColor: checkedAndHoverBorderColor,
      color: checkedAndHoverColor, // Icon color
    },
    _checkedAndFocus: {
      bg: 'inherit',
      borderColor: checkedAndFocusBorderColor,
      color: checkedAndFocusColor, // Icon color
      '& > :first-child': {
        bg: checkedAndFocusBgColor,
      },
    },
    _checkedAndDisabled: {
      bg: checkedAndDisabledBgColor,
      borderColor: checkedAndDisabledBorderColor,
      color: checkedAndDisabledColor, // Icon color
      opacity: 0.28,
    },
  };
};

const useCheckboxStyle = props => {
  const { colorMode } = useColorMode();
  const _props = { ...props, colorMode };
  return {
    ...baseProps,
    ...props.indeterminate ? { ...indeterminateProps(_props) } : { ...interactionProps(_props) },
  };
};

export default useCheckboxStyle;
