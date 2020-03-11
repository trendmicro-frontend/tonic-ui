import chainedFunction from 'chained-function';
import React, { forwardRef } from 'react';
import Box from '../Box';
import ControlBox from '../ControlBox';
import Icon from '../Icon';
import useColorMode from '../useColorMode';
import VisuallyHidden from '../VisuallyHidden';
import checkboxStyles from './styles';
import { useGroupContext } from '../GroupContext';

const Checkbox = forwardRef(
  (
    {
      id,
      name,
      value,

      defaultChecked,
      checked,
      disabled,
      readOnly,
      indeterminate,

      variantColor = 'blue',
      size = 'md',
      iconColor,
      iconSize = '12px',

      onChange,
      onBlur,
      onFocus,

      children,
      ...rest
    },
    ref,
  ) => {
    const { colorMode } = useColorMode();
    const {
      disabled: disabledFromParent,
      size: sizeFromParent,
      value: valueFromParent,
      variantColor: variantColorFromParent,
      onChange: onChangeFromParent
    } = useGroupContext();
    const _defaultChecked = defaultChecked ? undefined : checked;
    let _checked = readOnly ? Boolean(checked) : _defaultChecked;
    if (valueFromParent !== undefined) {
      _checked = valueFromParent.includes(value);
    }
    const _disabled = disabledFromParent || disabled;
    const _size = sizeFromParent || size;
    const _variantColor = variantColorFromParent || variantColor;
    const _onChange = chainedFunction(
      onChange,
      onChangeFromParent,
    );
    const styleProps = checkboxStyles({
      color: _variantColor,
      size: _size,
      colorMode,
      indeterminate
    });

    return (
      <Box
        as="label"
        display="inline-flex"
        verticalAlign="top"
        alignItems="center"
        cursor={_disabled || readOnly ? 'not-allowed' : 'pointer'}
        {...rest}
      >
        <VisuallyHidden
          as="input"
          type="checkbox"
          id={id}
          ref={ref}
          name={name}
          value={value}
          defaultChecked={readOnly ? undefined : defaultChecked}
          onChange={readOnly ? undefined : _onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          checked={_checked}
          disabled={_disabled}
          readOnly={readOnly}
          data-indeterminate={indeterminate}
        />
        <ControlBox {...styleProps}>
          <Icon
            name={indeterminate ? '_core.minus' : '_core.check'}
            size={iconSize}
            color={iconColor}
            transition="transform 240ms, opacity 240ms"
          />
        </ControlBox>
        {children && (
          <Box
            ml="2x"
            fontSize={size}
            userSelect="none"
            opacity={readOnly || _disabled ? 0.32 : 1}
          >
            {children}
          </Box>
        )}
      </Box>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
