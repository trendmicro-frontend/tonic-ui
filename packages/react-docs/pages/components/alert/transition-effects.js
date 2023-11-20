import { Alert, Box, Button, Collapse } from '@tonic-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Collapse in={isOpen}>
        <Alert isClosable severity="info" onClose={handleClose}>
          Click the close button on the right side.
        </Alert>
      </Collapse>
      <Box mt="4x">
        <Button onClick={handleOpen} disabled={isOpen}>
          Reopen
        </Button>
      </Box>
    </>
  );
};

export default App;
