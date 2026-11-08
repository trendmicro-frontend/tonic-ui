/* eslint-disable react/jsx-no-bind */
import React, { useCallback, useRef, useState } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Scrollbar,
} from '../../../../src';

/**
 * Real-browser counterparts for the jsdom environment tests that mocked
 * `ResizeObserver` / `MutationObserver` / document listeners. Nothing here
 * fakes the platform APIs: geometry, observer callbacks, scrolling, and drag
 * events are native, so the assertions observe the component's actual effect.
 *
 * Query flags:
 * - `subject=modal` renders the ModalOverlay fixture (default: `scrollbar`)
 * - `controlled` passes `scrollLeft`/`scrollTop` from fixture state
 * - `restore` keeps the last `onUpdate` scroll position and reapplies it on remount
 */
const ModalObserverFixture = () => {
  // Deliberately larger than the viewport so the overlay must grow. `outside`
  // scroll behavior keeps the content unclamped, so its measured size is the
  // overflowing size the overlay has to cover.
  const [contentSize, setContentSize] = useState({ width: 2000, height: 1400 });
  const grow = () => setContentSize({ width: 2000, height: 1400 });
  const shrink = () => setContentSize({ width: 200, height: 120 });

  return (
    <Modal isOpen scrollBehavior="outside">
      <ModalOverlay data-testid="overlay" />
      <ModalContent data-testid="modal-content">
        <ModalBody>
          <Button data-testid="grow-modal-content" onClick={grow}>
            Grow modal content
          </Button>
          <Button data-testid="shrink-modal-content" onClick={shrink}>
            Shrink modal content
          </Button>
          <Box
            data-testid="modal-sized-content"
            sx={{ width: contentSize.width, height: contentSize.height }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const ScrollbarObserverFixture = ({ params, record }) => {
  const controlled = params.has('controlled');
  const restore = params.has('restore');
  const [frameHeight, setFrameHeight] = useState(200);
  const [contentHeight, setContentHeight] = useState(600);
  const [extraContent, setExtraContent] = useState(false);
  const [show, setShow] = useState(true);
  const [scrollTarget, setScrollTarget] = useState(100);
  const lastScrollTopRef = useRef(0);

  // `record` is recreated by the fixture page on every render, so keep it out
  // of the callback identity: a changing `onUpdate` would restart the
  // Scrollbar observer effect (and call `update()` again) on every event.
  const recordRef = useRef(record);
  recordRef.current = record;
  const handleUpdate = useCallback((values) => {
    lastScrollTopRef.current = values.scrollTop;
    recordRef.current({
      type: 'update',
      scrollTop: values.scrollTop,
      scrollHeight: values.scrollHeight,
      clientHeight: values.clientHeight,
    });
  }, []);

  return (
    <>
      <Button data-testid="grow-scrollbar-frame" onClick={() => setFrameHeight(320)}>
        Grow scrollbar frame
      </Button>
      <Button data-testid="reset-scrollbar-frame" onClick={() => setFrameHeight(200)}>
        Reset scrollbar frame
      </Button>
      <Button data-testid="add-scrollbar-content" onClick={() => setExtraContent(true)}>
        Add scrollbar content
      </Button>
      <Button data-testid="remove-scrollbar-content" onClick={() => setExtraContent(false)}>
        Remove scrollbar content
      </Button>
      <Button
        data-testid="resize-scrollbar-content"
        onClick={() => setContentHeight(height => (height === 600 ? 1000 : 600))}
      >
        Resize scrollbar content
      </Button>
      <Button data-testid="toggle-scrollbar" onClick={() => setShow(value => !value)}>
        Toggle scrollbar
      </Button>
      <Button data-testid="scroll-to-150" onClick={() => setScrollTarget(150)}>
        Scroll to 150
      </Button>
      <Button data-testid="scroll-to-500" onClick={() => setScrollTarget(500)}>
        Scroll to 500
      </Button>
      {/* The frame resizes without touching the Scrollbar subtree, so only the
          ResizeObserver observing the Scrollbar root can update the thumb. */}
      <Box data-testid="scrollbar-frame" sx={{ height: frameHeight }}>
        {show ? (
          <Scrollbar
            data-testid="scrollbar-root"
            width={controlled ? 200 : '100%'}
            height="100%"
            onUpdate={handleUpdate}
            {...(controlled ? { scrollLeft: scrollTarget, scrollTop: scrollTarget } : {})}
            {...(restore ? { scrollTop: lastScrollTopRef.current } : {})}
            slotProps={{
              scrollView: { 'data-testid': 'scroll-view' },
            }}
          >
            {/* The controlled case needs overflow in both axes; the observer
                cases only need vertical overflow. */}
            <Box
              data-testid="scroll-content"
              sx={{ width: controlled ? 400 : undefined, height: controlled ? 400 : contentHeight }}
            >
              Scrollable content
            </Box>
            {extraContent ? (
              <Box data-testid="extra-scroll-content" sx={{ height: 300 }}>Extra content</Box>
            ) : null}
          </Scrollbar>
        ) : null}
      </Box>
    </>
  );
};

const BrowserObserversFixture = ({ params, record }) => {
  const subject = params.get('subject') || 'scrollbar';
  if (subject === 'modal') {
    return <ModalObserverFixture />;
  }
  return <ScrollbarObserverFixture params={params} record={record} />;
};

export default BrowserObserversFixture;
