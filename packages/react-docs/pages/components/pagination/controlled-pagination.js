import { Pagination, Stack, Text } from '@tonic-ui/react';
import React, { useState } from 'react';

const App = () => {
  const [page, setPage] = useState(1);
  const handleChange = (value) => {
    setPage(value);
  };

  return (
    <Stack spacing="4x">
      <Text>Page: {page}</Text>
      <Pagination count={10} page={page} onChange={handleChange} />
    </Stack>
  );
};

export default App;
