import { ensureArray } from 'ensure-type';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Box from '../Box';
import InputGroup from '../InputGroup';
import Icon from '../Icon';
import Text from '../Text';
import useTheme from '../useTheme';
import useOutsideClick from '../utils/useOutsideClick';
import Calendar from './Calendar/Calendar';
import InputCell from './InputCell';
import {
  getTextWidth, dateToAry, dateToStrAry, convertToDateObj, getTimestamp, isValidDate
} from './utils';
import { SEPARATOR } from './constants';
import {
  useDateInputStyle,
  useInputErrorStyle,
  useIconStyle,
  useInputStyle,
  useDisabledStyle,
  getGroupCSS
} from './styles';

const defaultSize = 'md';
const defaultVariant = 'outline';

const DateInput = ({
  defaultValue,
  value: valueProp,
  maxDate: maxValue,
  minDate: minValue,
  isInvalid,
  disabled = false,
  zIndex = 1,
  onChange = () => {},
  ...rest
}) => {
  const today = new Date();
  const [currentYear, currentMonth, currentDay] = dateToStrAry(today);
  const [maxYear, maxMonth, maxDate] = dateToAry(maxValue);
  const [minYear, minMonth, minDate] = dateToAry(minValue);
  const wrapperRef = useRef(null);
  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const [state, setState] = useState({
    value: dateToStrAry((valueProp ?? defaultValue) ?? today),
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [yearVal, monthVal, dayVal] = ensureArray(state.value);

  const theme = useTheme();
  const font = `${theme.fontSizes.sm} ${theme.fonts.base}`;
  const yearWidth = Math.floor(getTextWidth('8888', font)) || 22;
  const monthWidth = Math.floor(getTextWidth('88', font)) || 11;
  const dayWidth = Math.floor(getTextWidth('88', font)) || 11;

  const stylePops = useDateInputStyle({ zIndex });
  const inputErrorProps = useInputErrorStyle();
  const errorProps = isInvalid ? inputErrorProps : {};
  const iconProps = useIconStyle();
  const styleProps = useInputStyle({
    size: defaultSize,
    variant: defaultVariant,
  });
  const disabledProps = useDisabledStyle({ disabled });
  const showCalendar = useCallback(() => {
    setIsCalendarOpen(true);
  }, [setIsCalendarOpen]);
  const hideCalendar = useCallback(() => {
    setIsCalendarOpen(false);
  }, [setIsCalendarOpen]);

  useEffect(() => {
    if ((valueProp !== undefined) && isValidDate(valueProp)) {
      setState({ value: dateToStrAry(valueProp) });
    }
  }, [valueProp]);

  useEffect(() => {
    if (ensureArray(state.value).every((val) => val > 0) && onChange) {
      const dateStr = ensureArray(state.value).join(SEPARATOR);
      const date = convertToDateObj(dateStr);
      const timestamp = getTimestamp(dateStr);

      onChange({ dateStr, date, timestamp }); // TODO: review props
    }
  }, [onChange, state.value]);

  useOutsideClick(hideCalendar, wrapperRef);

  const onChangeCell = (targetIndex, value) => {
    const nextValue = ensureArray(state.value)
      .map((originalValue, index) => (targetIndex === index ? value : originalValue));

    setState({ value: nextValue });
  };

  const onDateSelect = (date) => {
    hideCalendar();
    setState({ value: dateToStrAry(date) });
  };

  const onClickInput = (e) => {
    if (disabled) {
      return;
    }
    showCalendar();
  };

  return (
    <Box
      ref={wrapperRef}
      {...stylePops}
      {...disabledProps}
      {...rest}
    >
      <InputGroup
        data-value={ensureArray(state.value).join(SEPARATOR)}
        onClick={onClickInput}
        css={[getGroupCSS()]}
        {...styleProps}
        {...errorProps}
      >
        <Icon icon="calendar" {...iconProps} mr="3x" />
        <InputCell
          idx={0}
          ref={yearRef}
          val={yearVal}
          defaultVal={currentYear}
          disabled={disabled}
          max={maxYear || 9999}
          min={minYear || 1}
          width={yearWidth}
          nextRef={monthRef}
          disableWheelEvent={true}
          onChangeCell={onChangeCell}
        />
        <Text as="span">{SEPARATOR}</Text>
        <InputCell
          idx={1}
          ref={monthRef}
          val={monthVal}
          defaultVal={currentMonth}
          disabled={disabled}
          max={maxMonth || 12}
          min={minMonth || 1}
          width={monthWidth}
          nextRef={dayRef}
          prevRef={yearRef}
          disableWheelEvent={true}
          onChangeCell={onChangeCell}
        />
        <Text as="span">{SEPARATOR}</Text>
        <InputCell
          idx={2}
          ref={dayRef}
          val={dayVal}
          defaultVal={currentDay}
          disabled={disabled}
          max={maxDate || 31} // FIXME: update the max value in accordance with the selected year and month
          min={minDate || 1}
          width={dayWidth}
          prevRef={monthRef}
          disableWheelEvent={true}
          enterCallback={hideCalendar}
          onChangeCell={onChangeCell}
        />
      </InputGroup>
      <Box
        position="absolute"
        display={isCalendarOpen ? 'block' : 'none'}
        top="8x"
        bottom="0"
      >
        <Calendar
          dateValue={ensureArray(state.value).join('-')}
          maxDate={maxValue}
          minDate={minValue}
          onSelect={onDateSelect}
        />
      </Box>
    </Box>
  );
};

DateInput.displayName = 'DateInput';

export default DateInput;
