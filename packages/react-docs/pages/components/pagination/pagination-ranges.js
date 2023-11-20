import { Pagination, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack spacing="4x">
    <Pagination count={11} defaultPage={6} />
    <Pagination count={11} defaultPage={6} boundaryCount={0} />
    <Pagination count={11} defaultPage={6} siblingCount={0} />
    <Pagination count={11} defaultPage={6} boundaryCount={0} siblingCount={0} />
    <Pagination count={11} defaultPage={6} boundaryCount={2} siblingCount={0} />
    <Pagination count={15} defaultPage={8} boundaryCount={2} siblingCount={2} />
  </Stack>
);

export default App;
