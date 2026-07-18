import React, { createRef } from 'react';
import { Scrollbar } from '@tonic-ui/react';

// Basic usage
<Scrollbar>
  <div>Scrollable content</div>
</Scrollbar>;

// With height
<Scrollbar height={400}>
  <div>Fixed height scrollable</div>
</Scrollbar>;

// Ref
const scrollbarRef = createRef<HTMLDivElement>();
<Scrollbar ref={scrollbarRef}>Content</Scrollbar>;

// With overflow
<Scrollbar overflow="auto">Content</Scrollbar>;
<Scrollbar overflow="scroll">Content</Scrollbar>;
<Scrollbar overflow="hidden">Content</Scrollbar>;

// With overflowX/overflowY
<Scrollbar overflowX="auto" overflowY="scroll">Content</Scrollbar>;
<Scrollbar overflowX="hidden" overflowY="auto">Content</Scrollbar>;

// With scrollLeft/scrollTop
<Scrollbar scrollLeft={100} scrollTop={50}>Content</Scrollbar>;

// With minThumbWidth/minThumbHeight
<Scrollbar minThumbWidth={40} minThumbHeight={40}>Content</Scrollbar>;

// With onScroll/onUpdate - NO manual type annotations
<Scrollbar
  onScroll={(e) => console.log(e)}
  onUpdate={(values) => console.log(values)}
>
  Content
</Scrollbar>;

// With render prop (children as function) - NO manual type annotations
<Scrollbar height={400}>
  {({
    ScrollView,
    HorizontalTrack,
    HorizontalThumb,
    VerticalTrack,
    VerticalThumb,
    getScrollViewProps,
    getHorizontalTrackProps,
    getHorizontalThumbProps,
    getVerticalTrackProps,
    getVerticalThumbProps,
  }) => (
    <>
      <ScrollView {...getScrollViewProps()}>Custom Content</ScrollView>
      <VerticalTrack {...getVerticalTrackProps()}>
        <VerticalThumb {...getVerticalThumbProps()} />
      </VerticalTrack>
      <HorizontalTrack {...getHorizontalTrackProps()}>
        <HorizontalThumb {...getHorizontalThumbProps()} />
      </HorizontalTrack>
    </>
  )}
</Scrollbar>;
