import { ensureFiniteNumber } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import {
  useLinearProgressRootStyle,
  useLinearProgressIndicatorStyle,
} from './styles';

const defaultSize = 'sm';
const defaultVariant = 'indeterminate';

const LinearProgress = forwardRef((
  {
    min = 0,
    max = 100,
    size = defaultSize,
    value,
    variant = defaultVariant,
    ...rest
  },
  ref,
) => {
  const rootStyleProps = useLinearProgressRootStyle({ size });
  const indicatorStyleProps = useLinearProgressIndicatorStyle({ variant });
  const rootProps = {
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': (variant === 'determinate') ? value : undefined,
    role: 'progressbar',
  };
  const indicatorProps = {};

  if (variant === 'determinate') {
    if ((process.env.NODE_ENV !== 'production') && (value === undefined)) {
      console.error('You need to provide a value prop when using the determinate variant of LinearProgress.');
    }

    const scale = (ensureFiniteNumber(value) - min) / (max - min);
    indicatorProps.style = {
      ...indicatorProps.style,
      clipPath: `inset(0 ${(1 - scale) * 100}% 0 0)`,
    };
  }

  return (
    <Box
      ref={ref}
      {...rootStyleProps}
      {...rootProps}
      {...rest}
    >
      <Box
        {...indicatorStyleProps}
        {...indicatorProps}
      />
    </Box>
  );
});

export default LinearProgress;
