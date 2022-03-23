import {
  InputBase,
} from '@tonic-ui/react';
import React, { forwardRef, useState } from 'react';

const TagCreator = forwardRef((
  {
    onBlur,
    onCreate,
    onChange,
    onKeyUp,
    onPaste,
    ...reset
  },
  ref
) => {
  const [inputValue, setInputValue] = useState('');

  const createTags = (values) => {
    if (typeof onCreate === "function") {
      onCreate(values);
    }
    setInputValue('');
  };
  const handleInputBlur = (e) => {
    e.stopPropagation();
    const value = e.target.value;
    if (value) {
      createTags([value]);
    }
    if (typeof onBlur === "function") {
      onBlur(e);
    }
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (typeof onChange === "function") {
      onChange(e);
    }
  };
  const handleInputKeyUp = (e) => {
    const keyCode = e.keyCode;
    let value = e.target.value;
    if (keyCode === 13) { // Enter
      createTags([value]);
    }
    if (keyCode === 186 || keyCode === 188) { // Semicolon(;) or Comma(,)
      value = value.substring(0, value.length - 1);
      createTags([value]);
    }
    if (keyCode === 27) { // Esc
      setInputValue('');
    }
    if (typeof onKeyUp === "function") {
      onKeyUp(e);
    }
  };
  const handleInputPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const separatedValues = pastedData.split(
      new RegExp([',', ';', '\n', '\r', '\r\n'].join('|'))
    );
    createTags(separatedValues);
    if (typeof onPaste === "function") {
      onPaste(e);
    }
  };

  return (
    <InputBase
      ref={ref}
      value={inputValue}
      onBlur={handleInputBlur}
      onChange={handleInputChange}
      onKeyUp={handleInputKeyUp}
      onPaste={handleInputPaste}
      {...reset}
    />
  );
});

TagCreator.displayName = 'TagCreator';

export default TagCreator;
