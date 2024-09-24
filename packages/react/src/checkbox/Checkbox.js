import { useMergeRefs } from '@tonic-ui/react-hooks';
import { callAll, dataAttr, isNullish } from '@tonic-ui/utils';
import { ensureArray } from 'ensure-type';
import React, { forwardRef, useRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { VisuallyHidden } from '../visually-hidden';
import CheckboxControlBox from './CheckboxControlBox';
import { defaultSize, defaultVariantColor } from './constants';
import useCheckboxGroup from './useCheckboxGroup';
import { useCheckboxStyle } from './styles';

const Checkbox = forwardRef((inProps, ref) => {
  const {
    checked: checkedProp,
    children,
    defaultChecked,
    disabled: disabledProp,
    id,
    indeterminate,
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
  } = useDefaultProps({ props: inProps, name: 'Checkbox' });

  let checked = checkedProp;
  let disabled = disabledProp;
  let name = nameProp;
  let onChange = onChangeProp;
  let size = sizeProp;
  let variantColor = variantColorProp;

  const inputRef = useRef();
  const combinedInputRef = useMergeRefs(inputRefProp, inputRef);
  const checkboxGroupContext = useCheckboxGroup();
  const isNameConflictRef = useRef(false);

  if (checkboxGroupContext) {
    const {
      disabled: checkboxGroupDisabled,
      name: checkboxGroupName,
      size: checkboxGroupSize,
      value: checkboxGroupValue,
      variantColor: checkboxGroupVariantColor,
      onChange: checkboxGroupOnChange
    } = { ...checkboxGroupContext };
    if (checkboxGroupValue !== undefined) {
      checked = ensureArray(checkboxGroupValue).includes(value);
    }
    disabled = (disabled ?? checkboxGroupDisabled);

    const isNameConflict = (!isNullish(name) && !isNullish(checkboxGroupName) && (name !== checkboxGroupName));
    if (process.env.NODE_ENV !== 'production' && isNameConflict && !isNameConflict.current) {
      // Log the warning message only once
      console.error(
        `Warning: The \`Checkbox\` has a \`name\` prop ("${name}") that conflicts with the \`CheckboxGroup\`'s \`name\` prop ("${checkboxGroupName}")`
      );
      isNameConflictRef.current = true;
    }

    name = name ?? checkboxGroupName;

    onChange = callAll(
      onChange,
      checkboxGroupOnChange,
    );
    // Use the default value if the value is null or undefined
    size = (size ?? checkboxGroupSize) ?? defaultSize;
    variantColor = (variantColor ?? checkboxGroupVariantColor) ?? defaultVariantColor;
  } else {
    // Use the default value if the value is null or undefined
    size = size ?? defaultSize;
    variantColor = variantColor ?? defaultVariantColor;
  }

  const styleProps = useCheckboxStyle({ disabled });

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
        data-indeterminate={dataAttr(indeterminate)}
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
      <CheckboxControlBox
        indeterminate={indeterminate}
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

Checkbox.displayName = 'Checkbox';

export default Checkbox;
