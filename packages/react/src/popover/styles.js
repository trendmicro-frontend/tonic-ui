import { useColorMode } from '../color-mode';
import { useColorStyle } from '../color-style';

const baseProps = {
  fontSize: 'sm',
  lineHeight: 'sm',
};

const usePopoverContentStyle = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const backgroundColor = {
    dark: 'gray:80',
    light: 'white',
  }[colorMode];

  return {
    backgroundColor,
    boxShadow: colorStyle?.shadow?.thin,
    tabIndex: '-1',
    borderWidth: 1,
    p: '3x',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 'sm',
    maxWidth: '288px',
    _focus: {
      outline: 0,
    },
  };
};

const usePopoverHeaderStyle = () => {
  const [colorMode] = useColorMode();
  const color = { dark: 'white:emphasis', light: 'black:primary' }[colorMode];
  return {
    ...baseProps,
    fontWeight: 'semibold',
    color,
    __after: {
      content: '""',
      display: 'block',
      borderTop: 1,
      borderColor: 'gray:60',
      my: '2x',
    },
  };
};

const usePopoverBodyStyle = () => {
  const [colorMode] = useColorMode();
  const color = { dark: 'white:primary', light: 'black:primary' }[colorMode];
  return {
    color,
    ...baseProps,
    flex: '1'
  };
};

export {
  usePopoverContentStyle,
  usePopoverHeaderStyle,
  usePopoverBodyStyle,
};
