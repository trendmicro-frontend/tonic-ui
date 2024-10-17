import { Box, Scrollbar } from '@tonic-ui/react';
import { Virtuoso } from 'react-virtuoso';
import React, { forwardRef } from 'react';

const CustomScrollbar = forwardRef((inProps, ref) => {
  const { children, ...props } = inProps;

  return (
    <Scrollbar
      overflowY="scroll"
      scrollViewProps={props}
      scrollViewRef={ref}
    >
      {children}
    </Scrollbar>
  );
});

CustomScrollbar.displayName = 'CustomScrollbar';

const App = () => {
  return (
    <Virtuoso
      components={{
        Scroller: CustomScrollbar,
      }}
      style={{
        height: 400,
      }}
      totalCount={10000}
      itemContent={(index) => (
        <Box>Item {index}</Box>
      )}
    />
  );
};

export default App;
