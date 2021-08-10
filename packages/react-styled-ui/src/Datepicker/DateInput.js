import React, { useRef, useState, useEffect } from 'react';

import Box from '../Box';
import InputGroup from '../InputGroup';
import Icon from '../Icon';
import Text from '../Text';
import useTheme from '../useTheme';

import Calendar from './Calendar/Calendar';
import InputCell from './InputCell';
import { getTextWidth, dateToAry } from './utils';
import { useInputErrorStyle, useIconStyle, useInputStyle } from './styles';

const defaultSize = 'md';
const defaultVariant = 'outline';

const DEFAULT_YEAR = '2020';
const DEFAULT_DATE = '01';
const DateInput = ({
  value,
  isInvalid,
  onChange = () => {},
  ...rest
}) => {
  const SEPARATOR = '-';
  const MAX_YEAR = String(new Date().getFullYear());
  const initValAry = value?.split(SEPARATOR) || [DEFAULT_YEAR, DEFAULT_DATE, DEFAULT_DATE];

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

  const inputErrorStyle = useInputErrorStyle();
  const errorStyle = isInvalid ? inputErrorStyle : {};
  const iconStyle = useIconStyle();
  const styleProps = useInputStyle({
    size: defaultSize,
    variant: defaultVariant
  });

  useEffect(() => {
    onChange(valueAry.join(SEPARATOR));
  });

  const onChangeCell = (targetIdx, value) => {
    setValueAry(
      valueAry.map((oriVal, idx) => (targetIdx === idx ? value : oriVal))
    );
  };

  const onDateSelect = (date) => {
    const dateAry = dateToAry(date).map(item => item
      .toString()
      .padStart(DEFAULT_DATE.length, 0));
    setShowCalendar(false);
    setValueAry(dateAry);
  };

  return (
    <Box position="relative" zIndex="1">
      <InputGroup
        data-value={valueAry.join(SEPARATOR)}
        onClick={() => setShowCalendar(true)}
        {...styleProps}
        {...errorStyle}
        {...rest}
      >
        <Icon icon="calendar" {...iconStyle} mr="3x" />
        <InputCell
          idx={0}
          ref={yearRef}
          val={yearVal}
          defaultVal={DEFAULT_YEAR}
          max={MAX_YEAR}
          width={yearWidth}
          nextRef={monthRef}
          onChangeCell={onChangeCell}
        />
        <Text as="span">{SEPARATOR}</Text>
        <InputCell
          idx={1}
          ref={monthRef}
          val={monthVal}
          defaultVal={DEFAULT_DATE}
          max={12}
          width={dateWidth}
          nextRef={dateRef}
          prevRef={yearRef}
          onChangeCell={onChangeCell}
        />
        <Text as="span">{SEPARATOR}</Text>
        <InputCell
          idx={2}
          ref={dateRef}
          val={dateVal}
          defaultVal={DEFAULT_DATE}
          max={31}
          width={dateWidth}
          prevRef={monthRef}
          onChangeCell={onChangeCell}
        />
      </InputGroup>
      { showCalendar && (
        <Box
          position="absolute"
          top="8x"
          bottom="0"
        >
          <Calendar startDate={valueAry.join('-')} onSelect={onDateSelect} />
        </Box>
      )}
    </Box>
  );
};

DateInput.displayName = 'DateInput';

export default DateInput;
