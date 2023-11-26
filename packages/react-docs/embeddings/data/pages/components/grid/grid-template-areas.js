/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Grid, Stack } from '@tonic-ui/react';
import React, { useState } from 'react';

const GridItem = (props) => (
  <Grid bg="teal:50" border={1} borderColor="teal:60" p="3x" {...props} />
);

const App = () => {
  const [value, setValue] = useState('"a a a" "b c c" "b c c"');

  return (
    <>
      <Stack direction="row" spacing="2x" mb="4x">
        <Button variant="outline" onClick={() => setValue('"a a a" "b c c" "b c c"')}>
          <Box fontFamily="mono" py="1x">
            <Box>"a a a"</Box>
            <Box>"b c c"</Box>
            <Box>"b c c"</Box>
          </Box>
        </Button>
        <Button variant="outline" onClick={() => setValue('"b b a" "b b c" "b b c"')}>
          <Box fontFamily="mono" py="1x">
            <Box>"b b a"</Box>
            <Box>"b b c"</Box>
            <Box>"b b c"</Box>
          </Box>
        </Button>
        <Button variant="outline" onClick={() => setValue('"a a ." "a a ." ". b c"')}>
          <Box fontFamily="mono" py="1x">
            <Box>"a a ."</Box>
            <Box>"a a ."</Box>
            <Box>". b c"</Box>
          </Box>
        </Button>
      </Stack>
      <pre>
        {`<Grid templateAreas=${JSON.stringify(value)}>`}
      </pre>
      <Grid
        templateAreas={value}
        templateRows="repeat(3,minmax(3rem,auto))"
        templateColumns="1fr 1fr 1fr"
        gap="2x"
        bg="gray:10"
        p="4x"
      >
        <GridItem area="a" bg="blue:50" borderColor="blue:60">One (a)</GridItem>
        <GridItem area="b" bg="red:50" borderColor="red:60">Two (b)</GridItem>
        <GridItem area="c" bg="teal:50" borderColor="teal:60">Three (c)</GridItem>
      </Grid>
    </>
  );
};

export default App;
