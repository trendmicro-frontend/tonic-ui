import { Box, Button, Flex, Stack } from '@tonic-ui/react';
import React, { useState } from 'react';

const FlexItem = (props) => (
  <Box bg="teal:50" border={1} borderColor="teal:60" p="3x" mr="4x" mb="4x" {...props} />
);

const App = () => {
  const [value, setValue] = useState('nowrap');

  return (
    <>
      <Stack direction="row" spacing="2x" mb="4x">
        <Button variant="outline" onClick={() => setValue('nowrap')}>nowrap</Button>
        <Button variant="outline" onClick={() => setValue('wrap')}>wrap</Button>
        <Button variant="outline" onClick={() => setValue('wrap-reverse')}>wrap-reverse</Button>
      </Stack>
      <pre>
        {`<Flex wrap="${value}">`}
      </pre>
      <Flex wrap={value} width={480} bg="gray:10" p="4x" pb={0} pr={0}>
        <FlexItem flex="auto" minWidth={120}>One</FlexItem>
        <FlexItem flex="auto" minWidth={120}>Two</FlexItem>
        <FlexItem flex="auto" minWidth={120}>Three</FlexItem>
        <FlexItem flex="auto" minWidth={120}>Four</FlexItem>
        <FlexItem flex="auto" minWidth={120}>Five</FlexItem>
        <FlexItem flex="auto" minWidth={120}>Six</FlexItem>
      </Flex>
    </>
  );
};

export default App;
