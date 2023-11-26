import { Button, Grid, Stack } from '@tonic-ui/react';
import React, { useState } from 'react';

const GridItem = (props) => (
  <Grid bg="teal:50" border={1} borderColor="teal:60" p="3x" {...props} />
);

const App = () => {
  const [value, setValue] = useState('4rem 4rem');

  return (
    <>
      <Stack direction="row" spacing="2x" mb="4x">
        <Button variant="outline" onClick={() => setValue('4rem 4rem')}>4rem 4rem</Button>
        <Button variant="outline" onClick={() => setValue('1fr 4rem')}>1fr 4rem</Button>
        <Button variant="outline" onClick={() => setValue('1fr auto')}>1fr auto</Button>
        <Button variant="outline" onClick={() => setValue('1fr 2fr')}>1fr 2fr</Button>
      </Stack>
      <pre>
        {`<Grid templateColumns="${value}">`}
      </pre>
      <Grid
        templateColumns={value}
        gap="2x"
        bg="gray:10"
        p="4x"
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
