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
    lineColor: lineColorProp, // deprecated
    lineWidth: lineWidthProp, // deprecated
    trackColor: trackColorProp, // deprecated
    trackWidth: trackWidthProp, // deprecated

    color,
    size = defaultSize,
    thickness: thicknessProp,
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
    }, (lineColorProp !== undefined));

    useOnceWhen(() => {
      warnDeprecatedProps('lineWidth', {
        prefix,
        alternative: 'thickness',
        willRemove: true,
      });
    }, (lineWidthProp !== undefined));

    useOnceWhen(() => {
      warnDeprecatedProps('trackColor', {
        prefix,
        alternative: 'sx={{ "svg circle:first-of-type": { color: trackColor } }}',
        willRemove: true,
      });
    }, (trackColorProp !== undefined));

    useOnceWhen(() => {
      warnDeprecatedProps('trackWidth', {
        prefix,
        alternative: 'thickness',
        willRemove: true,
      });
    }, (trackWidthProp !== undefined));
  }

  const diameter = mapSpinnerSizeToDiameter(size);
  const thickness = thicknessProp ?? mapSpinnerSizeToThickness(size);

  // Get the maximum value from lineWidth, trackWidth, and the mapped thickness
  const normalizedThickness = Math.max(
    ensureFiniteNumber(lineWidthProp), // deprecated
    ensureFiniteNumber(trackWidthProp), // deprecated
    thickness,
  );

  return (
    <CircularProgress
      ref={ref}
      color={color}
      size={diameter}
      thickness={normalizedThickness}
      sx={[
        {
          'svg circle:first-of-type': {
            color: trackColorProp,
          },
          'svg circle:last-of-type': {
            color: color ?? lineColorProp,
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
