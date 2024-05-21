import { ButtonBase, useColorMode, useTheme } from '@tonic-ui/react';
import { CloseIcon } from '@tonic-ui/react-icons';
import {
  createTransitionStyle,
} from '@tonic-ui/utils';
import React, { forwardRef } from 'react';

const useIconButtonStyle = ({ size = '8x' }) => {
  const { colors } = useTheme();
  const [colorMode] = useColorMode();
  const color = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const activeColor = color;
  const hoverColor = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];
  const focusColor = color;
  const focusHoverColor = hoverColor;
  const focusActiveColor = activeColor;
  const focusBorderColor = 'blue:60'
  const focusBoxShadowBorderColor = 'blue:60';

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 1,
    borderColor: 'transparent',
    color,
    width: size,
    height: size,
    transition: createTransitionStyle(['border-color', 'box-shadow', 'color'], { duration: 200 }),
    _hover: {
      color: hoverColor,
    },
    _active: {
      color: activeColor,
    },
    _focus: {
      borderColor: focusBorderColor,
      boxShadow: focusBoxShadowBorderColor ? `inset 0 0 0 1px ${colors[focusBoxShadowBorderColor]}` : undefined,
      color: focusColor,
    },
    _focusHover: {
      color: focusHoverColor,
    },
    _focusActive: {
      borderColor: focusBorderColor,
      boxShadow: focusBoxShadowBorderColor ? `inset 0 0 0 1px ${colors[focusBoxShadowBorderColor]}` : undefined,
      color: focusActiveColor,
    },
  };
};

const IconButton = forwardRef((
  {
    size = '8x',
    ...rest
  },
  ref,
) => {
  const styleProps = useIconButtonStyle({ size });

  return (
    <ButtonBase
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});
IconButton.displayName = 'IconButton';

const App = () => {
  return (
    <IconButton>
      <CloseIcon />
    </IconButton>
  );
};

export default App;
