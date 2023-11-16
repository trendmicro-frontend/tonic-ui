import {
  Scrollbar,
} from '@tonic-ui/react';
import React from 'react';
import Lorem from '@/components/Lorem';

const App = () => {
  return (
    <Scrollbar
      height={200}
    >
      <Lorem count={10} />
    </Scrollbar>
  );
};

export default App;
