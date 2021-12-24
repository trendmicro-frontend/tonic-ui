import React, { forwardRef } from 'react';
import Text from '../Text';
import { useColorMode } from '../ColorMode';

const TextLabel = forwardRef((props, ref) => {
  const [colorMode] = useColorMode();
  const colorProps = {
    dark: {
      color: 'white:secondary',
    },
    light: {
      color: 'black:secondary',
    },
  }[colorMode];

  return (
    <Text
      as="label"
      ref={ref}
      {...colorProps}
      {...props}
    />
  );
});

TextLabel.displayName = 'TextLabel';

export default TextLabel;
