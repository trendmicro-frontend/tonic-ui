import { Box } from '@tonic-ui/react';
import { usePrevious } from '@tonic-ui/react-hooks';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import isValidDate from 'date-fns/isValid';
import memoize from 'micro-memoize';
import React, { forwardRef, useEffect, useReducer } from 'react';
import { CalendarProvider } from './context';
import DecadeView from './DecadeView';
import MonthView from './MonthView';
import YearView from './YearView';
import Navigation from './Navigation';
import { useCalendarStyle } from './styles';

const defaultView = 'month'; // one of 'month', 'year', 'decade'

const getMemoizedState = memoize(state => ({ ...state }));

const stateReducer = (prevState, nextState) => ({
  ...prevState,
  ...(typeof nextState === 'function' ? nextState(prevState) : nextState),
});

const Calendar = forwardRef((
  {
    calendarStartDay = 0, // 0 = Sunday, 1 = Monday, ...
    children,
    dateFormat = 'yyyy-MM-dd',
    defaultValue,
    value: valueProp,
    onChange,
    ...rest
  },
  ref,
) => {
  const value = valueProp ?? defaultValue;
  const inputDate = new Date(value);
  const [state, setState] = useReducer(stateReducer, {
    activeDate: isValidDate(inputDate) ? inputDate : new Date(),
    value: value,
    view: defaultView,
  });
  const previouslyValue = usePrevious(state.value);
  const styleProps = useCalendarStyle();
  const handleChange = (value) => {
    if (valueProp !== undefined) {
      setState({ value: valueProp });
    } else {
      setState({ value: value });
    }

    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  useEffect(() => {
    if (valueProp !== undefined) {
      setState({ value: valueProp });
    }
  }, [valueProp]);

  useEffect(() => {
    // Dynamically change the calendar view
    const isValueChange = !!state.value && state.value !== previouslyValue;
    const currentActiveDate = state.activeDate;
    const newActiveDate = new Date(state.value);
    const needToChangeView = isValidDate(newActiveDate) && (!isSameYear(newActiveDate, currentActiveDate) || !isSameMonth(newActiveDate, currentActiveDate));
    if (isValueChange && needToChangeView) {
      setState({ activeDate: newActiveDate });
    }
  }, [state.value, previouslyValue, state.activeDate]);

  const context = getMemoizedState({
    activeDate: state.activeDate,
    calendarStartDay,
    dateFormat,
    onClickDay: handleChange,
    setState,
    value: state.value,
    view: state.view,
  });

  if (typeof children === 'function') {
    return children({
      getCalendarProps: styleProps,
      ...context
    });
  }

  return (
    <CalendarProvider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        <Navigation />
        { state.view === 'month' && (
          <MonthView />
        )}
        { state.view === 'year' && (
          <YearView />
        )}
        { state.view === 'decade' && (
          <DecadeView />
        )}
      </Box>
    </CalendarProvider>
  );
});

Calendar.displayName = 'Calendar';

export default Calendar;
