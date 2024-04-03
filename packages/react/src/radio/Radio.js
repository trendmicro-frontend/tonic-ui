import { useMergeRefs } from '@tonic-ui/react-hooks';
import { callAll, isNullish } from '@tonic-ui/utils';
import React, { forwardRef, useRef } from 'react';
import { Box } from '../box';
import { VisuallyHidden } from '../visually-hidden';
import { defaultSize, defaultVariantColor } from './constants';
import RadioControlBox from './RadioControlBox';
import useRadioGroup from './useRadioGroup';
import { useRadioStyle } from './styles';

const Radio = forwardRef((
  {
    checked,
    children,
    defaultChecked,
    disabled,
    id,
    inputProps,
    inputRef: inputRefProp,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    size,
    value,
    variantColor,
    ...rest
  },
  ref,
) => {
  const inputRef = useRef();
  const combinedInputRef = useMergeRefs(inputRefProp, inputRef);
  const styleProps = useRadioStyle({ disabled });
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
    disabled = radioGroupDisabled || disabled;
    name = radioGroupName ?? name;
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
