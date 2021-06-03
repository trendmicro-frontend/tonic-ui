import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import { useThumbHorizontalStyle } from './styles';

const HorizontalThumb = forwardRef(
  (
    props,
    ref,
  ) => {
    const thumbHorizontalStyle = useThumbHorizontalStyle();

    return (
      <PseudoBox
        ref={ref}
        {...thumbHorizontalStyle}
        {...props}
      />
    );
  },
);

HorizontalThumb.displayName = 'HorizontalThumb';

export default HorizontalThumb;
