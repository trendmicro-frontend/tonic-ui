/* eslint-disable react/jsx-no-bind */
import { waitFor } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  EnvironmentProvider,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@tonic-ui/react/src';

describe('ModalOverlay (non-standard DOM environment)', () => {
  it('constructs the ResizeObserver from the window provided by EnvironmentProvider, not the global window', async () => {
    // Simulate a non-standard DOM environment (e.g. an iframe) by exposing a
    // document node whose `defaultView` is a separate window through
    // EnvironmentProvider.
    const observe = jest.fn();
    const disconnect = jest.fn();
    const EnvResizeObserver = jest.fn().mockImplementation(() => ({ observe, disconnect }));
    const envWindow = { ResizeObserver: EnvResizeObserver };
    const envDocument = { nodeType: Node.DOCUMENT_NODE, defaultView: envWindow };

    render(
      <EnvironmentProvider value={() => envDocument}>
        <Modal isOpen onClose={jest.fn()} scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent>
            <ModalBody>Modal body</ModalBody>
          </ModalContent>
        </Modal>
      </EnvironmentProvider>
    );

    // The ResizeObserver must be constructed from the environment's window,
    // proving ModalOverlay resolves `window` via `useEnvironment`. (jsdom has no
    // global ResizeObserver, so on pre-refactor code it is never constructed.)
    await waitFor(() => {
      expect(EnvResizeObserver).toHaveBeenCalled();
    });
    expect(observe).toHaveBeenCalled();
  });
});
