import { useEventCallback, useMergeRefs } from '@tonic-ui/react-hooks';
import { callEventHandlers } from '@tonic-ui/utils';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../../box';
import {
  useDatePickerToggleStyle,
} from './styles';
import useDatePicker from './useDatePicker';

/**
 * @typedef {Object} DatePickerToggleProps
 * @property {React.ReactNode | ((context: { getDatePickerToggleProps: () => React.HTMLAttributes<HTMLDivElement> & { ref: React.RefCallback<HTMLElement> } }) => React.ReactNode)} [children] - Content or render function.
 * @property {boolean} [disabled] - Whether the date picker toggle is disabled.
 * @property {React.MouseEventHandler<HTMLButtonElement>} [onClick] - Callback when the toggle is clicked.
 * @property {React.KeyboardEventHandler<HTMLButtonElement>} [onKeyDown] - Callback when a key is pressed.
 */

/**
 * @type {ForwardRefComponent<'div', DatePickerToggleProps>}
 */
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

    if (event.repeat) {
      return;
    }

    const isEscape = (event.key === 'Escape');
    const isEnterOrSpace = (event.key === 'Enter' || event.key === ' ');

    if (isEscape) {
      event.preventDefault();
      ensureFunction(closeDatePicker)();
    } else if (isEnterOrSpace) {
      event.preventDefault();
      ensureFunction(openDatePicker)();
    }
  }, [disabled, closeDatePicker, openDatePicker]);

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
