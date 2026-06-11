import { fireEvent } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box, EnvironmentProvider, Scrollbar } from '@tonic-ui/react/src';
import React from 'react';

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
});
