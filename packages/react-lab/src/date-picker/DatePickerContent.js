import React, { forwardRef } from 'react';
import { MenuContent } from '@tonic-ui/react';

const DatePickerContent = forwardRef((props, ref) => {
  return (
    <MenuContent
      ref={ref}
      {...props}
    />
  );
});

DatePickerContent.displayName = 'DatePickerContent';

export default DatePickerContent;
