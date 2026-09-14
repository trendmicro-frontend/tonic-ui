import { useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';
import { callEventHandlers, warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useEnvironment } from '../environment';
import { useSlot } from '../slot';
import InputBase from './InputBase';
import { defaultSize, defaultVariant } from './constants';
import { getInputGroupCSS, useInputControlBaseCSS, useInputControlBaseStyle, useInputControlInputStyle } from './styles';
import useInputGroup from './useInputGroup';

/**
 * @typedef {Object} InputControlRenderProps
 * @property {() => React.HTMLAttributes<HTMLInputElement> & { ref: React.Ref<HTMLInputElement> }} getInputProps - Returns the props to spread onto the input element.
 */

/**
 * @typedef {Object} InputControlProps
 * @property {string} [autoComplete] - Specifies whether the input can have its value automatically completed by the browser.
 * @property {boolean} [autoFocus] - The input is automatically focused during the first mount.
 * @property {boolean} [checked] - The checked state of the input (for checkbox and radio inputs).
 * @property {React.ReactNode | ((context: InputControlRenderProps) => React.ReactNode)} [children] - The content of the input control. A function child can be used instead of a React element. It is called with the context object.
 * @property {boolean} [disabled] - The user cannot interact with the control.
 * @property {React.ReactNode} [endAdornment] - The element displayed after the input field within the control.
 * @property {boolean | string} [error] - Indicates an error state of the input.
 * @property {React.ElementType} [inputComponent=InputBase] - **Deprecated.** Use `slots.input` instead. The component used for the input element.
 * @property {React.InputHTMLAttributes<HTMLInputElement>} [inputProps] - **Deprecated.** Use `slotProps.input` instead. Props applied to the input element.
 * @property {React.Ref<HTMLInputElement>} [inputRef] - The ref to the input element.
 * @property {string} [list] - The id of the `<datalist>` element that provides predefined options for the input.
 * @property {string | number} [max] - The maximum value for the input.
 * @property {number} [maxlength] - The maximum number of characters allowed in the input.
 * @property {string | number} [min] - The minimum value for the input.
 * @property {number} [minlength] - The minimum number of characters required in the input.
 * @property {boolean} [multiple] - The user is allowed to enter more than one value.
 * @property {string} [name] - The name of the input.
 * @property {React.FocusEventHandler<HTMLInputElement>} [onBlur] - Callback fired when the input loses focus.
 * @property {React.ChangeEventHandler<HTMLInputElement>} [onChange] - Callback fired when the value of the input is changed.
 * @property {React.FocusEventHandler<HTMLInputElement>} [onFocus] - Callback fired when the input gains focus.
 * @property {string} [pattern] - The regular expression that the input's value is checked against.
 * @property {string} [placeholder] - The short hint displayed in the input before the user enters a value.
 * @property {boolean} [readOnly] - Prevents the value of the input from being edited.
 * @property {boolean} [required] - The input must be filled out before submitting the form.
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The size of the input control.
 * @property {{ input?: object, root?: object }} [slotProps] - Props forwarded to the internal slots.
 * @property {{ input?: React.ElementType, root?: React.ElementType }} [slots] - Slot components. `slots.input` replaces the default `InputBase`. `slots.root` replaces the default `Box`.
 * @property {boolean} [spellcheck] - Specifies whether the input is subject to spell checking.
 * @property {React.ReactNode} [startAdornment] - The element displayed before the input field within the control.
 * @property {string | number} [step] - The interval between legal numbers in the input.
 * @property {string} [type] - The type of the input element (e.g. 'text', 'email', 'password').
 * @property {string | number | ReadonlyArray<string>} [value] - The value of the input.
 * @property {'outline' | 'filled' | 'flush' | 'unstyled'} [variant='outline'] - The variant of the input control.
 */

/**
 * @type {ForwardRefComponent<'div', InputControlProps>}
 */
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
    inputProps: inputPropsProp, // deprecated
    inputRef: inputRefProp,
    size: sizeProp,
    slots = {},
    slotProps = {},
    startAdornment,
    variant: variantProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'InputControl' });

  const { getWindow } = useEnvironment();

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
    }, inputPropsProp !== undefined);
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

  const inputProps = useMemo(() => ({
    ...inputPropsProp,
    ...slotProps.input,
  }), [inputPropsProp, slotProps.input]);

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

    const update = () => {
      const nextValid = el.validity?.valid;
      if (nextValid !== valid) {
        setValid(nextValid);
      }
    };

    update();

    let mutationObserver = null;

    const ownerWindow = getWindow();
    const MutationObserver = ownerWindow.MutationObserver ?? ownerWindow.WebKitMutationObserver;

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
  }, [el, valid, getWindow]);

  const [InputSlot, inputSlotProps] = useSlot({
    name: 'input',
    ownerName: InputControl.displayName,
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
    slotProps: inputProps,
  });

  const [RootSlot, rootSlotProps] = useSlot({
    name: 'root',
    ownerName: InputControl.displayName,
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
