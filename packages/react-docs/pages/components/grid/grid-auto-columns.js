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
        <Button variant="outline" onClick={() => setValue('1fr')}>1fr</Button>
        <Button variant="outline" onClick={() => setValue('min-content')}>min-content</Button>
        <Button variant="outline" onClick={() => setValue('minmax(3rem, auto)')}>minmax(3rem, auto)</Button>
      </Stack>
      <pre>
        {`<Grid autoColumns="${value}">`}
      </pre>
      <Grid
        autoColumns={value}
        gap="2x"
        bg="gray:10"
        p="4x"
      >
        <GridItem column="1/3">One</GridItem>
        <GridItem column="2">Two</GridItem>
        <GridItem>Three</GridItem>
        <GridItem>Four</GridItem>
        <GridItem>Five</GridItem>
      </Grid>
    </>
  );
};

export default App;
