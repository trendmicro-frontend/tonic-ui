import { Box, Button, Flex, Stack } from '@tonic-ui/react';
import React, { useState } from 'react';

const FlexItem = (props) => (
  <Box bg="teal:50" border={1} borderColor="teal:60" p="3x" mr="4x" mb="4x" {...props} />
);

const App = () => {
  const [value, setValue] = useState('row');

  return (
    <>
      <Stack direction="row" spacing="2x" mb="4x">
        <Button variant="outline" onClick={() => setValue('row')}>row</Button>
        <Button variant="outline" onClick={() => setValue('row-reverse')}>row-reverse</Button>
        <Button variant="outline" onClick={() => setValue('column')}>column</Button>
        <Button variant="outline" onClick={() => setValue('column-reverse')}>column-reverse</Button>
      </Stack>
      <pre>
        {`<Flex flexDirection="${value}">`}
      </pre>
      <Flex flexDirection={value} bg="gray:10" p="4x" pb={0} pr={0}>
        <FlexItem flex="auto">One</FlexItem>
        <FlexItem flex="auto">Two</FlexItem>
        <FlexItem flex="auto">Three</FlexItem>
      </Flex>
    </>
  );
};

export default App;
