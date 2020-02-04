import React from 'react';
import { SVGIcon } from '@trendmicro/react-styled-core';

const HomeIcon = (props) => (
  <SVGIcon
    fontSize="1.5rem"
    mx=".75rem"
    {...props}
  >
    <g fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </g>
  </SVGIcon>
);

export default HomeIcon;
