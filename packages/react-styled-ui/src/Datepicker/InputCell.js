import React, { useState, useEffect, forwardRef } from 'react';
import InputBase from '../InputBase';

const cancelWheel = (e) => e.preventDefault();

const InputCell = forwardRef(
  (
    {
      idx,
      val,
      defaultVal,
      max,
      min = 0,
      width,
      nextRef = null,
      prevRef = null,
      onChangeCell
    },
    ref
  ) => {
    const START_POSITION = 0;
    const END_POSITION = defaultVal.length;
    const [value, setValue] = useState(val);
    const [curPosition, setCurPosition] = useState(0);
    const [isRange, setIsRange] = useState(false);

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

    const formattedValue = (valueStr, isPadEnd = false) => {
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
      setValue(+value <= min ? `${max}` : formattedValue(`${+value - 1}`));
    };

    const decreaseValue = () => {
      setValue(+value >= max ? defaultVal : formattedValue(`${+value + 1}`));
    };

    const onChange = (e) => {
      const { value: inputValue, selectionStart } = e.target;
      const trimValue = formattedValue(inputValue, true);
      const isValid = +trimValue >= min && +trimValue <= max;
      if (isValid) {
        setValue(trimValue);
        setCurPosition(selectionStart);
        return;
      }
      if (!isValid && isRange) {
        setValue(formattedValue(inputValue[0]));
        setCurPosition(END_POSITION);
        return;
      }
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
      default:
        break;
      }
    };

    const onFocus = (e) => {
      const { selectionStart, selectionEnd } = e.target;
      setIsRange(selectionStart !== selectionEnd);
    };

    const onWheel = (e) => {
      const isUp = e.deltaY < 0;
      isUp ? increaseValue() : decreaseValue();
    };

    return (
      <InputBase
        ref={ref}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onMouseEnter={() => document.body.addEventListener('wheel', cancelWheel, { passive: false })}
        onMouseLeave={() => document.body.removeEventListener('wheel', cancelWheel)}
        onWheel={onWheel}
        textAlign="center"
        width={width}
        __selection={{
          color: 'white:primary',
          backgroundColor: 'blue:60'
        }}
      />
    );
  }
);

export default InputCell;
