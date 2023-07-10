import { createTransitionStyle } from '@tonic-ui/utils';
import { useColorMode } from '../color-mode';

const useCheckboxControlBoxStyle = ({
  color,
  indeterminate,
  height,
  width,
}) => {
  const [colorMode] = useColorMode();
  const baseStyle = {
    userSelect: 'none',
    border: 1,
    position: 'relative',
    transition: createTransitionStyle(['background-color'], { duration: 120 }),
    width,
    height,
    zIndex: 0,
  };

  const getIndeterminateStyle = ({ color }) => {
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
        outlineWidth: '1h',
      },
      _indeterminateAndDisabled: {
        borderColor: disabledBorderColor,
        color: disabledColor, // Icon color
        opacity: 0.28,
      },
    };
  };

  const getInteractionStyle = ({ color }) => {
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
    const backgroundColor = 'transparent';
    const hoverBackgroundColor = backgroundColor;
    const disabledBackgroundColor = backgroundColor;
    const checkedBackgroundColor = {
      dark: `${color}:60`,
      light: `${color}:60`,
    }[colorMode];
    const checkedAndHoverBackgroundColor = {
      dark: `${color}:50`,
      light: `${color}:50`,
    }[colorMode];
    const checkedAndFocusBackgroundColor = checkedBackgroundColor;
    const checkedAndDisabledBackgroundColor = {
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
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      color: _color, // Icon color
      _hover: {
        backgroundColor: hoverBackgroundColor,
        borderColor: hoverBorderColor,
        color: hoverColor, // Icon color
      },
      _disabled: {
        backgroundColor: disabledBackgroundColor,
        borderColor: disabledBorderColor,
        color: disabledColor, // Icon color
        opacity: 0.28,
      },
      _focus: {
        outlineStyle: 'solid',
        outlineColor: focusOutlineColor,
        outlineWidth: '1h',
      },
      _checked: {
        backgroundColor: checkedBackgroundColor,
        borderColor: checkedBorderColor,
        color: checkedColor, // Icon color
      },
      _checkedAndHover: {
        backgroundColor: checkedAndHoverBackgroundColor,
        borderColor: checkedAndHoverBorderColor,
        color: checkedAndHoverColor, // Icon color
      },
      _checkedAndFocus: {
        backgroundColor: 'inherit',
        borderColor: checkedAndFocusBorderColor,
        color: checkedAndFocusColor, // Icon color
        '& > div:first-of-type': {
          backgroundColor: checkedAndFocusBackgroundColor,
        },
      },
      _checkedAndDisabled: {
        backgroundColor: checkedAndDisabledBackgroundColor,
        borderColor: checkedAndDisabledBorderColor,
        color: checkedAndDisabledColor, // Icon color
        opacity: 0.28,
      },
    };
  };

  if (indeterminate) {
    return {
      ...baseStyle,
      ...getIndeterminateStyle({ color }),
    };
  }

  return {
    ...baseStyle,
    ...getInteractionStyle({ color }),
  };
};

export {
  useCheckboxControlBoxStyle,
};
