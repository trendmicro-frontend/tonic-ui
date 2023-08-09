import {
  Scrollbar,
} from '@tonic-ui/react';
import React from 'react';
import Lorem from '@/components/Lorem';

const App = () => {
  return (
    <Scrollbar
      height={200}
      overflow="scroll"
      resize="both"
    >
      <Lorem count={10} whiteSpace="nowrap" />
    </Scrollbar>
  );
};

export default App;
