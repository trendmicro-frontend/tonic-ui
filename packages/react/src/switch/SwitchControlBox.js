import { createTransitionStyle } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box, ControlBox } from '../box';
import { useColorMode } from '../color-mode';
import { defaultSize, defaultVariantColor } from './constants';
import { useSwitchControlBoxStyle } from './styles';

const SwitchControlBox = forwardRef((
  {
    size = defaultSize,
    variantColor = defaultVariantColor,
    ...rest
  },
  ref,
) => {
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
  const trackHaloWidth = 2;
  const trackBorderWidth = 1;
  const trackHaloX = 0;
  const trackHaloY = 0;
  const trackBorderX = trackHaloX + trackHaloWidth;
  const trackBorderY = trackHaloY + trackHaloWidth;
  const trackX = trackBorderX + trackBorderWidth;
  const trackY = trackBorderY + trackBorderWidth;
  const viewBoxWidth = width + (trackHaloWidth + trackBorderWidth) * 2;
  const viewBoxHeight = height + (trackHaloWidth + trackBorderWidth) * 2;
  const trackFillColor = {
    dark: 'gray:60',
    light: 'gray:30',
  }[colorMode];
  const styleProps = useSwitchControlBoxStyle({
    color: variantColor,
    width,
    height,
  });

  return (
    <ControlBox
      type="checkbox"
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
          data-switch-track-halo
          x={trackHaloX}
          y={trackHaloY}
          width={viewBoxWidth}
          height={viewBoxHeight}
          rx={`${viewBoxHeight / 2}`}
          fill="none"
          strokeWidth={0}
        />
        <Box
          as="rect"
          data-switch-track-border
          x={trackBorderX}
          y={trackBorderY}
          width={viewBoxWidth - 2 * trackHaloWidth}
          height={viewBoxHeight - 2 * trackHaloWidth}
          rx={(viewBoxHeight - 2 * trackHaloWidth) / 2}
          fill="none"
          strokeWidth={0}
        />
        <Box
          as="rect"
          data-switch-track
          x={trackX}
          y={trackY}
          width={width}
          height={height}
          rx={height / 2}
          fill={trackFillColor}
          pointerEvents="all"
        />
        <Box
          as="circle"
          data-switch-thumb
          cx={viewBoxHeight / 2}
          cy={viewBoxHeight / 2}
          r={radius}
          fill="white:emphasis"
          transform="translateX(0)"
          transformBox="fill-box"
          transition={createTransitionStyle(['transform'], { duration: 250 })}
        />
      </Box>
    </ControlBox>
  );
});

SwitchControlBox.displayName = 'SwitchControlBox';

export default SwitchControlBox;
