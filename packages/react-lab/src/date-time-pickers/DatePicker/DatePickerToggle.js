import { Box } from '@tonic-ui/react';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef, useCallback } from 'react';
import wrapEvent from '../../utils/wrapEvent';
import useForkRef from '../../utils/useForkRef';
import {
  useDatePickerToggleStyle,
} from './styles';
import useDatePicker from './useDatePicker';

const DatePickerToggle = forwardRef((
  {
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    children,
    disabled,
    ...rest
  },
  ref,
) => {
  const datePickerContext = useDatePicker(); // context might be an undefined value
  const {
    isOpen,
    datePickerContentId,
    datePickerToggleId,
    datePickerToggleRef,
    onClose,
    onOpen,
  } = { ...datePickerContext };
  const styleProps = useDatePickerToggleStyle();
  const combinedRef = useForkRef(datePickerToggleRef, ref);
  const handleClick = wrapEvent(onClickProp, useCallback((event) => {
    // Don't handle `onClick` event when the `DatePickerToggle` is disabled
    if (disabled) {
      event.preventDefault();
      return;
    }

    !isOpen && ensureFunction(onOpen)();
  }, [disabled, isOpen, onOpen]));

  const handleKeyDown = wrapEvent(onKeyDownProp, useCallback((event) => {
    // Don't handle `onKeyDown` event when the `DatePickerToggle` is disabled
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (event.key === 'Escape') {
      isOpen && ensureFunction(onClose)();
      return;
    }
  }, [disabled, isOpen, onClose]));

  const getDatePickerToggleProps = () => ({
    'aria-controls': datePickerContentId,
    'aria-disabled': disabled,
    'aria-expanded': isOpen,
    'aria-haspopup': 'menu',
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
