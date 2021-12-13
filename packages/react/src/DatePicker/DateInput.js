import React, { forwardRef, useEffect, useState } from 'react';
import Box from '../Box';
import Icon from '../Icon';
import Input from '../Input';

const DateInput = forwardRef((
  {
    locale,
    value: valueProp,
    onChange,
    ...rest
  },
  ref,
) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (valueProp !== undefined) {
      setValue(valueProp);
    }
  }, [valueProp]);

  const handleChange = event => {
    const nextValue = event.target.value;
    setValue(nextValue);

    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

  return (
    <Box
      display="inline-flex"
      alignItems="center"
      position="relative"
    >
      <Box
        display="flex"
        alignItems="center"
        position="absolute"
        left={0}
        px="3x"
      >
        <Icon icon="calendar" />
      </Box>
      <Input
        ref={ref}
        value={value}
        px="10x"
        onChange={handleChange}
        {...rest}
      />
    </Box>
  );
});

DateInput.displayName = 'DateInput';

export default DateInput;
