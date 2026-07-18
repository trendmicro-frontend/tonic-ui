import {
  Box,
  Portal,
  VisuallyHidden,
} from '@tonic-ui/react';

const App = () => {
  return (
    <>
      <Portal>
        <VisuallyHidden>
          {/* Open developer tool to inspect elements inside the body tag */}
          <Box bg="background.highest" px="3x" py="2x">
            Portal - This is transported to the end of the document body
          </Box>
        </VisuallyHidden>
      </Portal>
      <Box px="3x" py="2x">
        I am the container
      </Box>
    </>
  );
};

export default App;
