import {
  Box,
  Button,
  Icon,
  Text,
} from '@tonic-ui/react';
import { useEventCallback } from '@tonic-ui/react-hooks';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import subMonths from 'date-fns/subMonths';
import subYears from 'date-fns/subYears';
import React, { forwardRef } from 'react';
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
        variant="ghost"
        onClick={onClickPreviousMonth}
        {...monthButtonStyleProps}
      >
        <Icon icon="angle-left" />
      </Button>
      <Box {...currentMonthYearStyleProps}>
        <Text>
          {formatDate(activeDate, 'LLL yyyy')}
        </Text>
        <Box {...yearButtonGroupStyleProps}>
          <Button
            variant="ghost"
            onClick={onClickPreviousYear}
            {...yearButtonStyleProps}
          >
            <Icon icon="angle-up" />
          </Button>
          <Button
            variant="ghost"
            onClick={onClickNextYear}
            {...yearButtonStyleProps}
          >
            <Icon icon="angle-down" />
          </Button>
        </Box>
      </Box>
      <Button
        variant="ghost"
        onClick={onClickNextMonth}
        {...monthButtonStyleProps}
      >
        <Icon icon="angle-right" />
      </Button>
    </Box>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
