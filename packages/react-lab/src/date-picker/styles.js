import {
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';

const useDatePickerStyle = () => {
  return {
    position: 'relative',
    display: 'inline-flex',
  };
};

const useDatePickerContentStyle = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const colorModeStyle = {
    light: {
      backgroundColor: 'white',
      boxShadow: colorStyle?.shadow?.medium,
    },
    dark: {
      backgroundColor: 'gray:80',
      boxShadow: colorStyle?.shadow?.medium,
    },
  }[colorMode];

  return {
    color: 'inherit',
    m: '0',
    p: '0',
    _focus: {
      outline: 'none',
    },
    ...colorModeStyle,
  };
};

const useDatePickerToggleStyle = () => {
  return {
    cursor: 'pointer',
    display: 'inline-flex',
  };
};

export {
  useDatePickerStyle,
  useDatePickerContentStyle,
  useDatePickerToggleStyle,
};
