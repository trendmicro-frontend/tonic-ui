import { useOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import { Switch } from '../switch';

const ToggleSwitch = forwardRef((props, ref) => {
  useOnce(() => {
    console.error('Warning: The `ToggleSwitch` component is deprecated and will be removed in the next major release. Use the `Switch` component instead.');
  });

  return (
    <Switch ref={ref} {...props} />
  );
});

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
