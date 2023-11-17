import { Button, Grid, Stack } from '@tonic-ui/react';
import React, { useState } from 'react';

const GridItem = (props) => (
  <Grid bg="teal:50" border={1} borderColor="teal:60" p="3x" {...props} />
);

const App = () => {
  const [value, setValue] = useState('0');

  return (
    <>
      <Stack direction="row" spacing="2x" mb="4x">
        <Button variant="outline" onClick={() => setValue('0')}>0</Button>
        <Button variant="outline" onClick={() => setValue('10%')}>10%</Button>
        <Button variant="outline" onClick={() => setValue('1rem')}>1rem</Button>
        <Button variant="outline" onClick={() => setValue('20px')}>20px</Button>
      </Stack>
      <pre>
        {`<Grid columnGap="${value}">`}
      </pre>
      <Grid
        columnGap={value}
        templateColumns="1fr 1fr"
        bg="gray:10"
        p="4x"
        transition="all .3s ease-in"
      >
        <GridItem>One</GridItem>
        <GridItem>Two</GridItem>
        <GridItem>Three</GridItem>
        <GridItem>Four</GridItem>
        <GridItem>Five</GridItem>
      </Grid>
    </>
  );
};

export default App;
