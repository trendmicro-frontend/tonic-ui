import React, { forwardRef } from 'react';
import { Box, ControlBox } from '../box';
import { useTheme } from '../theme';
import { defaultSize, defaultVariantColor } from './constants';
import IconChecked from './IconChecked';
import IconIndeterminate from './IconIndeterminate';
import {
  useCheckboxControlBoxStyle,
} from './styles';

const CheckboxControlBox = forwardRef((
  {
    indeterminate,
    size = defaultSize,
    variantColor = defaultVariantColor,
    ...rest
  },
  ref,
) => {
  const { sizes } = useTheme();
  const iconSize = {
    lg: sizes['6x'],
    md: sizes['4x'],
    sm: sizes['3x'],
  }[size];
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
  const styleProps = useCheckboxControlBoxStyle({
    color: variantColor,
    indeterminate,
    width,
    height,
  });
  const icon = indeterminate
    ? <IconIndeterminate size={iconSize} />
    : <IconChecked size={iconSize} />;

  return (
    <ControlBox
      type="checkbox"
      {...styleProps}
      {...rest}
    >
      <Box
        zIndex="-1"
        position="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
      />
      {icon}
    </ControlBox>
  );
});

CheckboxControlBox.displayName = 'CheckboxControlBox';

export default CheckboxControlBox;
