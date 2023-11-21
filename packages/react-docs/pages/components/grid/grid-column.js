import { Button, Grid, Stack } from '@tonic-ui/react';
import React, { useState } from 'react';

const GridItem = (props) => (
  <Grid bg="teal:50" border={1} borderColor="teal:60" p="3x" {...props} />
);

const App = () => {
  const [value, setValue] = useState('1');

  return (
    <>
      <Stack direction="row" spacing="2x" mb="4x">
        <Button variant="outline" onClick={() => setValue('1')}>1</Button>
        <Button variant="outline" onClick={() => setValue('1 / 3')}>1 / 3</Button>
        <Button variant="outline" onClick={() => setValue('2 / -1')}>2 / -1</Button>
        <Button variant="outline" onClick={() => setValue('1 / span 2')}>1 / span 2</Button>
      </Stack>
      <Grid
        templateRows="repeat(3,minmax(3rem,auto))"
        templateColumns="1fr 1.5fr 1fr"
        gap="2x"
        bg="gray:10"
        p="4x"
      >
        <GridItem column={value} bg="blue:50" borderColor="blue:60">One</GridItem>
        <GridItem>Two</GridItem>
        <GridItem>Three</GridItem>
      </Grid>
    </>
  );
};

export default App;
