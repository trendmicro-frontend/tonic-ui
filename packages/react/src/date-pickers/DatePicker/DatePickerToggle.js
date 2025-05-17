import { useEventCallback, useMergeRefs } from '@tonic-ui/react-hooks';
import { callEventHandlers } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../../box';
import {
  useDatePickerToggleStyle,
} from './styles';
import useDatePicker from './useDatePicker';

const DatePickerToggle = forwardRef((
  {
    children,
    disabled,
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    onKeyUp: onKeyUpProp,
    ...rest
  },
  ref,
) => {
  const datePickerContext = useDatePicker(); // context might be an undefined value
  const {
    datePickerContentId,
    datePickerToggleId,
    datePickerToggleRef,
    isOpen,
    onClose: closeDatePicker,
    onOpen: openDatePicker,
  } = { ...datePickerContext };
  const styleProps = useDatePickerToggleStyle();
  const combinedRef = useMergeRefs(datePickerToggleRef, ref);

  const onClick = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    ensureFunction(openDatePicker)();
  }, [disabled, openDatePicker]);

  const onKeyDown = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (event.key === ' ') {
      // Prevent page scroll on Space
      event.preventDefault();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      ensureFunction(closeDatePicker)();
    } else if (event.key === 'Enter' && !event.repeat) {
      event.preventDefault();
      ensureFunction(openDatePicker)();
    }
  }, [disabled, closeDatePicker, openDatePicker]);

  const onKeyUp = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (event.key === ' ' && !event.repeat) {
      event.preventDefault();
      ensureFunction(openDatePicker)();
    }
  }, [disabled, openDatePicker]);

  const getDatePickerToggleProps = () => ({
    'aria-controls': datePickerContentId,
    'aria-disabled': disabled,
    'aria-expanded': isOpen,
    'aria-haspopup': 'menu',
    disabled,
    id: datePickerToggleId,
    onClick: callEventHandlers(onClickProp, onClick),
    onKeyDown: callEventHandlers(onKeyDownProp, onKeyDown),
    onKeyUp: callEventHandlers(onKeyUpProp, onKeyUp),
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
