import { ariaAttr } from '@tonic-ui/utils';
import { ensureArray, ensureString } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useColorMode } from '../color-mode';
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
  const [colorMode] = useColorMode();
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
    const color = {
      dark: 'white:emphasis',
      light: 'white:emphasis',
    }[colorMode];
    const hoverColor = color;
    const disabledColor = color;
    const checkedColor = color;
    const checkedAndHoverColor = color;
    const checkedAndFocusVisibleColor = color;
    const checkedAndDisabledColor = {
      dark: 'white:emphasis',
      light: 'black:primary',
    }[colorMode];

    // background color
    const backgroundColor = 'transparent';
    const hoverBackgroundColor = backgroundColor;
    const disabledBackgroundColor = backgroundColor;
    const checkedBackgroundColor = {
      dark: `${variantColor}:60`,
      light: `${variantColor}:60`,
    }[colorMode];
    const checkedAndHoverBackgroundColor = {
      dark: `${variantColor}:50`,
      light: `${variantColor}:50`,
    }[colorMode];
    const checkedAndFocusVisibleBackgroundColor = checkedBackgroundColor;
    const checkedAndDisabledBackgroundColor = {
      dark: 'gray:60',
      light: 'gray:40',
    }[colorMode];

    // border color
    const borderColor = {
      dark: 'gray:50',
      light: 'gray:40',
    }[colorMode];
    const hoverBorderColor = {
      dark: `${variantColor}:50`,
      light: `${variantColor}:50`,
    }[colorMode];
    const disabledBorderColor = {
      dark: 'gray:60',
      light: 'gray:40',
    }[colorMode];
    const checkedBorderColor = {
      dark: `${variantColor}:60`,
      light: `${variantColor}:60`,
    }[colorMode];
    const checkedAndHoverBorderColor = hoverBorderColor;
    const checkedAndFocusVisibleBorderColor = 'transparent';
    const checkedAndDisabledBorderColor = disabledBorderColor;

    // outline color
    const focusVisibleOutlineColor = {
      dark: `${variantColor}:60`,
      light: `${variantColor}:60`,
    }[colorMode];

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
        opacity: 0.28,
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
        backgroundColor: 'inherit',
        borderColor: checkedAndFocusVisibleBorderColor,
        color: checkedAndFocusVisibleColor, // icon color
      },
      [getCheckboxControlBoxSelector(':checked:focus-visible') + '> div:first-of-type']: {
        backgroundColor: checkedAndFocusVisibleBackgroundColor,
      },
      [getCheckboxControlBoxSelector(':checked:disabled')]: {
        backgroundColor: checkedAndDisabledBackgroundColor,
        borderColor: checkedAndDisabledBorderColor,
        color: checkedAndDisabledColor, // icon color
        opacity: 0.28,
      },
    };
  };
  const getIndeterminateStyle = ({ variantColor }) => {
    // icon color
    const color = {
      dark: `${variantColor}:60`,
      light: `${variantColor}:60`,
    }[colorMode];
    const hoverColor = {
      dark: `${variantColor}:50`,
      light: `${variantColor}:50`,
    }[colorMode];
    const disabledColor = {
      dark: 'gray:60',
      light: 'gray:40',
    }[colorMode];

    // border color
    const borderColor = {
      dark: 'gray:50',
      light: 'gray:40',
    }[colorMode];
    const hoverBorderColor = {
      dark: `${variantColor}:50`,
      light: `${variantColor}:50`,
    }[colorMode];
    const disabledBorderColor = {
      dark: 'gray:60',
      light: 'gray:40',
    }[colorMode];

    // outline color
    const focusVisibleOutlineColor = {
      dark: `${variantColor}:60`,
      light: `${variantColor}:60`,
    }[colorMode];

    return {
      [getCheckboxControlBoxSelector('[data-indeterminate]')]: {
        borderColor: borderColor,
        color: color, // icon color
      },
      [getCheckboxControlBoxSelector('[data-indeterminate]:hover:not(:disabled)')]: {
        borderColor: hoverBorderColor,
        color: hoverColor,
      },
      [getCheckboxControlBoxSelector('[data-indeterminate]:focus-visible')]: {
        outlineColor: focusVisibleOutlineColor,
        outlineStyle: 'solid',
        outlineWidth: '1h',
      },
      [getCheckboxControlBoxSelector('[data-indeterminate]:disabled')]: {
        borderColor: disabledBorderColor,
        color: disabledColor, // icon color
        opacity: 0.28,
      },
    };
  };
  const sx = {
    position: 'relative',
    border: 1,
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
