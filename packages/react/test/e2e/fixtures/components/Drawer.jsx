/* eslint-disable react/jsx-no-bind */
import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Portal,
} from '../../../../src';

/**
 * Drawer is controlled-only (`isOpen`), so the fixture is the controlled parent.
 * Outside interaction is observed at the document level by `useClickOutside` in
 * DrawerContent, so `page-outside` works even without a backdrop. `backdrop`
 * expands the real DrawerOverlay to the viewport so it can be used as `outside`.
 *
 * Query flags:
 * - `initiallyOpen` opens on mount
 * - `dismiss=true|false` passes `closeOnInteractOutside`; absent leaves the real default (false)
 * - `optOut` is the shared alias for an explicit `closeOnInteractOutside={false}`
 * - `cancel` calls `event.preventDefault()` from `onInteractOutside`
 * - `holdOpen` rejects `onClose` like a controlled parent that ignores the request
 * - `closeOnEsc` enables the (default false) Escape handling
 * - `legacy=root&legacyValue=true|false` passes the deprecated `closeOnOutsideClick`
 * - `ensureFocus` enables the focus trap (`ensureFocus={false}` is the real default)
 * - `autoFocus` moves focus to the first focusable element in the content on open
 * - `initialFocus` focuses the dismiss checkbox through `initialFocusRef`
 * - `finalFocus` focuses `final-target` through `finalFocusRef` on close
 * - `noReturnFocus` passes `returnFocusOnClose={false}`
 * - `backdrop` expands the real overlay to the viewport
 * - `portalled` mounts a portal descendant inside the content
 */
const DrawerFixture = ({ params, record }) => {
  const [isOpen, setIsOpen] = useState(params.has('initiallyOpen'));
  const [dismiss, setDismiss] = useState(
    params.has('dismiss')
      ? params.get('dismiss') !== 'false'
      : (params.has('optOut') ? false : undefined)
  );
  const cancel = params.has('cancel');
  const [swap, setSwap] = useState(false);
  const [insideClicks, setInsideClicks] = useState(0);
  const triggerRef = useRef(null);
  const insideRef = useRef(null);
  const dismissRef = useRef(null);
  const finalTargetRef = useRef(null);
  const legacyProps = params.has('legacy')
    ? { closeOnOutsideClick: params.get('legacyValue') !== 'false' }
    : {};
  const closeOnEsc = params.has('noCloseOnEsc')
    ? false
    : (params.has('closeOnEsc') || params.has('esc'));

  const recordOutside = (event) => {
    record({
      type: 'outside',
      eventType: event.type,
      target: event.target?.dataset?.testid,
      cancelable: event.cancelable,
      defaultPrevented: event.defaultPrevented,
    });
  };
  const handleOutside = (event) => {
    if (cancel) {
      event.preventDefault();
    }
    recordOutside(event);
  };
  const handleOutsideReplacement = (event) => {
    event.preventDefault();
    recordOutside(event);
  };
  const handleClose = () => {
    record({ type: 'close' });
    if (!params.has('holdOpen')) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button
        data-testid="trigger"
        ref={triggerRef}
        onClick={() => {
          record({ type: 'open' });
          setIsOpen(true);
        }}
      >
        Open drawer
      </Button>
      <Button data-testid="final-target" ref={finalTargetRef}>
        Final focus target
      </Button>
      <Drawer
        {...legacyProps}
        autoFocus={params.has('autoFocus')}
        backdrop={params.has('backdrop')}
        closeOnEsc={closeOnEsc}
        closeOnInteractOutside={dismiss}
        ensureFocus={params.has('ensureFocus')}
        finalFocusRef={params.has('finalFocus') ? finalTargetRef : undefined}
        initialFocusRef={params.has('initialFocus') ? dismissRef : undefined}
        isOpen={isOpen}
        onClose={handleClose}
        onInteractOutside={swap ? handleOutsideReplacement : handleOutside}
        returnFocusOnClose={!params.has('noReturnFocus')}
      >
        <DrawerOverlay data-testid="outside" />
        <DrawerContent data-testid="content" width={320}>
          <DrawerHeader>Drawer header</DrawerHeader>
          <DrawerBody>
            <Button
              data-testid="inside"
              ref={insideRef}
              onClick={() => setInsideClicks(previous => previous + 1)}
            >
              Inside button
            </Button>
            <Box as="output" data-testid="inside-count">{insideClicks}</Box>
            <Checkbox
              checked={dismiss === true}
              data-testid="dismiss-control"
              inputRef={dismissRef}
              onChange={event => setDismiss(event.target.checked)}
              inputProps={{ 'aria-label': 'Dismiss on outside click' }}
            >
              Dismiss on outside click
            </Checkbox>
            <Checkbox
              checked={swap}
              data-testid="swap-control"
              onChange={event => setSwap(event.target.checked)}
              inputProps={{ 'aria-label': 'Replace outside handler' }}
            >
              Replace outside handler
            </Checkbox>
            {params.has('portalled') && (
              <Portal>
                <button
                  type="button"
                  data-testid="portal-child"
                  style={{ position: 'fixed', top: 8, right: 8, zIndex: 100000 }}
                >
                  Portalled child
                </button>
              </Portal>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerFixture;
