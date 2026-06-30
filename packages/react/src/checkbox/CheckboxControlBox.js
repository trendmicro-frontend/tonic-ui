import { ariaAttr } from '@tonic-ui/utils';
import { ensureArray, ensureString } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTheme } from '../theme';
import { defaultSize, defaultVariantColor } from './constants';
import IconChecked from './IconChecked';
import IconIndeterminate from './IconIndeterminate';
import {
  useCheckboxControlBoxStyle,
} from './styles';

const CheckboxControlBox = forwardRef((inProps, ref) => {
  const {
    indeterminate,
    size = defaultSize,
    variantColor = defaultVariantColor,
    sx: sxProp,
    ...rest
  } = inProps;
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
  const inputType = 'checkbox';
  const getCheckboxControlBoxSelector = (pseudos) => {
    return `input[type="${inputType}"]` + ensureString(pseudos) + ' + &';
  };
  const getDeterminateStyle = ({ variantColor }) => {
    const color = 'text._fixed.dark.accent';
    const hoverColor = color;
    const disabledColor = color;
    const checkedColor = color;
    const checkedAndHoverColor = color;
    const checkedAndFocusVisibleColor = color;
    const checkedAndDisabledColor = 'text.disabled';

    // background color
    const backgroundColor = 'transparent';
    const hoverBackgroundColor = '_foreground.subtle.hovered';
    const disabledBackgroundColor = backgroundColor;
    const checkedBackgroundColor = variantColor === 'blue' ? '_foreground.primaryVariant.selected' : `${variantColor}.600`;
    const checkedAndHoverBackgroundColor = variantColor === 'blue' ? '_foreground.primaryVariant.selectedHovered' : `${variantColor}.500`;
    const checkedAndFocusVisibleBackgroundColor = checkedBackgroundColor;
    const checkedAndDisabledBackgroundColor = '_foreground.primaryVariant.selectedDisabled';

    // border color
    const borderColor = 'border._primary.enabled';
    const hoverBorderColor = variantColor === 'blue' ? 'border._primary.hovered' : `${variantColor}.500`;
    const disabledBorderColor = 'border._primary.disabled';
    const checkedBorderColor = checkedBackgroundColor;
    const checkedAndHoverBorderColor = checkedAndHoverBackgroundColor;
    const checkedAndDisabledBorderColor = checkedAndDisabledBackgroundColor;

    // :focus-visible
    const focusVisibleOutlineColor = '_component.keyboardFocused.outerFocusRing';
    const checkedFocusVisibleBorderColor = '_component.keyboardFocused.innerFocusRing';

    return {
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      color: color, // icon color
      [getCheckboxControlBoxSelector(':hover')]: {
        backgroundColor: hoverBackgroundColor,
        borderColor: hoverBorderColor,
        color: hoverColor, // icon color
      },
      [getCheckboxControlBoxSelector(':disabled')]: {
        backgroundColor: disabledBackgroundColor,
        borderColor: disabledBorderColor,
        color: disabledColor, // icon color
      },
      [getCheckboxControlBoxSelector(':focus-visible')]: {
        outlineColor: focusVisibleOutlineColor,
        outlineStyle: 'solid',
        outlineWidth: '1h',
      },
      [getCheckboxControlBoxSelector(':checked')]: {
        backgroundColor: checkedBackgroundColor,
        borderColor: checkedBorderColor,
        color: checkedColor, // icon color
      },
      [getCheckboxControlBoxSelector(':checked:hover:not(:disabled)')]: {
        backgroundColor: checkedAndHoverBackgroundColor,
        borderColor: checkedAndHoverBorderColor,
        color: checkedAndHoverColor, // icon color
      },
      [getCheckboxControlBoxSelector(':checked:focus-visible')]: {
        borderColor: checkedFocusVisibleBorderColor,
        color: checkedAndFocusVisibleColor, // icon color
        outlineColor: focusVisibleOutlineColor,
        outlineOffset: 0,
        outlineStyle: 'solid',
        outlineWidth: '1h',
      },
      [getCheckboxControlBoxSelector(':checked:focus-visible:hover')]: {
        borderColor: checkedFocusVisibleBorderColor,
      },
      [getCheckboxControlBoxSelector(':checked:focus-visible') + '> div:first-of-type']: {
        backgroundColor: checkedAndFocusVisibleBackgroundColor,
      },
      [getCheckboxControlBoxSelector(':checked:disabled')]: {
        backgroundColor: checkedAndDisabledBackgroundColor,
        borderColor: checkedAndDisabledBorderColor,
        color: checkedAndDisabledColor, // icon color
        borderWidth: 0,
      },
    };
  };
  const getIndeterminateStyle = ({ variantColor }) => {
    // icon color
    const color = variantColor === 'blue' ? '_foreground.primaryVariant.selected' : `${variantColor}.600`;

    const hoverColor = variantColor === 'blue' ? '_foreground.primaryVariant.selectedHovered' : `${variantColor}.500`;

    const disabledColor = 'text.disabled';

    // border color
    const borderColor = 'border._primary.enabled';
    const hoverBorderColor = variantColor === 'blue' ? 'border._primary.selectedHovered' : `${variantColor}.500`;
    const disabledBorderColor = 'border._primary.disabled';

    // :focus-visible
    const focusVisibleColor = variantColor === 'blue' ? '_foreground.primaryVariant.selected' : `${variantColor}.600`;

    const focusVisibleBorderColor = 'border._primary.enabled';

    const focusVisibleOutlineColor = variantColor === 'blue' ? '_component.keyboardFocused.outerFocusRing' : `${variantColor}.600`;

    return {
      [getCheckboxControlBoxSelector('[data-indeterminate]')]: {
        borderColor,
        color, // icon color
      },
      [getCheckboxControlBoxSelector('[data-indeterminate]:hover:not(:disabled)')]: {
        borderColor: hoverBorderColor,
        color: hoverColor, // icon color
      },
      [getCheckboxControlBoxSelector('[data-indeterminate]:focus-visible')]: {
        borderColor: focusVisibleBorderColor,
        color: focusVisibleColor, // icon color
        outlineColor: focusVisibleOutlineColor,
        outlineOffset: 0,
        outlineStyle: 'solid',
        outlineWidth: '1h',
      },
      [getCheckboxControlBoxSelector('[data-indeterminate]:disabled')]: {
        borderColor: disabledBorderColor,
        color: disabledColor, // icon color
      },
    };
  };
  const sx = {
    position: 'relative',
    border: 1.5,
    borderRadius: 'sm',
    width,
    height,
    zIndex: 0,
    [getCheckboxControlBoxSelector() + '> *']: {
      opacity: 0,
    },
    [getCheckboxControlBoxSelector(':checked') + '> *']: {
      opacity: 1,
    },
    [getCheckboxControlBoxSelector('[data-indeterminate]') + '> *']: {
      opacity: 1,
    },
    ...(!!indeterminate ? getIndeterminateStyle({ variantColor }) : getDeterminateStyle({ variantColor })),
  };
  const styleProps = useCheckboxControlBoxStyle();

  return (
    <Box
      aria-hidden={ariaAttr(true)} // aria-hidden="true" must be applied to all the images simulating a checkbox
      role="checkbox"
      sx={[sx, ...ensureArray(sxProp)]}
      {...styleProps}
      {...rest}
    >
      {!!indeterminate ? <IconIndeterminate size={iconSize} /> : <IconChecked size={iconSize} />}
    </Box>
  );
});

CheckboxControlBox.displayName = 'CheckboxControlBox';

export default CheckboxControlBox;
