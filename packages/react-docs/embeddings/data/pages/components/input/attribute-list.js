import { Box, Flex, Input, TextLabel } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <>
    <Flex alignItems="center">
      <TextLabel htmlFor="browser-choice" mr="2x">
        Choose a browser from the list:
      </TextLabel>
      <Input list="browsers" id="browser-choice" width="auto" />
    </Flex>
    <Box as="datalist" id="browsers">
      <option value="Chrome" />
      <option value="Firefox" />
      <option value="Internet Explorer" />
      <option value="Opera" />
      <option value="Safari" />
      <option value="Microsoft Edge" />
    </Box>
  </>
);

export default App;
