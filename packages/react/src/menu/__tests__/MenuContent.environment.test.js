import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  EnvironmentProvider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@tonic-ui/react/src';
import React from 'react';

describe('MenuContent (non-standard DOM environment)', () => {
  it('reads the active element from the document provided by EnvironmentProvider, not the global document', async () => {
    const user = userEvent.setup();

    // Simulate a non-standard DOM environment (e.g. an iframe) by creating a
    // separate document and exposing one of its nodes through EnvironmentProvider.
    const altDocument = document.implementation.createHTMLDocument('alt');
    const rootNode = altDocument.body;
    const altActiveElement = jest.spyOn(altDocument, 'activeElement', 'get');

    render(
      <EnvironmentProvider value={() => rootNode}>
        <Menu>
          <MenuButton data-testid="button">Open</MenuButton>
          <MenuList data-testid="menu-list">
            <MenuItem>Menu item 1</MenuItem>
            <MenuItem>Menu item 2</MenuItem>
          </MenuList>
        </Menu>
      </EnvironmentProvider>
    );

    await user.click(screen.getByTestId('button'));
    expect(await screen.findByRole('menu')).toBeInTheDocument();

    // Only the component reads the *environment's* active element; the global
    // document's `activeElement` is read constantly by the test framework, so
    // observing this separate document's getter is the meaningful signal.
    altActiveElement.mockClear();

    // Blur without a relatedTarget so the close-on-blur handler falls back to
    // reading the document's active element.
    fireEvent.blur(screen.getByTestId('menu-list'));

    // The active-element lookup must target the environment's document, proving
    // MenuContent resolves `document` via `useEnvironment`.
    expect(altActiveElement).toHaveBeenCalled();

    altActiveElement.mockRestore();
  });
});
