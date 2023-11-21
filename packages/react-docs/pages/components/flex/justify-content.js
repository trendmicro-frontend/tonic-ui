import { Box, Button, Flex, Stack } from '@tonic-ui/react';
import React, { useState } from 'react';

const FlexItem = (props) => (
  <Box bg="teal:50" border={1} borderColor="teal:60" p="3x" mr="4x" mb="4x" {...props} />
);

const App = () => {
  const [value, setValue] = useState('start');

  return (
    <>
      <Stack direction="row" spacing="2x" mb="4x">
        <Button variant="outline" onClick={() => setValue('flex-start')}>flex-start</Button>
        <Button variant="outline" onClick={() => setValue('center')}>center</Button>
        <Button variant="outline" onClick={() => setValue('flex-end')}>flex-end</Button>
        <Button variant="outline" onClick={() => setValue('space-between')}>space-between</Button>
        <Button variant="outline" onClick={() => setValue('space-around')}>space-around</Button>
        <Button variant="outline" onClick={() => setValue('space-evenly')}>space-evenly</Button>
      </Stack>
      <pre>
        {`<Flex justifyContent="${value}">`}
      </pre>
      <Flex justifyContent={value} bg="gray:10" p="4x" pb={0} pr={0}>
        <FlexItem>One</FlexItem>
        <FlexItem>Two</FlexItem>
        <FlexItem>Three</FlexItem>
      </Flex>
    </>
  );
};

export default App;
