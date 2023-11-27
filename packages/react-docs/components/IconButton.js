import {
  ButtonBase,
  useColorMode,
} from '@tonic-ui/react';
import React, { forwardRef } from 'react';

const IconButton = forwardRef((props, ref) => {
  const [colorMode] = useColorMode();
  const color = {
    dark: 'white:secondary',
    light: 'black:secondary',
  }[colorMode];
  const hoverColor = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];
  const focusVisibleOutlineColor = {
    dark: 'blue:60',
    light: 'blue:60',
  }[colorMode];
  const disabledColor = {
    dark: 'white:emphasis',
    light: 'black:emphasis',
  }[colorMode];
  const disabledOpacity = {
    dark: 0.28,
    light: 0.3,
  }[colorMode];

  return (
    <ButtonBase
      ref={ref}
      border={1}
      borderColor="transparent"
      color={color}
      height="8x"
      width="8x"
      _hover={{
        color: hoverColor,
      }}
      _focusVisible={{
        outlineColor: focusVisibleOutlineColor,
        outlineOffset: '-1h',
        outlineStyle: 'solid',
        outlineWidth: '1h',
      }}
      _disabled={{
        color: disabledColor,
        opacity: disabledOpacity,
      }}
      {...props}
    />
  );
});

IconButton.displayName = 'IconButton';

export default IconButton;
