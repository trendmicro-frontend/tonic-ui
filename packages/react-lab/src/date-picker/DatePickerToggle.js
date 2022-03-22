import { Box } from '@tonic-ui/react';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import useForkRef from '../utils/useForkRef';
import wrapEvent from '../utils/wrapEvent';
import { useDatePickerToggleStyle } from './styles';
import useDatePicker from './useDatePicker';

const DatePickerToggle = forwardRef((
  {
    onClick,
    onKeyDown,
    children,
    disabled,
    ...rest
  },
  ref,
) => {
  const datePickerContext = useDatePicker(); // context might be an undefined value
  const {
    closeDatePicker,
    datePickerId,
    datePickerToggleId,
    datePickerToggleRef,
    isOpen,
    openDatePicker,
  } = { ...datePickerContext };

  const styleProps = useDatePickerToggleStyle();
  const combinedRef = useForkRef(datePickerToggleRef, ref);

  const handleClick = wrapEvent(onClick, (event) => {
    // Don't handle `onClick` event when the `DatePickerToggle` is disabled
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (!isOpen) {
      openDatePicker();
    }
  });

  const handleKeyDown = wrapEvent(onKeyDown, event => {
    // Don't handle `onKeyDown` event when the `DatePickerToggle` is disabled
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (event.key === 'ArrowDown') {
      ensureFunction(openDatePicker)();
      return;
    }

    if (event.key === 'ArrowUp') {
      ensureFunction(openDatePicker)();
      return;
    }

    if (event.key === 'Escape') {
      ensureFunction(closeDatePicker)();
      return;
    }
  });

  const getDatePickerToggleProps = () => ({
    'aria-controls': datePickerId,
    'aria-disabled': disabled,
    'aria-expanded': isOpen,
    'aria-haspopup': 'datepicker',
    disabled,
    id: datePickerToggleId,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    ref: combinedRef,
    role: 'button',
    tabIndex: 0,
    ...styleProps,
    ...rest,
  });

  if (typeof children === 'function') {
    return children({
      getDatePickerToggleProps,
      isOpen,
      openDatePicker,
      closeDatePicker,
    });
  }

  return (
    <Box {...getDatePickerToggleProps()}>
      {children}
    </Box>
  );
});

DatePickerToggle.displayName = 'DatePickerToggle';

export default DatePickerToggle;
