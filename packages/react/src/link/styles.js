import { useColorMode } from '../color-mode';

const useLinkStyle = ({
  disabled,
  textDecoration,
}) => {
  const [colorMode] = useColorMode();
  const color = {
    dark: 'blue:40',
    light: 'blue:60',
  }[colorMode];
  const hoverColor = {
    dark: 'blue:40',
    light: 'blue:50',
  }[colorMode];
  const visitedColor = {
    dark: 'purple:50',
    light: 'purple:60',
  }[colorMode];
  const disabledColor = {
    dark: 'white:disabled',
    light: 'black:disabled',
  }[colorMode];
  const focusVisibleOutlineColor = {
    dark: 'blue:60',
    light: 'blue:60',
  }[colorMode];
  const hoverTextDecoration = textDecoration ? 'none' : 'underline';
  const activeTextDecoration = !!disabled ? 'none' : 'underline';

  return {
    color,
    cursor: 'pointer',
    textDecoration: textDecoration ?? 'none',
    display: 'inline-flex',
    alignItems: 'center',
    _disabled: {
      color: disabledColor,
      cursor: 'not-allowed',
    },
    _visited: {
      color: visitedColor,
    },
    _hover: {
      color: hoverColor,
      textDecoration: !!disabled ? textDecoration : hoverTextDecoration
    },
    _active: {
      color: 'blue:60',
      textDecoration: textDecoration ?? activeTextDecoration,
    },
    _focusVisible: {
      outlineColor: focusVisibleOutlineColor,
      outlineOffset: 0,
      outlineStyle: 'solid',
      outlineWidth: '1q',
    },
  };
};

const useLinkButtonStyle = useLinkStyle;

export {
  useLinkStyle,
  useLinkButtonStyle,
};
