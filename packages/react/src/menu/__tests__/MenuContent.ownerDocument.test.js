import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@tonic-ui/react/src';
import React from 'react';

describe('MenuContent (non-standard DOM environment)', () => {
  it('dismisses the menu when clicking inside the document that owns the menu elements', async () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);

    const iframeDocument = iframe.contentDocument;
    const container = iframeDocument.createElement('div');
    iframeDocument.body.appendChild(container);

    const user = userEvent.setup({ document: iframeDocument });

    const { getByTestId, queryByRole } = render(
      <Menu>
        <MenuButton data-testid="button">Open</MenuButton>
        <MenuList data-testid="menu-list">
          <MenuItem>Menu item 1</MenuItem>
        </MenuList>
      </Menu>,
      { container, baseElement: iframeDocument.body }
    );

    try {
      await user.click(getByTestId('button'));

      await waitFor(() => {
        expect(queryByRole('menu')).toBeInTheDocument();
      });

      // Outside interactions must be observed on the document that owns the menu
      // elements (here: the iframe document), not on the global `document`.
      await user.click(iframeDocument.body);

      await waitFor(() => {
        expect(queryByRole('menu')).not.toBeInTheDocument();
      });
    } finally {
      iframe.remove();
    }
  });
});
