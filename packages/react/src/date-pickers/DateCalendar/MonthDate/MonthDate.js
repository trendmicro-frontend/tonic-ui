import { forwardRef } from 'react';
import { Box } from '../../../box';
import { useMonthDateStyle } from '../styles';
import DaysOfWeek from './DaysOfWeek';
import Weeks from './Weeks';

/**
 * @typedef {Object} MonthDateProps
 */

/**
 * @type {ForwardRefComponent<'div', MonthDateProps>}
 */
const MonthDate = forwardRef((
  props,
  ref
) => {
  const styleProps = useMonthDateStyle();
  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    >
      <DaysOfWeek />
      <Weeks />
    </Box>
  );
});

MonthDate.displayName = 'MonthDate';

export default MonthDate;
