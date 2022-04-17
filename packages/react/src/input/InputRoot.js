import React, { forwardRef, useCallback, useRef } from 'react';
import { Box } from '../box';
import useForkRef from '../utils/useForkRef';
import InputBase from './InputBase';
import { getInputGroupCSS, useInputRootBaseStyle, useInputRootInputStyle } from './styles';
import useInputGroup from './useInputGroup';

const defaultSize = 'md';
const defaultVariant = 'outline';

const InputRoot = forwardRef((
  {
    // Input (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
    autoComplete: autoCompleteProp,
    autoFocus: autoFocusProp,
    checked: checkedProp,
    defaultValue: defaultValueProp,
    disabled: disabledProp,
    id: idProp,
    list: listProp,
    max: maxProp,
    maxlength: maxLengthProp,
    min: minProp,
    minlength: minLengthProp,
    multiple: multipleProp,
    name: nameProp,
    onBlur: onBlurProp,
    onChange: onChangeProp,
    onClick: onClickProp,
    onFocus: onFocusProp,
    pattern: patternProp,
    placeholder: placeholderProp,
    readOnly: readOnlyProp,
    required: requiredProp,
    spellcheck: spellcheckProp,
    step: stepProp,
    type: typeProp,
    value: valueProp,

    // InputRoot
    children,
    css: cssProp,
    endAdornment,
    inputComponent: InputComponent = InputBase,
    inputProps,
    inputRef: inputRefProp,
    isInvalid,
    size: sizeProp,
    startAdornment,
    variant: variantProp,
    ...rest
  },
  ref,
) => {
  const inputRef = useRef();
  const combinedInputRef = useForkRef(inputRefProp, inputRef);
  const inputGroupContext = useInputGroup();
  const {
    size: inputGroupSize,
    variant: inputGroupVariant,
  } = { ...inputGroupContext };
  const size = (sizeProp ?? inputGroupSize) ?? defaultSize;
  const variant = (variantProp ?? inputGroupVariant) ?? defaultVariant;
  const baseStyleProps = useInputRootBaseStyle({ variant });
  const inputStyleProps = useInputRootInputStyle({ size, variant, startAdornment, endAdornment });
  const css = inputGroupContext ? [getInputGroupCSS({ variant }), cssProp] : cssProp;
  const handleClick = useCallback((event) => {
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }

    if (typeof onClickProp === 'function') {
      onClickProp(event);
    }
    if (typeof inputProps?.onClick === 'function') {
      inputProps?.onClick(event);
    }
  }, [onClickProp, inputProps]);

  const handleBlur = useCallback((event) => {
    if (typeof onBlurProp === 'function') {
      onBlurProp(event);
    }
    if (typeof inputProps?.onBlur === 'function') {
      inputProps?.onBlur(event);
    }
  }, [onBlurProp, inputProps]);

  const handleChange = useCallback((event) => {
    if (typeof onChangeProp === 'function') {
      onChangeProp(event);
    }
    if (typeof inputProps?.onChange === 'function') {
      inputProps?.onChange(event);
    }
  }, [onChangeProp, inputProps]);

  const handleFocus = useCallback((event) => {
    if (typeof onFocusProp === 'function') {
      onFocusProp(event);
    }
    if (typeof inputProps?.onFocus === 'function') {
      inputProps?.onFocus(event);
    }
  }, [onFocusProp, inputProps]);

  const getInputProps = () => ({
    autoComplete: autoCompleteProp,
    autoFocus: autoFocusProp,
    checked: checkedProp,
    defaultValue: defaultValueProp,
    disabled: disabledProp,
    id: idProp,
    list: listProp,
    max: maxProp,
    maxlength: maxLengthProp,
    min: minProp,
    minlength: minLengthProp,
    multiple: multipleProp,
    name: nameProp,
    pattern: patternProp,
    placeholder: placeholderProp,
    readOnly: readOnlyProp,
    required: requiredProp,
    spellcheck: spellcheckProp,
    step: stepProp,
    type: typeProp,
    value: valueProp,
    ...inputStyleProps,
    ...inputProps,
    ref: combinedInputRef,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
  });

  return (
    <Box
      ref={ref}
      css={css}
      onClick={handleClick}
      {...baseStyleProps}
      {...rest}
    >
      {startAdornment}
      {(typeof children === 'function') ? children({ getInputProps }) : (<InputComponent {...getInputProps()} />)}
      {endAdornment}
    </Box>
  );
});

InputRoot.displayName = 'InputRoot';

export default InputRoot;
