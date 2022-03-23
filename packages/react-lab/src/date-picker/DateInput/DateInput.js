import {
  Box,
  Icon,
  Input,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import React, { forwardRef, useRef } from 'react'; //, useEffect
import useForkRef from '../../utils/useForkRef';

const DateInput = forwardRef((
  props,
  ref
) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(nodeRef, ref);

  return (
    <Box
      display="inline-flex"
      alignItems="center"
      position="relative"
      minWidth="128px"
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
        pl="10x"
        {...props}
      />
    </Box>
  );
});

DateInput.displayName = 'DateInput';

export default DateInput;
