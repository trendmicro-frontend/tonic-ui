import { ariaAttr } from '@tonic-ui/utils';
import { ensureArray, ensureString } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useColorMode } from '../color-mode';
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
  const [colorMode] = useColorMode();
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
  const iconWidth = `calc(${theme?.sizes?.[width]} / 2)`;
  const iconHeight = `calc(${theme?.sizes?.[height]} / 2)`;
  const inputType = 'radio';
  const getRadioControlBoxSelector = (pseudos) => {
    return `input[type="${inputType}"]` + ensureString(pseudos) + ' + &';
  };
  const getDeterminateStyle = ({ variantColor }) => {
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
    const checkedBorderColor = {
      dark: `${variantColor}:60`,
      light: `${variantColor}:60`,
    }[colorMode];
    const checkedAndHoverBorderColor = hoverBorderColor;
    const checkedAndDisabledBorderColor = disabledBorderColor;

    // focus color
    const focusVisibleOutlineColor = {
      dark: `${variantColor}:60`,
      light: `${variantColor}:60`,
    }[colorMode];

    return {
      borderColor: borderColor,
      [getRadioControlBoxSelector(':hover')]: {
        borderColor: hoverBorderColor,
      },
      [getRadioControlBoxSelector(':focus-visible')]: {
        outlineColor: focusVisibleOutlineColor,
        outlineStyle: 'solid',
        outlineWidth: '1h',
      },
      [getRadioControlBoxSelector(':disabled')]: {
        borderColor: disabledBorderColor,
        opacity: 0.28,
      },
      [getRadioControlBoxSelector(':checked')]: {
        borderColor: checkedBorderColor,
        color: color,
      },
      [getRadioControlBoxSelector(':checked:hover:not(:disabled)')]: {
        borderColor: checkedAndHoverBorderColor,
        color: hoverColor,
      },
      [getRadioControlBoxSelector(':checked:disabled')]: {
        borderColor: checkedAndDisabledBorderColor,
        color: disabledColor,
        opacity: 0.28,
      },
    };
  };
  const sx = {
    border: 1,
    borderRadius: 'circle',
    width,
    height,

    [getRadioControlBoxSelector() + '> *']: {
      opacity: 0,
    },
    [getRadioControlBoxSelector(':checked') + '> *']: {
      opacity: 1,
    },
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
        borderRadius="circle"
        display="inline-flex"
        width={iconWidth}
        height={iconHeight}
      />
    </Box>
  );
});

RadioControlBox.displayName = 'RadioControlBox';

export default RadioControlBox;
