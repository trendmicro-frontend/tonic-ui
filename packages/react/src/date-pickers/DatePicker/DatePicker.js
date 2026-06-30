import { useClickOutside, useConst, useEventCallback, useId, useMergeRefs, usePrevious } from '@tonic-ui/react-hooks';
import { callEventHandlers, isNullOrUndefined } from '@tonic-ui/utils';
import { endOfDay, format, isDate, isValid, parse, startOfDay } from 'date-fns';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '../../box';
import { useDefaultProps } from '../../default-props';
import config from '../../shared/config';
import useShallowMemo from '../../utils/useShallowMemo';
import DateCalendar from '../DateCalendar';
import { validateDate } from '../validation';
import DatePickerContent from './DatePickerContent';
import DatePickerToggle from './DatePickerToggle';
import { DatePickerProvider } from './context';
import { useDatePickerStyle } from './styles';

/**
 * Convert a value to a Date object in accordance with the format string.
 */
const mapFormattedValueToDate = (value, formatString, referenceDate = new Date()) => {
  if (typeof value === 'string') {
    try {
      return parse(value, formatString, referenceDate);
    } catch {
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

/**
 * @typedef {Object} DatePickerProps
 * @property {boolean} [closeOnSelect=false] - Determines if the date picker should close automatically after a date is selected.
 * @property {Date|string} [defaultValue] - The default selected date. If the `defaultValue` is a string, it will be parsed to a `Date` object in accordance with the `inputFormat`.
 * @property {boolean} [defaultIsOpen=false] - Whether the date picker is open by default.
 * @property {number} [firstDayOfWeek=0] - The first day of the week. 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday.
 * @property {(date: Date, formatStr: string, options: { locale?: Locale }) => void} [formatDate] - A callback called to return the formatted date string in the given format.
 * @property {string} [inputFormat='yyyy-MM-dd'] - The default date format is ISO 8601 (`yyyy-MM-dd`). You can change the input format in accordance with the locale. The input value will be parsed to a `Date` object with `dd` as day, `MM` as month, and `yyyy` as year.
 * @property {boolean} [isOpen] - If `true`, the date picker will be open.
 * @property {[number, number]} [offset=[0, 0]] - The skidding and distance of the date picker.
 * @property {boolean} [portalled=false] - If `true`, renders the date picker in a portal.
 * @property {Date} [minDate] - The minimum date that can be selected.
 * @property {Date} [maxDate] - The maximum date that can be selected.
 * @property {(date: Date) => void} [onChange] - A callback called when the value (the selected date) changes.
 * @property {() => void} [onClose] - Callback when the date picker is closed.
 * @property {(error: string, date: Date) => void} [onError] - An error-first callback called when the date validation returns an error (or the date is valid after error).
 * @property {() => void} [onOpen] - Callback when the date picker is opened.
 * @property {string} [placement='bottom-start'] - The placement of the date picker. One of: 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'.
 * @property {(props: { error: string | undefined, inputProps: React.HTMLAttributes<HTMLElement> & { ref: React.RefCallback<HTMLElement>, value: string } }) => React.ReactNode} [renderInput] - The `renderInput` prop allows you to customize the rendered input. The `props` argument of this render prop contains props of InputControl that you need to forward.
 * @property {(date: Date) => boolean} [shouldDisableDate] - Disable specific date. Return `true` if the date will be disabled.
 * @property {Date|string} [value] - The selected date. If the `value` is a string, it will be parsed to a `Date` object in accordance with the `inputFormat`.
 */

/**
 * @type {ForwardRefComponent<'div', DatePickerProps>}
 */
const DatePicker = forwardRef((inProps, ref) => {
  const {
    children, // eslint-disable-line no-unused-vars
    closeOnSelect = false, // Note: The default value will be changed to true in the next major release
    defaultIsOpen = false,
    defaultValue: defaultValueProp,
    firstDayOfWeek,
    formatDate,
    inputFormat = 'yyyy-MM-dd',
    isOpen: isOpenProp,
    offset,
    minDate: minDateProp,
    maxDate: maxDateProp,
    onChange: onChangeProp,
    onClose: onCloseProp,
    onError: onErrorProp,
    onOpen: onOpenProp,
    placement = 'bottom-start', // One of: 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'
    portalled,
    renderInput,
    shouldDisableDate,
    value: valueProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'DatePicker' });
  const shallowMemo = useShallowMemo();
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
  const [isOpen, setIsOpen] = useState(isOpenProp ?? defaultIsOpen);
  const previousIsOpen = usePrevious(isOpen);
  const nodeRef = useRef();
  const combinedRef = useMergeRefs(nodeRef, ref);
  const previousInputFormat = usePrevious(inputFormat);

  useEffect(() => {
    const isControlled = (isOpenProp !== undefined);
    if (isControlled) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  const onClose = useCallback(() => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      setIsOpen(false);
    }

    if (typeof onCloseProp === 'function') {
      onCloseProp();
    }
  }, [isOpenProp, onCloseProp]);

  const onOpen = useCallback(() => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      setIsOpen(true);
    }

    if (typeof onOpenProp === 'function') {
      onOpenProp();
    }
  }, [isOpenProp, onOpenProp]);

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onClose, onOpen]);

  useClickOutside(nodeRef, onClose);

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

  const onDateCalendarChange = useCallback((nextDate) => {
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

  const onDateCalendarError = useCallback((error, value) => {
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

  const defaultId = useId();
  const datePickerContentId = `${config.name}:DatePickerContent-${defaultId}`;
  const datePickerToggleId = `${config.name}:DatePickerToggle-${defaultId}`;
  const context = shallowMemo({
    isOpen,
    offset,
    onClose,
    onOpen,
    onToggle,
    placement,
    portalled,
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
          <DateCalendar
            value={mapFormattedValueToDate(value, inputFormat)}
            firstDayOfWeek={firstDayOfWeek}
            formatDate={formatDate}
            minDate={minDate}
            maxDate={maxDate}
            onChange={onDateCalendarChange}
            onError={onDateCalendarError}
            shouldDisableDate={shouldDisableDate}
          />
        </DatePickerContent>
      </Box>
    </DatePickerProvider>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;
