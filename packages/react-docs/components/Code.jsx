import { Tag } from '@tonic-ui/react';
import React, { forwardRef } from 'react';

const Code = forwardRef((props, ref) => {
  return (
    <Tag
      ref={ref}
      as="code"
      fontFamily="mono"
      fontSize="90%"
      px=".375rem"
      {...props}
    />
  );
});

Code.displayName = 'Code';

export default Code;
