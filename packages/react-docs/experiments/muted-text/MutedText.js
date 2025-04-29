import { Text, useColorStyle } from '@tonic-ui/react';
import React, { forwardRef } from 'react';

const MutedText = forwardRef((props, ref) => {
  const [colorStyle] = useColorStyle();
  return (
    <Text ref={ref} color={colorStyle.color.secondary} {...props} />
  );
});

MutedText.displayName = 'MutedText';

export default MutedText;
