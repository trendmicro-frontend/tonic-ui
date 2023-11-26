import {
  Box,
  Divider,
  Grid,
  Scrollbar,
  Text,
} from '@tonic-ui/react';
import React from 'react';
import Lorem from '@/components/Lorem';

const App = () => {
  return (
    <Grid
      templateColumns="repeat(auto-fit, minmax(240px, 1fr))"
      columnGap="6x"
      rowGap="4x"
    >
      <Box>
        <Text size="xl" marginBottom="2x">
          minThumbHeight=50
        </Text>
        <Divider orientation="horizontal" mt="2x" mb="4x" />
        <Scrollbar
          height={200}
          minThumbHeight={50}
          overflow="scroll"
        >
          <Lorem count={10} />
        </Scrollbar>
      </Box>
      <Box>
        <Text size="xl" marginBottom="2x">
          minThumbHeight=100
        </Text>
        <Divider orientation="horizontal" mt="2x" mb="4x" />
        <Scrollbar
          height={200}
          minThumbHeight={100}
          overflow="scroll"
        >
          <Lorem count={10} />
        </Scrollbar>
      </Box>
    </Grid>
  );
};

export default App;
