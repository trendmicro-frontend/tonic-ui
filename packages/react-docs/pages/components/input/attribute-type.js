import { Grid, Input, TextLabel } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Grid
    templateColumns="min-content auto"
    columnGap="3x"
    rowGap="3x"
  >
    <Grid>
      <TextLabel>Name:</TextLabel>
    </Grid>
    <Grid>
      <Input type="text" placeholder="John Doe" />
    </Grid>
    <Grid>
      <TextLabel>Password:</TextLabel>
    </Grid>
    <Grid>
      <Input type="password" placeholder="Password" />
    </Grid>
  </Grid>
);

export default App;
