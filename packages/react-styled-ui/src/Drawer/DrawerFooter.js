import React, { forwardRef } from 'react';
import Flex from '../Flex';
import useColorMode from '../useColorMode';

const DrawerFooter = forwardRef((props, ref) => {
  const { colorMode } = useColorMode();
  const borderColor = {
    dark: 'gray:80',
    light: 'gray:20', // TBD: light mode is not ready yet
  }[colorMode];

  return (
    <Flex
      ref={ref}
      justify="flex-end"
      px="6x"
      py="4x"
      borderTop={1}
      borderTopColor={borderColor}
      css={{
        '&:first-child': {
          marginTop: (16 + 28 + 12),
        },
      }}
      {...props}
    />
  );
});

DrawerFooter.displayName = 'DrawerFooter';

export default DrawerFooter;
