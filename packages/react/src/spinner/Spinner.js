import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import { ensureFiniteNumber } from 'ensure-type';
import React, { forwardRef } from 'react';
import { CircularProgress } from '../progress';
import { useDefaultProps } from '../default-props';

const defaultSize = 'md';

const mapSpinnerSizeToDiameter = (size) => {
  const sizeToDiameterMap = {
    xs: 16,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 80,
  };
  return sizeToDiameterMap[size] ?? sizeToDiameterMap[defaultSize];
};

const mapSpinnerSizeToThickness = (size) => {
  const sizeToThicknessMap = {
    xs: 2,
    sm: 2,
    md: 4,
    lg: 4,
    xl: 4,
  };
  return sizeToThicknessMap[size] ?? sizeToThicknessMap[defaultSize];
};

const Spinner = forwardRef((inProps, ref) => {
  const {
    lineColor, // deprecated
    lineWidth, // deprecated
    trackWidth, // deprecated

    color,
    size = defaultSize,
    thickness: thicknessProp,
    trackColor,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Spinner' });

  { // deprecation warning
    const prefix = `${Spinner.displayName}:`;

    useOnceWhen(() => {
      warnDeprecatedProps('lineColor', {
        prefix,
        alternative: 'color',
        willRemove: true,
      });
    }, (lineColor !== undefined));

    useOnceWhen(() => {
      warnDeprecatedProps('lineWidth', {
        prefix,
        alternative: 'thickness',
        willRemove: true,
      });
    }, (lineWidth !== undefined));

    useOnceWhen(() => {
      warnDeprecatedProps('trackWidth', {
        prefix,
        alternative: 'thickness',
        willRemove: true,
      });
    }, (trackWidth !== undefined));
  }

  const diameter = mapSpinnerSizeToDiameter(size);
  const thickness = thicknessProp ?? mapSpinnerSizeToThickness(size);

  // Get the maximum value from lineWidth, trackWidth, and the mapped thickness
  const normalizedThickness = Math.max(
    ensureFiniteNumber(lineWidth), // deprecated
    ensureFiniteNumber(trackWidth), // deprecated
    thickness,
  );

  return (
    <CircularProgress
      ref={ref}
      size={diameter}
      thickness={normalizedThickness}
      sx={[
        {
          'svg circle:first-of-type': {
            color: trackColor,
          },
          'svg circle:last-of-type': {
            color: color ?? lineColor,
          },
        },
      ]}
      {...rest}
      // Ensure the "indeterminate" variant is applied last to prevent unintended overrides
      variant="indeterminate"
    />
  );
});

Spinner.displayName = 'Spinner';

export default Spinner;
