import React, { forwardRef, useEffect, useState, useRef } from 'react';
import Box from '../Box';
import useOutsideClick from '../hooks/useOutsideClick';
import Icon from '../Icon';
import Calendar from './Calendar';
import DateInput from './DateInput';
import {
  isDate,
} from './utils';

const Datepicker = forwardRef((
  {
    disabled,
    locale = 'en-CA',
    value,
    ...rest
  },
  ref,
) => {
  const wrapperRef = useRef(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [date, setDate] = useState(value);
  const verifyDate = (value) => {
    if (!value) {
      return;
    }
    setIsInvalid(!isDate(value));
  };
  const handleBlur = (event) => {
    const value = event.target.value;
    verifyDate(value);
  };

  const handleClick = () => {
    if (isInvalid) {
      // To avoid changing the value do not work when the selected date is the same as previous date by calendar
      setDate('');
    }
    setIsCalendarOpen(true);
  };
  const handleKeydown = event => {
    if (event.key === 'Enter') {
      const value = event.target.value;
      verifyDate(value);
    }
    if (isCalendarOpen) {
      setIsCalendarOpen(false);
    }
  };
  const invalidInputStyle = {
    isInvalid: true,
    pr: '10x',
  };

  useOutsideClick(
    () => {
      setIsCalendarOpen(false);
    },
    wrapperRef
  );

  useEffect(() => {
    verifyDate(date);
  }, [date]);

  return (
    <Box
      ref={wrapperRef}
      display="inline-flex"
      alignItems="center"
      position="relative"
      {...rest}
    >
      <Box
        display="inline-flex"
        position="relative"
        alignItems="center"
      >
        <Box
          onClick={handleClick}
        >
          <DateInput
            disabled={disabled}
            locale={locale}
            value={date}
            onBlur={handleBlur}
            onKeyDown={handleKeydown}
            {...isInvalid && invalidInputStyle}
          />
        </Box>
        {isInvalid && (
          <Box position="absolute" right={0}>
            <Icon icon="warning-circle" mx="3x" color="red:50" />
          </Box>
        )}
      </Box>
      { isCalendarOpen && (
        <Box
          position="absolute"
          top="8x"
          zIndex="popover"
          bg="gray:90"
        >
          <Calendar
            value={date}
            locale={locale}
            onChange={(v) => {
              setIsCalendarOpen(false);
              setDate(v);
              verifyDate(value);
            }}
          />
        </Box>
      )}
    </Box>
  );
});

Datepicker.displayName = 'Datepicker';

export default Datepicker;
