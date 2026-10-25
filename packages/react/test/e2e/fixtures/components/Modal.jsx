/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Portal,
} from '../../../../src';

/**
 * Modal is controlled-only (`isOpen`), so the fixture is the controlled parent.
 * The real backdrop (ModalOverlay) is the `outside` target and the host page
 * supplies the document-level controls (`page-outside`, `unmount`, ...).
 *
 * Query flags:
 * - `initiallyOpen` opens on mount
 * - `dismiss=true|false` passes `closeOnInteractOutside`; absent leaves the real default (false)
 * - `optOut` is the shared alias for an explicit `closeOnInteractOutside={false}`
 * - `cancel` calls `event.preventDefault()` from `onInteractOutside`
 * - `holdOpen` rejects `onClose` like a controlled parent that ignores the request
 * - `closeOnEsc` enables the (default false) Escape handling
 * - `legacy=root&legacyValue=true|false` passes the deprecated `closeOnOutsideClick`
 * - `portalled` mounts a portal descendant inside the content
 * - `nested` mounts a second, already open modal inside the content
 */
const ModalFixture = ({ params, record }) => {
  const [isOpen, setIsOpen] = useState(params.has('initiallyOpen'));
  const [dismiss, setDismiss] = useState(
    params.has('dismiss')
      ? params.get('dismiss') !== 'false'
      : (params.has('optOut') ? false : undefined)
  );
  const cancel = params.has('cancel');
  const [swap, setSwap] = useState(false);
  const [insideClicks, setInsideClicks] = useState(0);
  const [nestedOpen, setNestedOpen] = useState(params.has('nested'));
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
        Open modal
      </button>
      <Modal
        {...legacyProps}
        isOpen={isOpen}
        closeOnEsc={closeOnEsc}
        closeOnInteractOutside={dismiss}
        onClose={handleClose}
        onInteractOutside={swap ? handleOutsideReplacement : handleOutside}
      >
        <ModalOverlay data-testid="outside" />
        <ModalContent data-testid="content" width={360}>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>
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
            {params.has('nested') && (
              <Modal
                isOpen={nestedOpen}
                closeOnInteractOutside
                onInteractOutside={recordOutside}
                onClose={() => {
                  record({ type: 'close' });
                  setNestedOpen(false);
                }}
              >
                <ModalOverlay data-testid="nested-outside" />
                <ModalContent data-testid="nested-content" width={240}>
                  <button type="button" data-testid="nested-inside">Nested content</button>
                </ModalContent>
              </Modal>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalFixture;
