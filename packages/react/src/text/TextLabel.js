import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import Text from './Text';
import { useTextLabelStyle } from './styles';

const TextLabel = forwardRef((inProps, ref) => {
  const {
    size,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'TextLabel' });
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
