import React from 'react';
import SVGIcon from '../SVGIcon';

const IconCheck = ({ size, ...rest }) => {
  const viewBox = '0 0 16 16';
  return (
    <SVGIcon size={size} viewBox={viewBox} {...rest}>
      <g fill="currentColor">
        <path d="M6 11.060l-3-3-1 1 4 4 9-9-1-1z" />
      </g>
    </SVGIcon>
  );
};

IconCheck.displayName = 'IconCheck';

export default IconCheck;
