import React, { useRef, useState, useEffect } from 'react';
import InputGroup from '../InputGroup';
import Icon from '../Icon';
import Text from '../Text';
import useTheme from '../useTheme';
import InputCell from './InputCell';
import { getTextWidth } from './utils';
import {
  useInputErrorStyle,
  useIconStyle,
  useInputStyle,
  useDisabledStyle,
  getGroupCSS
} from './styles';

const defaultSize = 'md';
const defaultVariant = 'outline';
const DEFAULT_VALUE = '00';

const TimeInput = ({
  dateValue,
  isInvalid,
  disabled = false,
  zIndex = 'auto',
  onChange = () => {},
  ...rest
}) => {
  const SEPARATOR = ':';
  const initValAry = dateValue?.split(SEPARATOR) || [
    DEFAULT_VALUE,
    DEFAULT_VALUE,
    DEFAULT_VALUE,
  ];

  const theme = useTheme();
  const font = `${theme.fontSizes.sm} ${theme.fonts.base}`;
  const inputWidth = Math.floor(getTextWidth('88', font)) || 11;

  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);
  const [valueAry, setValueAry] = useState(initValAry);
  const [hourVal, minuteVal, secondVal] = initValAry;

  const inputErrorProps = useInputErrorStyle();
  const errorProps = isInvalid ? inputErrorProps : {};
  const iconProps = useIconStyle();
  const styleProps = useInputStyle({
    size: defaultSize,
    variant: defaultVariant
  });
  const disabledProps = useDisabledStyle({ disabled });

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
      css={[getGroupCSS()]}
      zIndex={zIndex}
      {...styleProps}
      {...errorProps}
      {...disabledProps}
      {...rest}
    >
      <Icon icon="clock" {...iconProps} mr="3x" />
      <InputCell
        idx={0}
        ref={hourRef}
        val={hourVal}
        defaultVal={DEFAULT_VALUE}
        disabled={disabled}
        max={23}
        width={inputWidth}
        nextRef={minuteRef}
        onChangeCell={onChangeCell}
      />
      <Text as="span">{SEPARATOR}</Text>
      <InputCell
        idx={1}
        ref={minuteRef}
        val={minuteVal}
        defaultVal={DEFAULT_VALUE}
        disabled={disabled}
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
        val={secondVal}
        defaultVal={DEFAULT_VALUE}
        disabled={disabled}
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
