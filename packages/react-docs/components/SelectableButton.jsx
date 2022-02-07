import {
  Button,
  useButtonGroup,
  useColorMode,
  useTheme,
} from '@tonic-ui/react';
import React from 'react';

const SelectableButton = ({
  css,
  selected,
  ...props
}) => {
  const context = useButtonGroup();
  const { variant: groupVariant } = { ...context };
  const [colorMode] = useColorMode();
  const { colors } = useTheme();
  const focusBorderColor = colors['blue:60'];
  const variant = props.variant ?? groupVariant;
  const selectedBackgroundColor = (() => {
    const emphasisBackgroundColor = {
      dark: 'red:80',
      light: 'red:80',
    }[colorMode];
    const primaryBackgroundColor = {
      dark: 'blue:80',
      light: 'blue:80',
    }[colorMode];
    const defaultBackgroundColor = {
      dark: 'gray:70',
      light: 'gray:30',
    }[colorMode];
    const backgroundColor = {
      primary: primaryBackgroundColor,
      emphasis: emphasisBackgroundColor,
      default: defaultBackgroundColor,
    }[variant] ?? defaultBackgroundColor;
    return colors[backgroundColor] ?? backgroundColor;
  })();
  const selectedBorderColor = (() => {
    const secondaryBorderColor = {
      dark: 'gray:60',
      light: 'gray:30',
    }[colorMode];
    const borderColor = {
      'secondary': secondaryBorderColor,
    }[variant];
    return borderColor ?? selectedBackgroundColor;
  })();
  const selectedStyle = {
    backgroundColor: selectedBackgroundColor,
    borderColor: selectedBorderColor,
    cursor: 'default',
    pointerEvents: 'none',
    zIndex: 1,
    _hover: {
      backgroundColor: selectedBackgroundColor,
    },
    _active: {
      backgroundColor: selectedBackgroundColor,
    },
  };
  const selectedCSS = {
    '&::before': { // Override the background color of `::before` selector for emphasis, primary, default buttons
      backgroundColor: selectedBackgroundColor,
    },
    '&:focus': {
      ':not(:active)': {
        borderColor: focusBorderColor,
        boxShadow: `inset 0 0 0 1px ${focusBorderColor}`,
      },
      '&::before': { // Override the background color of `::before` selector for emphasis, primary, default buttons
        backgroundColor: selectedBackgroundColor,
      },
    },
  };
  css = [
    {...(selected && selectedCSS)},
    css,
  ];

  return (
    <Button
      css={css}
      {...(selected && selectedStyle)}
      {...props}
    />
  );
};

export default SelectableButton;
