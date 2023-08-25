import {
  Scrollbar,
} from '@tonic-ui/react';
import React from 'react';
import Lorem from '@/components/Lorem';

const App = () => {
  return (
    <Scrollbar
      minWidth="10%"
      maxWidth="100%"
      overflow="scroll"
      resize="horizontal"
    >
      <Lorem count={6} whiteSpace="nowrap" />
    </Scrollbar>
  );
};

export default App;
