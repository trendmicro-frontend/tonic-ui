import React, { forwardRef } from 'react';
import { Box, ControlBox } from '../box';
import { useTheme } from '../theme';
import { defaultSize, defaultVariantColor } from './constants';
import {
  useRadioControlBoxStyle,
} from './styles';

const RadioControlBox = forwardRef((
  {
    size = defaultSize,
    variantColor = defaultVariantColor,
    ...rest
  },
  ref,
) => {
  const { sizes } = useTheme();
  const width = {
    lg: '6x',
    md: '4x',
    sm: '3x',
  }[size];
  const height = {
    lg: '6x',
    md: '4x',
    sm: '3x',
  }[size];
  const iconWidth = `calc(${sizes[width]} / 2)`;
  const iconHeight = `calc(${sizes[height]} / 2)`;
  const styleProps = useRadioControlBoxStyle({
    color: variantColor,
    width,
    height,
  });

  return (
    <ControlBox
      type="radio"
      {...styleProps}
    >
      <Box
        backgroundColor="currentColor"
        borderRadius="circle"
        display="inline-flex"
        width={iconWidth}
        height={iconHeight}
      />
    </ControlBox>
  );
});

RadioControlBox.displayName = 'RadioControlBox';

export default RadioControlBox;
