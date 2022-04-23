import { useConst, useEventCallback, usePrevious, useToggle } from '@tonic-ui/react-hooks';
import chainedFunction from 'chained-function';
import format from 'date-fns/format';
import isValid from 'date-fns/isValid';
import parse from 'date-fns/parse';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import Menu from './Menu';
import MenuContent from './MenuContent';
import MenuToggle from './MenuToggle';
import isNullOrUndefined from '../../utils/isNullOrUndefined';
import useForkRef from '../../utils/useForkRef';
import Calendar from '../Calendar';
import useOutsideClick from './useOutsideClick';

/**
 * Convert a value to a Date object in accordance with the format string.
 */
const mapFormattedValueToDate = (value, formatString, referenceDate = new Date()) => {
  if (typeof value === 'string') {
    try {
      return parse(value, formatString, referenceDate);
    } catch (e) {
      return new Date(''); // Invalid Date
    }
  }

  if (isNullOrUndefined(value)) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  return new Date(value);
};

const DatePicker = forwardRef((
  {
    children, // not used
    defaultValue: defaultValueProp,
    firstDayOfWeek,
    inputFormat = 'yyyy-MM-dd',
    onChange: onChangeProp,
    onError: onErrorProp,
    renderInput,
    value: valueProp,
    ...rest
  },
  ref,
) => {
  const initialValue = useConst(() => {
    return mapFormattedValueToDate(valueProp ?? defaultValueProp, inputFormat);
  });
  const [value, setValue] = useState(initialValue);
  const [inputValue, setInputValue] = useState(isValid(value) ? format(value, inputFormat) : '');
  const [isOpen, toggleIsOpen] = useToggle(false);
  const previousIsOpen = usePrevious(isOpen);
  const nodeRef = useRef();
  const combinedRef = useForkRef(nodeRef, ref);
  const previousInputFormat = usePrevious(inputFormat);
  const onOpen = useEventCallback(() => {
    !isOpen && toggleIsOpen(true);
  }, [isOpen]);
  const onClose = useEventCallback(() => {
    isOpen && toggleIsOpen(false);
  }, [isOpen]);

  useOutsideClick(onClose, nodeRef);

  // Check if the value prop has changed
  useEffect(() => {
    const isControlled = (valueProp !== undefined);
    if (isControlled) {
      const nextValue = mapFormattedValueToDate(valueProp, inputFormat);
      setValue(nextValue);

      // Update input value when the date picker is not open
      if (!isOpen) {
        // Keep original input value if the date picker is previously open
        const fallbackInputValue = previousIsOpen ? inputValue : '';
        const nextInputValue = isValid(nextValue) ? format(nextValue, inputFormat) : fallbackInputValue;
        setInputValue(nextInputValue);
      }
    }
  }, [valueProp, inputFormat, inputValue, isOpen, previousIsOpen]);

  // Check if the input format has changed
  useEffect(() => {
    if (inputFormat !== previousInputFormat) {
      const nextInputValue = isValid(value) ? format(value, inputFormat) : '';
      setInputValue(nextInputValue);
    }
  }, [isOpen, value, inputFormat, previousInputFormat]);

  const onCalendarChange = useCallback((nextDate) => {
    const isControlled = (valueProp !== undefined);
    if (!isControlled) {
      setValue(nextDate);
    }

    if (isValid(nextDate)) {
      setInputValue(format(nextDate, inputFormat));
    }

    if (typeof onChangeProp === 'function') {
      onChangeProp(nextDate);
    }
  }, [valueProp, inputFormat, onChangeProp]);

  const onCalendarError = useCallback((error, value) => {
    if (typeof onErrorProp === 'function') {
      onErrorProp(error, value);
    }
  }, [onErrorProp]);

  const handleDateInputChange = useCallback((event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    const nextValue = mapFormattedValueToDate(inputValue, inputFormat);
    const isControlled = (valueProp !== undefined);

    if (!isControlled) {
      setValue(nextValue);
    }

    if (typeof onChangeProp === 'function') {
      onChangeProp(nextValue);
    }
  }, [inputFormat, valueProp, onChangeProp]);

  const handleDateInputFocus = useCallback((event) => {
    onOpen();
  }, [onOpen]);

  return (
    <Menu
      ref={combinedRef}
      {...rest}
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
    >
      <MenuToggle>
        {({ getMenuToggleProps }) => {
          const error = !isValid(mapFormattedValueToDate(value, inputFormat));
          const menuToggleProps = getMenuToggleProps();
          const inputProps = {
            ...menuToggleProps,
            cursor: undefined, // Remove cursor style
            onChange: chainedFunction(
              handleDateInputChange,
              menuToggleProps?.onChange,
            ),
            onFocus: chainedFunction(
              handleDateInputFocus,
              menuToggleProps?.onFocus,
            ),
            value: inputValue,
          };

          if (typeof renderInput !== 'function') {
            return null;
          }

          return renderInput({
            error,
            inputProps,
          });
        }}
      </MenuToggle>
      <MenuContent>
        <Calendar
          date={mapFormattedValueToDate(value, inputFormat)}
          firstDayOfWeek={firstDayOfWeek}
          onChange={onCalendarChange}
          onError={onCalendarError}
        />
      </MenuContent>
    </Menu>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;
