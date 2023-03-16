import { useMergeRefs } from '@tonic-ui/react-hooks';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '../box';
import InputBase from './InputBase';
import { defaultSize, defaultVariant } from './constants';
import { getInputGroupCSS, useInputControlBaseCSS, useInputControlBaseStyle, useInputControlInputStyle } from './styles';
import useInputGroup from './useInputGroup';

const InputControl = forwardRef((
  {
    // InputBase (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
    autoComplete: autoCompleteProp,
    autoFocus: autoFocusProp,
    checked: checkedProp,
    defaultValue: defaultValueProp,
    disabled: disabledProp,
    error: errorProp,
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
    size: sizeProp,
    startAdornment,
    variant: variantProp,
    ...rest
  },
  ref,
) => {
  const nodeRef = useRef();
  const combinedInputRef = useMergeRefs(nodeRef, inputRefProp);
  const [focused, setFocused] = useState(false);
  const [valid, setValid] = useState(true);
  const inputGroupContext = useInputGroup();
  const {
    size: inputGroupSize,
    variant: inputGroupVariant,
  } = { ...inputGroupContext };
  const size = (sizeProp ?? inputGroupSize) ?? defaultSize;
  const variant = (variantProp ?? inputGroupVariant) ?? defaultVariant;
  const inputState = {
    disabled: disabledProp,
    focused,
    valid: !!valid && !errorProp,
  };
  const baseCSS = useInputControlBaseCSS({ variant });
  const baseStyleProps = useInputControlBaseStyle({ inputState, size, variant });
  const inputStyleProps = useInputControlInputStyle({ inputState, size, variant, startAdornment, endAdornment });
  const css = inputGroupContext
    ? [baseCSS, getInputGroupCSS({ variant }), cssProp]
    : [baseCSS, cssProp];

  const handleClick = useCallback((event) => {
    if (nodeRef.current && event.currentTarget === event.target) {
      nodeRef.current.focus();
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

    setFocused(false);
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

    setFocused(true);
  }, [onFocusProp, inputProps]);

  // The blur won't fire when the disabled state is set on a focused input.
  // We need to set the focused state to false and call the onBlur callback manually.
  useEffect(() => {
    if (disabledProp && focused) {
      setFocused(false);
      handleBlur();
    }
  }, [disabledProp, focused, handleBlur]);

  // Observe the validity of the input
  const el = nodeRef.current;

  useEffect(() => {
    if (!el) {
      // No element to observe
      return;
    }

    const MutationObserver = window?.MutationObserver ?? window?.WebKitMutationObserver;
    if (typeof MutationObserver !== 'function') {
      return;
    }

    const update = () => {
      const nextValid = el.validity?.valid;
      if (nextValid !== valid) {
        setValid(nextValid);
      }
    };
    const observer = new MutationObserver((mutations) => {
      update();
    });
    const config = {
      attributes: true,
      attributeFilter: ['value'],
    };
    observer.observe(el, config);

    update();

    return () => { // eslint-disable-line consistent-return
      observer.disconnect();
    };
  }, [el, valid]);

  const getInputProps = () => ({
    autoComplete: autoCompleteProp,
    autoFocus: autoFocusProp,
    checked: checkedProp,
    defaultValue: defaultValueProp,
    disabled: disabledProp,
    error: errorProp,
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

InputControl.displayName = 'InputControl';

export default InputControl;
