import React, { useRef, useState, useEffect } from 'react';
import InputGroup from '../InputGroup';
import Icon from '../Icon';
import Text from '../Text';
import useTheme from '../useTheme';

import InputCell from './InputCell';
import { getTextWidth } from './utils';
import { useInputErrorStyle, useIconStyle, useInputStyle } from './styles';

const defaultSize = 'md';
const defaultVariant = 'outline';
const DEFAULT_VALUE = '00';

const TimeInput = ({
    value,
    isInvalid,
    onChange = () => {},
    ...rest
  }) => {
  const SEPARATOR = ':';
  const initValAry = value?.split(SEPARATOR) || [
    DEFAULT_VALUE,
    DEFAULT_VALUE,
    DEFAULT_VALUE
  ];
  const [initHour, initMinute, initSecond] = initValAry;

  const theme = useTheme();
  const font = `${theme.fontSizes.sm} ${theme.fonts.base}`;
  const inputWidth = Math.floor(getTextWidth('88', font)) || 11;

  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);
  const [valueAry, setValueAry] = useState(initValAry);

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

  return (
    <InputGroup
      data-value={valueAry.join(SEPARATOR)}
      {...styleProps}
      {...errorStyle}
      {...rest}
    >
      <Icon icon="clock" {...iconStyle} mr="3x" />
      <InputCell
        idx={0}
        ref={hourRef}
        initVal={initHour}
        defaultVal={DEFAULT_VALUE}
        max={23}
        width={inputWidth}
        nextRef={minuteRef}
        onChangeCell={onChangeCell}
      />
      <Text as="span">{SEPARATOR}</Text>
      <InputCell
        idx={1}
        ref={minuteRef}
        initVal={initMinute}
        defaultVal={DEFAULT_VALUE}
        max={59}
        width={inputWidth}
        nextRef={secondRef}
        prevRef={hourRef}
        onChangeCell={onChangeCell}
      />
      <Text as="span">{SEPARATOR}</Text>
      <InputCell
        idx={2}
        ref={secondRef}
        initVal={initSecond}
        defaultVal={DEFAULT_VALUE}
        max={59}
        width={inputWidth}
        prevRef={minuteRef}
        onChangeCell={onChangeCell}
      />
    </InputGroup>
  );
};

TimeInput.displayName = 'TimeInput';

export default TimeInput;
