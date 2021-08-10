import React, { useRef, useState, useEffect } from 'react';

import Box from '../Box';
import InputGroup from '../InputGroup';
import Icon from '../Icon';
import Text from '../Text';
import useTheme from '../useTheme';

import Calendar from './Calendar/Calendar';
import InputCell from './InputCell';
import { getTextWidth } from './utils';
import { useInputErrorStyle, useIconStyle, useInputStyle } from './styles';

const defaultSize = 'md';
const defaultVariant = 'outline';

const DEFAULT_YEAR = '1900';
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
  const [initYear, initMonth, initDate] = initValAry;

  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dateRef = useRef(null);
  const [valueAry, setValueAry] = useState(initValAry);
  const [showCalendar, setShowCalendar] = useState(false);

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
    setShowCalendar(false);
  };

  return (
    <Box position="relative">
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
          initVal={initYear}
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
          initVal={initMonth}
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
          initVal={initDate}
          defaultVal={DEFAULT_DATE}
          max={31}
          width={dateWidth}
          prevRef={monthRef}
          onChangeCell={onChangeCell}
        />
      </InputGroup>
      { showCalendar && (
        <Box position="absolute" top="0" bottom="0">
          <Calendar onSelect={onDateSelect} />
        </Box>
      )}
    </Box>
  );
};

DateInput.displayName = 'DateInput';

export default DateInput;
