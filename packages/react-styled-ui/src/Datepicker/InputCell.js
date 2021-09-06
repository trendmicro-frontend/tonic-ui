import React, { useState, useEffect, forwardRef } from 'react';
import InputBase from '../InputBase';

import { useInputCellStyle } from './styles';

const cancelWheel = (e) => e.preventDefault();

const InputCell = forwardRef(
  (
    {
      idx,
      val,
      defaultVal,
      disabled,
      max,
      min = 0,
      width,
      nextRef = null,
      prevRef = null,
      disableWheelEvent = false,
      enterCallback,
      onChangeCell
    },
    ref
  ) => {
    const START_POSITION = 0;
    const END_POSITION = defaultVal.length;
    const [value, setValue] = useState(val);
    const [curPosition, setCurPosition] = useState(0);
    const [isRange, setIsRange] = useState(false);
    const styleProps = useInputCellStyle({ width, disabled });
    useEffect(() => {
      if (curPosition === END_POSITION && nextRef) {
        nextRef.current.focus();
        nextRef.current.setSelectionRange(START_POSITION, START_POSITION);
        setCurPosition(-1);
      } else if (curPosition >= START_POSITION) {
        ref.current.setSelectionRange(curPosition, curPosition);
      }
    }, [curPosition]);

    useEffect(() => {
      onChangeCell(idx, value);
    }, [value]);

    useEffect(() => {
      setValue(val);
    }, [val]);

    const normalizeValue = (valueStr, isPadEnd = false) => {
      const PAD_STR = '0';
      const VAL_LEN = defaultVal.length;
      const trimValue = valueStr
        .replace(/[^\d+]/g, '')
        .slice(START_POSITION, END_POSITION);
      return isPadEnd
        ? trimValue.padEnd(VAL_LEN, PAD_STR)
        : trimValue.padStart(VAL_LEN, PAD_STR);
    };

    const increaseValue = () => {
      setValue(+value <= +min ? `${max}` : normalizeValue(`${+value - 1}`));
    };

    const decreaseValue = () => {
      setValue(+value >= +max ? defaultVal : normalizeValue(`${+value + 1}`));
    };

    const onChange = (e) => {
      const { value: inputValue, selectionStart } = e.target;
      const trimValue = normalizeValue(inputValue, true);
      const isValid = +trimValue >= +min && +trimValue <= +max;
      if (isValid) {
        setValue(trimValue);
        setCurPosition(selectionStart);
        return;
      }
      if (!isValid && isRange) {
        setValue(normalizeValue(inputValue[0]));
        setCurPosition(END_POSITION);
        return;
      }
      isRange && setIsRange(false);
      setCurPosition(selectionStart);
    };
    const onKeyDown = (e) => {
      const { key, target } = e;
      const { selectionStart } = target;
      const isStartIdx = selectionStart === START_POSITION;
      const isEndIdx = selectionStart === END_POSITION;

      switch (key) {
      case 'ArrowLeft':
      case 'Backspace':
        isStartIdx && prevRef && prevRef.current.focus();
        break;
      case 'ArrowRight':
        isEndIdx && nextRef && nextRef.current.focus();
        break;
      case 'ArrowDown':
        increaseValue();
        break;
      case 'ArrowUp':
        decreaseValue();
        break;
      case 'Enter':
        enterCallback && enterCallback();
        break;
      default:
        break;
      }
    };

    const onFocus = (e) => {
      const { selectionStart, selectionEnd } = e.target;
      setIsRange(selectionStart !== selectionEnd);
    };

    const onWheel = (e) => {
      if (disableWheelEvent) {
        return;
      }
      const isUp = e.deltaY < 0;
      isUp ? increaseValue() : decreaseValue();
    };

    return (
      <InputBase
        ref={ref}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onMouseEnter={() => document.body.addEventListener('wheel', cancelWheel, { passive: false })}
        onMouseLeave={() => document.body.removeEventListener('wheel', cancelWheel)}
        onWheel={onWheel}
        {...styleProps}
      />
    );
  }
);

export default InputCell;
