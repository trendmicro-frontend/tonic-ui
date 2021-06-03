import React, { forwardRef } from 'react';
import Box from '../Box';
import { useScrollbar } from './context';
import { useTrackVerticalStyle } from './styles';

const VerticalTrack = forwardRef(
  (
    props,
    ref,
  ) => {
    const {
      scrollbarWidth,
      autoHide,
      autoHideDuration,
    } = useScrollbar();
    const trackVerticalStyle = useTrackVerticalStyle({ scrollbarWidth, autoHide, autoHideDuration });

    return (
      <Box
        ref={ref}
        {...trackVerticalStyle}
        {...props}
      />
    );
  },
);

VerticalTrack.displayName = 'VerticalTrack';

export default VerticalTrack;
