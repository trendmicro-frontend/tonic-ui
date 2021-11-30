import React, { forwardRef } from 'react';
import Switch from '../Switch';
import useEffectOnce from '../hooks/useEffectOnce';

const ToggleSwitch = forwardRef((props, ref) => {
  useEffectOnce(() => {
    console.error('Warning: The `ToggleSwitch` component is deprecated and will be removed in the next major release. Use the `Switch` component instead.');
  });

  return (
    <Switch ref={ref} {...props} />
  );
});

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
