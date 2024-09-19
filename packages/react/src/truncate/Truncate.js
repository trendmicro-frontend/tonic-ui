import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import { Text } from '../text';
import { useTruncateStyle } from './styles';

const Truncate = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'Truncate' });
  const styleProps = useTruncateStyle();

  return (
    <Text
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

Truncate.displayName = 'Truncate';

export default Truncate;
