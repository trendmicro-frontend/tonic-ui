import React, { forwardRef } from 'react';
import PseudoBox from '../PseudoBox';
import { useThumbVerticalStyle } from './styles';

const VerticalThumb = forwardRef(
  (
    props,
    ref,
  ) => {
    const thumbVerticalStyle = useThumbVerticalStyle();

    return (
      <PseudoBox
        ref={ref}
        {...thumbVerticalStyle}
        {...props}
      />
    );
  },
);

VerticalThumb.displayName = 'VerticalThumb';

export default VerticalThumb;
