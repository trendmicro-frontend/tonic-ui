import { useColorMode } from '../ColorMode';

const useLinkStyle = ({
  disabled,
  textDecoration,
}) => {
  const [colorMode] = useColorMode();
  const color = { light: 'blue:60', dark: 'blue:40' }[colorMode];
  const hoverColor = { light: 'blue:50', dark: 'blue:40' }[colorMode];
  const visitedColor = { light: 'purple:60', dark: 'purple:50' }[colorMode];
  const disabledColor = { light: 'black:disabled', dark: 'white:disabled' }[colorMode];
  const hoverTextDecoration = textDecoration ? 'none' : 'underline';
  const activeTextDecoration = !!disabled ? 'none' : 'underline';

  return {
    color,
    cursor: 'pointer',
    outline: 'none',
    textDecoration: textDecoration ?? 'none',
    display: 'inline-flex',
    alignItems: 'center',
    lineHeight: 'sm',
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
  };
};

export {
  useLinkStyle,
};
