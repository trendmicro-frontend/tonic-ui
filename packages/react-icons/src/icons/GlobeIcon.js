// GENERATED BY src/generate.mjs
// DO NOT EDIT THIS FILE

import * as React from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const GlobeIcon = (
  {
    spin = false,
    ...props
  },
  ref
) => {
  const styleProps = getIconStyleProps({ spin });
  return (
    <SVGIcon
      ref={ref}
      viewBox="0 0 16 16"
      {...styleProps}
      {...props}
    >
      <g><path key="globe-0" d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 8-3.582 8-8v0c0-4.418-3.582-8-8-8v0zM12 2l-1 1-1-0.52c-0.46 0.42-0.85-0.12-1-0.5-0.050-0.16-0.76-0.62-1-0.94 0.156-0.013 0.338-0.020 0.522-0.020 1.287 0 2.488 0.365 3.507 0.997l-0.028-0.016zM8 10c0.2 0.248 0.416 0.468 0.652 0.664l0.008 0.006c0.18 0.1 0.49-0.060 0.66 0s0.28 0.090 0.68 0.36c0.14 0.090-0.64 0.87-0.69 1s0 0.52-0.090 0.64c-0.348 0.207-0.767 0.33-1.215 0.33-0.002 0-0.004 0-0.006 0h0c0.060 0.16 0.17 0.45 0.080 0.6s-1 0.23-1.070 0.39-0.12 0.54-0.31 0.68-0.59 0.23-0.7 0-0.050-0.31 0-0.63 0.25-0.7 0-1-1-1-1-1c-0.19 0-0.12-0.45-0.28-0.79-0.23-0.49 0.18-0.74 0.28-1.21s0.36-1 1-1c0.29 0 0.83 0.42 1 0.51s0.5 0 0.76 0.17 0.12 0.14 0.24 0.28zM15 7c-0.070 0.080-0.19 1.1-0.27 1.38s-0.54 0.42-0.73 0.62c-0.37 0.4 0 0.76 0 1-0.45 0.33-0.8 1-1 1 0 0.13-1-1.13-1-1-0.31 0-0.25 0-0.36-0.31s0-0.57 0-0.83c-0.114-0.352-0.222-0.79-0.301-1.237l-0.009-0.063 0.2-0.54c-0.187-0.411-0.364-0.745-0.557-1.069l0.027 0.049c-0.18-0.13-0.33-0.13-0.32-0.42s0.32-0.35 0.32-0.58-0.3-0.27-0.25-0.46c0.082-0.213 0.166-0.391 0.261-0.562l-0.011 0.022c0.403-0.565 0.894-1.038 1.459-1.407l0.021-0.013c1.379 1.041 2.316 2.605 2.517 4.391l0.003 0.029zM6.68 2.75c-0.17 0.1-0.47 0.15-0.68 0.25l-1 0.38c-0.419 0.055-0.775 0.286-0.997 0.615l-0.003 0.005c-0.13 0.22 0.2 0.8 0 1-0.43 0.39 0.070 0.94 0 1 0.080 0.15-0.060 0.25 0.2 0.5 0.090 0.090 0 0.39 0.1 0.49 0.075 0.109 0.151 0.237 0.22 0.369l0.010 0.021c0.050 0.1 0.43 0.54 0.48 0.61s0.5 0.3 0.63 0.45-0.55 0.15-0.61 0.080-0.62-0.37-0.8-0.62-0.070-0.54-0.28-0.69c-0.279-0.107-0.601-0.181-0.937-0.209l-0.013-0.001c-0.3 0-0.74 0.16-1 0-0.248-0.289-0.462-0.618-0.629-0.974l-0.011-0.026c0.4-2.043 1.77-3.697 3.6-4.485l0.040-0.015s1.74-0.56 2 0.5c0 0 0 0.55-0.32 0.75z" /></g>
    </SVGIcon>
  );
};

if (process.env.NODE_ENV !== 'production') {
  GlobeIcon.displayName = 'GlobeIcon';
}
export default React.forwardRef(GlobeIcon);
