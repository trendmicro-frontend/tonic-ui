import { ariaAttr } from '@tonic-ui/utils';
import { ensureArray, ensureString } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTheme } from '../theme';
import { defaultSize, defaultVariantColor } from './constants';
import {
  useRadioControlBoxStyle,
} from './styles';

const RadioControlBox = forwardRef((inProps, ref) => {
  const {
    size = defaultSize,
    variantColor = defaultVariantColor,
    sx: sxProp,
    ...rest
  } = inProps;
  const theme = useTheme();
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
  const iconWidth = `calc(${theme?.sizes?.[width]} * .375)`;
  const iconHeight = `calc(${theme?.sizes?.[height]} * .375)`;
  const inputType = 'radio';
  const getRadioControlBoxSelector = (pseudos) => {
    return `input[type="${inputType}"]` + ensureString(pseudos) + ' + &';
  };
  const getDeterminateStyle = ({ variantColor }) => {
    // icon color
    const color = 'transparent';
    const checkedColor = 'text._fixed.dark.primary';
    const checkedAndDisabledColor = 'text.disabled';

    // background color
    const backgroundColor = 'transparent';
    const hoverBackgroundColor = '_foreground.subtle.hovered';
    const disabledBackgroundColor = '_foreground.subtle.disabled';
    const checkedBackgroundColor = variantColor === defaultVariantColor ? '_foreground.primaryVariant.selected' : `${variantColor}.600`;
    const checkedAndCoveredBackgroundColor = variantColor === defaultVariantColor ? '_foreground.primaryVariant.selectedHovered' : `${variantColor}.500`;
    const checkedAndDisabledBackgroundColor = '_foreground.primaryVariant.selectedDisabled';

    // border color
    const borderColor = 'border._primary.enabled';
    const hoverBorderColor = variantColor === defaultVariantColor ? 'border._primary.hovered' : `${variantColor}.500`;
    const disabledBorderColor = 'border._primary.disabled';
    const checkedBorderColor = checkedBackgroundColor;
    const checkedAndHoverBorderColor = checkedAndCoveredBackgroundColor;
    const checkedAndDisabledBorderColor = 'transparent';

    // focus color
    const focusVisibleOutlineColor = '_component.keyboardFocused.outerFocusRing';

    return {
      borderColor: borderColor,
      color,
      backgroundColor,

      [getRadioControlBoxSelector(':hover')]: {
        borderColor: hoverBorderColor,
        backgroundColor: hoverBackgroundColor,
      },
      [getRadioControlBoxSelector(':focus-visible')]: {
        outlineColor: focusVisibleOutlineColor,
        outlineStyle: 'solid',
        outlineWidth: '1h',
      },
      [getRadioControlBoxSelector(':disabled')]: {
        borderColor: disabledBorderColor,
        backgroundColor: disabledBackgroundColor,
      },
      [getRadioControlBoxSelector(':checked')]: {
        borderColor: checkedBorderColor,
        backgroundColor: checkedBackgroundColor,
        color: checkedColor,
      },
      [getRadioControlBoxSelector(':checked:hover:not(:disabled)')]: {
        borderColor: checkedAndHoverBorderColor,
        backgroundColor: checkedAndCoveredBackgroundColor,
        color: checkedColor,
      },
      [getRadioControlBoxSelector(':checked:disabled')]: {
        borderColor: checkedAndDisabledBorderColor,
        backgroundColor: checkedAndDisabledBackgroundColor,
        color: checkedAndDisabledColor,
      },
    };
  };
  const sx = {
    border: 1,
    borderRadius: '50%',
    width,
    height,
    ...getDeterminateStyle({ variantColor }),
  };
  const styleProps = useRadioControlBoxStyle();

  return (
    <Box
      aria-hidden={ariaAttr(true)} // aria-hidden="true" must be applied to all the images simulating a radio button
      role="radio"
      sx={[sx, ...ensureArray(sxProp)]}
      {...styleProps}
      {...rest}
    >
      <Box
        backgroundColor="currentColor"
        borderRadius="50%"
        display="inline-flex"
        width={iconWidth}
        height={iconHeight}
      />
    </Box>
  );
});

RadioControlBox.displayName = 'RadioControlBox';

export default RadioControlBox;
