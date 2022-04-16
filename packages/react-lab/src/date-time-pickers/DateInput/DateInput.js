import {
  Box,
  Icon,
  Input,
} from '@tonic-ui/react';
import React, { forwardRef, useRef } from 'react';
import useForkRef from '../../utils/useForkRef';
import {
  useDateInputWrapperStyle,
  useDateInputIconWrapperStyle,
  useDateInputIconStyle,
  useDateInputStyle,
} from './styles';

const DateInput = forwardRef((
  props,
  ref
) => {
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(nodeRef, ref);
  const wrapperStyleProps = useDateInputWrapperStyle();
  const iconWrapperStyleProps = useDateInputIconWrapperStyle();
  const iconProps = useDateInputIconStyle();
  const inputStyleProps = useDateInputStyle();

  return (
    <Box
      {...wrapperStyleProps}
    >
      <Box
        {...iconWrapperStyleProps}
      >
        <Icon icon="calendar" {...iconProps} />
      </Box>
      <Input
        ref={combinedRef}
        {...inputStyleProps}
        {...props}
      />
    </Box>
  );
});

DateInput.displayName = 'DateInput';

export default DateInput;
