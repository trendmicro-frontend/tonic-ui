import {
  Box,
  Icon,
  Input,
} from '@tonic-ui/react';
import React, { forwardRef, useRef } from 'react';
import useForkRef from '../../utils/useForkRef';
import {
  useTimeInputWrapperStyle,
  useTimeInputIconWrapperStyle,
  useTimeInputIconStyle,
  useTimeInputStyle,
} from './styles';

const TimeInput = forwardRef((
  props,
  ref
) => {
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(nodeRef, ref);
  const wrapperStyleProps = useTimeInputWrapperStyle();
  const iconWrapperStyleProps = useTimeInputIconWrapperStyle();
  const iconProps = useTimeInputIconStyle();
  const inputStyleProps = useTimeInputStyle();

  return (
    <Box
      {...wrapperStyleProps}
    >
      <Box
        {...iconWrapperStyleProps}
      >
        <Icon icon="clock" {...iconProps} />
      </Box>
      <Input
        ref={combinedRef}
        {...inputStyleProps}
        {...props}
      />
    </Box>
  );
});

TimeInput.displayName = 'TimeInput';

export default TimeInput;
