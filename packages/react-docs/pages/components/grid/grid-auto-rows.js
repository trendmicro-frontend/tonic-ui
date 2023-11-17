import { Button, Grid, Stack } from '@tonic-ui/react';
import React, { useState } from 'react';

const GridItem = (props) => (
  <Grid bg="teal:50" border={1} borderColor="teal:60" p="3x" {...props} />
);

const App = () => {
  const [value, setValue] = useState('auto');

  return (
    <>
      <Stack direction="row" spacing="2x" mb="4x">
        <Button variant="outline" onClick={() => setValue('auto')}>auto</Button>
        <Button variant="outline" onClick={() => setValue('3rem')}>3rem</Button>
        <Button variant="outline" onClick={() => setValue('min-content')}>min-content</Button>
        <Button variant="outline" onClick={() => setValue('minmax(2rem, auto)')}>minmax(2rem, auto)</Button>
      </Stack>
      <pre>
        {`<Grid autoRows="${value}">`}
      </pre>
      <Grid
        autoRows={value}
        templateColumns="1fr 1fr"
        gap="2x"
        bg="gray:10"
        p="4x"
      >
        <GridItem>One</GridItem>
        <GridItem>Two</GridItem>
        <GridItem>Three</GridItem>
        <GridItem>Four</GridItem>
        <GridItem></GridItem>
      </Grid>
    </>
  );
};

export default App;
