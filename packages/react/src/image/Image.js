import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';

const Image = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'Image' });

  return (
    <Box
      ref={ref}
      as="img"
      alt=""
      {...props}
    />
  );
});

Image.displayName = 'Image';

export default Image;
