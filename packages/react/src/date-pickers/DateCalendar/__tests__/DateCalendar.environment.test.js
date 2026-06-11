import { render } from '@tonic-ui/react/test-utils/render';
import { DateCalendar, EnvironmentProvider } from '@tonic-ui/react/src';
import React from 'react';

describe('DateCalendar (non-standard DOM environment)', () => {
  it('binds key listeners to the document provided by EnvironmentProvider, not the global document', () => {
    // Simulate a non-standard DOM environment (e.g. an iframe) by creating a
    // separate document and exposing one of its nodes through EnvironmentProvider.
    const altDocument = document.implementation.createHTMLDocument('alt');
    const rootNode = altDocument.body;
    const altAddEventListener = jest.spyOn(altDocument, 'addEventListener');
    const globalAddEventListener = jest.spyOn(document, 'addEventListener');

    render(
      <EnvironmentProvider value={() => rootNode}>
        <DateCalendar />
      </EnvironmentProvider>
    );

    // The calendar must attach its keydown/keyup listeners to the environment's
    // document, proving it resolves `document` via `useEnvironment`.
    expect(altAddEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(altAddEventListener).toHaveBeenCalledWith('keyup', expect.any(Function));

    // And it must NOT fall back to the global document for those listeners.
    expect(globalAddEventListener).not.toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(globalAddEventListener).not.toHaveBeenCalledWith('keyup', expect.any(Function));

    altAddEventListener.mockRestore();
    globalAddEventListener.mockRestore();
  });
});
