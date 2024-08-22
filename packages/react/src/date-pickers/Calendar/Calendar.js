import { useConst, usePrevious } from '@tonic-ui/react-hooks';
import {
  getActiveElement,
  getAllFocusable,
  isNullOrUndefined,
} from '@tonic-ui/utils';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import addMonths from 'date-fns/addMonths';
import endOfDay from 'date-fns/endOfDay';
import format from 'date-fns/format';
import isDate from 'date-fns/isDate';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import isValid from 'date-fns/isValid';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import subMonths from 'date-fns/subMonths';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '../../box';
import { validateDate } from '../validation';
import { CalendarProvider } from './context';
import MonthDate from './MonthDate';
import YearMonthPicker from './YearMonthPicker';
import { useCalendarStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

const mapValueToDate = (value) => {
  if (isNullOrUndefined(value)) {
    return null;
  }
  const date = new Date(value);
  return (isDate(date) && isValid(date)) ? date : null;
};

const mapValueToStartOfDay = (value) => {
  const date = mapValueToDate(value);
  return (isDate(date) && isValid(date)) ? startOfDay(date) : null;
};

const mapValueToEndOfDay = (value) => {
  const date = mapValueToDate(value);
  return (isDate(date) && isValid(date)) ? endOfDay(date) : null;
};

const Calendar = forwardRef((
  {
    children, // not used
    date: dateProp,
    defaultDate: defaultDateProp,
    firstDayOfWeek = 0, // 0 = Sunday, 1 = Monday, ...
    formatDate: formatDateProp,
    maxDate: maxDateProp,
    minDate: minDateProp,
    onChange: onChangeProp,
    onError: onErrorProp,
    shouldDisableDate,
    ...rest
  },
  ref,
) => {
  const initialDate = useConst(() => {
    const value = dateProp ?? defaultDateProp;
    return mapValueToDate(value);
  });
  const initialActiveDate = useConst(() => {
    const today = mapValueToStartOfDay(new Date());
    // Return initial date if it is valid, otherwise return today
    return isValid(initialDate) ? initialDate : today;
  });
  const isTabPressedRef = useRef(false); // Indicates if the focus was triggered by the "Tab" key
  const calendarMonthDateRef = useRef();
  const nextFocusIndexRef = useRef();
  const [activeDate, setActiveDate] = useState(initialActiveDate);
  const [date, setDate] = useState(initialDate);
  const previousDate = usePrevious(date);
  const formatDate = useCallback((_date, _format, _options) => {
    if (!_date) {
      return null;
    }
    if (typeof formatDateProp === 'function') {
      return formatDateProp(_date, _format, _options);
    }
    return format(_date, _format, _options);
  }, [formatDateProp]);
  const maxDate = mapValueToEndOfDay(maxDateProp);
  const minDate = mapValueToStartOfDay(minDateProp);
  const validationError = validateDate(date, { maxDate, minDate, shouldDisableDate });
  const previousValidationError = usePrevious(validationError);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Tab') {
        isTabPressedRef.current = true;
      }
    };

    const handleKeyUp = (event) => {
      // Reset to false regardless of the key pressed
      isTabPressedRef.current = false;
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (validationError !== previousValidationError) {
      onErrorProp?.(validationError, date);
    }
  }, [date, onErrorProp, previousValidationError, validationError]);

  useEffect(() => {
    const isControlled = (dateProp !== undefined);
    if (isControlled) {
      const nextDate = dateProp;
      setDate(nextDate);
    }
  }, [dateProp]);

  useEffect(() => {
    const isDateChanged = !!date && (date !== previousDate);
    const nextActiveDate = new Date(date);
    const isSameYearAndMonth = isSameYear(activeDate, nextActiveDate) && isSameMonth(activeDate, nextActiveDate);
    const willChangeView = isValid(nextActiveDate) && !isSameYearAndMonth;
    if (isDateChanged && willChangeView) {
      setActiveDate(nextActiveDate);
    }
  }, [date, previousDate, activeDate]);

  useEffect(() => {
    if (isNullOrUndefined(nextFocusIndexRef.current)) {
      return;
    }

    const nextFocusIndex = nextFocusIndexRef.current;
    const focusableElements = getAllFocusable(calendarMonthDateRef.current);
    const el = nextFocusIndex < 0
      ? focusableElements[focusableElements.length + nextFocusIndex]
      : focusableElements[nextFocusIndex];

    // Reset the reference to avoid unintended focus changes in future renders
    nextFocusIndexRef.current = null;

    // Use requestAnimationFrame to ensure that the focus is set after the DOM has been updated
    requestAnimationFrame(() => {
      el && el?.focus();
    });
  }, [activeDate]); // Re-run effect when activeDate changes

  const onChange = useCallback((nextDate) => {
    const isControlled = (dateProp !== undefined);
    if (!isControlled) {
      setDate(nextDate);
    }

    onChangeProp?.(nextDate);
  }, [dateProp, onChangeProp]);

  const calendarMonthDateEventHandler = {};

  calendarMonthDateEventHandler.onKeyDown = useCallback((event) => {
    const key = event?.key;
    const isShiftPressed = event.shiftKey;
    const focusableElements = getAllFocusable(calendarMonthDateRef.current);
    const activeElement = getActiveElement(event.target);

    const focusOnDay = (offset) => {
      const focusIndex = focusableElements.indexOf(activeElement);
      if (focusIndex < 0) {
        return;
      }

      const nextFocusIndex = focusIndex + offset;
      if (nextFocusIndex < 0 || nextFocusIndex >= focusableElements.length) {
        const nextActiveDate = offset < 0 ? subMonths(activeDate, 1) : addMonths(activeDate, 1);
        setActiveDate(nextActiveDate);

        if (nextFocusIndex < 0) {
          // Example #1: No days from the previous month in the first row (focusIndex=0, offset=-7, nextFocusIndex=-7)
          //
          // With the current focus on day 1 in the first row and `nextFocusIndex` set to -7:
          //
          // ```
          //  Su  Mo  Tu  We  Th  Fr  Sa
          // [ 1]  2   3   4   5   6   7
          //   8   9  10  11  12  13  14
          //  15  16  17  18  19  20  21
          //  22  23  24  25  26  27  28
          //  29  30  31   1   2   3   4
          // ```
          //
          // The focus will be shifted to the appropriate position in the previous month, based on the offset:
          //
          // ```
          //  Su  Mo  Tu  We  Th  Fr  Sa
          //   1   2   3   4   5   6   7
          //   8   9  10  11  12  13  14
          //  15  16  17  18  19  20  21
          //  22  23  24  25  26  27  28
          // [24] 25  26  27  28  29  30
          // ```
          //
          // Example #2: Contains days from the previous month in the first row (focusIndex=4, offset=-7, nextFocusIndex=-3)
          //
          // With the current focus on day 1 in the first row and `nextFocusIndex` set to -3:
          //
          // ```
          //  Su  Mo  Tu  We  Th  Fr  Sa
          //  27  28  29  30 [ 1]  2   3
          //   4   5   6   7   8   9  10
          //  11  12  13  14  15  16  17
          //  18  19  20  21  22  23  24
          //  25  26  27  28  29  30  31
          // ```
          //
          // Days 27, 28, 29, and 30 in the first row are part of the previous month and are not focusable (tabIndex of -1).
          // To correctly adjust the focus, subtract 7 to align with the corresponding day in the preceding week:
          //
          // ```
          //  Su  Mo  Tu  We  Th  Fr  Sa
          //  30  31   1   2   3   4   5
          //   6   7   8   9  10  11  12
          //  13  14  15  16  17  18  19
          //  20  21  22  23 [24] 25  26
          //  27  28  29  30   1   2   3
          // ```

          nextFocusIndexRef.current = nextFocusIndex;

          // Verify whether the first row includes days from the previous month
          const firstFocusableElementInMonthDate = focusableElements[0];
          if (firstFocusableElementInMonthDate?.tabIndex < 0) {
            nextFocusIndexRef.current -= 7;
          }
        } else if (nextFocusIndex >= focusableElements.length) {
          // Example #1: No days from the next month in the last row (focusIndex=34, offset=7, nextFocusIndex=41)
          //
          // With the current focus on day 31 in the last row and `nextFocusIndex` set to 41:
          //
          // ```
          //  Su  Mo  Tu  We  Th  Fr  Sa
          //  27  28  29  30   1   2   3
          //   4   5   6   7   8   9  10
          //  11  12  13  14  15  16  17
          //  18  19  20  21  22  23  24
          //  25  26  27  28  29  30 [31]
          // ```
          //
          // The focus will be shifted to the appropriate position in the next month, based on the offset:
          //
          // ```
          //  Su  Mo  Tu  We  Th  Fr  Sa
          //   1   2   3   4   5   6 [ 7]
          //   8   9  10  11  12  13  14
          //  15  16  17  18  19  20  21
          //  22  23  24  25  26  27  28
          //  29  30   1   2   3   4   5
          // ```
          //
          // Example #2: Contains days from the next month in the last row (focusIndex=30, offset=7, nextFocusIndex=37)
          //
          // With the current focus on day 31 in the last row and `nextFocusIndex` set to 37:
          //
          // ```
          //  Su  Mo  Tu  We  Th  Fr  Sa
          //   1   2   3   4   5   6   7
          //   8   9  10  11  12  13  14
          //  15  16  17  18  19  20  21
          //  22  23  24  25  26  27  28
          //  29  30 [31]  1   2   3   4
          // ```
          //
          // Days 1, 2, 3, and 4 in the last row are part of the next month and are not focusable (tabIndex of -1).
          // To correctly adjust the focus, add 7 to align with the corresponding day in the following week:
          //
          // ```
          //  Su  Mo  Tu  We  Th  Fr  Sa
          //  29  30  31   1   2   3   4
          //   5   6 [ 7]  8   9  10  11
          //  12  13  14  15  16  17  18
          //  19  20  21  22  23  24  25
          //  26  27  28  29  30   1   2
          // ```

          nextFocusIndexRef.current = nextFocusIndex - focusableElements.length;

          // Verify whether the last row includes days from the next month
          const lastFocusableElementInMonthDate = focusableElements[focusableElements.length - 1];
          if (lastFocusableElementInMonthDate?.tabIndex < 0) {
            nextFocusIndexRef.current += 7;
          }
        }
        return;
      }

      const nextFocusableElement = focusableElements[nextFocusIndex];
      if (!nextFocusableElement) {
        return;
      }

      if (nextFocusableElement?.tabIndex < 0) {
        const nextActiveDate = offset < 0 ? subMonths(activeDate, 1) : addMonths(activeDate, 1);
        setActiveDate(nextActiveDate);
        nextFocusIndexRef.current = offset < 0
          ? nextFocusIndex - 7
          : (nextFocusIndex + 7) - focusableElements.length;
        return;
      }

      nextFocusableElement?.focus();
    };

    const focusOnPreviousDay = () => focusOnDay(-1);
    const focusOnNextDay = () => focusOnDay(1);
    const focusOnPreviousWeek = () => focusOnDay(-7);
    const focusOnNextWeek = () => focusOnDay(7);
    const focusOnFirstDay = () => {
      const firstFocusableNode = focusableElements.find(node => node?.tabIndex >= 0);
      if (firstFocusableNode) {
        firstFocusableNode?.focus();
      }
    };
    const focusOnLastDay = () => {
      const lastFocusableNode = focusableElements.reverse().find(node => node?.tabIndex >= 0);
      if (lastFocusableNode) {
        lastFocusableNode?.focus();
      }
    };

    if (key === 'ArrowLeft') {
      focusOnPreviousDay();

      // Prevent the default action
      event.preventDefault();
    }

    if (key === 'ArrowRight') {
      focusOnNextDay();

      // Prevent the default action
      event.preventDefault();
    }

    if (key === 'ArrowUp') {
      focusOnPreviousWeek();

      // Prevent the default action
      event.preventDefault();
    }

    if (key === 'ArrowDown') {
      focusOnNextWeek();

      // Prevent the default action
      event.preventDefault();
    }

    if (key === 'Home') {
      focusOnFirstDay();

      // Prevent the default action
      event.preventDefault();
    }

    if (key === 'End') {
      focusOnLastDay();

      // Prevent the default action
      event.preventDefault();
    }

    if (key === 'Tab') {
      // Handle TAB key navigation within the month view
      if (focusableElements.indexOf(activeElement) >= 0) {
        if (isShiftPressed) { // TAB + SHIFT pressed
          // Move focus to the first focusable element in the month view.
          // This allows the user to cycle focus back to the navigation if needed.
          const firstFocusableElement = focusableElements[0];
          firstFocusableElement.focus();
        } else { // TAB pressed
          // Move focus to the last focusable element in the month view.
          // This allows the user to move focus outside the calendar.
          const lastFocusableElement = focusableElements[focusableElements.length - 1];
          lastFocusableElement.focus();
        }
        return;
      }
    }
  }, [activeDate]);

  calendarMonthDateEventHandler.onFocus = useCallback((event) => {
    const isTabPressed = !!isTabPressedRef.current;
    const losingFocusTarget = event.relatedTarget; // Element that is losing focus (if applicable)
    const isTabFocusEnteringFromOutsideToMonthDate = isTabPressed && losingFocusTarget && !event.currentTarget.contains(losingFocusTarget);

    // Handle focus specifically by the "Tab" key
    if (isTabFocusEnteringFromOutsideToMonthDate) {
      const today = new Date();
      // Determine the date to focus on (either provided date or today's date)
      const nextFocusDate = date ? startOfDay(date) : startOfDay(today);
      // Get the start date of the month view based on the next focus date
      const startDateOfMonthDate = startOfWeek(startOfMonth(nextFocusDate), {
        weekStartsOn: firstDayOfWeek,
      });
      const nextFocusIndex = differenceInCalendarDays(nextFocusDate, startDateOfMonthDate);
      nextFocusIndexRef.current = nextFocusIndex;
      setActiveDate(nextFocusDate);
    }
  }, [date, firstDayOfWeek]);

  const context = getMemoizedState({
    activeDate,
    date,
    firstDayOfWeek,
    formatDate,
    maxDate,
    minDate,
    onChange,
    setActiveDate,
    shouldDisableDate,
  });

  const tabIndex = -1;
  const styleProps = useCalendarStyle({ tabIndex });

  return (
    <CalendarProvider value={context}>
      <Box
        ref={ref}
        tabIndex={tabIndex}
        {...styleProps}
        {...rest}
      >
        <YearMonthPicker />
        <MonthDate
          ref={calendarMonthDateRef}
          {...calendarMonthDateEventHandler}
        />
      </Box>
    </CalendarProvider>
  );
});

Calendar.displayName = 'Calendar';

export default Calendar;
