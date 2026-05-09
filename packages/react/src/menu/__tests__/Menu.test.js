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
import { act } from 'react';

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
    await act(() => new Promise((resolve) => {
      setTimeout(resolve, 300);
    }));

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

  it('should return empty array from getFocusableElements when menu content is not mounted', () => {
    const { rerender } = render(
      <Menu isOpen={false}>
        <MenuButton data-testid="button">Open</MenuButton>
      </Menu>
    );

    // Rerender with isOpen=true but no MenuList — menuContentRef.current is null
    rerender(
      <Menu isOpen={true}>
        <MenuButton data-testid="button">Open</MenuButton>
      </Menu>
    );

    // Should not throw; getFocusableElements gracefully returns []
    expect(screen.getByTestId('button')).toBeInTheDocument();
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
});
