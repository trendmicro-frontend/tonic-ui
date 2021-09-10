import React, { useRef, useState, useEffect } from 'react';
import Box from '../Box';
import InputGroup from '../InputGroup';
import Icon from '../Icon';
import Text from '../Text';
import useTheme from '../useTheme';
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

const today = new Date();
const [DEFAULT_YEAR, DEFAULT_MONTH, DEFAULT_DATE] = dateToStrAry(today);

const DateInput = ({
  defaultValue,
  value: updatedValue,
  maxDate: maxValue,
  minDate: minValue,
  isInvalid,
  disabled = false,
  zIndex = 1,
  onChange = () => {},
  ...rest
}) => {
  const [maxYear, maxMonth, maxDate] = dateToAry(maxValue);
  const [minYear, minMonth, minDate] = dateToAry(minValue);

  const initValAry = dateToStrAry(defaultValue || today);

  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dateRef = useRef(null);
  const [valueAry, setValueAry] = useState(initValAry);
  const [showCalendar, setShowCalendar] = useState(false);
  const [yearVal, monthVal, dateVal] = valueAry;

  const theme = useTheme();
  const font = `${theme.fontSizes.sm} ${theme.fonts.base}`;
  const yearWidth = Math.floor(getTextWidth('8888', font)) || 22;
  const dateWidth = Math.floor(getTextWidth('88', font)) || 11;

  const stylePops = useDateInputStyle({ zIndex });
  const inputErrorProps = useInputErrorStyle();
  const errorProps = isInvalid ? inputErrorProps : {};
  const iconProps = useIconStyle();
  const styleProps = useInputStyle({
    size: defaultSize,
    variant: defaultVariant
  });
  const disabledProps = useDisabledStyle({ disabled });

  useEffect(() => {
    if (valueAry.every((val) => val > 0)) {
      const dateStr = valueAry.join(SEPARATOR);
      const date = convertToDateObj(dateStr);
      const timestamp = getTimestamp(dateStr);

      onChange({ dateStr, date, timestamp });
    }
  }, [valueAry]);

  useEffect(() => {
    if (!!updatedValue && isValidDate(updatedValue)) {
      setValueAry(dateToStrAry(updatedValue));
    }
  }, [updatedValue]);

  const onChangeCell = (targetIdx, value) => {
    setValueAry(
      valueAry.map((oriVal, idx) => (targetIdx === idx ? value : oriVal))
    );
  };

  const onDateSelect = (date) => {
    const dateAry = dateToStrAry(date);
    setShowCalendar(false);
    setValueAry(dateAry);
  };

  const onDisableInput = (e) => {
    if (disabled) {
      return;
    }
    setShowCalendar(true);
  };

  return (
    <Box
      {...stylePops}
      {...disabledProps}
      {...rest}
    >
      <InputGroup
        data-value={valueAry.join(SEPARATOR)}
        onClick={onDisableInput}
        css={[getGroupCSS()]}
        {...styleProps}
        {...errorProps}
      >
        <Icon icon="calendar" {...iconProps} mr="3x" />
        <InputCell
          idx={0}
          ref={yearRef}
          val={yearVal}
          defaultVal={DEFAULT_YEAR}
          disabled={disabled}
          max={maxYear || DEFAULT_YEAR}
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
          defaultVal={DEFAULT_MONTH}
          disabled={disabled}
          max={maxMonth || 12}
          min={minMonth || 1}
          width={dateWidth}
          nextRef={dateRef}
          prevRef={yearRef}
          disableWheelEvent={true}
          onChangeCell={onChangeCell}
        />
        <Text as="span">{SEPARATOR}</Text>
        <InputCell
          idx={2}
          ref={dateRef}
          val={dateVal}
          defaultVal={DEFAULT_DATE}
          disabled={disabled}
          max={maxDate || 31}
          min={minDate || 1}
          width={dateWidth}
          prevRef={monthRef}
          disableWheelEvent={true}
          enterCallback={() => setShowCalendar(false)}
          onChangeCell={onChangeCell}
        />
      </InputGroup>
      <Box
        position="absolute"
        display={showCalendar ? 'block' : 'none'}
        top="8x"
        bottom="0"
      >
        <Calendar
          dateValue={valueAry.join('-')}
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
