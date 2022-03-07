import React, { forwardRef } from 'react';
import Text from './Text';
import { useTextLabelStyle } from './styles';

const TextLabel = forwardRef((
  {
    size,
    ...rest
  },
  ref
) => {
  const styleProps = useTextLabelStyle({ size });

  return (
    <Text
      as="label"
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});

TextLabel.displayName = 'TextLabel';

export default TextLabel;
