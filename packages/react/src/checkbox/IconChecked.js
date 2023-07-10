import React from 'react';
import { SVGIcon } from '../icon';

const IconChecked = (props) => {
  return (
    <SVGIcon viewBox="0 0 16 16" {...props}>
      <g fill="currentColor">
        <path d="M6 11.060l-3-3-1 1 4 4 9-9-1-1z" />
      </g>
    </SVGIcon>
  );
};

IconChecked.displayName = 'IconChecked';

export default IconChecked;
