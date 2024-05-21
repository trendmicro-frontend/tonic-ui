import { useMergeRefs } from '@tonic-ui/react-hooks';
import { isNullish } from '@tonic-ui/utils';
import React, { forwardRef, useRef } from 'react';
import { Box } from '../box';
import { VisuallyHidden } from '../visually-hidden';
import SwitchControlBox from './SwitchControlBox';
import { defaultSize, defaultVariantColor } from './constants';
import { useSwitchStyle } from './styles';

const Switch = forwardRef((
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
    size = defaultSize,
    value,
    variantColor = defaultVariantColor,
    ...rest
  },
  ref,
) => {
  const inputRef = useRef();
  const combinedInputRef = useMergeRefs(inputRefProp, inputRef);
  const styleProps = useSwitchStyle({ disabled });

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
        role="switch"
        type="checkbox"
        value={value}
        {...inputProps}
      />
      <SwitchControlBox
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

Switch.displayName = 'Switch';

export default Switch;
