/* eslint-disable react/jsx-no-bind */
import { fireEvent, screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { EnvironmentProvider, ResizeHandle } from '@tonic-ui/react/src';

describe('ResizeHandle (non-standard DOM environment)', () => {
  it('binds resize listeners to the document provided by EnvironmentProvider, not the global document', () => {
    // Simulate a non-standard DOM environment (e.g. an iframe) by creating a
    // separate document and exposing one of its nodes through EnvironmentProvider.
    const altDocument = document.implementation.createHTMLDocument('alt');
    const rootNode = altDocument.body;
    const altAddEventListener = jest.spyOn(altDocument, 'addEventListener');
    const globalAddEventListener = jest.spyOn(document, 'addEventListener');

    render(
      <EnvironmentProvider value={() => rootNode}>
        <ResizeHandle data-testid="resize-handle" />
      </EnvironmentProvider>
    );

    // A mousedown on the handle starts a resize, binding the document-level
    // `mousemove`/`mouseup` listeners.
    fireEvent.mouseDown(screen.getByTestId('resize-handle'));

    // The resize listeners must be attached to the environment's document,
    // proving ResizeHandle resolves `document` via `useEnvironment`.
    expect(altAddEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function), expect.anything());
    expect(altAddEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function), expect.anything());

    // And it must NOT fall back to the global document for those listeners.
    expect(globalAddEventListener).not.toHaveBeenCalledWith('mousemove', expect.any(Function), expect.anything());
    expect(globalAddEventListener).not.toHaveBeenCalledWith('mouseup', expect.any(Function), expect.anything());

    altAddEventListener.mockRestore();
    globalAddEventListener.mockRestore();
  });
});
