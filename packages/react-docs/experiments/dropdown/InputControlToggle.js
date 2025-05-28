import { InputAdornment, InputControl, MenuToggleIcon } from '@tonic-ui/react';
import React, { forwardRef } from 'react';

const InputControlToggle = forwardRef((props, ref) => {
  const {
    children: value,
    disabled,
    endAdornment: endAdornmentProp,
    inputProps,
    readOnly = true,
    ...rest
  } = props;
  
  const endAdornment = (
    <InputAdornment display="flex">
      <MenuToggleIcon />
    </InputAdornment>
  );

  const styleProps = {
    cursor: disabled ? 'not-allowed' : 'pointer',
  };
  const inputStyleProps = {
    cursor: disabled ? 'not-allowed' : 'pointer',
    textOverflow: 'ellipsis',
  };

  return (
    <InputControl
      ref={ref}
      endAdornment={endAdornmentProp !== undefined ? endAdornmentProp : endAdornment}
      inputProps={{
        ...inputStyleProps,
        ...inputProps,
      }}
      readOnly={readOnly}
      value={value}
      {...styleProps}
      {...rest}
    />
  );
});

InputControlToggle.displayName = 'InputControlToggle';

export default InputControlToggle;
