import { SearchInput, Stack } from '@tonic-ui/react';
import React from 'react';

const App = () => (
  <Stack direction="column" spacing="4x">
    <SearchInput
      placeholder="Search"
    />
    <SearchInput
      placeholder="Search"
      defaultValue="Regular"
    />
    <SearchInput
      placeholder="Search"
      defaultValue="Read Only"
      readOnly
    />
    <SearchInput
      placeholder="Search"
      defaultValue="Disabled"
      disabled
    />
    <SearchInput
      placeholder="Search"
      defaultValue="Loading"
      isLoading
    />
    <SearchInput
      placeholder="Search"
      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium ante erat, vitae sodales mi varius quis. Etiam vestibulum lorem vel urna tempor, eu fermentum odio aliquam. Aliquam consequat urna vitae ipsum pulvinar, in blandit purus eleifend."
      inputProps={{
        textOverflow: 'ellipsis',
      }}
    />
  </Stack>
);

export default App;
