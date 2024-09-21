import { useMergeRefs } from '@tonic-ui/react-hooks';
import { callAll, isNullish } from '@tonic-ui/utils';
import React, { forwardRef, useRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { VisuallyHidden } from '../visually-hidden';
import { defaultSize, defaultVariantColor } from './constants';
import RadioControlBox from './RadioControlBox';
import useRadioGroup from './useRadioGroup';
import { useRadioStyle } from './styles';

const Radio = forwardRef((inProps, ref) => {
  const {
    checked: checkedProp,
    children,
    defaultChecked,
    disabled: disabledProp,
    id,
    inputProps,
    inputRef: inputRefProp,
    name: nameProp,
    onBlur,
    onChange: onChangeProp,
    onClick,
    onFocus,
    size: sizeProp,
    value,
    variantColor: variantColorProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Radio' });

  let checked = checkedProp;
  let disabled = disabledProp;
  let name = nameProp;
  let onChange = onChangeProp;
  let size = sizeProp;
  let variantColor = variantColorProp;

  const inputRef = useRef();
  const combinedInputRef = useMergeRefs(inputRefProp, inputRef);
  const radioGroupContext = useRadioGroup();

  if (radioGroupContext) {
    const {
      disabled: radioGroupDisabled,
      name: radioGroupName,
      size: radioGroupSize,
      value: radioGroupValue,
      variantColor: radioGroupVariantColor,
      onChange: radioGroupOnChange,
    } = { ...radioGroupContext };

    if (radioGroupValue !== undefined) {
      checked = (radioGroupValue === value);
    }
    disabled = (disabled ?? radioGroupDisabled);
    name = (name ?? radioGroupName);
    onChange = callAll(
      onChange,
      radioGroupOnChange,
    );
    // Use the default value if the value is null or undefined
    size = (size ?? radioGroupSize) ?? defaultSize;
    variantColor = (variantColor ?? radioGroupVariantColor) ?? defaultVariantColor;
  } else {
    // Use the default value if the value is null or undefined
    size = size ?? defaultSize;
    variantColor = variantColor ?? defaultVariantColor;
  }

  const styleProps = useRadioStyle({ disabled });

  return (
    <Box
      as="label"
      ref={ref}
      {...styleProps}
      {...rest}
    >
      <VisuallyHidden
        as="input"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
        ref={combinedInputRef}
        type="radio"
        value={value}
        {...inputProps}
      />
      <RadioControlBox
        size={size}
        variantColor={variantColor}
      />
      {!isNullish(children) && (
        <Box
          ml="2x"
          userSelect="none"
          opacity={disabled ? 0.28 : 1}
        >
          {children}
        </Box>
      )}
    </Box>
  );
});

Radio.displayName = 'Radio';

export default Radio;
