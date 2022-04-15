import React, { forwardRef } from 'react';
import { Menu } from '@tonic-ui/react';

const DatePicker = forwardRef((props, ref) => {
  return (
    <Menu
      ref={ref}
      {...props}
    />
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;
