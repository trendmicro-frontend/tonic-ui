/* eslint-disable max-lines-per-function */
import React, { forwardRef, useCallback, useState, useEffect, useRef } from 'react';
import Box from '../Box';
import { ScrollbarContextProvider } from './context';
import {
  useContainerStyle,
} from './styles';
import HorizontalTrack from './HorizontalTrack';
import HorizontalThumb from './HorizontalThumb';
import VerticalTrack from './VerticalTrack';
import VerticalThumb from './VerticalThumb';
import View from './View';

let scrollbarWidth = false;

const getScrollbarWidth = () => {
  if (scrollbarWidth !== false) {
    return scrollbarWidth;
  }
  if (typeof document !== 'undefined') {
    const div = document.createElement('div');
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.position = 'absolute';
    div.style.top = '-9999px';
    div.style.overflow = 'scroll'; // forcing scrollbar to appear
    div.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(div);
    scrollbarWidth = (div.offsetWidth - div.clientWidth);
    document.body.removeChild(div);
  }
  return scrollbarWidth || 0;
};

const getInnerWidth = (el) => {
  const { clientWidth } = el;
  const { paddingLeft, paddingRight } = getComputedStyle(el);
  return clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
};

const getInnerHeight = (el) => {
  const { clientHeight } = el;
  const { paddingTop, paddingBottom } = getComputedStyle(el);
  return clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
};

const Scrollbar = forwardRef((
  {
    onScroll,
    autoHide = false,
    autoHideTimeout = 1000,
    autoHideDuration = 200,
    thumbSize,
    thumbMinSize = 30,
    autoHeight = false,
    autoHeightMin = 0,
    autoHeightMax = 200,
    style,
    children,
    ...reset
  },
  ref,
) => {
  const [viewScrollLeft, setViewScrollLeft] = useState(0);
  const [viewScrollTop, setViewScrollTop] = useState(0);
  const [lastViewScrollLeft, setLastViewScrollLeft] = useState(0);
  const [lastViewScrollTop, setLastViewScrollTop] = useState(0);

  const [isScrolling, setIsScrolling] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [prevPageX, setPrevPageX] = useState(0);
  const [prevPageY, setPrevPageY] = useState(0);

  const viewRef = useRef(null);
  const trackHorizontalRef = useRef(null);
  const trackVerticalRef = useRef(null);
  const thumbHorizontalRef = useRef(null);
  const thumbVerticalRef = useRef(null);

  const containerStyle = useContainerStyle({ autoHeight, autoHeightMin, autoHeightMax, style });

  const getValues = () => {
    const {
      scrollLeft = 0,
      scrollTop = 0,
      scrollWidth = 0,
      scrollHeight = 0,
      clientWidth = 0,
      clientHeight = 0
    } = viewRef.current || {};

    return {
      left: (scrollLeft / (scrollWidth - clientWidth)) || 0,
      top: (scrollTop / (scrollHeight - clientHeight)) || 0,
      scrollLeft,
      scrollTop,
      scrollWidth,
      scrollHeight,
      clientWidth,
      clientHeight,
    };
  };
  const update = useCallback(() => {
    const scrollbarWidth = getScrollbarWidth();
    if (!scrollbarWidth) {
      return;
    }

    const values = getValues();
    const { scrollLeft, clientWidth, scrollWidth } = values;
    const trackHorizontalWidth = getInnerWidth(trackHorizontalRef.current);
    const thumbHorizontalWidth = getThumbHorizontalWidth();
    const thumbHorizontalX = scrollLeft / (scrollWidth - clientWidth) * (trackHorizontalWidth - thumbHorizontalWidth);
    const { scrollTop, clientHeight, scrollHeight } = values;
    const trackVerticalHeight = getInnerHeight(trackVerticalRef.current);
    const thumbVerticalHeight = getThumbVerticalHeight();
    const thumbVerticalY = scrollTop / (scrollHeight - clientHeight) * (trackVerticalHeight - thumbVerticalHeight);
    trackHorizontalRef.current.style.visibility = scrollWidth > clientWidth ? 'visible' : 'hidden';
    trackVerticalRef.current.style.visibility = scrollHeight > clientHeight ? 'visible' : 'hidden';
    thumbHorizontalRef.current.style.width = `${thumbHorizontalWidth}px`;
    thumbHorizontalRef.current.style.transform = `translateX(${thumbHorizontalX}px)`;
    thumbVerticalRef.current.style.height = `${thumbVerticalHeight}px`;
    thumbVerticalRef.current.style.transform = `translateY(${thumbVerticalY}px)`;
  }, [getThumbHorizontalWidth, getThumbVerticalHeight]);
  const getThumbHorizontalWidth = useCallback(() => {
    const { scrollWidth, clientWidth } = viewRef.current;
    const trackWidth = getInnerWidth(trackHorizontalRef.current);
    const width = Math.ceil(clientWidth / scrollWidth * trackWidth);
    if (trackWidth === width) {
      return 0;
    }
    if (thumbSize) {
      return thumbSize;
    }
    return Math.max(width, thumbMinSize);
  }, [thumbSize, thumbMinSize]);
  const getThumbVerticalHeight = useCallback(() => {
    const { scrollHeight, clientHeight } = viewRef.current;
    const trackHeight = getInnerHeight(trackVerticalRef.current);
    const height = Math.ceil(clientHeight / scrollHeight * trackHeight);
    if (trackHeight === height) {
      return 0;
    }
    if (thumbSize) {
      return thumbSize;
    }
    return Math.max(height, thumbMinSize);
  }, [thumbSize, thumbMinSize]);

  const hideTracks = () => {
    if (isDragging) {
      return;
    }
    if (isScrolling) {
      return;
    }
    setTimeout(() => {
      if (trackHorizontalRef.current) {
        trackHorizontalRef.current.style.opacity = 0;
      }
      if (trackVerticalRef.current) {
        trackVerticalRef.current.style.opacity = 0;
      }
    }, autoHideTimeout);
  };
  const showTracks = () => {
    if (trackHorizontalRef.current) {
      trackHorizontalRef.current.style.opacity = 1;
    }
    if (trackVerticalRef.current) {
      trackVerticalRef.current.style.opacity = 1;
    }
  };
  const getScrollLeftForOffset = (offset) => {
    const { scrollWidth, clientWidth } = viewRef.current;
    const trackWidth = getInnerWidth(trackHorizontalRef.current);
    const thumbWidth = getThumbHorizontalWidth();
    return offset / (trackWidth - thumbWidth) * (scrollWidth - clientWidth);
  };
  const getScrollTopForOffset = (offset) => {
    const { scrollHeight, clientHeight } = viewRef.current;
    const trackHeight = getInnerHeight(trackVerticalRef.current);
    const thumbHeight = getThumbVerticalHeight();
    return offset / (trackHeight - thumbHeight) * (scrollHeight - clientHeight);
  };

  /* Start Scrolling Events */
  const handleScrollStartAutoShow = () => {
    if (!autoHide) {
      return;
    }
    showTracks();
  };
  const handleScrollStopAutoHide = () => {
    if (!autoHide) {
      return;
    }
    hideTracks();
  };
  const handleScrollStop = () => {
    handleScrollStopAutoHide();
  };
  const handleScrollStart = () => {
    handleScrollStartAutoShow();
  };
  const detectScrolling = () => {
    if (isScrolling) {
      return;
    }
    setIsScrolling(true);
    handleScrollStart();
    const detectScrollingInterval = setInterval(() => {
      if (lastViewScrollLeft === viewScrollLeft && lastViewScrollTop === viewScrollTop) {
        clearInterval(detectScrollingInterval);
        setIsScrolling(false);
        handleScrollStop();
      }
      setLastViewScrollLeft(viewScrollLeft);
      setLastViewScrollTop(viewScrollTop);
    }, 100);
  };
  const handleScrollView = (event) => {
    if (onScroll) {
      onScroll(event);
    }
    update(values => {
      const { scrollLeft, scrollTop } = values;
      setViewScrollLeft(scrollLeft);
      setViewScrollTop(scrollTop);
    });
    detectScrolling();
  };
  /* End Scrolling Events */

  /* Start Dragging Events */
  const handleDrag = (event) => {
    if (prevPageX) {
      const { clientX } = event;
      const { left: trackLeft } = trackHorizontalRef.current.getBoundingClientRect();
      const thumbWidth = getThumbHorizontalWidth();
      const clickPosition = thumbWidth - prevPageX;
      const offset = -trackLeft + clientX - clickPosition;
      viewRef.current.scrollLeft = getScrollLeftForOffset(offset);
    }
    if (prevPageY) {
      const { clientY } = event;
      const { top: trackTop } = trackVerticalRef.current.getBoundingClientRect();
      const thumbHeight = getThumbVerticalHeight();
      const clickPosition = thumbHeight - prevPageY;
      const offset = -trackTop + clientY - clickPosition;
      viewRef.current.scrollTop = getScrollTopForOffset(offset);
    }
    return false;
  };
  const handleDragEndAutoHide = () => {
    if (!autoHide) {
      return;
    }
    hideTracks();
  };
  const setupDragging = () => {
    document.body.style['user-select'] = 'none';
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    document.onselectstart = () => {
      return false;
    };
  };
  const teardownDragging = () => {
    document.body.style['user-select'] = '';
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
    document.onselectstart = undefined;
  };
  const handleDragStart = (event) => {
    event.stopPropagation();
    setIsDragging(true);
    setupDragging();
  };
  const handleDragEnd = () => {
    setIsDragging(false);
    teardownDragging();
    handleDragEndAutoHide();
  };
  /* End Dragging Events */

  /* Start Mouse Events */
  const handleTrackMouseEnterAutoShow = () => {
    if (!autoHide) {
      return;
    }
    showTracks();
  };
  const handleTrackMouseLeaveAutoHide = () => {
    if (!autoHide) {
      return;
    }
    hideTracks();
  };
  const handleTrackMouseEnter = () => {
    handleTrackMouseEnterAutoShow();
  };
  const handleTrackMouseLeave = () => {
    handleTrackMouseLeaveAutoHide();
  };
  const handleHorizontalTrackMouseDown = (event) => {
    event.preventDefault();
    const { target, clientX } = event;
    const { left: targetLeft } = target.getBoundingClientRect();
    const thumbWidth = getThumbHorizontalWidth();
    const offset = Math.abs(targetLeft - clientX) - thumbWidth / 2;
    viewRef.current.scrollLeft = getScrollLeftForOffset(offset);
  };
  const handleVerticalTrackMouseDown = (event) => {
    event.preventDefault();
    const { target, clientY } = event;
    const { top: targetTop } = target.getBoundingClientRect();
    const thumbHeight = getThumbVerticalHeight();
    const offset = Math.abs(targetTop - clientY) - thumbHeight / 2;
    viewRef.current.scrollTop = getScrollTopForOffset(offset);
  };
  const handleHorizontalThumbMouseDown = (event) => {
    event.preventDefault();
    handleDragStart(event);
    const { target, clientX } = event;
    const { offsetWidth } = target;
    const { left } = target.getBoundingClientRect();
    setPrevPageX(offsetWidth - (clientX - left));
  };
  const handleVerticalThumbMouseDown = (event) => {
    event.preventDefault();
    handleDragStart(event);
    const { target, clientY } = event;
    const { offsetHeight } = target;
    const { top } = target.getBoundingClientRect();
    const newPrevPageY = offsetHeight - (clientY - top);
    setPrevPageY(newPrevPageY);
  };
  /* End Mouse Events */

  const context = {
    scrollbarWidth,
    autoHide,
    autoHideDuration,
    autoHeight,
    autoHeightMin,
    autoHeightMax,
  };

  useEffect(() => {
    scrollbarWidth = getScrollbarWidth();
    update();
  }, [update]);

  return (
    <Box
      {...containerStyle}
      {...reset}
    >
      <ScrollbarContextProvider value={context}>
        <View
          ref={viewRef}
          onScroll={handleScrollView}
        >
          {children}
        </View>
        <HorizontalTrack
          ref={trackHorizontalRef}
          onmMouseDown={handleHorizontalTrackMouseDown}
          onMouseEnter={handleTrackMouseEnter}
          onMouseLeave={handleTrackMouseLeave}
        >
          <HorizontalThumb
            ref={thumbHorizontalRef}
            onMouseDown={handleHorizontalThumbMouseDown}
          />
        </HorizontalTrack>
        <VerticalTrack
          ref={trackVerticalRef}
          onMouseDown={handleVerticalTrackMouseDown}
          onMouseEnter={handleTrackMouseEnter}
          onMouseLeave={handleTrackMouseLeave}
        >
          <VerticalThumb
            ref={thumbVerticalRef}
            onMouseDown={handleVerticalThumbMouseDown}
          />
        </VerticalTrack>
      </ScrollbarContextProvider>
    </Box>
  );
});

Scrollbar.displayName = 'Scrollbar';

export default Scrollbar;
