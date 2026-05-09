import { callEventHandlers, dataAttr } from '@tonic-ui/utils';
import formatISO from 'date-fns/formatISO';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
import { forwardRef } from 'react';
import { Box } from '../../../box';
import useButtonEventHandlers from '../../../utils/useButtonEventHandlers';
import { useDayStyle } from '../styles';
import useDateCalendar from '../useDateCalendar';

const Day = forwardRef((
  {
    date,
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    ...rest
  },
  ref,
) => {
  const dateCalendarContext = useDateCalendar();
  const {
    activeDate,
    date: selectedDate,
    formatDate,
    maxDate,
    minDate,
    onChange,
    setActiveDate,
    shouldDisableDate,
  } = { ...dateCalendarContext };
  const isSelectable = (() => {
    if (minDate && isBefore(date, minDate)) {
      return false;
    }
    if (maxDate && isAfter(date, maxDate)) {
      return false;
    }
    if (shouldDisableDate?.(date)) {
      return false;
    }
    return true;
  })();
  const isSelected = isSameDay(date, new Date(selectedDate));
  const isToday = isSameDay(date, new Date());
  // Manage focus on the active date within the month view by adjusting the `tabIndex`.
  // If the date is within the same month as the `activeDate`, set `tabIndex` to 0 to make it focusable; otherwise, set it to -1.
  const tabIndex = isSameMonth(date, activeDate) ? 0 : -1;
  const styleProps = useDayStyle({
    isSameMonth: isSameMonth(date, activeDate),
    isSelectable,
    isToday,
  });

  const { onClick, onKeyDown } = useButtonEventHandlers({
    onActivate: () => {
      if (isSelectable) {
        setActiveDate(date);
        onChange(date);
      }
    },
  });

  return (
    <Box
      ref={ref}
      data-date={formatISO(date, { representation: 'date' })}
      // Only use `aria-selected` with these roles: `option`, `tab`, `menuitemradio`, `treeitem`, `gridcell`, `row`, `rowheader`, and `columnheader`.
      data-selected={dataAttr(isSelected)}
      onClick={callEventHandlers(onClickProp, onClick)}
      onKeyDown={callEventHandlers(onKeyDownProp, onKeyDown)}
      tabIndex={tabIndex}
      {...styleProps}
      {...rest}
    >
      {formatDate(date, 'd')}
    </Box>
  );
});

Day.displayName = 'Day';

export default Day;
