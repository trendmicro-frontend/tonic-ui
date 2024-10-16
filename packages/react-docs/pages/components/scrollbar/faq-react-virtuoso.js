import { Box, Scrollbar } from '@tonic-ui/react';
import { Virtuoso } from 'react-virtuoso';
import React, { forwardRef } from 'react';

const CustomScrollbar = forwardRef((props, ref) => {
  return (
    <Scrollbar
      overflowY="scroll"
      scrollViewRef={ref}
    >
      {({
        ScrollView,
        HorizontalTrack,
        VerticalTrack,
        HorizontalThumb,
        VerticalThumb,
        getScrollViewProps,
        getHorizontalTrackProps,
        getVerticalTrackProps,
        getHorizontalThumbProps,
        getVerticalThumbProps,
      }) => (
        <>
          <ScrollView
            {...getScrollViewProps()}
            {...props}
          />
          <HorizontalTrack
            {...getHorizontalTrackProps()}
          >
            <HorizontalThumb {...getHorizontalThumbProps()} />
          </HorizontalTrack>
          <VerticalTrack
            {...getVerticalTrackProps()}
          >
            <VerticalThumb {...getVerticalThumbProps()} />
          </VerticalTrack>
        </>
      )}
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
