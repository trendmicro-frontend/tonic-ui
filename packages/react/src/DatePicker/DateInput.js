import React, { forwardRef, useEffect, useState } from 'react';
import Box from '../Box';
import Icon from '../Icon';
import Input from '../Input';
import useColorMode from '../useColorMode';
import useColorStyle from '../useColorStyle';

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
  const handleChange = event => {
    const nextValue = event.target.value;
    setValue(nextValue);

    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });

  useEffect(() => {
    if (valueProp !== undefined) {
      setValue(valueProp);
    }
  }, [valueProp]);

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
        zIndex={3} // The z-index value should be at least 3 for the prepeneded input adornment
      >
        <Icon icon="calendar" color={colorStyle.color.secondary} />
      </Box>
      <Input
        ref={ref}
        value={value}
        pl="10x"
        px="3x"
        onChange={handleChange}
        {...rest}
      />
    </Box>
  );
});

DateInput.displayName = 'DateInput';

export default DateInput;
