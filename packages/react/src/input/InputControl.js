import { useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';
import { callEventHandlers, warnDeprecatedProps } from '@tonic-ui/utils';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import useSlot from '../utils/useSlot';
import InputBase from './InputBase';
import { defaultSize, defaultVariant } from './constants';
import { getInputGroupCSS, useInputControlBaseCSS, useInputControlBaseStyle, useInputControlInputStyle } from './styles';
import useInputGroup from './useInputGroup';

const InputControl = forwardRef((inProps, ref) => {
  const {
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
    inputComponent, // deprecated
    inputProps, // deprecated
    inputRef: inputRefProp,
    size: sizeProp,
    slots = {},
    slotProps = {},
    startAdornment,
    variant: variantProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'InputControl' });

  { // deprecation warning
    const prefix = `${InputControl.displayName}:`;
    useOnceWhen(() => {
      warnDeprecatedProps('inputComponent', {
        prefix,
        alternative: 'slots.input',
        willRemove: true,
      });
    }, inputComponent !== undefined);
    useOnceWhen(() => {
      warnDeprecatedProps('inputProps', {
        prefix,
        alternative: 'slotProps.input',
        willRemove: true,
      });
    }, inputProps !== undefined);
  }

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

  // Merge the deprecated `inputProps` with `slotProps.input` (the new API wins on conflict)
  const resolvedInputProps = useMemo(() => ({
    ...inputProps,
    ...slotProps.input,
  }), [inputProps, slotProps.input]);

  const handleClick = useCallback((event) => {
    if (nodeRef.current && event.currentTarget === event.target) {
      nodeRef.current.focus();
    }

    if (typeof onClickProp === 'function') {
      onClickProp(event);
    }
    if (typeof resolvedInputProps?.onClick === 'function') {
      resolvedInputProps?.onClick(event);
    }
  }, [onClickProp, resolvedInputProps]);

  const handleBlur = useCallback((event) => {
    if (typeof onBlurProp === 'function') {
      onBlurProp(event);
    }
    if (typeof resolvedInputProps?.onBlur === 'function') {
      resolvedInputProps?.onBlur(event);
    }

    setFocused(false);
  }, [onBlurProp, resolvedInputProps]);

  const handleChange = useCallback((event) => {
    if (typeof onChangeProp === 'function') {
      onChangeProp(event);
    }
    if (typeof resolvedInputProps?.onChange === 'function') {
      resolvedInputProps?.onChange(event);
    }
  }, [onChangeProp, resolvedInputProps]);

  const handleFocus = useCallback((event) => {
    if (typeof onFocusProp === 'function') {
      onFocusProp(event);
    }
    if (typeof resolvedInputProps?.onFocus === 'function') {
      resolvedInputProps?.onFocus(event);
    }

    setFocused(true);
  }, [onFocusProp, resolvedInputProps]);

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

    const update = () => {
      const nextValid = el.validity?.valid;
      if (nextValid !== valid) {
        setValid(nextValid);
      }
    };

    update();

    let mutationObserver = null;

    const MutationObserver = globalThis.MutationObserver ?? globalThis.WebKitMutationObserver;

    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver((mutations) => {
        update();
      });
      mutationObserver.observe(el, {
        attributes: true,
        attributeFilter: ['value'],
      });
    }

    return () => { // eslint-disable-line consistent-return
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
    };
  }, [el, valid]);

  const [InputSlot, inputSlotProps] = useSlot({
    name: 'input',
    ownerDisplayName: InputControl.displayName,
    props: {
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
      ref: combinedInputRef,
    },
    slot: slots.input ?? inputComponent ?? InputBase,
    slotProps: resolvedInputProps,
  });

  const [RootSlot, rootSlotProps] = useSlot({
    name: 'root',
    ownerDisplayName: InputControl.displayName,
    props: {
      ref,
      css,
      ...baseStyleProps,
      ...rest,
    },
    slot: slots.root ?? Box,
    slotProps: slotProps.root,
  });

  // `getInputProps` is the public contract for the render-prop form. The forced/chained
  // handlers are applied after the slot merge so the component keeps ownership of them.
  const getInputProps = () => ({
    ...inputSlotProps,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
  });

  return (
    <RootSlot
      {...rootSlotProps}
      onClick={callEventHandlers(rootSlotProps.onClick, handleClick)}
    >
      {startAdornment}
      {(typeof children === 'function') ? children({ getInputProps }) : (<InputSlot {...getInputProps()} />)}
      {endAdornment}
    </RootSlot>
  );
});

InputControl.displayName = 'InputControl';

export default InputControl;
