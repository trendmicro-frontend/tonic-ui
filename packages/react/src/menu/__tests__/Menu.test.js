import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Menu, MenuButton, MenuList, MenuItem } from '@tonic-ui/react/src';
import React from 'react';

describe('Menu', () => {
  it('should render correctly', async () => {
    const user = userEvent.setup();
    const items = [
      { id: 1, label: 'Menu item 1', disabled: false },
      { id: 2, label: 'Menu item 2', disabled: false },
      { id: 3, label: 'Menu item 3', disabled: true },
    ];
    const { container } = render(
      <Menu>
        <MenuButton variant="secondary" data-testid="menu-button">
          Open
        </MenuButton>
        <MenuList>
          {items.map((item) => (
            <MenuItem
              data-id={item.id}
              key={item.id}
              disabled={item.disabled}
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );

    const menuButton = screen.getByTestId('menu-button');
    expect(menuButton).toBeInTheDocument();

    await act(() => user.click(menuButton));

    expect(await screen.findByRole('menu')).toBeInTheDocument();
    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should set initial focus to `MenuList` on open and return focus to `MenuButton` on close', async () => {
    const user = userEvent.setup();
    const items = [
      { id: 1, label: 'Menu item 1', disabled: false },
      { id: 2, label: 'Menu item 2', disabled: false },
      { id: 3, label: 'Menu item 3', disabled: true },
    ];
    render(
      <Menu
        returnFocusOnClose={true}
      >
        <MenuButton variant="secondary" data-testid="menu-button">
          Open
        </MenuButton>
        <MenuList data-testid="menu-list">
          {items.map((item) => (
            <MenuItem
              data-id={item.id}
              key={item.id}
              disabled={item.disabled}
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    );

    await act(() => user.click(screen.getByTestId('menu-button')));
    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByTestId('menu-list'));
    });

    await act(() => user.click(document.body));
    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByTestId('menu-button'));
    });
  });
});
