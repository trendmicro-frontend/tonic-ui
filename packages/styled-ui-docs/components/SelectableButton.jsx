import {
  Button,
  useColorMode,
  useTheme,
} from '@trendmicro/react-styled-ui';
import React from 'react';

const SelectableButton = ({ selected, ...props }) => {
  const [colorMode] = useColorMode();
  const { colors } = useTheme();
  const focusColor = colors['blue:60'];
  let _selectedColor = {
    dark: 'blue:60',
    light: 'blue:60',
  }[colorMode];
  _selectedColor = colors[_selectedColor];
  const getSelectedProps = {
    bg: _selectedColor,
    borderColor: _selectedColor,
    color: 'white:emphasis',
    cursor: 'default',
    pointerEvents: 'none',
    zIndex: 1,
    __before: {
      backgroundColor: _selectedColor,
    },
    _focus: {
      ':not(:active)': {
        borderColor: focusColor,
        boxShadow: `inset 0 0 0 1px ${focusColor}`,
      },
      '&::before': {
        backgroundColor: focusColor,
      },
    },
    _hover: {
      bg: _selectedColor,
    },
    _active: {
      bg: _selectedColor,
    },
  };
  return (
    <Button
      {...(selected && getSelectedProps)}
      {...props}
    />
  );
};

export default SelectableButton;
