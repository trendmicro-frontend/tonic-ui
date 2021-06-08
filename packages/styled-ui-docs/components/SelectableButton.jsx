import {
  Button,
  useColorMode,
  useTheme,
} from '@trendmicro/react-styled-ui';
import React from 'react';

const SelectableButton = ({
  css,
  selected,
  selectedColor,
  ...props
}) => {
  const [colorMode] = useColorMode();
  const { colors } = useTheme();
  const focusColor = colors['blue:60'];
  let _selectedColor = selectedColor || {
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
    _hover: {
      bg: _selectedColor,
    },
    _active: {
      bg: _selectedColor,
    },
  };
  const getSelectedCSS = {
    '&::before': { // Override the background color of `::before` selector for emphasis, primary, default buttons
      backgroundColor: _selectedColor,
    },
    '&:focus': {
      ':not(:active)': {
        borderColor: focusColor,
        boxShadow: `inset 0 0 0 1px ${focusColor}`,
      },
      '&::before': { // Override the background color of `::before` selector for emphasis, primary, default buttons
        backgroundColor: _selectedColor,
      },
    },
  };
  css = [
    { ...(selected && getSelectedCSS)},
    { ...css }
  ];
  return (
    <Button
      css={css}
      {...(selected && getSelectedProps)}
      {...props}
    />
  );
};

export default SelectableButton;
