import {
  Scrollbar,
} from '@tonic-ui/react';
import React from 'react';
import Lorem from '@/components/Lorem';

const App = () => {
  return (
    <Scrollbar
      minHeight={100}
      maxHeight={200}
      overflow="scroll"
      resize="vertical"
    >
      <Lorem count={10} />
    </Scrollbar>
  );
};

export default App;
