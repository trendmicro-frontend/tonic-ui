import React, { forwardRef } from 'react';
import Box from '../Box';
import { useScrollbar } from './context';
import { useViewStyle } from './styles';

const View = forwardRef(
  (
    props,
    ref,
  ) => {
    const {
      scrollbarWidth,
      autoHeight,
      autoHeightMin,
      autoHeightMax,
    } = useScrollbar();
    const viewStyle = useViewStyle({ scrollbarWidth, autoHeight, autoHeightMin, autoHeightMax });

    return (
      <Box
        ref={ref}
        {...viewStyle}
        {...props}
      />
    );
  },
);

View.displayName = 'View';

export default View;
