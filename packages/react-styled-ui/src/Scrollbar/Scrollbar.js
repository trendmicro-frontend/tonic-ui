/* eslint-disable max-lines-per-function */
import React, { forwardRef, useCallback, useEffect, useState, useRef } from 'react';
import PseudoBox from '../PseudoBox';
import {
  useContainerStyle,
  useViewStyle,
  useTrackHorizontalStyle,
  useTrackVerticalStyle,
  useThumbHorizontalStyle,
  useThumbVerticalStyle,
} from './styles';
import getScrollbarWidth from './utils/getScrollbarWidth';
import getInnerHeight from './utils/getInnerHeight';
import getInnerWidth from './utils/getInnerWidth';
import {
  renderViewDefault,
  renderTrackHorizontalDefault,
  renderTrackVerticalDefault,
  renderThumbHorizontalDefault,
  renderThumbVerticalDefault,
} from './renderDefaultElements';

const Scrollbar = forwardRef((
  {
    children,
    disabled,
    maxHeight = 'auto',
    minHeight = 'auto',
    minThumbSize = 32,
    onScroll,
    onUpdate,
    renderView = renderViewDefault,
    renderHorizontalTrack = renderTrackHorizontalDefault,
    renderHorizontalThumb = renderThumbHorizontalDefault,
    renderVerticalTrack = renderTrackVerticalDefault,
    renderVerticalThumb = renderThumbVerticalDefault,
    scrollbarVisibility = 'auto',
    style,
    thumbSize,
    ...reset
  },
  ref,
) => {
  const [isHydrated, setIsHydrated] = useState(false); // false for initial render
  const autoHeight = (maxHeight !== 'auto');
  const horizontalScrollbarVisibility = disabled ? 'hidden' : scrollbarVisibility;
  const verticalScrollbarVisibility = disabled ? 'hidden' : scrollbarVisibility;
  let viewScrollLeft = 0;
  let viewScrollTop = 0;
  let lastViewScrollLeft = 0;
  let lastViewScrollTop = 0;

  // For binding the `mousemove` and `mouseup` events to document, we use `useState` to store `startDragging` variable to trigger `useEffect`.
  const [startDragging, setStartDragging] = useState(false);

  // These variables are used to be the checked point to change DOM style directly (Do NOT need to re-render UI)
  const isDraggingRef = useRef(false);
  const isScrollingRef = useRef(false);
  const isTrackMouseOverRef = useRef(false);
  const isViewMouseOverRef = useRef(false);
  const prevPageXRef = useRef(0);
  const prevPageYRef = useRef(0);

  const viewRef = useRef(null);
  const trackHorizontalRef = useRef(null);
  const trackVerticalRef = useRef(null);
  const thumbHorizontalRef = useRef(null);
  const thumbVerticalRef = useRef(null);

  const scrollbarWidth = getScrollbarWidth();
  const containerStyle = useContainerStyle({ autoHeight, minHeight, maxHeight, style });
  const viewStyle = useViewStyle({ scrollbarWidth, autoHeight, minHeight, maxHeight, disabled: (!isHydrated || disabled) });
  const trackHorizontalStyle = useTrackHorizontalStyle({ scrollbarWidth, horizontalScrollbarVisibility });
  const trackVerticalStyle = useTrackVerticalStyle({ scrollbarWidth, verticalScrollbarVisibility });
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

  const update = useCallback((callback) => {
    const scrollbarWidth = getScrollbarWidth();
    if (!scrollbarWidth || disabled) {
      return;
    }
    const values = getValues();
    const { scrollLeft, clientWidth, scrollWidth } = values;
    const trackHorizontalWidth = getInnerWidth(trackHorizontalRef.current);
    const thumbHorizontalWidth = getThumbHorizontalWidth({ minThumbSize, thumbSize });
    const thumbHorizontalX = scrollLeft / (scrollWidth - clientWidth) * (trackHorizontalWidth - thumbHorizontalWidth);
    const { scrollTop, clientHeight, scrollHeight } = values;
    const trackVerticalHeight = getInnerHeight(trackVerticalRef.current);
    const thumbVerticalHeight = getThumbVerticalHeight({ minThumbSize, thumbSize });
    const thumbVerticalY = scrollTop / (scrollHeight - clientHeight) * (trackVerticalHeight - thumbVerticalHeight);
    const hasHorizontalScrollbar = scrollWidth > clientWidth;
    const hasVerticalScrollbar = scrollHeight > clientHeight;
    trackHorizontalRef.current.style.visibility = hasHorizontalScrollbar ? 'visible' : 'hidden';
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
    }
  }, [disabled, minThumbSize, thumbSize, getThumbHorizontalWidth, getThumbVerticalHeight, onUpdate]);

  const getThumbHorizontalWidth = useCallback(({ minThumbSize, thumbSize }) => {
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
  }, []);

  const getThumbVerticalHeight = useCallback(({ minThumbSize, thumbSize }) => {
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
  }, []);

  const hideHorizontalTrack = useCallback(() => {
    if (horizontalScrollbarVisibility === 'visible') {
      return;
    }

    if (trackHorizontalRef.current) {
      trackHorizontalRef.current.style.opacity = 0;
    }
  }, [horizontalScrollbarVisibility]);

  const hideVerticalTrack = useCallback(() => {
    if (verticalScrollbarVisibility === 'visible') {
      return;
    }

    if (trackVerticalRef.current) {
      trackVerticalRef.current.style.opacity = 0;
    }
  }, [verticalScrollbarVisibility]);

  const hideTracks = useCallback(() => {
    const isDragging = isDraggingRef.current;
    const isScrolling = isScrollingRef.current;
    const isTrackMouseOver = isTrackMouseOverRef.current;
    const isViewMouseOver = isViewMouseOverRef.current;
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
  }, [hideHorizontalTrack, hideVerticalTrack]);

  const showHorizontalTrack = () => {
    if (horizontalScrollbarVisibility === 'hidden') {
      return;
    }

    if (trackHorizontalRef.current) {
      trackHorizontalRef.current.style.opacity = 1;
    }
  };

  const showVerticalTrack = () => {
    if (verticalScrollbarVisibility === 'hidden') {
      return;
    }

    if (trackVerticalRef.current) {
      trackVerticalRef.current.style.opacity = 1;
    }
  };

  const showTracks = () => {
    showHorizontalTrack();
    showVerticalTrack();
  };

  const getScrollLeftForOffset = useCallback((offset) => {
    const { scrollWidth, clientWidth } = viewRef.current;
    const trackWidth = getInnerWidth(trackHorizontalRef.current);
    const thumbWidth = getThumbHorizontalWidth({ minThumbSize, thumbSize });
    return offset / (trackWidth - thumbWidth) * (scrollWidth - clientWidth);
  }, [minThumbSize, thumbSize, getThumbHorizontalWidth]);

  const getScrollTopForOffset = useCallback((offset) => {
    const { scrollHeight, clientHeight } = viewRef.current;
    const trackHeight = getInnerHeight(trackVerticalRef.current);
    const thumbHeight = getThumbVerticalHeight({ minThumbSize, thumbSize });
    return offset / (trackHeight - thumbHeight) * (scrollHeight - clientHeight);
  }, [minThumbSize, thumbSize, getThumbVerticalHeight]);

  /* Start Scrolling Events */
  const handleScrollStart = () => {
    showTracks();
  };
  const handleScrollStop = () => {
    hideTracks();
  };
  const detectScrolling = () => {
    const isScrolling = isScrollingRef.current;
    if (isScrolling) {
      return;
    }
    isScrollingRef.current = true;
    handleScrollStart();
    const detectScrollingInterval = setInterval(() => {
      if (lastViewScrollLeft === viewScrollLeft && lastViewScrollTop === viewScrollTop) {
        clearInterval(detectScrollingInterval);
        isScrollingRef.current = false;
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
  const handleDrag = useCallback((event) => {
    const prevPageX = prevPageXRef.current;
    const prevPageY = prevPageYRef.current;
    if (prevPageX) {
      const { clientX } = event;
      const { left: trackLeft } = trackHorizontalRef.current.getBoundingClientRect();
      const thumbWidth = getThumbHorizontalWidth({ minThumbSize, thumbSize });
      const clickPosition = thumbWidth - prevPageX;
      const offset = -trackLeft + clientX - clickPosition;
      viewRef.current.scrollLeft = getScrollLeftForOffset(offset);
    }
    if (prevPageY) {
      const { clientY } = event;
      const { top: trackTop } = trackVerticalRef.current.getBoundingClientRect();
      const thumbHeight = getThumbVerticalHeight({ minThumbSize, thumbSize });
      const clickPosition = thumbHeight - prevPageY;
      const offset = -trackTop + clientY - clickPosition;
      viewRef.current.scrollTop = getScrollTopForOffset(offset);
    }
    return false;
  }, [minThumbSize, thumbSize, getScrollLeftForOffset, getScrollTopForOffset, getThumbHorizontalWidth, getThumbVerticalHeight]);
  const handleDragStart = () => {
    setStartDragging(true);
    isDraggingRef.current = true;
  };
  const handleDragEnd = useCallback(() => {
    setStartDragging(false);
    isDraggingRef.current = false;
    prevPageXRef.current = 0;
    prevPageYRef.current = 0;
    hideTracks();
  }, [hideTracks]);

  /* Start Mouse Events */
  const handleViewMouseEnter = () => {
    isViewMouseOverRef.current = true;
    showTracks();
  };
  const handleViewMouseLeave = () => {
    isViewMouseOverRef.current = false;
    hideTracks();
  };
  const handleTrackMouseEnter = () => {
    isTrackMouseOverRef.current = true;
    showTracks();
  };
  const handleTrackMouseLeave = () => {
    isTrackMouseOverRef.current = false;
    hideTracks();
  };
  const handleHorizontalTrackMouseDown = (event) => {
    event.preventDefault();
    const { target, clientX } = event;
    const { left: targetLeft } = target.getBoundingClientRect();
    const thumbWidth = getThumbHorizontalWidth({ minThumbSize, thumbSize });
    const offset = Math.abs(targetLeft - clientX) - thumbWidth / 2;
    viewRef.current.scrollLeft = getScrollLeftForOffset(offset);
  };
  const handleVerticalTrackMouseDown = (event) => {
    event.preventDefault();
    const { target, clientY } = event;
    const { top: targetTop } = target.getBoundingClientRect();
    const thumbHeight = getThumbVerticalHeight({ minThumbSize, thumbSize });
    const offset = Math.abs(targetTop - clientY) - thumbHeight / 2;
    viewRef.current.scrollTop = getScrollTopForOffset(offset);
  };
  const handleHorizontalThumbMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleDragStart();
    const { target, clientX } = event;
    const { offsetWidth } = target;
    const { left } = target.getBoundingClientRect();
    prevPageXRef.current = offsetWidth - (clientX - left);
  };
  const handleVerticalThumbMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleDragStart();
    const { target, clientY } = event;
    const { offsetHeight } = target;
    const { top } = target.getBoundingClientRect();
    prevPageYRef.current = offsetHeight - (clientY - top);
  };
  /* End Mouse Events */

  const setupDragging = useCallback(() => {
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  }, [handleDrag, handleDragEnd]);

  const teardownDragging = useCallback(() => {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
  }, [handleDrag, handleDragEnd]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const isDragging = isDraggingRef.current;
    if (isDragging) {
      setupDragging();
    }
    if (!isDragging) {
      teardownDragging();
    }
    return () => {
      teardownDragging();
    };
  }, [startDragging, setupDragging, teardownDragging]);

  useEffect(() => {
    update();
  }, [update, children]);

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

Scrollbar.displayName = 'Scrollbar';

export default Scrollbar;
