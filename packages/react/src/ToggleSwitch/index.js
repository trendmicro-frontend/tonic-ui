import React, { forwardRef } from 'react';
import Switch from '../Switch';

const ToggleSwitch = forwardRef((props, ref) => <Switch ref={ref} {...props} />);

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
