import React, { forwardRef } from 'react';
import Switch from '../Switch';

const ToggleSwitch = forwardRef((props, ref) => {
  useEffect(() => {
    console.error('Warning: ToggleSwitch is deprecated and will be removed in a future release. Please use the Switch component instead.');
  }, []);

  return (
    <Switch ref={ref} {...props} />
  );
});

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
