import {
  Button,
  useButtonGroup,
  useColorMode,
  useTheme,
} from '@tonic-ui/react';
import React from 'react';

const SelectButton = ({
  css,
  isSelected,
  ...props
}) => {
  const context = useButtonGroup();
  const { variant: groupVariant } = { ...context };
  const [colorMode] = useColorMode();
  const { colors } = useTheme();
  const variant = props.variant ?? groupVariant;
  const selectedBackgroundColor = (() => {
    const defaultBackgroundColor = {
      dark: 'gray:70',
      light: 'gray:30',
    }[colorMode];
    const emphasisBackgroundColor = {
      dark: 'red:80',
      light: 'red:80',
    }[colorMode];
    const primaryBackgroundColor = {
      dark: 'blue:80',
      light: 'blue:80',
    }[colorMode];
    const secondaryBackgroundColor = {
      dark: 'gray:70',
      light: 'gray:30',
    }[colorMode];
    const ghostBackgroundColor = {
      dark: 'gray:70',
      light: 'gray:30',
    }[colorMode];
    const backgroundColor = {
      default: defaultBackgroundColor,
      emphasis: emphasisBackgroundColor,
      primary: primaryBackgroundColor,
      secondary: secondaryBackgroundColor,
      ghost: ghostBackgroundColor,
    }[variant] ?? defaultBackgroundColor;
    return colors[backgroundColor] ?? backgroundColor;
  })();
  const selectedBorderColor = (() => {
    const defaultBorderColor = {
      dark: 'gray:70',
      light: 'gray:30',
    }[colorMode];
    const emphasisBorderColor = {
      dark: 'red:80',
      light: 'red:80',
    }[colorMode];
    const primaryBorderColor = {
      dark: 'blue:80',
      light: 'blue:80',
    }[colorMode];
    const secondaryBorderColor = {
      dark: 'gray:60',
      light: 'gray:30',
    }[colorMode];
    const ghostBorderColor = {
      dark: 'gray:70',
      light: 'gray:30',
    }[colorMode];
    const borderColor = {
      default: defaultBorderColor,
      emphasis: emphasisBorderColor,
      primary: primaryBorderColor,
      secondary: secondaryBorderColor,
      ghost: ghostBorderColor,
    }[variant] ?? defaultBorderColor;
    return colors[borderColor] ?? borderColor;
  })();

  const styleProps = (() => {
    const baseStyle = {
    };

    if (!isSelected) {
      return baseStyle;
    }

    return {
      ...baseStyle,
      tabIndex: -1,
      backgroundColor: selectedBackgroundColor,
      borderColor: selectedBorderColor,
      cursor: 'default',
      pointerEvents: 'none',
    };
  })();
  const selectedCSS = {
    // Override the background color for "emphasis", "primary", and "default" buttons
    '&:hover': {
      backgroundColor: selectedBackgroundColor,
    },
    '&:active': {
      backgroundColor: selectedBackgroundColor,
    },
    '&::before': {
      backgroundColor: selectedBackgroundColor,
    },
    '&:focus': {
      borderColor: selectedBorderColor,
      boxShadow: `inset 0 0 0 1px ${selectedBackgroundColor}`,

      // Override the background color for "emphasis", "primary", and "default" buttons
      '&::before': {
        backgroundColor: selectedBackgroundColor,
      },
    },
  };

  css = [
    {...(isSelected && selectedCSS)},
    css,
  ];

  return (
    <Button
      css={css}
      {...styleProps}
      {...props}
    />
  );
};

export default SelectButton;
