import React, { forwardRef } from 'react';
import { Box, ControlBox } from '../box';
import { VisuallyHidden } from '../visually-hidden';
import { useSwitchStyle } from './styles';

const Switch = forwardRef((
  {
    id,
    name,
    value,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    variantColor = 'blue',
    defaultChecked,
    checked,
    size = 'md',
    disabled,
    onChange,
    onBlur,
    onFocus,
    children,
    ...rest
  },
  ref,
) => {
  const {
    baseStyle,
    switchSVGStyle,
    switchTrackHaloStyle,
    switchTrackBorderStyle,
    switchTrackStyle,
    switchThumbStyle
  } = useSwitchStyle({
    variantColor,
    size,
  });

  return (
    <Box as="label" display="flex" {...rest}>
      <VisuallyHidden
        as="input"
        type="checkbox"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        id={id}
        ref={ref}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        checked={checked}
        disabled={disabled}
      />
      <ControlBox {...baseStyle}>
        <Box
          as="svg"
          data-switch
          {...switchSVGStyle}
        >
          <Box
            as="rect"
            data-switch-track-halo
            x="0"
            y="0"
            {...switchTrackHaloStyle}
          />
          <Box
            as="rect"
            data-switch-track-border
            x="2"
            y="2"
            {...switchTrackBorderStyle}
          />
          <Box
            as="rect"
            data-switch-track
            x="3"
            y="3"
            {...switchTrackStyle}
          />
          <Box
            as="circle"
            data-switch-thumb
            {...switchThumbStyle}
          />
        </Box>
      </ControlBox>
    </Box>
  );
});

Switch.displayName = 'Switch';

export default Switch;
