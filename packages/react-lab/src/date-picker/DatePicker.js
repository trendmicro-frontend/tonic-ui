import { Box } from '@tonic-ui/react';
import { usePrevious } from '@tonic-ui/react-hooks';
import { ensureString } from 'ensure-type';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import config from '../shared/config';
import useAutoId from '../utils/useAutoId';
import getFocusableElements from '../utils/getFocusableElements';
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
    anchorEl,
    children,
    closeOnBlur = true,
    closeOnSelect = true,
    defaultIsOpen = false,
    isOpen: isOpenProp,
    onBlur,
    onClose,
    onKeyDown,
    onOpen,
    placement = 'bottom-start', // One of: 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'
    usePortal = false, // Pass `true` if you want to render menu in a portal
    ...rest
  },
  ref,
) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const [focusableElements, setFocusableElements] = useState([]);
  const { current: isControlled } = useRef(isOpenProp != null);
  const _isOpen = isControlled ? isOpenProp : isOpen;
  const defaultId = useAutoId();
  const datePickerId = `${config.name}:DatePickerId-${defaultId}`;
  const datePickerToggleId = `${config.name}:DatePickerToggle-${defaultId}`;
  const datePickerRef = useRef(null);
  const datePickerToggleRef = useRef(null);
  const direction = mapPlacementToDirection(placement);

  useEffect(() => {
    if (_isOpen) {
      // Use requestAnimationFrame to ensure that the menu is rendered before we try to focus on it.
      requestAnimationFrame(() => {
        const nextFocusableElements = getFocusableElements(datePickerRef?.current).filter(node => node.getAttribute('role') === 'menuitem');
        setFocusableElements(nextFocusableElements);

        // Init tab index
        nextFocusableElements.forEach((node, index) => (index === 0) && node.setAttribute('tabindex', 0));
      });
    }
  }, [_isOpen]);

  const wasPreviouslyOpen = usePrevious(_isOpen);

  useEffect(() => {
    if (!_isOpen && wasPreviouslyOpen) {
      // Use requestAnimationFrame to ensure that the focus is set at the end of the current frame
      requestAnimationFrame(() => {
        const el = datePickerToggleRef.current;
        el && el.focus();
      });
    }
    if (_isOpen) {
      // Use requestAnimationFrame to ensure that the focus is set at the end of the current frame
      requestAnimationFrame(() => {
        const el = datePickerRef.current;
        el && el.focus();
      });
    }
  }, [_isOpen, datePickerRef, datePickerToggleRef, wasPreviouslyOpen]);

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

    // Reset tab index
    focusableElements.forEach(node => node.setAttribute('tabindex', -1));
  };

  if (anchorEl) {
    datePickerToggleRef.current = anchorEl;
  }

  const context = {
    closeDatePicker,
    closeOnBlur,
    closeOnSelect,
    datePickerId,
    datePickerRef,
    datePickerToggleId,
    datePickerToggleRef,
    direction,
    isOpen: _isOpen,
    onBlur,
    onKeyDown,
    openDatePicker,
    placement,
    usePortal,
  };

  const styleProps = useDatePickerStyle({});

  return (
    <DatePickerProvider value={context}>
      <Box
        ref={ref}
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
