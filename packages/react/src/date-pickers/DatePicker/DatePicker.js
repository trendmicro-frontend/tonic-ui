import { useConst, useEventCallback, useMergeRefs, useOutsideClick, usePrevious, useToggle } from '@tonic-ui/react-hooks';
import { callEventHandlers, isNullOrUndefined } from '@tonic-ui/utils';
import format from 'date-fns/format';
import endOfDay from 'date-fns/endOfDay';
import isDate from 'date-fns/isDate';
import isValid from 'date-fns/isValid';
import parse from 'date-fns/parse';
import startOfDay from 'date-fns/startOfDay';
import memoize from 'micro-memoize';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '../../box';
import config from '../../shared/config';
import useAutoId from '../../utils/useAutoId';
import Calendar from '../Calendar';
import { validateDate } from '../validation';
import DatePickerContent from './DatePickerContent';
import DatePickerToggle from './DatePickerToggle';
import { DatePickerProvider } from './context';
import { useDatePickerStyle } from './styles';

const getMemoizedState = memoize(state => ({ ...state }));

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

  if (isDate(value)) {
    return value;
  }

  return new Date(value);
};

const mapValueToDate = (value) => {
  if (isNullOrUndefined(value)) {
    return null;
  }
  const date = new Date(value);
  return (isDate(date) && isValid(date)) ? date : null;
};

const mapValueToStartOfDay = (value) => {
  const date = mapValueToDate(value);
  return (isDate(date) && isValid(date)) ? startOfDay(date) : null;
};

const mapValueToEndOfDay = (value) => {
  const date = mapValueToDate(value);
  return (isDate(date) && isValid(date)) ? endOfDay(date) : null;
};

const DatePicker = forwardRef((
  {
    children, // not used
    closeOnSelect = false, // Note: The default value will be changed to true in the next major release
    defaultValue: defaultValueProp,
    firstDayOfWeek,
    formatDate,
    inputFormat = 'yyyy-MM-dd',
    offset,
    minDate: minDateProp,
    maxDate: maxDateProp,
    onChange: onChangeProp,
    onError: onErrorProp,
    placement = 'bottom-start', // One of: 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'
    renderInput,
    shouldDisableDate,
    value: valueProp,
    ...rest
  },
  ref,
) => {
  const datePickerContentRef = useRef(null);
  const datePickerToggleRef = useRef(null);
  const initialValue = useConst(() => {
    return mapFormattedValueToDate(valueProp ?? defaultValueProp, inputFormat);
  });
  const [value, setValue] = useState(initialValue);
  const [inputValue, setInputValue] = useState(isValid(value) ? format(value, inputFormat) : '');
  const maxDate = mapValueToEndOfDay(maxDateProp);
  const minDate = mapValueToStartOfDay(minDateProp);
  const [error, setError] = useState();
  const [isOpen, toggleIsOpen] = useToggle(false);
  const previousIsOpen = usePrevious(isOpen);
  const nodeRef = useRef();
  const combinedRef = useMergeRefs(nodeRef, ref);
  const previousInputFormat = usePrevious(inputFormat);
  const onOpen = useEventCallback(() => {
    !isOpen && toggleIsOpen(true);
  }, [isOpen]);
  const onClose = useEventCallback(() => {
    isOpen && toggleIsOpen(false);
  }, [isOpen]);

  useOutsideClick(nodeRef, onClose);

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

  // Perform validation check
  useEffect(() => {
    const validationError = validateDate(value, { maxDate, minDate, shouldDisableDate });
    if (error !== validationError) {
      setError(validationError);
      if (typeof onErrorProp === 'function') {
        onErrorProp(validationError, value);
      }
    }
  }, [error, value, minDate, maxDate, shouldDisableDate, onErrorProp]);

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

    if (closeOnSelect) {
      onClose();
    }
  }, [valueProp, inputFormat, onChangeProp, closeOnSelect, onClose]);

  const onCalendarError = useCallback((error, value) => {
    setError(error);
    if (typeof onErrorProp === 'function') {
      onErrorProp(error, value);
    }
  }, [onErrorProp]);

  const handleDateInputChange = useEventCallback((event) => {
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

  const handleDateInputFocus = useEventCallback((event) => {
    onOpen();
  }, [onOpen]);

  const defaultId = useAutoId();
  const datePickerContentId = `${config.name}:DatePickerContent-${defaultId}`;
  const datePickerToggleId = `${config.name}:DatePickerToggle-${defaultId}`;
  const context = getMemoizedState({
    isOpen,
    offset,
    onClose,
    onOpen,
    placement,
    datePickerContentId,
    datePickerContentRef,
    datePickerToggleId,
    datePickerToggleRef,
  });
  const styleProps = useDatePickerStyle({});

  return (
    <DatePickerProvider value={context}>
      <Box
        ref={combinedRef}
        {...styleProps}
        {...rest}
      >
        <DatePickerToggle>
          {({ getDatePickerToggleProps }) => {
            const datePickerToggleProps = getDatePickerToggleProps();
            const inputProps = {
              ...datePickerToggleProps,
              cursor: undefined, // Remove cursor style
              onChange: callEventHandlers(
                handleDateInputChange,
                datePickerToggleProps?.onChange,
              ),
              onFocus: callEventHandlers(
                handleDateInputFocus,
                datePickerToggleProps?.onFocus,
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
        </DatePickerToggle>
        <DatePickerContent>
          <Calendar
            date={mapFormattedValueToDate(value, inputFormat)}
            firstDayOfWeek={firstDayOfWeek}
            formatDate={formatDate}
            minDate={minDate}
            maxDate={maxDate}
            onChange={onCalendarChange}
            onError={onCalendarError}
            shouldDisableDate={shouldDisableDate}
          />
        </DatePickerContent>
      </Box>
    </DatePickerProvider>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;
