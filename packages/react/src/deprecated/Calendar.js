import { useOnce } from '@tonic-ui/react-hooks';
import { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import { DateCalendar } from '../date-pickers';

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
