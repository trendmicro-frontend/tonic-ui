import React, { forwardRef, useEffect, useState } from 'react';
import { Box } from '../box';
import { Icon } from '../icon';
import { Input } from '../input';
import { useColorMode } from '../color-mode';
import { useColorStyle } from '../color-style';

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
      width="128px"
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
        onChange={handleChange}
        {...rest}
      />
    </Box>
  );
});

DateInput.displayName = 'DateInput';

export default DateInput;
