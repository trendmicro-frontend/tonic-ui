import { Box, Flex, Input, TextLabel } from '@tonic-ui/react';

const App = () => (
  <>
    <Flex alignItems="center">
      <TextLabel htmlFor="browser-choice" mr="2x">
        Choose a browser from the list:
      </TextLabel>
      <Input list="browsers" id="browser-choice" width="auto" />
    </Flex>
    <Box as="datalist" id="browsers">
      <option value="Chrome">Chrome</option>
      <option value="Firefox">Firefox</option>
      <option value="Internet Explorer">Internet Explorer</option>
      <option value="Opera">Opera</option>
      <option value="Safari">Safari</option>
      <option value="Microsoft Edge">Microsoft Edge</option>
    </Box>
  </>
);

export default App;
