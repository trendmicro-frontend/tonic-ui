import React, { forwardRef, useEffect, useState } from 'react';
import Flex from '../Flex';
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
    <Flex
      display="inline-flex"
      position="relative"
      alignItems="center"
    >
      <Flex
        align="center"
        position="absolute"
        left={0}
        px="3x"
      >
        <Icon icon="calendar" />
      </Flex>
      <Input
        ref={ref}
        value={value}
        px="10x"
        onChange={handleChange}
        {...rest}
      />
    </Flex>
  );
});

DateInput.displayName = 'DateInput';

export default DateInput;
