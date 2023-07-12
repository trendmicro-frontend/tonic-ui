import { useMergeRefs } from '@tonic-ui/react-hooks';
import { isNullish } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
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
    inputRef,
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
  const combinedInputRef = useMergeRefs(ref, inputRef); // TODO: Move the `ref` to the outermost element in the next major version
  const styleProps = useSwitchStyle({ disabled });

  return (
    <Box
      as="label"
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
