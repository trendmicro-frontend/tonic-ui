import { Button, Grid, Stack } from '@tonic-ui/react';
import React, { useState } from 'react';

const GridItem = (props) => (
  <Grid bg="teal:50" border={1} borderColor="teal:60" p="3x" {...props} />
);

const App = () => {
  const [value, setValue] = useState('row');

  return (
    <>
      <Stack direction="row" spacing="2x" mb="4x">
        <Button variant="outline" onClick={() => setValue('row')}>row</Button>
        <Button variant="outline" onClick={() => setValue('column')}>column</Button>
        <Button variant="outline" onClick={() => setValue('row dense')}>row dense</Button>
      </Stack>
      <pre>
        {`<Grid autoFlow="${value}">`}
      </pre>
      <Grid
        autoFlow={value}
        templateRows="repeat(3,minmax(3rem,auto))"
        templateColumns="1fr 1fr 1fr"
        gap="2x"
        bg="gray:10"
        p="4x"
      >
        <GridItem column="auto/span 2">One</GridItem>
        <GridItem column="auto/span 2">Two</GridItem>
        <GridItem>Three</GridItem>
        <GridItem>Four</GridItem>
        <GridItem>Five</GridItem>
      </Grid>
    </>
  );
};

export default App;
