import React, { forwardRef } from 'react';
import Box from '../Box';
import { useScrollbar } from './context';
import { useTrackHorizontalStyle } from './styles';

const HorizontalTrack = forwardRef(
  (
    props,
    ref,
  ) => {
    const {
      scrollbarWidth,
      autoHide,
      autoHideDuration,
    } = useScrollbar();
    const trackHorizontalStyle = useTrackHorizontalStyle({ scrollbarWidth, autoHide, autoHideDuration });

    return (
      <Box
        ref={ref}
        {...trackHorizontalStyle}
        {...props}
      />
    );
  },
);

HorizontalTrack.displayName = 'HorizontalTrack';

export default HorizontalTrack;
