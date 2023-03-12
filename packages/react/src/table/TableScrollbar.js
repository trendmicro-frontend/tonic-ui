import React, { forwardRef } from 'react';
import { Scrollbar } from '../scrollbar';
import { useTableScrollbarTrackStyle } from './styles';

const TableScrollbar = forwardRef((
  {
    children,
    ...rest
  },
  ref,
) => {
  const trackStyleProps = useTableScrollbarTrackStyle();

  return (
    <Scrollbar ref={ref} {...rest}>
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
          <ScrollView {...getScrollViewProps()}>
            {children}
          </ScrollView>
          <HorizontalTrack
            {...getHorizontalTrackProps()}
            {...trackStyleProps}
          >
            <HorizontalThumb {...getHorizontalThumbProps()} />
          </HorizontalTrack>
          <VerticalTrack
            {...getVerticalTrackProps()}
            {...trackStyleProps}
          >
            <VerticalThumb {...getVerticalThumbProps()} />
          </VerticalTrack>
        </>
      )}
    </Scrollbar>
  );
});

TableScrollbar.displayName = 'TableScrollbar';

export default TableScrollbar;
