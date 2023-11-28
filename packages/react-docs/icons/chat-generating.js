import { SVGIcon } from '@tonic-ui/react';
import React from 'react';

const Icon = ({ size, ...rest }) => {
  return (
    <SVGIcon size={size} viewBox="0 0 40 40" {...rest}>
      <g clip-path="url(#clip0_367_2047)">
        <circle cx="20" cy="20" r="20" fill="#578AEF"/>
        <circle id="o1" cx="9" cy="20" fill="white">
          <animate attributeName="opacity" values="1.0;0.8;0.5;0.5;0.5" dur="2s" repeatCount="indefinite" />
          <animate attributeName="r" values="4;3;2;2;2" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle id="o2" cx="19" cy="20" r="3" fill="white">
          <animate attributeName="opacity" values="0.8;1.0;0.8;0.5;0.5" dur="2s" repeatCount="indefinite" />
          <animate attributeName="r" values="3;4;3;2;2" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle id="o3" cx="29" cy="20" r="4" fill="white">
          <animate attributeName="opacity" values="0.5;0.8;1.0;0.8;0.5" dur="2s" repeatCount="indefinite" />
          <animate attributeName="r" values="2;3;4;3;2" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>
      <defs>
        <clipPath id="clip0_367_2047">
          <rect width="40" height="40" fill="white"/>
        </clipPath>
      </defs>
    </SVGIcon>
  );
};

export default Icon;
