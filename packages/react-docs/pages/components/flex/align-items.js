import { Box, Button, Flex, Stack } from '@tonic-ui/react';
import React, { useState } from 'react';

const FlexItem = (props) => (
  <Box bg="teal:50" border={1} borderColor="teal:60" p="3x" mr="4x" mb="4x" {...props} />
);

const App = () => {
  const [value, setValue] = useState('stretch');

  return (
    <>
      <Stack direction="row" spacing="2x" mb="4x">
        <Button variant="outline" onClick={() => setValue('stretch')}>stretch</Button>
        <Button variant="outline" onClick={() => setValue('flex-start')}>flex-start</Button>
        <Button variant="outline" onClick={() => setValue('center')}>center</Button>
        <Button variant="outline" onClick={() => setValue('flex-end')}>flex-end</Button>
      </Stack>
      <pre>
        {`<Flex alignItems="${value}">`}
      </pre>
      <Flex alignItems={value} height={240} bg="gray:10" p="4x" pb={0} pr={0}>
        <FlexItem flex="auto">One</FlexItem>
        <FlexItem flex="auto">Two</FlexItem>
        <FlexItem flex="auto">Three</FlexItem>
      </Flex>
    </>
  );
};

export default App;
