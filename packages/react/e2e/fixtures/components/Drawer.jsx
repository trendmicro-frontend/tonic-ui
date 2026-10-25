/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Portal,
} from '../../../src';

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
      <button
        type="button"
        data-testid="trigger"
        onClick={() => {
          record({ type: 'open' });
          setIsOpen(true);
        }}
      >
        Open drawer
      </button>
      <Drawer
        {...legacyProps}
        backdrop={params.has('backdrop')}
        isOpen={isOpen}
        closeOnEsc={closeOnEsc}
        closeOnInteractOutside={dismiss}
        onClose={handleClose}
        onInteractOutside={swap ? handleOutsideReplacement : handleOutside}
      >
        <DrawerOverlay data-testid="outside" />
        <DrawerContent data-testid="content" width={320}>
          <DrawerHeader>Drawer header</DrawerHeader>
          <DrawerBody>
            <button
              type="button"
              data-testid="inside"
              onClick={() => setInsideClicks(previous => previous + 1)}
            >
              Inside button
            </button>
            <output data-testid="inside-count">{insideClicks}</output>
            <label>
              <input
                aria-label="Dismiss on outside click"
                type="checkbox"
                data-testid="dismiss-control"
                checked={dismiss === true}
                onChange={event => setDismiss(event.target.checked)}
              />
              Dismiss on outside click
            </label>
            <label>
              <input
                aria-label="Replace outside handler"
                type="checkbox"
                data-testid="swap-control"
                checked={swap}
                onChange={event => setSwap(event.target.checked)}
              />
              Replace outside handler
            </label>
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
