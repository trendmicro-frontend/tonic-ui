import { Box } from '@tonic-ui/react';
import { ensureNumber } from 'ensure-type';
import React, { forwardRef } from 'react';

const defaultRadius = 150;
const defaultThicknessRatio = 0.4;

const Rainbow = forwardRef((
  {
    radius: radiusProp = defaultRadius,
    thicknessRatio = defaultThicknessRatio,
    ...rest
  },
  ref,
) => {
  const radius = ensureNumber(radiusProp) ?? defaultRadius;
  const diameter = radius * 2;
  const thickness = radius * thicknessRatio;
  const colors = [
    '#FF0000', // red
    '#FF7F00', // orange
    '#FFFF00', // yellow
    '#00FF00', // green
    '#0000FF', // blue
    '#4B0082', // indigo
    '#9400D3', // violet
  ];
  const colorBandWidth = thickness / colors.length;
  const colorStops = colors.reverse().map((color, index) => {
    const smoothOffset = (colorBandWidth / colors.length);
    const start = radius - thickness + (index * colorBandWidth);
    const end = start + colorBandWidth;
    return [color, start + smoothOffset, end - smoothOffset];
  });

  return (
    <Box
      ref={ref}
      display="inline-block"
      width={diameter}
      height={radius}
      position="relative"
      overflow="hidden"
      __before={{
        content: '""',
        position: 'absolute',
        width: diameter,
        height: diameter,
        borderRadius: '50%',
        background: `radial-gradient(circle at center,
          transparent 0, transparent ${radius - thickness}px,
          ${colorStops.map(([color, start, end]) => `${color} ${start}px, ${color} ${end}px`).join(',')}
        )`,
      }}
      {...rest}
    />
  );
});

Rainbow.displayName = 'Rainbow';

export default Rainbow;
