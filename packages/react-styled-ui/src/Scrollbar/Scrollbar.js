/* eslint-disable max-lines-per-function */
import React, { forwardRef, useState, useEffect, useRef } from 'react';
import Box from '../Box';
import PseudoBox from '../PseudoBox';
import {
  useContainerStyle,
  useViewStyle,
  useTrackHorizontalStyle,
  useTrackVerticalStyle,
  useThumbHorizontalStyle,
  useThumbVerticalStyle,
} from './styles';

let scrollbarWidth = false;

const Scrollbar = forwardRef((
  {
    onScroll,
    onUpdate,
    horizontalVisibility = 'auto',
    verticalVisibility = 'auto',
    autoHideDelay = 1000,
    thumbSize,
    minThumbSize = 30,
    autoHeight = false,
    autoHeightMin = 0,
    autoHeightMax = 200,
    renderView = renderViewDefault,
    renderHorizontalTrack = renderTrackHorizontalDefault,
    renderHorizontalThumb = renderThumbHorizontalDefault,
    renderVerticalTrack = renderTrackVerticalDefault,
    renderVerticalThumb = renderThumbVerticalDefault,
    style,
    children,
    ...reset
  },
  ref,
) => {
  let hideHorizontalTrackTimeout;
  let hideVerticalTrackTimeout;
  let viewScrollLeft = 0;
  let viewScrollTop = 0;
  let lastViewScrollLeft = 0;
  let lastViewScrollTop = 0;
  let isScrolling = false;
  let isDragging = false;
  let isTrackMouseOver = false;
  let isViewMouseOver = false;

  const [prevPageX, setPrevPageX] = useState(0);
  const [prevPageY, setPrevPageY] = useState(0);

  const viewRef = useRef(null);
  const trackHorizontalRef = useRef(null);
  const trackVerticalRef = useRef(null);
  const thumbHorizontalRef = useRef(null);
  const thumbVerticalRef = useRef(null);

  const containerStyle = useContainerStyle({ autoHeight, autoHeightMin, autoHeightMax, style });
  const viewStyle = useViewStyle({ scrollbarWidth, autoHeight, autoHeightMin, autoHeightMax });
  const trackHorizontalStyle = useTrackHorizontalStyle({ scrollbarWidth, horizontalVisibility });
  const trackVerticalStyle = useTrackVerticalStyle({ scrollbarWidth, verticalVisibility });
  const thumbHorizontalStyle = useThumbHorizontalStyle();
  const thumbVerticalStyle = useThumbVerticalStyle();

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
  const update = (callback) => {
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
    const hasHorizontalScrollbar = scrollWidth > clientWidth;
    const hasVerticalScrollbar = scrollHeight > clientHeight;
    trackHorizontalRef.current.style.visibility = hasHorizontalScrollbar? 'visible' : 'hidden';
    trackVerticalRef.current.style.visibility = hasVerticalScrollbar ? 'visible' : 'hidden';
    thumbHorizontalRef.current.style.width = `${thumbHorizontalWidth}px`;
    thumbHorizontalRef.current.style.transform = `translateX(${thumbHorizontalX}px)`;
    thumbVerticalRef.current.style.height = `${thumbVerticalHeight}px`;
    thumbVerticalRef.current.style.transform = `translateY(${thumbVerticalY}px)`;

    if (typeof onUpdate === 'function') {
      onUpdate({
        values,
        hasHorizontalScrollbar,
        hasVerticalScrollbar,
      });
    }
    if (typeof callback === 'function') {
      callback(values);
    };
  };
  const getThumbHorizontalWidth = () => {
    const { scrollWidth, clientWidth } = viewRef.current;
    const trackWidth = getInnerWidth(trackHorizontalRef.current);
    const width = Math.ceil(clientWidth / scrollWidth * trackWidth);
    if (trackWidth === width) {
      return 0;
    }
    if (thumbSize) {
      return thumbSize;
    }
    return Math.max(width, minThumbSize);
  };
  const getThumbVerticalHeight = () => {
    const { scrollHeight, clientHeight } = viewRef.current;
    const trackHeight = getInnerHeight(trackVerticalRef.current);
    const height = Math.ceil(clientHeight / scrollHeight * trackHeight);
    if (trackHeight === height) {
      return 0;
    }
    if (thumbSize) {
      return thumbSize;
    }
    return Math.max(height, minThumbSize);
  };
  const hideHorizontalTrack = () => {
    if (horizontalVisibility === true) {
      return;
    }

    clearTimeout(hideHorizontalTrackTimeout);
    hideHorizontalTrackTimeout = setTimeout(() => {
      if (trackHorizontalRef.current) {
        trackHorizontalRef.current.style.opacity = 0;
      }
    }, autoHideDelay);
  };
  const hideVerticalTrack = () => {
    if (verticalVisibility === true) {
      return;
    }

    clearTimeout(hideVerticalTrackTimeout);
    hideVerticalTrackTimeout = setTimeout(() => {
      if (trackVerticalRef.current) {
        trackVerticalRef.current.style.opacity = 0;
      }
    }, autoHideDelay);
  };
  const hideTracks = () => {
    if (isDragging) {
      return;
    }
    if (isScrolling) {
      return;
    }
    if (isTrackMouseOver) {
      return;
    }
    if (isViewMouseOver) {
      return;
    }
    hideHorizontalTrack();
    hideVerticalTrack();
  };
  const showHorizontalTrack = () => {
    if (horizontalVisibility === false) {
      return;
    }

    clearTimeout(hideHorizontalTrackTimeout);
    if (trackHorizontalRef.current) {
      trackHorizontalRef.current.style.opacity = 1;
    }
  };
  const showVerticalTrack = () => {
    if (verticalVisibility === false) {
      return;
    }
    clearTimeout(hideVerticalTrackTimeout);
    if (trackVerticalRef.current) {
      trackVerticalRef.current.style.opacity = 1;
    }
  };
  const showTracks = () => {
    showHorizontalTrack();
    showVerticalTrack();
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
  const handleHorizontalScrollStartAutoShow = () => {
    showHorizontalTrack();
  };
  const handleVerticalScrollStartAutoShow = () => {
    showVerticalTrack();
  };
  const handleScrollStart = () => {
    handleHorizontalScrollStartAutoShow();
    handleVerticalScrollStartAutoShow();
  };
  const horizontalScrollStopAutoHide = () => {
    hideHorizontalTrack();
  };
  const verticalScrollStopAutoHide = () => {
    hideVerticalTrack();
  };
  const handleScrollStop = () => {
    horizontalScrollStopAutoHide();
    verticalScrollStopAutoHide();
  };
  const detectScrolling = () => {
    if (isScrolling) {
      return;
    }
    isScrolling = true;
    handleScrollStart();
    const detectScrollingInterval = setInterval(() => {
      if (lastViewScrollLeft === viewScrollLeft && lastViewScrollTop === viewScrollTop) {
        clearInterval(detectScrollingInterval);
        isScrolling = false;
        handleScrollStop();
      }
      lastViewScrollLeft = viewScrollLeft;
      lastViewScrollTop = viewScrollTop;
    }, 100);
  };
  const handleScrollView = (event) => {
    if (onScroll) {
      onScroll(event);
    }
    update(values => {
      const { scrollLeft, scrollTop } = values;
      viewScrollLeft = scrollLeft;
      viewScrollTop = scrollTop;
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
  const handleDragStart = () => {
    isDragging = true;
    setupDragging();
  };
  const handleDragEnd = () => {
    isDragging = false;
    setPrevPageX(0);
    setPrevPageY(0);
    teardownDragging();
    handleDragEndAutoHide();
  };
  /* End Dragging Events */

  /* Start Mouse Events */
  const handleTrackMouseEnterAutoShow = () => {
    showTracks();
  };
  const handleTrackMouseLeaveAutoHide = () => {
    hideTracks();
  };
  const handleViewMouseEnter = () => {
    isViewMouseOver = true;
    handleTrackMouseEnterAutoShow();
  };
  const handleViewMouseLeave = () => {
    isViewMouseOver = false;
    handleTrackMouseLeaveAutoHide();
  };
  const handleTrackMouseEnter = () => {
    isTrackMouseOver = true;
    handleTrackMouseEnterAutoShow();
  };
  const handleTrackMouseLeave = () => {
    isTrackMouseOver = false;
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
    event.stopPropagation();
    const { target, clientX } = event;
    const { offsetWidth } = target;
    const { left } = target.getBoundingClientRect();
    setPrevPageX(offsetWidth - (clientX - left));
  };
  const handleVerticalThumbMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { target, clientY } = event;
    const { offsetHeight } = target;
    const { top } = target.getBoundingClientRect();
    setPrevPageY(offsetHeight - (clientY - top));
  };
  /* End Mouse Events */

  scrollbarWidth = getScrollbarWidth();

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    if (prevPageX || prevPageY) {
      handleDragStart();
    }
  }, [prevPageX, prevPageY]);

  return (
    <PseudoBox
      ref={ref}
      {...containerStyle}
      {...reset}
    >
      {
        renderView({
          ref: viewRef,
          children: children,
          onScroll: handleScrollView,
          onMouseEnter: handleViewMouseEnter,
          onMouseLeave: handleViewMouseLeave,
          ...viewStyle
        })
      }
      {
        renderHorizontalTrack({
          ref: trackHorizontalRef,
          children: (
            renderHorizontalThumb({
              ref: thumbHorizontalRef,
              onMouseDown: handleHorizontalThumbMouseDown,
              ...thumbHorizontalStyle
            })
          ),
          onMouseDown: handleHorizontalTrackMouseDown,
          onMouseEnter: handleTrackMouseEnter, 
          onMouseLeave: handleTrackMouseLeave,
          ...trackHorizontalStyle
        })
      }
      {
        renderVerticalTrack({
          ref: trackVerticalRef,
          children: (
            renderVerticalThumb({
              ref: thumbVerticalRef,
              onMouseDown: handleVerticalThumbMouseDown,
              ...thumbVerticalStyle
            })
          ),
          onMouseDown: handleVerticalTrackMouseDown,
          onMouseEnter: handleTrackMouseEnter,
          onMouseLeave: handleTrackMouseLeave,
          ...trackVerticalStyle
        })
      }
    </PseudoBox>
  );
});

const renderViewDefault = (props) => {
  return <Box {...props} />;
}

const renderTrackHorizontalDefault = (props) => {
  return <Box {...props} />;
}

const renderTrackVerticalDefault = (props) => {
  return <Box {...props} />;
}

const renderThumbHorizontalDefault = (props) => {
  return <PseudoBox {...props} />;
}

const renderThumbVerticalDefault = (props) => {
  return <PseudoBox {...props} />;
}

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

Scrollbar.displayName = 'Scrollbar';

export default Scrollbar;
