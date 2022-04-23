import {
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';

const useMenuStyle = () => {
  return {
    position: 'relative',
    display: 'inline-flex',
  };
};

const useMenuContentStyle = () => {
  return {
    // No style for menu content
  };
};

const useMenuListStyle = () => {
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
    py: '2x',
    _focus: {
      outline: 'none',
    },
    ...colorModeStyle,
  };
};

const useMenuToggleStyle = () => {
  return {
    cursor: 'pointer',
    display: 'inline-flex',
  };
};

export {
  useMenuStyle,
  useMenuContentStyle,
  useMenuListStyle,
  useMenuToggleStyle,
};
