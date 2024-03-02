// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const TBallIcon = forwardRef((
  {
    spin = false,
    ...props
  },
  ref,
) => {
  const styleProps = getIconStyleProps({ spin });
  return (
    <SVGIcon
      ref={ref}
      viewBox="0 0 16 16"
      {...styleProps}
      {...props}
    >
      <g><path key="t-ball-0" d="M1.326 12.412c-0.831-1.241-1.326-2.769-1.326-4.411 0-4.418 3.582-8 8-8 2.347 0 4.457 1.010 5.921 2.62l0.006 0.007c-0.248-0.177-0.535-0.321-0.843-0.416l-0.021-0.006c-1.772-0.552-4.34 0.155-6.676 1.662 1.873-1.117 3.897-1.613 5.333-1.166 2.238 0.696 2.193 3.423-0.102 6.088-1.333 1.539-3.048 2.713-4.998 3.377l-0.081 0.024c-0.347 0.119-0.746 0.188-1.162 0.188-0.314 0-0.618-0.039-0.909-0.113l0.025 0.005c-0.922-0.287-1.089-1.056-0.919-2.085 0.25-0.855 0.543-1.588 0.898-2.285l-0.034 0.074 1.374-0.005 0.253-0.547-1.377 0.004 0.857-1.837h-0.663l-0.037 0.003c-0.912 0.881-2.050 1.535-3.318 1.867l-0.052 0.012-0.233 0.513 0.958-0.002c-0.031 0.063-0.061 0.125-0.091 0.189-0.193 0.317-0.383 0.689-0.544 1.075l-0.021 0.056c-0.028 0.075-0.066 0.149-0.087 0.226-0.212 0.475-0.336 1.030-0.336 1.614 0 0.455 0.075 0.892 0.213 1.299l-0.008-0.028zM14.782 3.756c0.535 1.453-0.134 3.623-1.982 5.77-2.774 3.226-7.156 5.176-9.785 4.358-0.325-0.099-0.608-0.24-0.861-0.42l0.009 0.006c1.463 1.559 3.537 2.53 5.837 2.53 4.418 0 8-3.582 8-8 0-1.572-0.454-3.039-1.237-4.276l0.019 0.033z" /></g>
    </SVGIcon>
  );
});

TBallIcon.displayName = 'TBallIcon';

export default TBallIcon;
