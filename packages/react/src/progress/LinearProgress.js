import { ensureFiniteNumber } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useLinearProgressStyle,
  useLinearProgressBarStyle,
} from './styles';

const defaultSize = 'sm';
const defaultVariant = 'indeterminate';

const LinearProgress = forwardRef((inProps, ref) => {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    color = 'blue:60',
    min = 0,
    max = 100,
    size = defaultSize,
    value,
    variant = defaultVariant,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'LinearProgress' });
  const progressStyleProps = useLinearProgressStyle({ size });
  const progressbarStyleProps = useLinearProgressBarStyle({ color, variant });
  const progressbarProps = {
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': (variant === 'determinate') ? value : undefined,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    role: 'progressbar',
  };

  if (variant === 'determinate') {
    if ((process.env.NODE_ENV !== 'production') && (value === undefined)) {
      console.error('You need to provide a value prop when using the determinate variant of LinearProgress.');
    }

    const scale = (ensureFiniteNumber(value) - min) / (max - min);
    progressbarProps.style = {
      ...progressbarProps.style,
      clipPath: `inset(0 ${(1 - scale) * 100}% 0 0)`,
    };
  }

  return (
    <Box
      ref={ref}
      {...progressStyleProps}
      {...rest}
    >
      <Box
        {...progressbarStyleProps}
        {...progressbarProps}
      />
    </Box>
  );
});

export default LinearProgress;
