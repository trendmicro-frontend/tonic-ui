import { useHydrated, useMergeRefs } from '@tonic-ui/react-hooks';
import { callEventHandlers } from '@tonic-ui/utils';
import { ensurePositiveFiniteNumber } from 'ensure-type';
import React, { forwardRef, useCallback, useEffect, useState, useRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
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

const Scrollbar = forwardRef((inProps, ref) => {
  const {
    children,
    width = 'auto',
    height = 'auto',
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    minThumbWidth = 32,
    minThumbHeight = 32,
    onScroll,
    onUpdate,
    overflow = 'auto',
    overflowX: overflowXProp,
    overflowY: overflowYProp,
    scrollLeft: scrollLeftProp,
    scrollTop: scrollTopProp,
    scrollViewProps: scrollViewPropsProp,
    scrollViewRef: scrollViewRefProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Scrollbar' });

  let overflowX = overflowXProp;
  let overflowY = overflowYProp;

  { // Adjust overflow values
    overflowX = overflowX ?? overflow;
    overflowY = overflowY ?? overflow;

    // Ensure scroll behavior for `overflowX` if originally set to 'visible'
    if (overflowX === 'visible') {
      overflowX = 'scroll';
    }

    // Ensure scroll behavior for `overflowY` if originally set to 'visible'
    if (overflowY === 'visible') {
      overflowY = 'scroll';
    }

    // Set default overflow values if not provided
    overflowX = overflowX ?? 'auto';
    overflowY = overflowY ?? 'auto';
  }

  const isHydrated = useHydrated();

  const currentScrollLeftRef = useRef(0);
  const currentScrollTopRef = useRef(0);
  const lastScrollLeftRef = useRef(0);
  const lastScrollTopRef = useRef(0);

  // For binding the `mousemove` and `mouseup` events to document, we use `useState` to store `startDragging` variable to trigger `useEffect`.
  const [startDragging, setStartDragging] = useState(false);

  // These variables are used to be the checked point to change DOM element style directly (Do NOT need to re-render UI)
  const isDraggingRef = useRef(false);
  const isScrollingRef = useRef(false);
  const isTrackMouseOverRef = useRef(false);
  const isViewMouseOverRef = useRef(false);
  const prevPageXRef = useRef(0);
  const prevPageYRef = useRef(0);

  const nodeRef = useRef(null);
  const scrollViewRef = useRef(null);
  const horizontalTrackRef = useRef(null);
  const verticalTrackRef = useRef(null);
  const horizontalThumbRef = useRef(null);
  const verticalThumbRef = useRef(null);
  const combinedRef = useMergeRefs(nodeRef, ref);
  const combinedScrollViewRef = useMergeRefs(scrollViewRef, scrollViewRefProp);

  useEffect(() => {
    if (scrollViewRef.current && scrollLeftProp !== undefined) {
      scrollViewRef.current.scrollLeft = scrollLeftProp;
    }
  }, [scrollLeftProp]);

  useEffect(() => {
    if (scrollViewRef.current && scrollTopProp !== undefined) {
      scrollViewRef.current.scrollTop = scrollTopProp;
    }
  }, [scrollTopProp]);

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
      left: ensurePositiveFiniteNumber(scrollLeft / (scrollWidth - clientWidth)),
      top: ensurePositiveFiniteNumber(scrollTop / (scrollHeight - clientHeight)),
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
    const horizontalTrackWidth = getHorizontalTrackWidth();
    const horizontalThumbWidth = getHorizontalThumbWidth();
    const horizontalThumbX = (scrollWidth - clientWidth !== 0)
      ? scrollLeft / (scrollWidth - clientWidth) * (horizontalTrackWidth - horizontalThumbWidth)
      : 0;
    const { scrollTop, clientHeight, scrollHeight } = values;
    const verticalTrackHeight = getVerticalTrackHeight();
    const verticalThumbHeight = getVerticalThumbHeight();
    const verticalThumbY = (scrollHeight - clientHeight !== 0)
      ? scrollTop / (scrollHeight - clientHeight) * (verticalTrackHeight - verticalThumbHeight)
      : 0;

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
  }, [getHorizontalTrackWidth, getHorizontalThumbWidth, getVerticalTrackHeight, getVerticalThumbHeight, isHydrated, onUpdate]);

  const getHorizontalTrackWidth = useCallback(() => {
    if (!horizontalTrackRef.current) {
      return 0;
    }
    const trackWidth = getInnerWidth(horizontalTrackRef.current);
    return trackWidth;
  }, []);

  const getHorizontalThumbWidth = useCallback(() => {
    const { clientWidth, scrollWidth } = scrollViewRef.current;
    if (clientWidth === scrollWidth) {
      return 0;
    }

    const trackWidth = getHorizontalTrackWidth();
    const thumbWidth = Math.max(
      ensurePositiveFiniteNumber(minThumbWidth),
      ensurePositiveFiniteNumber(Math.ceil((clientWidth / scrollWidth) * trackWidth)),
    );
    return thumbWidth;
  }, [getHorizontalTrackWidth, minThumbWidth]);

  const getVerticalTrackHeight = useCallback(() => {
    if (!verticalTrackRef.current) {
      return 0;
    }
    const trackHeight = getInnerHeight(verticalTrackRef.current);
    return trackHeight;
  }, []);

  const getVerticalThumbHeight = useCallback(() => {
    const { clientHeight, scrollHeight } = scrollViewRef.current;
    if (clientHeight === scrollHeight) {
      return 0;
    }

    const trackHeight = getVerticalTrackHeight();
    const thumbHeight = Math.max(
      ensurePositiveFiniteNumber(minThumbHeight),
      ensurePositiveFiniteNumber(Math.ceil((clientHeight / scrollHeight) * trackHeight)),
    );
    return thumbHeight;
  }, [getVerticalTrackHeight, minThumbHeight]);

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

  const getScrollLeftByOffset = useCallback((offset) => {
    const { scrollWidth, clientWidth } = scrollViewRef.current;
    const trackWidth = getHorizontalTrackWidth();
    const thumbWidth = getHorizontalThumbWidth();
    return offset / (trackWidth - thumbWidth) * (scrollWidth - clientWidth);
  }, [getHorizontalTrackWidth, getHorizontalThumbWidth]);

  const getScrollTopByOffset = useCallback((offset) => {
    const { scrollHeight, clientHeight } = scrollViewRef.current;
    const trackHeight = getVerticalTrackHeight();
    const thumbHeight = getVerticalThumbHeight();
    return offset / (trackHeight - thumbHeight) * (scrollHeight - clientHeight);
  }, [getVerticalTrackHeight, getVerticalThumbHeight]);

  /* Start Scrolling Events */
  const handleScrollViewScroll = useCallback((event) => {
    if (typeof onScroll === 'function') {
      onScroll(event);
    }

    const updateCallback = (values) => {
      const { scrollLeft, scrollTop } = values;
      currentScrollLeftRef.current = scrollLeft;
      currentScrollTopRef.current = scrollTop;
    };
    update(updateCallback);

    // Detect whether the scrolling is in progress
    if (isScrollingRef.current) {
      return;
    }

    // Start scrolling
    isScrollingRef.current = true;

    const detectScrollingInterval = setInterval(() => {
      if (lastScrollLeftRef.current === currentScrollLeftRef.current && lastScrollTopRef.current === currentScrollTopRef.current) {
        clearInterval(detectScrollingInterval);

        // Stop scrolling
        isScrollingRef.current = false;
      }

      lastScrollLeftRef.current = currentScrollLeftRef.current;
      lastScrollTopRef.current = currentScrollTopRef.current;
    }, 100);
  }, [onScroll, update]);
  /* End Scrolling Events */

  /* Start Dragging Events */
  const handleDrag = useCallback((event) => {
    const prevPageX = prevPageXRef.current;
    const prevPageY = prevPageYRef.current;
    if (prevPageX) {
      const { clientX } = event;
      const { left: trackLeft } = horizontalTrackRef.current.getBoundingClientRect();
      const thumbWidth = getHorizontalThumbWidth();
      const clickPosition = thumbWidth - prevPageX;
      const offset = -trackLeft + clientX - clickPosition;
      scrollViewRef.current.scrollLeft = getScrollLeftByOffset(offset);
    }
    if (prevPageY) {
      const { clientY } = event;
      const { top: trackTop } = verticalTrackRef.current.getBoundingClientRect();
      const thumbHeight = getVerticalThumbHeight();
      const clickPosition = thumbHeight - prevPageY;
      const offset = -trackTop + clientY - clickPosition;
      scrollViewRef.current.scrollTop = getScrollTopByOffset(offset);
    }
    return false;
  }, [getHorizontalThumbWidth, getScrollLeftByOffset, getVerticalThumbHeight, getScrollTopByOffset]);

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
    const thumbWidth = getHorizontalThumbWidth();
    const offset = Math.abs(targetLeft - clientX) - thumbWidth / 2;
    scrollViewRef.current.scrollLeft = getScrollLeftByOffset(offset);
  }, [getHorizontalThumbWidth, getScrollLeftByOffset]);

  const handleVerticalTrackMouseDown = useCallback((event) => {
    event.preventDefault();
    const { target, clientY } = event;
    const { top: targetTop } = target.getBoundingClientRect();
    const thumbHeight = getVerticalThumbHeight();
    const offset = Math.abs(targetTop - clientY) - thumbHeight / 2;
    scrollViewRef.current.scrollTop = getScrollTopByOffset(offset);
  }, [getVerticalThumbHeight, getScrollTopByOffset]);

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

  const el = nodeRef?.current;

  useEffect(() => {
    if (!el) {
      // No element to observe
      return;
    }

    update();

    let mutationObserver = null;
    let resizeObserver = null;

    const MutationObserver = globalThis.MutationObserver ?? globalThis.WebKitMutationObserver;
    const ResizeObserver = globalThis.ResizeObserver;

    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver((mutations) => {
        const shouldUpdate = mutations.some(mutation => {
          if (mutation?.type === 'attributes' && typeof mutation?.target?.getAttribute === 'function') {
            const isScrollbarTrackOrThumb = mutation.target.getAttribute('data-scrollbar-track') || mutation.target.getAttribute('data-scrollbar-thumb');

            // Ignore mutations for the scrollbar track and scrollbar thumb to avoid triggering unnecessary updates during scrolling
            return !isScrollbarTrackOrThumb;
          }

          return true;
        });

        if (shouldUpdate) {
          update();
        }
      });
      mutationObserver.observe(el, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
      });
    }

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver((entries) => {
        update();
      });
      resizeObserver.observe(el);
    }

    return () => { // eslint-disable-line consistent-return
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [update, el]);

  const containerStyle = useContainerStyle({ width, height, minWidth, maxWidth, minHeight, maxHeight });
  const scrollViewStyle = useScrollViewStyle({ width, height, minWidth, maxWidth, minHeight, maxHeight, overflowX, overflowY });
  const horizontalTrackStyle = useHorizontalTrackStyle({ overflowX });
  const verticalTrackStyle = useVerticalTrackStyle({ overflowY });
  const horizontalThumbStyle = useHorizontalThumbStyle();
  const verticalThumbStyle = useVerticalThumbStyle();

  const getScrollViewProps = () => {
    return {
      children,
      ...scrollViewStyle,
      ...scrollViewPropsProp,
      ref: combinedScrollViewRef,
      onScroll: callEventHandlers(scrollViewPropsProp?.onScroll, handleScrollViewScroll),
      onMouseEnter: callEventHandlers(scrollViewPropsProp?.onMouseEnter, handleScrollViewMouseEnter),
      onMouseLeave: callEventHandlers(scrollViewPropsProp?.onMouseLeave, handleScrollViewMouseLeave),
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
        ref={combinedRef}
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
      ref={combinedRef}
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
