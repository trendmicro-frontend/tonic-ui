import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import {
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  Submenu,
  SubmenuList,
  SubmenuToggle,
  Text,
} from '@tonic-ui/react/src';
import React from 'react';

describe('Menu', () => {
  const TestComponent = (props) => {
    const items = [
      { id: 1, label: 'Menu item 1', disabled: false },
      { id: 2, label: 'Menu item 2', disabled: false },
      { id: 3, label: 'Menu item 3', disabled: true },
    ];

    return (
      <Menu {...props}>
        <MenuButton
          data-testid="button"
          variant="secondary"
        >
          Open
        </MenuButton>
        <MenuList
          data-testid="menu-list"
        >
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
  };

  it('should render correctly', async () => {
    const user = userEvent.setup();
    const renderOptions = {};
    const { container } = render((
      <TestComponent />
    ), renderOptions);

    const button = screen.getByTestId('button');

    // The button should be in the document
    expect(button).toBeInTheDocument();

    // Open the menu
    await user.click(button);

    // The menu should be in the document
    expect(await screen.findByRole('menu')).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should ensure proper focus management when opening and closing the menu', async () => {
    const user = userEvent.setup();

    render(
      <TestComponent returnFocusOnClose />
    );

    const button = screen.getByTestId('button');

    // The button should not have focus at start
    expect(button).not.toHaveFocus();

    // Open the menu
    await user.click(button);

    // The menu list should have focus
    expect(screen.getByTestId('menu-list')).toHaveFocus();

    // Close the menu
    await user.click(document.body);

    // Wait for the button to be focused
    await waitFor(() => {
      expect(button).toHaveFocus();
    });
  });

  it('should toggle menu with keyboard (Enter and Space)', async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    const button = screen.getByTestId('button');

    // Focus the button
    button.focus();
    expect(button).toHaveFocus();

    // Press Enter to open menu
    await user.keyboard('[Enter]');
    expect(await screen.findByRole('menu')).toBeInTheDocument();
    expect(screen.getByTestId('menu-list')).toHaveFocus();

    // Press Escape to close menu
    await user.keyboard('[Escape]');
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    // Press Space to open menu
    await user.keyboard('[Space]');
    expect(await screen.findByRole('menu')).toBeInTheDocument();
    expect(screen.getByTestId('menu-list')).toHaveFocus();

    // Press Escape to close menu
    await user.keyboard('[Escape]');
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('Submenu with portal', () => {
    it('should receive click events when clicking submenu items rendered in a portal', async () => {
      const user = userEvent.setup();
      const handleMenuListClick = jest.fn();

      const SubmenuTestComponent = () => {
        return (
          <Menu>
            <MenuButton data-testid="menu-button">
              Options
            </MenuButton>
            <MenuList
              data-testid="menu-list"
              onClick={handleMenuListClick}
              PopperProps={{
                usePortal: true,
              }}
            >
              <MenuItem value="1">Menu item 1</MenuItem>
              <MenuItem value="2">Menu item 2</MenuItem>
              <MenuDivider />
              <Submenu>
                <SubmenuToggle data-testid="submenu-toggle">
                  <MenuItem>
                    <Flex alignItems="center" justifyContent="space-between" width="100%">
                      <Text>Submenu</Text>
                    </Flex>
                  </MenuItem>
                </SubmenuToggle>
                <SubmenuList
                  data-testid="submenu-list"
                  PopperProps={{
                    usePortal: true,
                  }}
                >
                  <MenuItem data-testid="submenu-item-1" value="3">
                    Submenu item 1
                  </MenuItem>
                  <MenuItem value="4">Submenu item 2</MenuItem>
                </SubmenuList>
              </Submenu>
            </MenuList>
          </Menu>
        );
      };

      render(<SubmenuTestComponent />);

      const menuButton = screen.getByTestId('menu-button');

      // Open the menu
      await user.click(menuButton);

      // The menu should be open
      expect(await screen.findByTestId('menu-list')).toBeInTheDocument();

      // Hover over the submenu toggle to open the submenu
      const submenuToggle = screen.getByTestId('submenu-toggle');
      await user.hover(submenuToggle);

      // The submenu should be open
      await waitFor(() => {
        expect(screen.getByTestId('submenu-list')).toBeInTheDocument();
      });

      // Click on a submenu item
      const submenuItem = screen.getByTestId('submenu-item-1');
      await user.click(submenuItem);

      // Verify the onClick event was received by the menu list
      expect(handleMenuListClick).toHaveBeenCalledTimes(1);

      // Verify the event target has the correct value
      const clickEvent = handleMenuListClick.mock.calls[0][0];
      expect(clickEvent.target.getAttribute('value')).toBe('3');

      // The menu should still be open (not closed by the click on submenu item)
      expect(screen.getByTestId('menu-list')).toBeInTheDocument();
    });

    it('should close the menu when clicking outside both menu and submenu content', async () => {
      const user = userEvent.setup();

      const SubmenuTestComponent = () => {
        return (
          <Menu>
            <MenuButton data-testid="menu-button">
              Options
            </MenuButton>
            <MenuList
              data-testid="menu-list"
              PopperProps={{
                usePortal: true,
              }}
            >
              <MenuItem data-testid="menu-item-1">Menu item 1</MenuItem>
              <MenuDivider />
              <Submenu>
                <SubmenuToggle data-testid="submenu-toggle">
                  <MenuItem>
                    <Flex alignItems="center" justifyContent="space-between" width="100%">
                      <Text>Submenu</Text>
                    </Flex>
                  </MenuItem>
                </SubmenuToggle>
                <SubmenuList
                  data-testid="submenu-list"
                  PopperProps={{
                    usePortal: true,
                  }}
                >
                  <MenuItem data-testid="submenu-item-1">Submenu item 1</MenuItem>
                </SubmenuList>
              </Submenu>
            </MenuList>
          </Menu>
        );
      };

      render(
        <>
          <SubmenuTestComponent />
          <button data-testid="outside-button">Outside</button>
        </>
      );

      const menuButton = screen.getByTestId('menu-button');

      // Open the menu
      await user.click(menuButton);

      // The menu should be open
      expect(await screen.findByTestId('menu-list')).toBeInTheDocument();

      // Hover over the submenu toggle to open the submenu
      const submenuToggle = screen.getByTestId('submenu-toggle');
      await user.hover(submenuToggle);

      // The submenu should be open
      await waitFor(() => {
        expect(screen.getByTestId('submenu-list')).toBeInTheDocument();
      });

      // Click outside the menu and submenu
      const outsideButton = screen.getByTestId('outside-button');
      await user.click(outsideButton);

      // The menu should be closed
      await waitFor(() => {
        expect(screen.queryByTestId('menu-list')).not.toBeInTheDocument();
      });
    });
  });
});
