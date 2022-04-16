import {
  Menu,
  MenuContent,
  MenuToggle,
} from '@tonic-ui/react';
import { useConst } from '@tonic-ui/react-hooks';
import format from 'date-fns/format';
import isValid from 'date-fns/isValid';
import parse from 'date-fns/parse';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import Calendar from '../Calendar';

/**
 * Convert a value to a Date object in accordance with the format string.
 */
const mapValueToDate = (value, formatString, referenceDate = new Date()) => {
  return (typeof value === 'string')
    ? parse(value, formatString, referenceDate)
    : new Date(value);
};

const DatePicker = forwardRef((
  {
    children, // not used
    dateFormat = 'yyyy-MM-dd',
    defaultValue: defaultValueProp,
    firstDayOfWeek,
    onChange: onChangeProp,
    renderInput,
    value: valueProp,
    ...rest
  },
  ref,
) => {
  const initialValue = useConst(() => {
    return mapValueToDate(valueProp ?? defaultValueProp, dateFormat);
  });
  const [value, setValue] = useState(initialValue);
  const [inputValue, setInputValue] = useState(isValid(value) ? format(value, dateFormat) : '');

  useEffect(() => {
    const isControlled = (valueProp !== undefined);
    if (isControlled) {
      const nextValue = mapValueToDate(valueProp, dateFormat);
      setValue(nextValue);

      // Update input value
      const inputValue = isValid(nextValue) ? format(nextValue, dateFormat) : '';
      setInputValue(inputValue);
    }
  }, [dateFormat, valueProp]);

  const onChange = useCallback((nextValue) => {
    const isControlled = (valueProp !== undefined);
    if (!isControlled) {
      setValue(nextValue);

      // Update input value
      const inputValue = isValid(nextValue) ? format(nextValue, dateFormat) : '';
      setInputValue(inputValue);
    }

    if (typeof onChangeProp === 'function') {
      onChangeProp(nextValue);
    }
  }, [dateFormat, valueProp, onChangeProp]);

  const handleDateInputBlur = useCallback(() => {
    if (!!inputValue) {
      const nextValue = mapValueToDate(inputValue, dateFormat);
      setValue(nextValue);
    }
  }, [dateFormat, inputValue]);

  const handleDateInputChange = useCallback((event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  }, []);

  return (
    <Menu
      ref={ref}
      {...rest}
    >
      {({ onClose }) => (
        <>
          <MenuToggle>
            {({ getMenuToggleProps }) => {
              const error = !isValid(value);
              const inputProps = {
                ...getMenuToggleProps(),
                onBlur: handleDateInputBlur,
                onChange: handleDateInputChange,
                value: inputValue,
              };

              // Remove "onKeyDown" from inputProps
              delete inputProps.onKeyDown;

              return renderInput({
                error,
                inputProps,
                inputValue,
              });
            }}
          </MenuToggle>
          <MenuContent>
            <Calendar
              dateFormat={dateFormat}
              firstDayOfWeek={firstDayOfWeek}
              onChange={(nextValue) => {
                onChange(nextValue);
                onClose();
              }}
              value={value}
            />
          </MenuContent>
        </>
      )}
    </Menu>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;
