import React, { forwardRef, useEffect, useState, useRef } from 'react';
import { Box } from '../box';
import { Icon } from '../icon';
import useOutsideClick from '../hooks/useOutsideClick';
import useForkRef from '../utils/useForkRef';
import Calendar from './Calendar';
import DateInput from './DateInput';
import { isDate } from './utils';

const Datepicker = forwardRef((
  {
    disabled,
    locale = 'en-CA',
    value,
    ...rest
  },
  ref,
) => {
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(nodeRef, ref);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [date, setDate] = useState(value);
  const verifyDate = (value) => {
    if (!value) {
      return;
    }
    setIsInvalid(!isDate(value));
  };
  const handleDateInputChange = (event) => {
    const value = event.target.value;
    setDate(value);
  };
  const handleDateInputClick = () => {
    if (!isCalendarOpen) {
      setIsCalendarOpen(true);
    }
  };
  const handleDateInputKeydown = event => {
    if (isCalendarOpen) {
      setIsCalendarOpen(false);
    }
  };
  const handleCalendarChange = (value) => {
    setIsCalendarOpen(false);
    setDate(value);
  };
  const invalidInputStyle = {
    isInvalid: true,
    pr: '10x',
  };

  useOutsideClick(
    () => {
      setIsCalendarOpen(false);
    },
    nodeRef
  );

  useEffect(() => {
    verifyDate(date);
  }, [date]);

  return (
    <Box
      ref={combinedRef}
      display="inline-flex"
      alignItems="center"
      position="relative"
      {...rest}
    >
      <Box
        display="inline-flex"
        alignItems="center"
        position="relative"
      >
        <DateInput
          disabled={disabled}
          locale={locale}
          value={date}
          onClick={handleDateInputClick}
          onChange={handleDateInputChange}
          onKeyDown={handleDateInputKeydown}
          {...isInvalid && invalidInputStyle}
        />
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
        >
          <Calendar
            value={date}
            locale={locale}
            onChange={handleCalendarChange}
          />
        </Box>
      )}
    </Box>
  );
});

Datepicker.displayName = 'Datepicker';

export default Datepicker;
