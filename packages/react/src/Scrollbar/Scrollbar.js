import { ensureFiniteNumber } from 'ensure-type';
import React, { forwardRef, useCallback, useEffect, useState, useRef } from 'react';
import Box from '../Box';
import {
  useContainerStyle,
  useScrollViewStyle,
  useHorizontalTrackStyle,
  useVerticalTrackStyle,
  useHorizontalThumbStyle,
  useVerticalThumbStyle,
} from './styles';
import getInnerHeight from './utils/getInnerHeight';
import getInnerWidth from './utils/getInnerWidth';
import ScrollView from './ScrollView';
import HorizontalTrack from './HorizontalTrack';
import VerticalTrack from './VerticalTrack';
import HorizontalThumb from './HorizontalThumb';
import VerticalThumb from './VerticalThumb';

const Scrollbar = forwardRef((
  {
    disabled, // deprecated (remove in next major version)
    visibility, // deprecated (remove in next major version)
    renderView, // deprecated (remove in next major version)
    renderHorizontalTrack, // deprecated (remove in next major version)
    renderHorizontalThumb, // deprecated (remove in next major version)
    renderVerticalTrack, // deprecated (remove in next major version)
    renderVerticalThumb, // deprecated (remove in next major version)

    children,
    maxHeight = 'auto',
    minHeight = 'auto',
    minThumbSize = 32,
    onScroll,
    onUpdate,
    overflow = 'auto',
    overflowX,
    overflowY,
    thumbSize,
    ...rest
  },
  ref,
) => {
  const [isHydrated, setIsHydrated] = useState(false); // false for initial render
  const autoHeight = (maxHeight !== 'auto');

  useEffect(() => {
    // Deprecation warning
    if (disabled !== undefined) {
      console.error('Warning: `disabled` is deprecated, use `overflow="hidden"` instead.');
    }
    if (visibility === 'visible') {
      console.error('Warning: `visibility="visible"` is deprecated. Use `overflow="scroll"` instead.');
    } else if (visibility !== undefined) {
      console.error('The `visibility` prop is deprecated. Use `overflow` instead.');
    }
    if (renderView !== undefined) {
      console.error('The `renderView` prop is deprecated. Use children as a function to render the scroll view instead.');
    }
    if (renderHorizontalTrack !== undefined) {
      console.error('The `renderHorizontalTrack` prop is deprecated. Use children as a function to render the horizontal track instead.');
    }
    if (renderHorizontalThumb !== undefined) {
      console.error('The `renderHorizontalThumb` prop is deprecated. Use children as a function to render the horizontal thumb instead.');
    }
    if (renderVerticalTrack !== undefined) {
      console.error('The `renderVerticalTrack` prop is deprecated. Use children as a function to render the vertical track instead.');
    }
    if (renderVerticalThumb !== undefined) {
      console.error('The `renderVerticalThumb` prop is deprecated. Use children as a function to render the vertical thumb instead.');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  { // Update overflow props
    // TODO: remove `disabled` and `visibility` props in next major version
    if (disabled === true) {
      overflowX = 'hidden';
      overflowY = 'hidden';
    }

    overflowX = overflowX ?? (visibility ?? overflow);
    overflowY = overflowY ?? (visibility ?? overflow);
    if (overflowX === 'visible') {
      overflowX = 'scroll';
    }
    if (overflowY === 'visible') {
      overflowY = 'scroll';
    }
    overflowX = overflowX ?? 'auto';
    overflowY = overflowY ?? 'auto';
  }

  const viewScrollLeftRef = useRef(0);
  const viewScrollTopRef = useRef(0);
  const lastViewScrollLeftRef = useRef(0);
  const lastViewScrollTopRef = useRef(0);

  // For binding the `mousemove` and `mouseup` events to document, we use `useState` to store `startDragging` variable to trigger `useEffect`.
  const [startDragging, setStartDragging] = useState(false);

  // These variables are used to be the checked point to change DOM element style directly (Do NOT need to re-render UI)
  const isDraggingRef = useRef(false);
  const isScrollingRef = useRef(false);
  const isTrackMouseOverRef = useRef(false);
  const isViewMouseOverRef = useRef(false);
  const prevPageXRef = useRef(0);
  const prevPageYRef = useRef(0);

  const scrollViewRef = useRef(null);
  const horizontalTrackRef = useRef(null);
  const verticalTrackRef = useRef(null);
  const horizontalThumbRef = useRef(null);
  const verticalThumbRef = useRef(null);

  const getValues = () => {
    const {
      scrollLeft = 0,
      scrollTop = 0,
      scrollWidth = 0,
      scrollHeight = 0,
      clientWidth = 0,
      clientHeight = 0
    } = scrollViewRef.current || {};

    return {
      left: ensureFiniteNumber(scrollLeft / (scrollWidth - clientWidth)),
      top: ensureFiniteNumber(scrollTop / (scrollHeight - clientHeight)),
      scrollLeft,
      scrollTop,
      scrollWidth,
      scrollHeight,
      clientWidth,
      clientHeight,
    };
  };

  const update = useCallback((callback) => {
    if (!isHydrated) {
      return;
    }

    if (!horizontalTrackRef.current) {
      return;
    }

    if (!verticalTrackRef.current) {
      return;
    }

    const values = getValues();
    const { scrollLeft, clientWidth, scrollWidth } = values;
    const horizontalTrackWidth = getInnerWidth(horizontalTrackRef.current);
    const horizontalThumbWidth = getThumbHorizontalWidth({ minThumbSize, thumbSize });
    const horizontalThumbX = scrollLeft / (scrollWidth - clientWidth) * (horizontalTrackWidth - horizontalThumbWidth);
    const { scrollTop, clientHeight, scrollHeight } = values;
    const verticalTrackHeight = getInnerHeight(verticalTrackRef.current);
    const verticalThumbHeight = getThumbVerticalHeight({ minThumbSize, thumbSize });
    const verticalThumbY = scrollTop / (scrollHeight - clientHeight) * (verticalTrackHeight - verticalThumbHeight);
    horizontalTrackRef.current.style.visibility = (scrollWidth > clientWidth) ? 'visible' : 'hidden';
    verticalTrackRef.current.style.visibility = (scrollHeight > clientHeight) ? 'visible' : 'hidden';
    horizontalThumbRef.current.style.width = `${horizontalThumbWidth}px`;
    horizontalThumbRef.current.style.transform = `translateX(${horizontalThumbX}px)`;
    verticalThumbRef.current.style.height = `${verticalThumbHeight}px`;
    verticalThumbRef.current.style.transform = `translateY(${verticalThumbY}px)`;

    if (typeof onUpdate === 'function') {
      onUpdate({
        values, // FIXME: deprecated (for backward compatibility)
        hasHorizontalScrollbar: (scrollWidth > clientWidth), // FIXME: deprecated (for backward compatibility)
        hasVerticalScrollbar: (scrollHeight > clientHeight), // FIXME: deprecated (for backward compatibility)
        ...values,
      });
    }
    if (typeof callback === 'function') {
      callback(values);
    }
  }, [getThumbHorizontalWidth, getThumbVerticalHeight, isHydrated, onUpdate, minThumbSize, thumbSize]);

  const getThumbHorizontalWidth = useCallback(({ minThumbSize, thumbSize }) => {
    const { scrollWidth, clientWidth } = scrollViewRef.current;
    const trackWidth = getInnerWidth(horizontalTrackRef.current);
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
    const { scrollHeight, clientHeight } = scrollViewRef.current;
    const trackHeight = getInnerHeight(verticalTrackRef.current);
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
    if (overflowX === 'scroll') {
      return;
    }

    if (horizontalTrackRef.current) {
      horizontalTrackRef.current.style.opacity = 0;
    }
  }, [overflowX]);

  const hideVerticalTrack = useCallback(() => {
    if (overflowY === 'scroll') {
      return;
    }

    if (verticalTrackRef.current) {
      verticalTrackRef.current.style.opacity = 0;
    }
  }, [overflowY]);

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

  const showHorizontalTrack = useCallback(() => {
    if (overflowX === 'hidden') {
      return;
    }

    if (horizontalTrackRef.current) {
      horizontalTrackRef.current.style.opacity = 1;
    }
  }, [overflowX]);

  const showVerticalTrack = useCallback(() => {
    if (overflowY === 'hidden') {
      return;
    }

    if (verticalTrackRef.current) {
      verticalTrackRef.current.style.opacity = 1;
    }
  }, [overflowY]);

  const showTracks = useCallback(() => {
    showHorizontalTrack();
    showVerticalTrack();
  }, [showHorizontalTrack, showVerticalTrack]);

  const getScrollLeftForOffset = useCallback((offset) => {
    const { scrollWidth, clientWidth } = scrollViewRef.current;
    const trackWidth = getInnerWidth(horizontalTrackRef.current);
    const thumbWidth = getThumbHorizontalWidth({ minThumbSize, thumbSize });
    return offset / (trackWidth - thumbWidth) * (scrollWidth - clientWidth);
  }, [minThumbSize, thumbSize, getThumbHorizontalWidth]);

  const getScrollTopForOffset = useCallback((offset) => {
    const { scrollHeight, clientHeight } = scrollViewRef.current;
    const trackHeight = getInnerHeight(verticalTrackRef.current);
    const thumbHeight = getThumbVerticalHeight({ minThumbSize, thumbSize });
    return offset / (trackHeight - thumbHeight) * (scrollHeight - clientHeight);
  }, [minThumbSize, thumbSize, getThumbVerticalHeight]);

  /* Start Scrolling Events */
  const handleScrollStart = useCallback(() => {
    showTracks();
  }, [showTracks]);

  const handleScrollStop = useCallback(() => {
    hideTracks();
  }, [hideTracks]);

  const detectScrolling = useCallback(() => {
    const isScrolling = isScrollingRef.current;
    if (isScrolling) {
      return;
    }
    isScrollingRef.current = true;
    handleScrollStart();
    const detectScrollingInterval = setInterval(() => {
      if (lastViewScrollLeftRef.current === viewScrollLeftRef.current && lastViewScrollTopRef.current === viewScrollTopRef.current) {
        clearInterval(detectScrollingInterval);
        isScrollingRef.current = false;
        handleScrollStop();
      }
      lastViewScrollLeftRef.current = viewScrollLeftRef.current;
      lastViewScrollTopRef.current = viewScrollTopRef.current;
    }, 100);
  }, [handleScrollStart, handleScrollStop]);

  const handleScrollViewScroll = useCallback((event) => {
    if (onScroll) {
      onScroll(event);
    }
    update(values => {
      const { scrollLeft, scrollTop } = values;
      viewScrollLeftRef.current = scrollLeft;
      viewScrollTopRef.current = scrollTop;
    });
    detectScrolling();
  }, [onScroll, update, detectScrolling]);
  /* End Scrolling Events */

  /* Start Dragging Events */
  const handleDrag = useCallback((event) => {
    const prevPageX = prevPageXRef.current;
    const prevPageY = prevPageYRef.current;
    if (prevPageX) {
      const { clientX } = event;
      const { left: trackLeft } = horizontalTrackRef.current.getBoundingClientRect();
      const thumbWidth = getThumbHorizontalWidth({ minThumbSize, thumbSize });
      const clickPosition = thumbWidth - prevPageX;
      const offset = -trackLeft + clientX - clickPosition;
      scrollViewRef.current.scrollLeft = getScrollLeftForOffset(offset);
    }
    if (prevPageY) {
      const { clientY } = event;
      const { top: trackTop } = verticalTrackRef.current.getBoundingClientRect();
      const thumbHeight = getThumbVerticalHeight({ minThumbSize, thumbSize });
      const clickPosition = thumbHeight - prevPageY;
      const offset = -trackTop + clientY - clickPosition;
      scrollViewRef.current.scrollTop = getScrollTopForOffset(offset);
    }
    return false;
  }, [minThumbSize, thumbSize, getScrollLeftForOffset, getScrollTopForOffset, getThumbHorizontalWidth, getThumbVerticalHeight]);

  const handleDragStart = useCallback(() => {
    setStartDragging(true);
    isDraggingRef.current = true;
  }, [setStartDragging]);

  const handleDragEnd = useCallback(() => {
    setStartDragging(false);
    isDraggingRef.current = false;
    prevPageXRef.current = 0;
    prevPageYRef.current = 0;
    hideTracks();
  }, [setStartDragging, hideTracks]);

  /* Start Mouse Events */
  const handleScrollViewMouseEnter = useCallback(() => {
    isViewMouseOverRef.current = true;
    showTracks();
  }, [showTracks]);

  const handleScrollViewMouseLeave = useCallback(() => {
    isViewMouseOverRef.current = false;
    hideTracks();
  }, [hideTracks]);

  const handleTrackMouseEnter = useCallback(() => {
    isTrackMouseOverRef.current = true;
    showTracks();
  }, [showTracks]);

  const handleTrackMouseLeave = useCallback(() => {
    isTrackMouseOverRef.current = false;
    hideTracks();
  }, [hideTracks]);

  const handleHorizontalTrackMouseDown = useCallback((event) => {
    event.preventDefault();
    const { target, clientX } = event;
    const { left: targetLeft } = target.getBoundingClientRect();
    const thumbWidth = getThumbHorizontalWidth({ minThumbSize, thumbSize });
    const offset = Math.abs(targetLeft - clientX) - thumbWidth / 2;
    scrollViewRef.current.scrollLeft = getScrollLeftForOffset(offset);
  }, [minThumbSize, thumbSize, getScrollLeftForOffset, getThumbHorizontalWidth]);

  const handleVerticalTrackMouseDown = useCallback((event) => {
    event.preventDefault();
    const { target, clientY } = event;
    const { top: targetTop } = target.getBoundingClientRect();
    const thumbHeight = getThumbVerticalHeight({ minThumbSize, thumbSize });
    const offset = Math.abs(targetTop - clientY) - thumbHeight / 2;
    scrollViewRef.current.scrollTop = getScrollTopForOffset(offset);
  }, [minThumbSize, thumbSize, getScrollTopForOffset, getThumbVerticalHeight]);

  const handleHorizontalThumbMouseDown = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    handleDragStart();
    const { target, clientX } = event;
    const { offsetWidth } = target;
    const { left } = target.getBoundingClientRect();
    prevPageXRef.current = offsetWidth - (clientX - left);
  }, [handleDragStart]);

  const handleVerticalThumbMouseDown = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    handleDragStart();
    const { target, clientY } = event;
    const { offsetHeight } = target;
    const { top } = target.getBoundingClientRect();
    prevPageYRef.current = offsetHeight - (clientY - top);
  }, [handleDragStart]);
  /* End Mouse Events */

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
     * Note: Don't confuse the wheel event with the scroll event. The default action of a wheel event is implementation-specific, and doesn't necessarily dispatch a scroll event. Even when it does, the delta* values in the wheel event don't necessarily reflect the content's scrolling direction. Therefore, do not rely on the wheel event's delta* properties to get the scrolling direction. Instead, detect value changes of scrollLeft and scrollTop of the target in the scroll event.
     */
    const handleVerticalTrackWheelScroll = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const deltaY = event.deltaY;
      const currentTop = scrollViewRef.current.scrollTop;
      scrollViewRef.current.scrollTop = currentTop + deltaY;
    };
    const handleHorizontalTrackWheelScroll = (event) => {
      event.preventDefault();
      event.stopPropagation();
      // Note: the delta* values don't reflect the scrolling direction, the event.deltaX is always zero when doing horizontal scroll
      const deltaX = event.deltaX || event.deltaY;
      const currentLeft = scrollViewRef.current.scrollLeft;
      scrollViewRef.current.scrollLeft = currentLeft + deltaX;
    };

    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners
     * Set passive to false to indicate that the function specified by listener will call `preventDefault()`
     */
    const verticalTrack = verticalTrackRef.current;
    const horizontalTrack = horizontalTrackRef.current;
    verticalTrack?.addEventListener('wheel', handleVerticalTrackWheelScroll, { passive: false });
    horizontalTrack?.addEventListener('wheel', handleHorizontalTrackWheelScroll, { passive: false });

    return () => {
      verticalTrack?.removeEventListener('wheel', handleVerticalTrackWheelScroll);
      horizontalTrack?.removeEventListener('wheel', handleHorizontalTrackWheelScroll);
    };
  }, []);

  useEffect(() => {
    const isDragging = isDraggingRef.current;
    if (isDragging) {
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', handleDragEnd);
    }
    if (!isDragging) {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    }
    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, [startDragging, handleDrag, handleDragEnd]);

  useEffect(() => {
    update();
  }, [update, children]);

  const containerStyle = useContainerStyle({ autoHeight, minHeight, maxHeight });
  const scrollViewStyle = useScrollViewStyle({ autoHeight, minHeight, maxHeight, overflowX, overflowY });
  const horizontalTrackStyle = useHorizontalTrackStyle({ overflowX });
  const verticalTrackStyle = useVerticalTrackStyle({ overflowY });
  const horizontalThumbStyle = useHorizontalThumbStyle();
  const verticalThumbStyle = useVerticalThumbStyle();

  const getScrollViewProps = () => {
    return {
      ...scrollViewStyle,
      ref: scrollViewRef,
      onScroll: handleScrollViewScroll,
      onMouseEnter: handleScrollViewMouseEnter,
      onMouseLeave: handleScrollViewMouseLeave,
      children,
    };
  };

  const getHorizontalTrackProps = () => {
    return {
      ...horizontalTrackStyle,
      ref: horizontalTrackRef,
      onMouseDown: handleHorizontalTrackMouseDown,
      onMouseEnter: handleTrackMouseEnter,
      onMouseLeave: handleTrackMouseLeave,
    };
  };

  const getHorizontalThumbProps = () => {
    return {
      ...horizontalThumbStyle,
      ref: horizontalThumbRef,
      onMouseDown: handleHorizontalThumbMouseDown,
    };
  };

  const getVerticalTrackProps = () => {
    return {
      ...verticalTrackStyle,
      ref: verticalTrackRef,
      onMouseDown: handleVerticalTrackMouseDown,
      onMouseEnter: handleTrackMouseEnter,
      onMouseLeave: handleTrackMouseLeave,
    };
  };

  const getVerticalThumbProps = () => {
    return {
      ...verticalThumbStyle,
      ref: verticalThumbRef,
      onMouseDown: handleVerticalThumbMouseDown,
    };
  };

  if (typeof children === 'function') {
    return (
      <Box
        ref={ref}
        {...containerStyle}
        {...rest}
      >
        {children({
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
        })}
      </Box>
    );
  }

  return (
    <Box
      ref={ref}
      {...containerStyle}
      {...rest}
    >
      <ScrollView {...getScrollViewProps()} />
      <HorizontalTrack {...getHorizontalTrackProps()}>
        <HorizontalThumb {...getHorizontalThumbProps()} />
      </HorizontalTrack>
      <VerticalTrack {...getVerticalTrackProps()}>
        <VerticalThumb {...getVerticalThumbProps()} />
      </VerticalTrack>
    </Box>
  );
});

Scrollbar.displayName = 'Scrollbar';

export default Scrollbar;
