import React, { forwardRef } from 'react';
import Box from '../Box';
import ControlBox from '../ControlBox';
import PseudoBox from '../PseudoBox';
import VisuallyHidden from '../VisuallyHidden';
import useToggleSwitchStyle from './styles';

const ToggleSwitch = forwardRef(
  (
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
      baseProps,
      switchSVGProps,
      switchTrackHaloProps,
      switchTrackBorderProps,
      switchTrackProps,
      switchThumbProps
    } = useToggleSwitchStyle({
      variantColor,
      size,
    });

    return (
      <PseudoBox as="label" display="flex" {...rest}>
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
        <ControlBox {...baseProps}>
          <Box
            as="svg"
            data-toggle-svg
            {...switchSVGProps}
          >
            <Box
              as="rect"
              data-toggle-switch-track-halo
              x="0"
              y="0"
              {...switchTrackHaloProps}
            />
            <Box
              as="rect"
              data-toggle-switch-track-border
              x="2"
              y="2"
              {...switchTrackBorderProps}
            />
            <Box
              as="rect"
              data-toggle-switch-track
              x="3"
              y="3"
              {...switchTrackProps}
            />
            <Box
              as="circle"
              data-toggle-switch-thumb
              {...switchThumbProps}
            />
          </Box>
        </ControlBox>
      </PseudoBox>
    );
  },
);

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
