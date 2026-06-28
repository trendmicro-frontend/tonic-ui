import { ariaAttr, createTransitionStyle } from '@tonic-ui/utils';
import { ensureArray, ensureString } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useColorMode } from '../color-mode';
import { checkSizeBySwitchSize, defaultSize, defaultVariantColor } from './constants';
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
  const checkSize = checkSizeBySwitchSize[size];
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
  const switchOuterBorderColor = '_component.keyboardFocused.outerFocusRing';

  // switch-inner-border
  const switchInnerBorderColor = '_component.keyboardFocused.innerFocusRing';

  // switch-track
  const switchTrackColor = '_foreground.primaryVariant.enabled';
  const switchTrackHoverColor = '_foreground.primaryVariant.hovered';
  const switchTrackCheckedColor = variantColor === defaultVariantColor ? '_foreground.primaryVariant.selected' : `${variantColor}:60`;
  // Default variant uses a semantic token that already flips light/dark.
  // Custom variantColors (raw colour scales) need an explicit mode lookup —
  // light mode darkens (`:70`), dark mode lightens (`:50`), mirroring default.
  const switchTrackCheckedHoverColor = variantColor === defaultVariantColor
    ? '_foreground.primaryVariant.selectedHovered'
    : {
        light: `${variantColor}:70`,
        dark: `${variantColor}:50`,
      }[colorMode];
  const switchTrackDisabledColor = '_foreground.primaryVariant.disabled';

  // switch-thumb
  const switchThumbColor = 'text._fixed.dark.accent';
  const switchThumbDisabledColor = 'text.disabled';

  const switchTrackReadOnlyBorderColor = 'border._primary.disabled';
  const switchThumbReadOnlyColor = 'text.disabled';
  const switchCheckMutedColor = 'text._inverse.disabled';

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
    return getSwitchControlBoxSelector(pseudos) + '> [data-switch] > [data-switch-thumb-group] > [data-switch-thumb]';
  };
  const getSwitchThumbGroupSelector = (pseudos) => {
    return getSwitchControlBoxSelector(pseudos) + '> [data-switch] > [data-switch-thumb-group]';
  };
  const getSwitchCheckSelector = (pseudos) => {
    return getSwitchControlBoxSelector(pseudos) + '> [data-switch] > [data-switch-thumb-group] > [data-switch-check]';
  };
  const toColor = token => theme.get(`colors.${token}`) ?? token;
  const sx = {
    width: viewBoxWidth,
    height: viewBoxHeight,

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
    [getSwitchTrackSelector(':hover:not(:disabled):not([aria-readonly="true"])')]: {
      fill: toColor(switchTrackHoverColor),
    },
    [getSwitchTrackSelector(':checked:hover:not(:disabled):not([aria-readonly="true"])')]: {
      fill: toColor(switchTrackCheckedHoverColor),
    },
    [getSwitchTrackSelector(':disabled')]: {
      fill: toColor(switchTrackDisabledColor),
    },

    [getSwitchThumbGroupSelector()]: {
      transform: 'translateX(0)',
      transformBox: 'fill-box',
      transition: createTransitionStyle('transform', { duration: 200 }),
    },
    [getSwitchThumbGroupSelector(':checked')]: {
      transform: `translateX(${height}px)`,
    },

    // switch-thumb
    [getSwitchThumbSelector()]: {
      fill: toColor(switchThumbColor),
    },
    [getSwitchThumbSelector(':disabled')]: {
      fill: toColor(switchThumbDisabledColor),
    },

    [getSwitchCheckSelector()]: {
      opacity: 0,
      color: toColor(switchTrackCheckedColor),
      transition: createTransitionStyle('opacity', { duration: 200 }),
    },
    [getSwitchCheckSelector(':checked')]: {
      opacity: 1,
    },
    [getSwitchCheckSelector(':checked:disabled')]: {
      color: toColor(switchCheckMutedColor),
    },

    // Read-only is driven by `aria-readonly="true"` on the input (set by Switch
    // when the `readOnly` prop is true).
    [getSwitchTrackSelector('[aria-readonly="true"]:not(:disabled)')]: {
      fill: 'transparent',
      stroke: toColor(switchTrackReadOnlyBorderColor),
      strokeWidth: 1,
    },
    [getSwitchThumbSelector('[aria-readonly="true"]:not(:disabled)')]: {
      fill: toColor(switchThumbReadOnlyColor),
    },
    [getSwitchCheckSelector('[aria-readonly="true"]:checked:not(:disabled)')]: {
      color: toColor(switchCheckMutedColor),
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
          as="g"
          data-switch-thumb-group
        >
          <Box
            as="circle"
            data-switch-thumb
            cx={viewBoxHeight / 2}
            cy={viewBoxHeight / 2}
            r={radius}
          />
          <svg
            data-switch-check
            x={viewBoxHeight / 2 - checkSize / 2}
            y={viewBoxHeight / 2 - checkSize / 2}
            width={checkSize}
            height={checkSize}
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M6 11.060l-3-3-1 1 4 4 9-9-1-1z" />
          </svg>
        </Box>
      </Box>
    </Box>
  );
});

SwitchControlBox.displayName = 'SwitchControlBox';

export default SwitchControlBox;
