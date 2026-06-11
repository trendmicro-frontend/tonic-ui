/* eslint-disable react/jsx-no-bind */
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box, EnvironmentProvider, Scrollbar } from '@tonic-ui/react/src';

describe('Scrollbar (non-standard DOM environment)', () => {
  it('binds drag listeners to the document provided by EnvironmentProvider, not the global document', () => {
    // Simulate a non-standard DOM environment (e.g. an iframe) by creating a
    // separate document and exposing one of its nodes through EnvironmentProvider.
    const altDocument = document.implementation.createHTMLDocument('alt');
    const rootNode = altDocument.body;
    const altAddEventListener = jest.spyOn(altDocument, 'addEventListener');
    const globalAddEventListener = jest.spyOn(document, 'addEventListener');

    const { container } = render(
      <EnvironmentProvider value={() => rootNode}>
        <Scrollbar height={200}>
          <Box height={400}>Scrollable content</Box>
        </Scrollbar>
      </EnvironmentProvider>
    );

    // Start dragging the vertical thumb, which binds the document-level
    // `mousemove`/`mouseup` listeners.
    const verticalThumb = container.querySelector('[data-scrollbar-thumb="vertical"]');
    fireEvent.mouseDown(verticalThumb);

    // The drag listeners must be attached to the environment's document,
    // proving Scrollbar resolves `document` via `useEnvironment`.
    expect(altAddEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(altAddEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function));

    // And it must NOT fall back to the global document for those listeners.
    expect(globalAddEventListener).not.toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(globalAddEventListener).not.toHaveBeenCalledWith('mouseup', expect.any(Function));

    altAddEventListener.mockRestore();
    globalAddEventListener.mockRestore();
  });

  it('constructs the observers from the window provided by EnvironmentProvider, not the global window', async () => {
    // Simulate a non-standard DOM environment (e.g. an iframe) by exposing a
    // document node whose `defaultView` is a separate window through
    // EnvironmentProvider. The document also needs event-listener methods since
    // Scrollbar's drag effect resolves the document on mount.
    const observe = jest.fn();
    const disconnect = jest.fn();
    const EnvMutationObserver = jest.fn().mockImplementation(() => ({ observe, disconnect }));
    const EnvResizeObserver = jest.fn().mockImplementation(() => ({ observe, disconnect }));
    const envWindow = {
      MutationObserver: EnvMutationObserver,
      ResizeObserver: EnvResizeObserver,
    };
    const envDocument = {
      nodeType: Node.DOCUMENT_NODE,
      defaultView: envWindow,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    render(
      <EnvironmentProvider value={() => envDocument}>
        <Scrollbar height={200}>
          <Box height={400}>Scrollable content</Box>
        </Scrollbar>
      </EnvironmentProvider>
    );

    // Both observers must be constructed from the environment's window, proving
    // Scrollbar resolves `window` via `useEnvironment`. (jsdom has no global
    // ResizeObserver, so on pre-refactor code it is never constructed.)
    await waitFor(() => {
      expect(EnvMutationObserver).toHaveBeenCalled();
      expect(EnvResizeObserver).toHaveBeenCalled();
    });
  });
});
