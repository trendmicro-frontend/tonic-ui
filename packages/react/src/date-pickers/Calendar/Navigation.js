import { useEventCallback } from '@tonic-ui/react-hooks';
import { AngleLeftIcon, AngleRightIcon, AngleUpIcon, AngleDownIcon } from '@tonic-ui/react-icons';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import subMonths from 'date-fns/subMonths';
import subYears from 'date-fns/subYears';
import React, { forwardRef } from 'react';
import { Box } from '../../box';
import { Button } from '../../button';
import { Text } from '../../text';
import useCalendar from './useCalendar';
import {
  useNavigationStyle,
  useNavigationCurrentMonthYearStyle,
  useNavigationMonthButtonStyle,
  useNavigationYearButtonStyle,
  useNavigationYearButtonGroupStyle,
} from './styles';

const Navigation = forwardRef((props, ref) => {
  const calendarContext = useCalendar();
  const {
    activeDate,
    formatDate,
    setActiveDate,
  } = { ...calendarContext };

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
  const styleProps = useNavigationStyle();
  const currentMonthYearStyleProps = useNavigationCurrentMonthYearStyle();
  const monthButtonStyleProps = useNavigationMonthButtonStyle();
  const yearButtonStyleProps = useNavigationYearButtonStyle();
  const yearButtonGroupStyleProps = useNavigationYearButtonGroupStyle();

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
        {...monthButtonStyleProps}
      >
        <AngleLeftIcon size="4x" />
      </Button>
      <Box
        {...currentMonthYearStyleProps}
      >
        <Text>
          {formatDate(activeDate, 'LLL yyyy')}
        </Text>
        <Box
          {...yearButtonGroupStyleProps}
        >
          <Button
            aria-label="Previous year"
            variant="ghost"
            onClick={onClickPreviousYear}
            {...yearButtonStyleProps}
          >
            <AngleUpIcon size="4x" />
          </Button>
          <Button
            aria-label="Next year"
            variant="ghost"
            onClick={onClickNextYear}
            {...yearButtonStyleProps}
          >
            <AngleDownIcon size="4x" />
          </Button>
        </Box>
      </Box>
      <Button
        aria-label="Next month"
        variant="ghost"
        onClick={onClickNextMonth}
        {...monthButtonStyleProps}
      >
        <AngleRightIcon size="4x" />
      </Button>
    </Box>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
