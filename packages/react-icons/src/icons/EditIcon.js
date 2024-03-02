// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const EditIcon = forwardRef((
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
      <g><path key="edit-0" d="M2.050 11.12l-1.050 3.88 3.88-1.050 8.42-8.42-2.83-2.83zM4.22 13.29l-2.22 0.71 0.72-2.23z" />,<path key="edit-1" d="M11.89 1.28l-0.71 0.72 2.82 2.82 0.71-0.71c0.18-0.181 0.291-0.43 0.291-0.705s-0.111-0.524-0.291-0.705l-1.41-1.42c-0.181-0.18-0.43-0.291-0.705-0.291s-0.524 0.111-0.705 0.291l0-0z" /></g>
    </SVGIcon>
  );
});

EditIcon.displayName = 'EditIcon';

export default EditIcon;
