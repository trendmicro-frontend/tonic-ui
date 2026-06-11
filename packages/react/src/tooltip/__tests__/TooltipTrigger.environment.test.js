/* eslint-disable react/jsx-no-bind */
import { render } from '@tonic-ui/react/test-utils/render';
import { Button, EnvironmentProvider, Tooltip } from '@tonic-ui/react/src';

describe('TooltipTrigger (non-standard DOM environment)', () => {
  it('binds the keydown listener to the document provided by EnvironmentProvider, not the global document', () => {
    // Simulate a non-standard DOM environment (e.g. an iframe) by creating a
    // separate document and exposing one of its nodes through EnvironmentProvider.
    const altDocument = document.implementation.createHTMLDocument('alt');
    const rootNode = altDocument.body;
    const altAddEventListener = jest.spyOn(altDocument, 'addEventListener');
    const globalAddEventListener = jest.spyOn(document, 'addEventListener');

    // `closeOnEsc` defaults to true, so the keydown listener is attached on mount.
    render(
      <EnvironmentProvider value={() => rootNode}>
        <Tooltip label="tooltip label">
          <Button>button label</Button>
        </Tooltip>
      </EnvironmentProvider>
    );

    // The keydown listener must be attached to the environment's document,
    // proving TooltipTrigger resolves `document` via `useEnvironment`.
    expect(altAddEventListener).toHaveBeenCalledWith('keydown', expect.any(Function), undefined);

    // And it must NOT fall back to the global document for that listener.
    expect(globalAddEventListener).not.toHaveBeenCalledWith('keydown', expect.any(Function), undefined);

    altAddEventListener.mockRestore();
    globalAddEventListener.mockRestore();
  });
});
