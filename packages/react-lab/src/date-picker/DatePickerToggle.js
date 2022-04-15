import React, { forwardRef } from 'react';
import { MenuToggle } from '@tonic-ui/react';

const DatePickerToggle = forwardRef((
  {
    children: childrenProp,
    ...rest
  },
  ref,
) => {
  const children = (typeof childrenProp === 'function')
    ? ({ getMenuToggleProps: getDatePickerToggleProps }) => childrenProp({ getDatePickerToggleProps })
    : childrenProp;

  return (
    <MenuToggle
      ref={ref}
      {...rest}
    >
      {children}
    </MenuToggle>
  );
});

DatePickerToggle.displayName = 'DatePickerToggle';

export default DatePickerToggle;
