import React from 'react';
import SVGIcon from '../SVGIcon';

const IconMinus = (props) => {
  const viewBox = '0 0 24 24';
  return (
    <SVGIcon viewBox={viewBox} {...props}>
      <g fill="currentColor">
        <rect
          height="18"
          width="18"
          x="3"
          y="3"
        />
      </g>
    </SVGIcon>
  );
};

IconMinus.displayName = 'IconMinus';

export default IconMinus;
