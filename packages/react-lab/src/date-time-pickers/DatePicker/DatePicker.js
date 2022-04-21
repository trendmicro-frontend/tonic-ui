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
const mapFormattedValueToDate = (value, formatString, referenceDate = new Date()) => {
  return (typeof value === 'string')
    ? parse(value, formatString, referenceDate)
    : new Date(value);
};

const DatePicker = forwardRef((
  {
    children, // not used
    defaultValue: defaultValueProp,
    firstDayOfWeek,
    inputFormat = 'yyyy-MM-dd',
    onChange: onChangeProp,
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

  useEffect(() => {
    const isControlled = (valueProp !== undefined);
    if (isControlled) {
      const nextValue = mapFormattedValueToDate(valueProp, inputFormat);
      setValue(nextValue);

      // Update input value
      const inputValue = isValid(nextValue) ? format(nextValue, inputFormat) : '';
      setInputValue(inputValue);
    }
  }, [inputFormat, valueProp]);

  const onChange = useCallback((nextValue) => {
    const isControlled = (valueProp !== undefined);
    if (!isControlled) {
      setValue(nextValue);

      // Update input value
      const inputValue = isValid(nextValue) ? format(nextValue, inputFormat) : '';
      setInputValue(inputValue);
    }

    if (typeof onChangeProp === 'function') {
      onChangeProp(nextValue);
    }
  }, [inputFormat, valueProp, onChangeProp]);

  const handleDateInputBlur = useCallback(() => {
    if (!!inputValue) {
      const nextValue = mapFormattedValueToDate(inputValue, inputFormat);
      setValue(nextValue);
    }
  }, [inputFormat, inputValue]);

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
                cursor: undefined, // Remove cursor style
                onBlur: handleDateInputBlur,
                onChange: handleDateInputChange,
                value: inputValue,
              };

              // Remove "onKeyDown" from inputProps
              delete inputProps.onKeyDown;

              if (typeof renderInput !== 'function') {
                return null;
              }

              return renderInput({
                error,
                inputProps,
                inputValue,
              });
            }}
          </MenuToggle>
          <MenuContent>
            <Calendar
              date={value}
              firstDayOfWeek={firstDayOfWeek}
              onChange={(nextValue) => {
                onChange(nextValue);
                onClose();
              }}
            />
          </MenuContent>
        </>
      )}
    </Menu>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;
