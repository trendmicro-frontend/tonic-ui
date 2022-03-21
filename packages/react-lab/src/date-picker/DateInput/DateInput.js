import {
  Box,
  Icon,
  Input,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef, useRef } from 'react'; //, useEffect
import useForkRef from '../../utils/useForkRef';

const DateInput = forwardRef((
  {
    locale = 'en',
    value,
    onChange,
    ...props
  },
  ref,
) => {
  onChange = ensureFunction(onChange);

  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(nodeRef, ref);
  const handleChange = event => {
    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

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
        ref={combinedRef}
        value={value}
        pl="10x"
        onChange={handleChange}
        {...props}
      />
    </Box>
  );
});

DateInput.displayName = 'DateInput';

export default DateInput;
