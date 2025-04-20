import { useMergeRefs } from '@tonic-ui/react-hooks';
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
  const onClick = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (isOpen) {
      ensureFunction(closeDatePicker)();
    } else {
      ensureFunction(openDatePicker)();
    }
  };

  const onKeyDown = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent default scrolling for Space

      if (isOpen) {
        ensureFunction(closeDatePicker)();
      } else {
        ensureFunction(openDatePicker)();
      }
      return;
    }
  };

  const getDatePickerToggleProps = () => ({
    'aria-controls': datePickerContentId,
    'aria-disabled': disabled,
    'aria-expanded': isOpen,
    'aria-haspopup': 'menu',
    disabled,
    id: datePickerToggleId,
    onClick: callEventHandlers(onClickProp, onClick),
    onKeyDown: callEventHandlers(onKeyDownProp, onKeyDown),
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
