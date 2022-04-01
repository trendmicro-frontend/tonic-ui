import { Box } from '@tonic-ui/react';
import { usePrevious } from '@tonic-ui/react-hooks';
import { ensureFunction } from 'ensure-type';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import isValidDate from 'date-fns/isValid';
import memoize from 'micro-memoize';
import React, { forwardRef, useEffect, useReducer } from 'react';
import { CalendarProvider } from './context';
import MonthView from './MonthView';
import Navigation from './Navigation';
import { useCalendarStyle } from './styles';

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
  onChange = ensureFunction(onChange);

  const value = valueProp ?? defaultValue;
  const inputDate = new Date(value);
  const [state, setState] = useReducer(stateReducer, {
    activeDate: isValidDate(inputDate) ? inputDate : new Date(),
    value: value,
  });
  const previouslyValue = usePrevious(state.value);
  const styleProps = useCalendarStyle();
  const handleChange = (value) => {
    if (valueProp !== undefined) {
      setState({ value: valueProp });
    } else {
      setState({ value: value });
    }
    onChange(value);
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
    onChange: handleChange,
    setState,
    value: state.value,
  });

  return (
    <CalendarProvider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        <Navigation />
        <MonthView />
      </Box>
    </CalendarProvider>
  );
});

Calendar.displayName = 'Calendar';

export default Calendar;
