import { useOnce } from '@tonic-ui/react-hooks';
import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import { DateCalendar } from '../date-pickers';

/**
 * @typedef {Object} CalendarProps
 * @property {Date} [date] - The selected date (deprecated, use value).
 * @property {Date} [defaultDate] - The default selected date (deprecated, use defaultValue).
 */

/**
 * @deprecated Use `DateCalendar` instead.
 * @type {ForwardRefComponent<'div', CalendarProps>}
 */
const Calendar = forwardRef((inProps, ref) => {
  useOnce(() => {
    console.error('Warning: The `Calendar` component is deprecated and will be removed in the next major release. Use the `DateCalendar` component instead.');
  });

  const {
    date: valueProp,
    defaultDate: defaultValueProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Calendar' });

  return (
    <DateCalendar
      defaultValue={defaultValueProp}
      value={valueProp}
      {...rest}
    />
  );
});

export default Calendar;
