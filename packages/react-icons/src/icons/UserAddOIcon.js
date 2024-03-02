// AUTO-GENERATED BY "scripts/generate-icons.mjs"
// DO NOT MODIFY THIS FILE

import React, { forwardRef } from 'react';
import { SVGIcon } from '@tonic-ui/react';
import { getIconStyleProps } from '../utils';

const UserAddOIcon = forwardRef((
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
      <g><path key="user-add-o-0" d="M7 14h3v1h-8c-0.066 0.008-0.143 0.013-0.221 0.013-0.708 0-1.323-0.397-1.635-0.981l-0.005-0.010c-0.518-1.219 0.512-3.204 1.795-4.535 0.891-0.981 2.021-1.728 3.3-2.15l0.055-0.016c-1.084-0.717-1.789-1.93-1.789-3.308 0-0.005 0-0.010 0-0.014v0.001c0-2.209 1.791-4 4-4s4 1.791 4 4v0c0 0.004 0 0.008 0 0.012 0 1.399-0.727 2.629-1.823 3.332l-0.016 0.009c0.118 0.039 0.226 0.085 0.339 0.128v1.090c-0.314-0.15-0.687-0.287-1.073-0.391l-0.047-0.011-0.38-0.094v-1.24l0.284-0.136c1.023-0.493 1.716-1.521 1.716-2.711 0-1.657-1.343-3-3-3s-3 1.343-3 3c0 1.19 0.693 2.219 1.698 2.703l0.018 0.008 0.284 0.136v1.228l-0.398 0.082c-1.38 0.319-2.559 1.039-3.441 2.029l-0.006 0.007c-1.152 1.194-1.883 2.774-1.595 3.451 0.038 0.091 0.235 0.368 0.939 0.368zM13 11v-3h-2v3h-3v2h3v3h2v-3h3v-2z" /></g>
    </SVGIcon>
  );
});

UserAddOIcon.displayName = 'UserAddOIcon';

export default UserAddOIcon;
