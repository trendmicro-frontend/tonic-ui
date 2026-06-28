import {
  Box,
  Flex,
  Portal,
} from '@tonic-ui/react';
import { useRef } from 'react';

const App = () => {
  const ref = useRef();

  return (
    <>
      <Portal containerRef={ref}>
        <Box bg="background.highest" px="3x" py="2x">
          Portal - This is transported to the container
        </Box>
      </Portal>
      <Flex flexDirection="column" rowGap="2x">
        <Box ref={ref} px="3x" py="2x">
          I am the container
        </Box>
      </Flex>
    </>
  );
};

export default App;
