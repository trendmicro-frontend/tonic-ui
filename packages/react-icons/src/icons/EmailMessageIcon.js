// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const EmailMessageIcon = forwardRef((
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
      <g><path key="email-message-0" d="M13 7.978v-6.978h-10v6.978l5 3.889 5-3.889zM5 3h6v1h-6v-1zM5 5h6v1h-6v-1zM16 6.045v8.955c-0 0.552-0.448 1-1 1h-14c-0.552-0-1-0.448-1-1v-8.955l2-1.511v1.349l-1 0.781v0.882l7 5.455 7-5.455v-0.882l-1-0.781v-1.349l2 1.511z" /></g>
    </SVGIcon>
  );
});

EmailMessageIcon.displayName = 'EmailMessageIcon';

export default EmailMessageIcon;
