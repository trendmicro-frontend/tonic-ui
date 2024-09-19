import { ariaAttr, createTransitionStyle } from '@tonic-ui/utils';
import { ensureArray, ensureString } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useColorMode } from '../color-mode';
import { defaultSize, defaultVariantColor } from './constants';
import { useSwitchControlBoxStyle } from './styles';
import { useTheme } from '../theme';

const SwitchControlBox = forwardRef((inProps, ref) => {
  const {
    size = defaultSize,
    variantColor = defaultVariantColor,
    sx: sxProp,
    ...rest
  } = inProps;
  const theme = useTheme();
  const [colorMode] = useColorMode();
  const width = {
    sm: 32,
    md: 48,
    lg: 64,
  }[size];
  const height = {
    sm: 16,
    md: 24,
    lg: 32,
  }[size];
  const radius = {
    sm: 6,
    md: 9,
    lg: 12,
  }[size];
  const switchOuterBorderWidth = 2;
  const switchInnerBorderWidth = 1;
  const switchOuterBorderX = 0;
  const switchOuterBorderY = 0;
  const switchInnerBorderX = switchOuterBorderX + switchOuterBorderWidth;
  const switchInnerBorderY = switchOuterBorderY + switchOuterBorderWidth;
  const switchTrackX = switchInnerBorderX + switchInnerBorderWidth;
  const switchTrackY = switchInnerBorderY + switchInnerBorderWidth;
  const viewBoxWidth = width + (switchOuterBorderWidth + switchInnerBorderWidth) * 2;
  const viewBoxHeight = height + (switchOuterBorderWidth + switchInnerBorderWidth) * 2;

  // switch-outer-border
  const switchOuterBorderColor = {
    dark: `${variantColor}:60`,
    light: `${variantColor}:60`,
  }[colorMode];

  // switch-inner-border
  const switchInnerBorderColor = {
    dark: 'black',
    light: 'white',
  }[colorMode];

  // switch-track
  const switchTrackColor = {
    dark: 'gray:60',
    light: 'gray:30',
  }[colorMode];
  const switchTrackHoverColor = {
    dark: 'gray:50',
    light: 'gray:20',
  }[colorMode];
  const switchTrackCheckedColor = {
    dark: `${variantColor}:60`,
    light: `${variantColor}:60`,
  }[colorMode];
  const switchTrackCheckedHoverColor = {
    dark: `${variantColor}:50`,
    light: `${variantColor}:50`,
  }[colorMode];

  // switch-thumb
  const switchThumbColor = {
    dark: 'white',
    light: 'white',
  }[colorMode];

  const inputType = 'checkbox';
  const getSwitchControlBoxSelector = (pseudos) => {
    return `input[type="${inputType}"]` + ensureString(pseudos) + ' + &';
  };
  const getSwitchOuterBorderSelector = (pseudos) => {
    return getSwitchControlBoxSelector(pseudos) + '> [data-switch] > [data-switch-outer-border]';
  };
  const getSwitchInnerBorderSelector = (pseudos) => {
    return getSwitchControlBoxSelector(pseudos) + '> [data-switch] > [data-switch-inner-border]';
  };
  const getSwitchTrackSelector = (pseudos) => {
    return getSwitchControlBoxSelector(pseudos) + '> [data-switch] > [data-switch-track]';
  };
  const getSwitchThumbSelector = (pseudos) => {
    return getSwitchControlBoxSelector(pseudos) + '> [data-switch] > [data-switch-thumb]';
  };
  const toColor = color => theme?.colors?.[color] ?? color;
  const sx = {
    width: viewBoxWidth,
    height: viewBoxHeight,

    [getSwitchControlBoxSelector(':disabled')]: {
      opacity: 0.28,
    },

    // switch-outer-border
    [getSwitchOuterBorderSelector()]: {
      fill: 'none',
    },
    [getSwitchOuterBorderSelector(':focus-visible')]: {
      fill: toColor(switchOuterBorderColor),
    },

    // switch-inner-border
    [getSwitchInnerBorderSelector()]: {
      fill: 'none',
    },
    [getSwitchInnerBorderSelector(':focus-visible')]: {
      fill: toColor(switchInnerBorderColor),
    },

    // switch-track
    [getSwitchTrackSelector()]: {
      fill: toColor(switchTrackColor),
    },
    [getSwitchTrackSelector(':checked')]: {
      fill: toColor(switchTrackCheckedColor),
    },
    [getSwitchTrackSelector(':hover:not(:disabled)')]: {
      fill: toColor(switchTrackHoverColor),
    },
    [getSwitchTrackSelector(':checked:hover:not(:disabled)')]: {
      fill: toColor(switchTrackCheckedHoverColor),
    },

    // switch-thumb
    [getSwitchThumbSelector()]: {
      fill: toColor(switchThumbColor),
    },
    [getSwitchThumbSelector(':checked')]: {
      transform: `translateX(${height}px)`,
    },
  };
  const styleProps = useSwitchControlBoxStyle();

  return (
    <Box
      aria-hidden={ariaAttr(true)} // aria-hidden="true" must be applied to all the images simulating a switch
      role="switch"
      sx={[sx, ...ensureArray(sxProp)]}
      {...styleProps}
      {...rest}
    >
      <Box
        as="svg"
        data-switch
        width="100%"
        height="100%"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      >
        <Box
          as="rect"
          data-switch-outer-border
          x={switchOuterBorderX}
          y={switchOuterBorderY}
          width={viewBoxWidth}
          height={viewBoxHeight}
          rx={`${viewBoxHeight / 2}`}
          strokeWidth={0}
        />
        <Box
          as="rect"
          data-switch-inner-border
          x={switchInnerBorderX}
          y={switchInnerBorderY}
          width={viewBoxWidth - 2 * switchOuterBorderWidth}
          height={viewBoxHeight - 2 * switchOuterBorderWidth}
          rx={(viewBoxHeight - 2 * switchOuterBorderWidth) / 2}
          strokeWidth={0}
        />
        <Box
          as="rect"
          data-switch-track
          x={switchTrackX}
          y={switchTrackY}
          width={width}
          height={height}
          rx={height / 2}
          pointerEvents="all"
        />
        <Box
          as="circle"
          data-switch-thumb
          cx={viewBoxHeight / 2}
          cy={viewBoxHeight / 2}
          r={radius}
          transform="translateX(0)"
          transformBox="fill-box"
          transition={createTransitionStyle(['transform'], { duration: 250 })}
        />
      </Box>
    </Box>
  );
});

SwitchControlBox.displayName = 'SwitchControlBox';

export default SwitchControlBox;
