import React, { act } from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@tonic-ui/react/src';

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

    // Wait for focus and Collapse transition to stabilize
    await waitFor(() => {
      const firstMenuItem = screen.getByText('Menu item 1');
      expect(firstMenuItem).toBeInTheDocument();
    });

    // Wait for the Collapse transition to complete (entering → entered)
    await act(() => new Promise((resolve) => setTimeout(resolve, 300)));

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

    // Wait for the menu list to have focus
    await waitFor(() => {
      expect(screen.getByTestId('menu-list')).toHaveFocus();
    });

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
    await waitFor(() => {
      expect(screen.getByTestId('menu-list')).toHaveFocus();
    });

    // Press Escape to close menu
    await user.keyboard('[Escape]');
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    // Press Space to open menu
    await user.keyboard('[Space]');
    expect(await screen.findByRole('menu')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('menu-list')).toHaveFocus();
    });

    // Press Escape to close menu
    await user.keyboard('[Escape]');
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('portalled', () => {
    it('should render MenuList in a portal when Menu portalled prop is true', async () => {
      const user = userEvent.setup();
      render(<TestComponent portalled={true} />);

      await user.click(screen.getByTestId('button'));
      const menu = await screen.findByRole('menu');

      expect(menu.closest('.tonic-ui-portal')).toBeInTheDocument();
    });

    it('should not render MenuList in a portal by default', async () => {
      const user = userEvent.setup();
      render(<TestComponent />);

      await user.click(screen.getByTestId('button'));
      const menu = await screen.findByRole('menu');

      expect(menu.closest('.tonic-ui-portal')).not.toBeInTheDocument();
    });

    it('should render MenuList in a portal when PopperProps.usePortal is true (backward compat)', async () => {
      // Regression: MenuList with PopperProps={{ usePortal: true }} must activate the
      // portal even though Menu does not receive portalled prop (previously defaulted
      // portalled=false in context, blocking the usePortal fallback in Popper).
      const user = userEvent.setup();
      const TestWithUsePortal = () => (
        <Menu>
          <MenuButton data-testid="button" variant="secondary">Open</MenuButton>
          <MenuList
            data-testid="menu-list"
            PopperProps={{ usePortal: true }}
          >
            <MenuItem>Item 1</MenuItem>
          </MenuList>
        </Menu>
      );
      render(<TestWithUsePortal />);

      await user.click(screen.getByTestId('button'));
      const menu = await screen.findByRole('menu');

      expect(menu.closest('.tonic-ui-portal')).toBeInTheDocument();
    });
  });

  describe('Keyboard navigation', () => {
    it('should navigate menu items with ArrowDown and ArrowUp keys', async () => {
      const user = userEvent.setup();
      render(<TestComponent />);

      const button = screen.getByTestId('button');

      // Open the menu
      await user.click(button);
      expect(await screen.findByRole('menu')).toBeInTheDocument();

      // Wait for the menu list to have focus
      const menuList = screen.getByTestId('menu-list');
      await waitFor(() => {
        expect(menuList).toHaveFocus();
      });

      // Press ArrowDown to focus the first menu item
      await user.keyboard('[ArrowDown]');
      const menuItems = screen.getAllByRole('menuitem');
      await waitFor(() => {
        expect(menuItems[0]).toHaveFocus();
      });

      // Press ArrowDown to focus the second menu item
      await user.keyboard('[ArrowDown]');
      await waitFor(() => {
        expect(menuItems[1]).toHaveFocus();
      });

      // Press ArrowUp to go back to the first menu item
      await user.keyboard('[ArrowUp]');
      await waitFor(() => {
        expect(menuItems[0]).toHaveFocus();
      });
    });

    it('should navigate to first/last item with Home and End keys', async () => {
      const user = userEvent.setup();
      render(<TestComponent />);

      const button = screen.getByTestId('button');

      // Open the menu
      await user.click(button);
      expect(await screen.findByRole('menu')).toBeInTheDocument();

      // Wait for the menu list to have focus (ensures initial rAF has run)
      const menuList = screen.getByTestId('menu-list');
      await waitFor(() => {
        expect(menuList).toHaveFocus();
      });

      // Press ArrowDown to focus the first menu item
      await user.keyboard('[ArrowDown]');
      const menuItems = screen.getAllByRole('menuitem');
      await waitFor(() => {
        expect(menuItems[0]).toHaveFocus();
      });

      // Press End to go to the last menu item
      await user.keyboard('[End]');
      // The last non-disabled item should be focused
      await waitFor(() => {
        expect(menuItems[1]).toHaveFocus();
      });

      // Press Home to go back to the first menu item
      await user.keyboard('[Home]');
      await waitFor(() => {
        expect(menuItems[0]).toHaveFocus();
      });
    });
  });

  describe('Outside interaction', () => {
    const OutsideInteractionTestComponent = ({ onInteractOutside, ...props }) => (
      <>
        <Menu onInteractOutside={onInteractOutside} {...props}>
          <MenuButton data-testid="button">Open</MenuButton>
          <MenuList data-testid="menu-list">
            <MenuItem data-testid="menu-item">Menu item 1</MenuItem>
          </MenuList>
        </Menu>
        <div data-testid="outside">Outside</div>
      </>
    );

    it('should close on outside click even when focus does not move', async () => {
      const user = userEvent.setup();
      const onInteractOutside = jest.fn();

      render(<OutsideInteractionTestComponent onInteractOutside={onInteractOutside} />);

      await user.click(screen.getByTestId('button'));
      expect(await screen.findByTestId('menu-list')).toBeInTheDocument();

      const menuList = screen.getByTestId('menu-list');
      await waitFor(() => {
        expect(menuList).toHaveFocus();
      });

      // `mousedown` is canceled on the outside element, so no focus change (and
      // therefore no blur) happens before the click.
      const outside = screen.getByTestId('outside');
      outside.addEventListener('mousedown', (event) => event.preventDefault());
      await user.click(outside);

      await waitFor(() => {
        expect(screen.queryByTestId('menu-list')).not.toBeInTheDocument();
      });
      expect(onInteractOutside).toHaveBeenCalledTimes(1);
    });

    it('should not close on outside click when closeOnInteractOutside is false, but should still call onInteractOutside', async () => {
      const user = userEvent.setup();
      const onInteractOutside = jest.fn();

      render(
        <OutsideInteractionTestComponent
          closeOnInteractOutside={false}
          onInteractOutside={onInteractOutside}
        />
      );

      await user.click(screen.getByTestId('button'));
      expect(await screen.findByTestId('menu-list')).toBeInTheDocument();

      await user.click(screen.getByTestId('outside'));

      expect(onInteractOutside).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('menu-list')).toBeInTheDocument();
    });

    it('should not close on outside click when onInteractOutside calls event.preventDefault()', async () => {
      const user = userEvent.setup();
      const onInteractOutside = jest.fn((event) => {
        event.preventDefault();
      });

      render(<OutsideInteractionTestComponent onInteractOutside={onInteractOutside} />);

      await user.click(screen.getByTestId('button'));
      expect(await screen.findByTestId('menu-list')).toBeInTheDocument();

      await user.click(screen.getByTestId('outside'));

      expect(onInteractOutside).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('menu-list')).toBeInTheDocument();
    });

    it('should not call onInteractOutside for clicks inside the menu or on the toggle', async () => {
      const user = userEvent.setup();
      const onInteractOutside = jest.fn();

      render(
        <Menu closeOnSelect={false} onInteractOutside={onInteractOutside}>
          <MenuButton data-testid="button">Open</MenuButton>
          <MenuList data-testid="menu-list">
            <MenuItem data-testid="menu-item">Menu item 1</MenuItem>
          </MenuList>
        </Menu>
      );

      const button = screen.getByTestId('button');
      await user.click(button);
      expect(await screen.findByTestId('menu-list')).toBeInTheDocument();

      // Click a menu item
      await user.click(screen.getByTestId('menu-item'));
      expect(onInteractOutside).not.toHaveBeenCalled();
      expect(screen.getByTestId('menu-list')).toBeInTheDocument();

      // Click the menu content itself
      await user.click(screen.getByTestId('menu-list'));
      expect(onInteractOutside).not.toHaveBeenCalled();

      // Click the toggle while the menu is open
      await user.click(button);
      expect(onInteractOutside).not.toHaveBeenCalled();
      await waitFor(() => {
        expect(screen.queryByTestId('menu-list')).not.toBeInTheDocument();
      });
    });

    it('should not call onInteractOutside while the menu is closed', async () => {
      const user = userEvent.setup();
      const onInteractOutside = jest.fn();

      render(<OutsideInteractionTestComponent onInteractOutside={onInteractOutside} />);

      // Clicking outside while the menu has never been opened must not notify
      await user.click(screen.getByTestId('outside'));
      expect(onInteractOutside).not.toHaveBeenCalled();

      // Open the menu and close it with the Escape key
      await user.click(screen.getByTestId('button'));
      expect(await screen.findByTestId('menu-list')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByTestId('menu-list')).toHaveFocus();
      });
      await user.keyboard('[Escape]');
      await waitFor(() => {
        expect(screen.queryByTestId('menu-list')).not.toBeInTheDocument();
      });

      // Clicking outside after the menu has closed must not notify
      await user.click(screen.getByTestId('outside'));
      expect(onInteractOutside).not.toHaveBeenCalled();
    });

    it('should close a portalled menu on outside click', async () => {
      const user = userEvent.setup();
      const onInteractOutside = jest.fn();

      render(
        <OutsideInteractionTestComponent
          portalled
          onInteractOutside={onInteractOutside}
        />
      );

      await user.click(screen.getByTestId('button'));
      expect(await screen.findByTestId('menu-list')).toBeInTheDocument();
      expect(screen.getByTestId('menu-list').closest('.tonic-ui-portal')).toBeInTheDocument();

      await user.click(screen.getByTestId('outside'));

      await waitFor(() => {
        expect(screen.queryByTestId('menu-list')).not.toBeInTheDocument();
      });
      expect(onInteractOutside).toHaveBeenCalledTimes(1);
    });
  });
});
