import React, { forwardRef } from 'react';
import Flex from '../Flex';
import useColorMode from '../useColorMode';

const ModalFooter = forwardRef((props, ref) => {
  const { colorMode } = useColorMode();
  const borderColor = {
    dark: 'gray:80',
    light: 'gray:80', // TBD: light mode is not ready yet
  }[colorMode];

  return (
    <Flex
      ref={ref}
      as="footer"
      justify="flex-end"
      px="6x"
      py="4x"
      borderTop={1}
      borderTopColor={borderColor}
      {...props}
    />
  );
});

ModalFooter.displayName = 'ModalFooter';

export default ModalFooter;
