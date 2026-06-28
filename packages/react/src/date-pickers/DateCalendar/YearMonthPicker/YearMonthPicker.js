import { useEventCallback } from '@tonic-ui/react-hooks';
import {
  AngleLeftIcon,
  AngleRightIcon,
  AngleUpIcon,
  AngleDownIcon,
} from '@tonic-ui/react-icons';
import { getAllFocusable } from '@tonic-ui/utils';
import { addMonths, addYears, subMonths, subYears } from 'date-fns';
import React, { forwardRef, useCallback, useRef } from 'react';
import { Box } from '../../../box';
import { Button } from '../../../button';
import { Text } from '../../../text';
import useDateCalendar from '../useDateCalendar';
import {
  useYearMonthPickerStyle,
  useYearMonthPickerMonthButtonStyle,
  useYearMonthPickerYearStyle,
  useYearMonthPickerYearButtonGroupStyle,
  useYearMonthPickerYearButtonStyle,
} from '../styles';

/**
 * @typedef {Object} YearMonthPickerProps
 */

/**
 * @type {ForwardRefComponent<'div', YearMonthPickerProps>}
 */
const YearMonthPicker = forwardRef((props, ref) => {
  const dateCalendarContext = useDateCalendar();
  const {
    activeDate,
    formatDate,
    setActiveDate,
  } = { ...dateCalendarContext };

  const onClickPreviousYear = useEventCallback((event) => {
    const nextActiveDate = subYears(activeDate, 1);
    setActiveDate(nextActiveDate);
  }, [activeDate]);
  const onClickNextYear = useEventCallback((event) => {
    const nextActiveDate = addYears(activeDate, 1);
    setActiveDate(nextActiveDate);
  }, [activeDate]);
  const onClickPreviousMonth = useEventCallback((event) => {
    const nextActiveDate = subMonths(activeDate, 1);
    setActiveDate(nextActiveDate);
  }, [activeDate]);
  const onClickNextMonth = useEventCallback((event) => {
    const nextActiveDate = addMonths(activeDate, 1);
    setActiveDate(nextActiveDate);
  }, [activeDate]);
  const styleProps = useYearMonthPickerStyle();
  const monthChangeButtonStyleProps = useYearMonthPickerMonthButtonStyle();
  const yearChangeStyleProps = useYearMonthPickerYearStyle();
  const yearChangeButtonGroupStyleProps = useYearMonthPickerYearButtonGroupStyle();
  const yearChangeButtonStyleProps = useYearMonthPickerYearButtonStyle();

  const yearChangeRef = useRef();
  const yearChangeEventHandler = {};
  yearChangeEventHandler.onKeyDown = useCallback((event) => {
    const key = event?.key;
    const isForwardTab = (key === 'Tab') && !event.shiftKey;

    if (key === 'ArrowUp') {
      const nextActiveDate = subYears(activeDate, 1);
      setActiveDate(nextActiveDate);

      // Prevent the default action
      event.preventDefault();
      return;
    }

    if (key === 'ArrowDown') {
      const nextActiveDate = addYears(activeDate, 1);
      setActiveDate(nextActiveDate);

      // Prevent the default action
      event.preventDefault();
      return;
    }

    if (key === ' ') {
      // Prevent the default action
      event.preventDefault();
      return;
    }

    if (isForwardTab) {
      // Shift focus to the last focusable element within the year change view.
      // This ensures that focus can progress to the next month button.
      const focusableElements = getAllFocusable(yearChangeRef.current);
      const lastFocusableNode = focusableElements[focusableElements.length - 1];
      if (lastFocusableNode) {
        lastFocusableNode?.focus();
      }
    }
  }, [activeDate, setActiveDate]);

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    >
      <Button
        aria-label="Previous month"
        variant="ghost"
        onClick={onClickPreviousMonth}
        {...monthChangeButtonStyleProps}
      >
        <AngleLeftIcon size="4x" />
      </Button>
      <Box
        ref={yearChangeRef}
        tabIndex={0}
        {...yearChangeEventHandler}
        {...yearChangeStyleProps}
      >
        <Text>
          {formatDate(activeDate, 'LLL yyyy')}
        </Text>
        <Box
          {...yearChangeButtonGroupStyleProps}
        >
          <Button
            aria-label="Previous year"
            variant="ghost"
            onClick={onClickPreviousYear}
            {...yearChangeButtonStyleProps}
          >
            <AngleUpIcon size="4x" />
          </Button>
          <Button
            aria-label="Next year"
            variant="ghost"
            onClick={onClickNextYear}
            {...yearChangeButtonStyleProps}
          >
            <AngleDownIcon size="4x" />
          </Button>
        </Box>
      </Box>
      <Button
        aria-label="Next month"
        variant="ghost"
        onClick={onClickNextMonth}
        {...monthChangeButtonStyleProps}
      >
        <AngleRightIcon size="4x" />
      </Button>
    </Box>
  );
});

YearMonthPicker.displayName = 'YearMonthPicker';

export default YearMonthPicker;
