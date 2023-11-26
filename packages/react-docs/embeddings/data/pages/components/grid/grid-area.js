import { Button, Grid, Stack } from '@tonic-ui/react';
import React, { useState } from 'react';

const GridItem = (props) => (
  <Grid bg="teal:50" border={1} borderColor="teal:60" p="3x" {...props} />
);

const App = () => {
  const [value, setValue] = useState('a');

  return (
    <>
      <Stack direction="row" spacing="2x" mb="4x">
        <Button variant="outline" onClick={() => setValue('a')}>a</Button>
        <Button variant="outline" onClick={() => setValue('b')}>b</Button>
        <Button variant="outline" onClick={() => setValue('c')}>c</Button>
        <Button variant="outline" onClick={() => setValue('2 / 1 / 2 / 4')}>2 / 1 / 2 / 4</Button>
      </Stack>
      <Grid
        templateRows="repeat(3,minmax(3rem,auto))"
        templateColumns="1fr 1fr 1fr"
        templateAreas={`
          "a a a"
          "b c c"
          "b c c"
        `}
        gap="2x"
        bg="gray:10"
        p="4x"
      >
        <GridItem area={value}>Example</GridItem>
      </Grid>
    </>
  );
};

export default App;
