/* eslint-disable react/jsx-no-bind */
import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
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
 * - `ensureFocus` enables the focus trap (`ensureFocus={false}` is the real default)
 * - `autoFocus` moves focus to the first focusable element in the content on open
 * - `initialFocus` focuses the dismiss checkbox through `initialFocusRef`
 * - `finalFocus` focuses `final-target` through `finalFocusRef` on close
 * - `noReturnFocus` passes `returnFocusOnClose={false}`
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
        Open modal
      </Button>
      <Button data-testid="final-target" ref={finalTargetRef}>
        Final focus target
      </Button>
      <Modal
        {...legacyProps}
        autoFocus={params.has('autoFocus')}
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
        <ModalOverlay data-testid="outside" />
        <ModalContent data-testid="content" width={360}>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>
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
                  <Button data-testid="nested-inside">Nested content</Button>
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
