import React from 'react';
import { SVGIcon } from '../icon';

const IconIndeterminate = (props) => {
  return (
    <SVGIcon viewBox="0 0 24 24" {...props}>
      <g fill="currentColor">
        <rect height="18" width="18" x="3" y="3" />
      </g>
    </SVGIcon>
  );
};

IconIndeterminate.displayName = 'IconIndeterminate';

export default IconIndeterminate;
