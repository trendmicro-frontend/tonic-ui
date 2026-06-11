/* eslint-disable react/jsx-no-bind */
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Button,
  EnvironmentProvider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@tonic-ui/react/src';
import { act } from 'react';

describe('PopoverContent (non-standard DOM environment)', () => {
  it('reads the active element from the document provided by EnvironmentProvider, not the global document', async () => {
    const user = userEvent.setup();

    // Simulate a non-standard DOM environment (e.g. an iframe) by creating a
    // separate document and exposing one of its nodes through EnvironmentProvider.
    const altDocument = document.implementation.createHTMLDocument('alt');
    const rootNode = altDocument.body;
    const altActiveElement = jest.spyOn(altDocument, 'activeElement', 'get');

    render(
      <EnvironmentProvider value={() => rootNode}>
        <Popover trigger="click" closeOnBlur>
          <PopoverTrigger data-testid="popover-trigger">
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent data-testid="popover-content">
            Popover content
          </PopoverContent>
        </Popover>
      </EnvironmentProvider>
    );

    await act(() => user.click(screen.getByTestId('popover-trigger')));
    await waitFor(() => {
      expect(screen.getByTestId('popover-content')).toBeInTheDocument();
    });

    // Only the component reads the *environment's* active element; the global
    // document's `activeElement` is read constantly by the test framework, so
    // observing this separate document's getter is the meaningful signal.
    altActiveElement.mockClear();

    // Blur without a relatedTarget so the close-on-blur handler falls back to
    // reading the document's active element.
    fireEvent.blur(screen.getByTestId('popover-content'));

    // The active-element lookup must target the environment's document, proving
    // PopoverContent resolves `document` via `useEnvironment`.
    expect(altActiveElement).toHaveBeenCalled();

    altActiveElement.mockRestore();
  });
});
