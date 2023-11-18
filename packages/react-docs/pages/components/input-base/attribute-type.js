import { Grid, InputBase, TextLabel } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Grid
    templateColumns="min-content auto"
    columnGap="2x"
    rowGap="3x"
  >
    <Grid>
      <TextLabel>Name:</TextLabel>
    </Grid>
    <Grid>
      <InputBase type="text" placeholder="John Doe" />
    </Grid>
    <Grid>
      <TextLabel>Password:</TextLabel>
    </Grid>
    <Grid>
      <InputBase type="password" placeholder="Password" />
    </Grid>
  </Grid>
);

export default App;
