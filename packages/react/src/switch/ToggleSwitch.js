import { useEffectOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import Switch from './Switch';

const ToggleSwitch = forwardRef((props, ref) => {
  useEffectOnce(() => {
    console.error('Warning: The `ToggleSwitch` component is deprecated and will be removed in the next major release. Use the `Switch` component instead.');
  }, true); // TODO: check if `when` is true for each prop

  return (
    <Switch ref={ref} {...props} />
  );
});

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
