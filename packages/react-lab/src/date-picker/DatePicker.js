import { Box } from '@tonic-ui/react';
import { usePrevious } from '@tonic-ui/react-hooks';
import { ensureString } from 'ensure-type';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';
import config from '../shared/config';
import useAutoId from '../utils/useAutoId';
import useForkRef from '../utils/useForkRef';
import { DatePickerProvider } from './context';
import { useDatePickerStyle } from './styles';

const mapPlacementToDirection = (placement) => {
  const p0 = ensureString(placement).split('-')[0];
  const direction = {
    top: 'up',
    bottom: 'down',
  }[p0];

  return direction;
};

const DatePicker = forwardRef((
  {
    children,
    defaultIsOpen = false,
    isOpen: isOpenProp,
    onClose,
    onOpen,
    placement = 'bottom-start', // One of: 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'
    ...rest
  },
  ref,
) => {
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(nodeRef, ref);
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const { current: isControlled } = useRef(isOpenProp != null);
  const _isOpen = isControlled ? isOpenProp : isOpen;
  const defaultId = useAutoId();
  const datePickerId = `${config.name}:DatePickerId-${defaultId}`;
  const datePickerToggleId = `${config.name}:DatePickerToggle-${defaultId}`;
  const datePickerRef = useRef(null);
  const datePickerToggleRef = useRef(null);
  const direction = mapPlacementToDirection(placement);
  const wasPreviouslyOpen = usePrevious(_isOpen);

  useEffect(() => {
    if (!_isOpen && wasPreviouslyOpen) {
      // Use requestAnimationFrame to ensure that the focus is set at the end of the current frame
      requestAnimationFrame(() => {
        const el = datePickerToggleRef.current;
        el && el.focus();
      });
    }
  }, [_isOpen, wasPreviouslyOpen, datePickerToggleRef]);

  const openDatePicker = () => {
    if (!isControlled) {
      setIsOpen(true);
    }

    if (onOpen) {
      onOpen();
    }
  };

  const closeDatePicker = () => {
    if (!isControlled) {
      setIsOpen(false);
    }

    if (onClose) {
      onClose();
    }
  };

  const context = {
    closeDatePicker,
    datePickerId,
    datePickerRef,
    datePickerToggleId,
    datePickerToggleRef,
    direction,
    isOpen: _isOpen,
    openDatePicker,
    placement,
  };

  const styleProps = useDatePickerStyle({});

  useOutsideClick(() => {
    if (_isOpen) {
      closeDatePicker();
    }
  }, nodeRef);

  return (
    <DatePickerProvider value={context}>
      <Box
        ref={combinedRef}
        {...styleProps}
        {...rest}
      >
        {(typeof children === 'function') ? children(context) : children}
      </Box>
    </DatePickerProvider>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;
