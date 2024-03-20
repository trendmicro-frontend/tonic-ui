import {
  Box,
  ButtonBase,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import { AngleLeftIcon, AngleRightIcon } from '@tonic-ui/react-icons';
import {
  useEffectOnce,
} from '@tonic-ui/react-hooks';
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const easeInOutSin = (time) => {
  return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2;
};

const animate = (property, element, to, options = {}, cb = () => {}) => {
  const {
    ease = easeInOutSin,
    duration = 300, // standard
  } = options;

  let start = null;
  const from = element[property];
  let cancelled = false;

  const cancel = () => {
    cancelled = true;
  };

  const step = (timestamp) => {
    if (cancelled) {
      cb(new Error('Animation cancelled'));
      return;
    }

    if (start === null) {
      start = timestamp;
    }
    const time = Math.min(1, (timestamp - start) / duration);

    element[property] = ease(time) * (to - from) + from;

    if (time >= 1) {
      requestAnimationFrame(() => {
        cb(null);
      });
      return;
    }

    requestAnimationFrame(step);
  };

  if (from === to) {
    cb(new Error('Element already at target position'));
    return cancel;
  }

  requestAnimationFrame(step);
  return cancel;
};

const debounce = (func, wait = 166) => {
  let timeout;
  function debounced(...args) {
    const later = () => {
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced;
}

const IconButton = (props) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  return (
    <ButtonBase
      px="2x"
      color={colorStyle.color.secondary}
      tabIndex={0}
      _disabled={{
        color: colorStyle.color.disabled,
      }}
      _hover={{
        color: colorStyle.color.primary,
      }}
      {...props}
    />
  );
};

const StartScrollIndicator = forwardRef((props, ref) => (
  <Box
    ref={ref}
    position="relative"
    __after={{
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: '4x',
      background: 'linear-gradient(to right, rgba(21, 21, 21, 1) 0%, rgba(21, 21, 21, 0) 100%)',
    }}
    {...props}
  />
));
StartScrollIndicator.displayName = 'StartScrollIndicator';

const EndScrollIndicator = forwardRef((props, ref) => (
  <Box
    ref={ref}
    position="relative"
    __after={{
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      width: '4x',
      background: 'linear-gradient(to left, rgba(21, 21, 21, 1) 0%, rgba(21, 21, 21, 0) 100%)',
    }}
    {...props}
  />
));
EndScrollIndicator.displayName = 'EndScrollIndicator';

const useDragToScroll = (ref, options) => {
  const {
    direction = 'both', // One of: 'vertical', 'horizontal', 'both'
  } = { ...options };

  useEffect(() => {
    const position = {
      scrollTop: 0,
      scrollLeft: 0,
      mouseX: 0,
      mouseY: 0,
    };

    const el = ref && ref.current;
    if (!el) {
      return;
    }

    const mouseMoveHandler = (event) => {
      const dx = event.clientX - position.mouseX;
      const dy = event.clientY - position.mouseY;
      if (direction !== 'horizontal') {
        el.scrollTop = position.scrollTop - dy;
      }
      if (direction !== 'vertical') {
        el.scrollLeft = position.scrollLeft - dx;
      }
    };

    const mouseUpHandler = () => {
      el.style.cursor = 'grab';
      el.style.removeProperty('user-select');
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    const onMouseDown = (event) => {
      position.scrollLeft = el.scrollLeft;
      position.scrollTop = el.scrollTop;
      position.mouseX = event.clientX;
      position.mouseY = event.clientY;
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    el.addEventListener('mousedown', onMouseDown);
    return () => {
      el.removeEventListener('mousedown', onMouseDown);
    }
  }, [direction, ref]);
};

const App = () => {
  const startScrollIndicatorRef = useRef();
  const endScrollIndicatorRef = useRef();
  const orientation = 'horizontal';
  const scrollStart = (orientation === 'vertical') ? 'scrollTop' : 'scrollLeft';
  const clientSize = (orientation === 'vertical') ? 'clientHeight' : 'clientWidth';
  const [displayScroll, setDisplayScroll] = useState({
    start: false,
    end: false,
  });
  const tabScrollerRef = useRef(null);
  const tabListRef = useRef(null);

  useDragToScroll(tabScrollerRef);

  const scroll = (scrollValue, { animation = true } = {}) => {
    if (animation) {
      animate(scrollStart, tabScrollerRef.current, scrollValue, {
        duration: 300,
      });
    } else {
      tabScrollerRef.current[scrollStart] = scrollValue;
    }
  };

  const moveTabsScroll = (delta) => {
    let scrollValue = tabScrollerRef.current[scrollStart];
    scrollValue += delta;
    scroll(scrollValue);
  };

  // TODO: use Intersection Observer API to get expected scroll position
  const getScrollSize = () => {
    const containerSize = tabScrollerRef.current[clientSize];
    let totalSize = 0;
    const children = Array.from(tabListRef.current.children);
    for (let i = 0; i < children.length; i += 1) {
      const tab = children[i];
      if (totalSize + tab[clientSize] > containerSize) {
        break;
      }
      totalSize += tab[clientSize];
    }
    return totalSize;
  };

  const handleStartScrollClick = () => {
    moveTabsScroll(-1 * getScrollSize());
  };

  const handleEndScrollClick = () => {
    moveTabsScroll(getScrollSize());
  };

  const updateScrollButtonState = useCallback(() => {
    let showStartScroll;
    let showEndScroll;

    if (orientation === 'vertical') {
      const { scrollTop, scrollHeight, clientHeight } = tabScrollerRef.current;
      showStartScroll = scrollTop > 1;
      showEndScroll = scrollTop < scrollHeight - clientHeight - 1;
    } else {
      const { scrollLeft, scrollWidth, clientWidth } = tabScrollerRef.current;
      // use 1 for the potential rounding error with browser zooms.
      showStartScroll = scrollLeft > 1;
      showEndScroll = scrollLeft < scrollWidth - clientWidth - 1;
    }

    if ((showStartScroll !== displayScroll.start) || (showEndScroll !== displayScroll.end)) {
      setDisplayScroll({
        start: showStartScroll,
        end: showEndScroll,
      });
    }
  }, [orientation, displayScroll]);

  const updateScrollIndicatorOpacity = useCallback(() => {
    const { scrollLeft, scrollWidth, clientWidth } = tabScrollerRef.current;
    const startScrollOpacity = 1 / 20 * Math.min(scrollLeft, 20);
    const endScrollOpacity = 1 / 20 * ((scrollWidth - clientWidth) - Math.max(scrollLeft, (scrollWidth - clientWidth - 20)));
    if (startScrollIndicatorRef.current) {
      startScrollIndicatorRef.current.style.opacity = startScrollOpacity;
    }
    if (endScrollIndicatorRef.current) {
      endScrollIndicatorRef.current.style.opacity = endScrollOpacity;
    }
  }, []);

  const handleScrollTabs = useMemo(() => {
    return debounce(() => {
      updateScrollButtonState();
      updateScrollIndicatorOpacity();
    }, Math.floor(1000 / 60));
  }, [updateScrollButtonState, updateScrollIndicatorOpacity]);

  useEffect(() => {
    return () => {
      handleScrollTabs.clear();
    };
  }, [handleScrollTabs]);

  useEffectOnce(() => {
    updateScrollButtonState();
    updateScrollIndicatorOpacity();
  });

  return (
    <Tabs>
      <Flex>
        <IconButton
          disabled={!displayScroll.start}
          onClick={handleStartScrollClick}
        >
          <AngleLeftIcon />
        </IconButton>
        <StartScrollIndicator ref={startScrollIndicatorRef} />
        <Box
          ref={tabScrollerRef}
          maxWidth={280}
          overflowX="hidden"
          whiteSpace="nowrap"
          onScroll={handleScrollTabs}
        >
          <TabList
            ref={tabListRef}
          >
            <Tab>TAB 1</Tab>
            <Tab>TAB 2</Tab>
            <Tab>TAB 3</Tab>
            <Tab>TAB 4</Tab>
            <Tab>TAB 5</Tab>
            <Tab>TAB 6</Tab>
            <Tab>TAB 7</Tab>
            <Tab>TAB 8</Tab>
            <Tab>TAB 9</Tab>
            <Tab>TAB 10</Tab>
          </TabList>
        </Box>
        <EndScrollIndicator ref={endScrollIndicatorRef} />
        <IconButton
          disabled={!displayScroll.end}
          onClick={handleEndScrollClick}
        >
          <AngleRightIcon />
        </IconButton>
      </Flex>
      <TabPanels px="3x" py="2x">
        <TabPanel>
          Tab Panel 1
        </TabPanel>
        <TabPanel>
          Tab Panel 2
        </TabPanel>
        <TabPanel>
          Tab Panel 3
        </TabPanel>
        <TabPanel>
          Tab Panel 4
        </TabPanel>
        <TabPanel>
          Tab Panel 5
        </TabPanel>
        <TabPanel>
          Tab Panel 6
        </TabPanel>
        <TabPanel>
          Tab Panel 7
        </TabPanel>
        <TabPanel>
          Tab Panel 8
        </TabPanel>
        <TabPanel>
          Tab Panel 9
        </TabPanel>
        <TabPanel>
          Tab Panel 10
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default App;
