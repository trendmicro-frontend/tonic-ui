import {
  useColorMode,
} from '@tonic-ui/react';

const getSolidEditableTagStyle = ({
  colorMode,
}) => {
  // Hover
  const hoverBackgroundColor = {
    dark: 'gray:60',
    light: 'gray:10',
  }[colorMode];
  // Invalid
  const invalidBackgroundColor = {
    dark: 'red:60',
    light: 'red:20',
  }[colorMode];
  const hoverInvalidBackgroundColor = {
    dark: 'red:50',
    light: 'red:10',
  }[colorMode];
  const invalidColor = {
    dark: 'white:emphasis',
    light: 'red:100',
  }[colorMode];

  return {
    _hover: {
      '&:not([disabled])': {
        backgroundColor: hoverBackgroundColor,
      },
    },
    _invalid: {
      backgroundColor: invalidBackgroundColor,
      color: invalidColor,
      '&:not([disabled]):hover': {
        backgroundColor: hoverInvalidBackgroundColor,
        color: invalidColor,
      },
    },
  };
};

const getOutlineEditableTagStyle = ({
  colorMode,
}) => {
  // Focus
  const focusColor = {
    dark: 'blue:60',
    light: 'blue:60',
  }[colorMode];
  // Hover
  const hoverBorderColor = {
    dark: 'gray:30',
    light: 'gray:50',
  }[colorMode];
  const hoverColor = {
    dark: 'gray:30',
    light: 'gray:50',
  }[colorMode];
  // Invalid
  const invalidBackgroundColor = {
    dark: 'red:60',
    light: 'red:20',
  }[colorMode];
  const hoverInvalidBackgroundColor = {
    dark: 'red:50',
    light: 'red:10',
  }[colorMode];
  const invalidColor = {
    dark: 'white:emphasis',
    light: 'red:100',
  }[colorMode];

  return {
    _hover: {
      '&:not([disabled])': {
        borderColor: hoverBorderColor,
        color: hoverColor,
      },
    },
    _focusHover: {
      '&:not([disabled])': {
        borderColor: focusColor,
        color: hoverColor,
      },
    },
    _invalid: {
      borderColor: invalidBackgroundColor,
      backgroundColor: invalidBackgroundColor,
      color: invalidColor,
      '&:not([disabled]):hover': {
        borderColor: hoverInvalidBackgroundColor,
        backgroundColor: hoverInvalidBackgroundColor,
        color: invalidColor,
      },
      '&:not([disabled]):focus:hover': {
        color: invalidColor,
      },
    },
  };
};

const useEditableTagStyle = ({
  size,
  variant,
}) => {
  const [colorMode] = useColorMode();
  const baseStyle = {
    alignItems: 'center',
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: '1q',
    borderRadius: 'sm',
    cursor: 'cursor',
    display: 'inline-flex',
    outline: 'none',
    pl: '2x',
    pr: '2x',
  };
  const sizeStyle = {
    sm: {
      fontSize: 'xs',
      lineHeight: 1,
      minHeight: '4x',
    },
    md: {
      fontSize: 'xs',
      lineHeight: 'xs',
      minHeight: '6x',
      py: '1h',
    },
    lg: {
      fontSize: 'md',
      lineHeight: 'md',
      minHeight: '8x',
      py: '1x',
    },
  }[size];
  const variantStyle = {
    'solid': getSolidEditableTagStyle({
      colorMode,
    }),
    'outline': getOutlineEditableTagStyle({
      colorMode,
    }),
  }[variant];

  return {
    ...baseStyle,
    ...sizeStyle,
    ...variantStyle,
  };
};

export {
  useEditableTagStyle,
};
