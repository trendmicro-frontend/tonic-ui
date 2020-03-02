import React, { forwardRef } from 'react';
import Box from '../Box';
import ControlBox from '../ControlBox';
import Icon from '../Icon';
import useColorMode from '../useColorMode';
import VisuallyHidden from '../VisuallyHidden';
import checkboxStyles from './styles';

const Checkbox = forwardRef(
  (
    {
      id,
      name,
      value,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,

      defaultIsChecked,
      checked,
      disabled,
      readOnly,
      isIndeterminate,
      isInvalid,

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
    const styleProps = checkboxStyles({ color: variantColor, size, colorMode, isIndeterminate });
    const opacity = readOnly || disabled ? 0.32 : 1;
    const _defaultIsChecked = defaultIsChecked ? undefined : checked;
    const _checked = readOnly ? Boolean(checked) : _defaultIsChecked;

    return (
      <Box
        as="label"
        display="inline-flex"
        verticalAlign="top"
        alignItems="center"
        cursor={disabled || readOnly ? 'not-allowed' : 'pointer'}
        {...rest}
      >
        <VisuallyHidden
          as="input"
          type="checkbox"
          aria-label={ariaLabel}
          id={id}
          ref={ref}
          name={name}
          value={value}
          defaultChecked={readOnly ? undefined : defaultIsChecked}
          onChange={readOnly ? undefined : onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          checked={_checked}
          disabled={disabled}
          readOnly={readOnly}
          aria-readonly={readOnly}
          aria-invalid={isInvalid}
          aria-checked={isIndeterminate ? 'mixed' : checked}
        />
        <ControlBox {...styleProps}>
          <Icon
            name={isIndeterminate ? '_core.minus' : '_core.check'}
            size={iconSize}
            color={iconColor}
            transition="transform 240ms, opacity 240ms"
          />
        </ControlBox>
        {children && (
          <Box
            ml="1x"
            fontSize={size}
            userSelect="none"
            opacity={opacity}
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
