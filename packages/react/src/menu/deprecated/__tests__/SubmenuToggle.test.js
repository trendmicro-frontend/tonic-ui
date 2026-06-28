import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  Submenu,
  SubmenuList,
  Text,
} from '@tonic-ui/react/src';
import React, { act } from 'react';
import SubmenuToggle from '../SubmenuToggle';

describe('SubmenuToggle', () => {
  describe('SubmenuToggle keyboard navigation', () => {
    // Note: Use the render function pattern so MenuItem receives the props (role, tabIndex, aria attributes)
    // This ensures focus-visible styling appears on MenuItem, not on a wrapper element
    const SubmenuKeyboardTestComponent = (props) => {
      return (
        <Menu {...props}>
          <MenuButton data-testid="menu-button">
            Options
          </MenuButton>
          <MenuList data-testid="menu-list">
            <MenuItem data-testid="menu-item-1">Menu item 1</MenuItem>
            <MenuItem data-testid="menu-item-2">Menu item 2</MenuItem>
            <MenuDivider />
            <Submenu>
              <SubmenuToggle>
                {({ getSubmenuToggleProps }) => (
                  <MenuItem data-testid="submenu-toggle" {...getSubmenuToggleProps()}>
                    <Flex alignItems="center" justifyContent="space-between" width="100%">
                      <Text>Submenu</Text>
                    </Flex>
                  </MenuItem>
                )}
              </SubmenuToggle>
              <SubmenuList data-testid="submenu-list">
                <MenuItem data-testid="submenu-item-1">Submenu item 1</MenuItem>
                <MenuItem data-testid="submenu-item-2">Submenu item 2</MenuItem>
                <MenuItem data-testid="submenu-item-3">Submenu item 3</MenuItem>
              </SubmenuList>
            </Submenu>
            <MenuItem data-testid="menu-item-3">Menu item 3</MenuItem>
          </MenuList>
        </Menu>
      );
    };

    it('should open submenu with ArrowRight and focus first item', async () => {
      const user = userEvent.setup();
      render(<SubmenuKeyboardTestComponent />);

      const menuButton = screen.getByTestId('menu-button');

      // Open the menu
      await user.click(menuButton);
      expect(await screen.findByRole('menu')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByTestId('menu-list')).toHaveFocus();
      });

      // Navigate to the submenu toggle using keyboard
      await user.keyboard('[ArrowDown]'); // Focus menu-item-1
      await user.keyboard('[ArrowDown]'); // Focus menu-item-2
      await user.keyboard('[ArrowDown]'); // Focus submenu-toggle
      await act(() => new Promise(resolve => requestAnimationFrame(resolve)));

      const submenuToggle = screen.getByTestId('submenu-toggle');
      await waitFor(() => {
        expect(submenuToggle).toHaveFocus();
      });

      // Press ArrowRight to open submenu
      await user.keyboard('[ArrowRight]');

      // The submenu should be open
      await waitFor(() => {
        expect(screen.getByTestId('submenu-list')).toBeInTheDocument();
      });

      // The first submenu item should be focused
      await waitFor(() => {
        expect(screen.getByTestId('submenu-item-1')).toHaveFocus();
      });
    });

    it('should close submenu with ArrowLeft and return focus to toggle', async () => {
      const user = userEvent.setup();
      render(<SubmenuKeyboardTestComponent />);

      const menuButton = screen.getByTestId('menu-button');

      // Open the menu
      await user.click(menuButton);
      expect(await screen.findByRole('menu')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByTestId('menu-list')).toHaveFocus();
      });

      // Navigate to the submenu toggle and open it
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await act(() => new Promise(resolve => requestAnimationFrame(resolve)));

      const submenuToggle = screen.getByTestId('submenu-toggle');
      await waitFor(() => {
        expect(submenuToggle).toHaveFocus();
      });

      await user.keyboard('[ArrowRight]');

      // The submenu should be open
      await waitFor(() => {
        expect(screen.getByTestId('submenu-list')).toBeInTheDocument();
      });

      // The first submenu item should be focused
      await waitFor(() => {
        expect(screen.getByTestId('submenu-item-1')).toHaveFocus();
      });

      // Press ArrowLeft to close submenu and return to toggle
      await user.keyboard('[ArrowLeft]');

      // The submenu should be closed
      await waitFor(() => {
        expect(screen.queryByTestId('submenu-list')).not.toBeInTheDocument();
      });

      // The submenu toggle should be focused again
      await waitFor(() => {
        expect(screen.getByTestId('submenu-toggle')).toHaveFocus();
      });

      // IMPORTANT: The parent menu should still be open
      expect(screen.getByTestId('menu-list')).toBeInTheDocument();
    });

    it('should close submenu with Escape and return focus to toggle', async () => {
      const user = userEvent.setup();
      render(<SubmenuKeyboardTestComponent />);

      const menuButton = screen.getByTestId('menu-button');

      // Open the menu
      await user.click(menuButton);
      expect(await screen.findByRole('menu')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByTestId('menu-list')).toHaveFocus();
      });

      // Navigate to the submenu toggle and open it
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await act(() => new Promise(resolve => requestAnimationFrame(resolve)));

      const submenuToggle = screen.getByTestId('submenu-toggle');
      await waitFor(() => {
        expect(submenuToggle).toHaveFocus();
      });

      await user.keyboard('[ArrowRight]');

      // The submenu should be open
      await waitFor(() => {
        expect(screen.getByTestId('submenu-list')).toBeInTheDocument();
      });

      // Press Escape to close submenu
      await user.keyboard('[Escape]');

      // The submenu should be closed
      await waitFor(() => {
        expect(screen.queryByTestId('submenu-list')).not.toBeInTheDocument();
      });

      // The submenu toggle should be focused again
      await waitFor(() => {
        expect(screen.getByTestId('submenu-toggle')).toHaveFocus();
      });

      // IMPORTANT: The parent menu should still be open
      expect(screen.getByTestId('menu-list')).toBeInTheDocument();
    });

    it('should navigate within submenu with ArrowDown and ArrowUp', async () => {
      const user = userEvent.setup();
      render(<SubmenuKeyboardTestComponent />);

      const menuButton = screen.getByTestId('menu-button');

      // Open the menu
      await user.click(menuButton);
      expect(await screen.findByRole('menu')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByTestId('menu-list')).toHaveFocus();
      });

      // Navigate to the submenu toggle
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await act(() => new Promise(resolve => requestAnimationFrame(resolve)));

      const submenuToggle = screen.getByTestId('submenu-toggle');
      await waitFor(() => {
        expect(submenuToggle).toHaveFocus();
      });

      // Open the submenu
      await user.keyboard('[ArrowRight]');

      // Wait for submenu to open and first item to be focused
      await waitFor(() => {
        expect(screen.getByTestId('submenu-item-1')).toHaveFocus();
      });

      // Navigate down in submenu
      await user.keyboard('[ArrowDown]');
      await waitFor(() => {
        expect(screen.getByTestId('submenu-item-2')).toHaveFocus();
      });

      await user.keyboard('[ArrowDown]');
      await waitFor(() => {
        expect(screen.getByTestId('submenu-item-3')).toHaveFocus();
      });

      // Navigate up in submenu
      await user.keyboard('[ArrowUp]');
      await waitFor(() => {
        expect(screen.getByTestId('submenu-item-2')).toHaveFocus();
      });
    });

    it('should navigate to first/last submenu item with Home and End keys', async () => {
      const user = userEvent.setup();
      render(<SubmenuKeyboardTestComponent />);

      const menuButton = screen.getByTestId('menu-button');

      // Open the menu
      await user.click(menuButton);
      expect(await screen.findByRole('menu')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByTestId('menu-list')).toHaveFocus();
      });

      // Navigate to the submenu toggle and open it
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await act(() => new Promise(resolve => requestAnimationFrame(resolve)));

      const submenuToggle = screen.getByTestId('submenu-toggle');
      await waitFor(() => {
        expect(submenuToggle).toHaveFocus();
      });

      await user.keyboard('[ArrowRight]');

      // Wait for submenu to open
      await waitFor(() => {
        expect(screen.getByTestId('submenu-item-1')).toHaveFocus();
      });

      // Press End to go to last item
      await user.keyboard('[End]');
      await waitFor(() => {
        expect(screen.getByTestId('submenu-item-3')).toHaveFocus();
      });

      // Press Home to go to first item
      await user.keyboard('[Home]');
      await waitFor(() => {
        expect(screen.getByTestId('submenu-item-1')).toHaveFocus();
      });
    });

    it('should have role="menuitem" on submenu toggle for accessibility', async () => {
      const user = userEvent.setup();
      render(<SubmenuKeyboardTestComponent />);

      const menuButton = screen.getByTestId('menu-button');

      // Open the menu
      await user.click(menuButton);
      expect(await screen.findByRole('menu')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByTestId('menu-list')).toHaveFocus();
      });

      // The submenu toggle should have role="menuitem"
      const submenuToggle = screen.getByTestId('submenu-toggle');
      expect(submenuToggle).toHaveAttribute('role', 'menuitem');
      expect(submenuToggle).toHaveAttribute('aria-haspopup', 'menu');
      // aria-expanded is not present when false (ariaAttr returns undefined for false values)
      expect(submenuToggle).not.toHaveAttribute('aria-expanded');

      // Open the submenu and check aria-expanded is now "true"
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await user.keyboard('[ArrowDown]');
      await act(() => new Promise(resolve => requestAnimationFrame(resolve)));

      // Wait for submenu toggle to have focus before opening it
      await waitFor(() => {
        expect(submenuToggle).toHaveFocus();
      });

      await user.keyboard('[ArrowRight]');

      await waitFor(() => {
        expect(submenuToggle).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('should work with wrapper pattern and have role="presentation" on wrapper', async () => {
      const user = userEvent.setup();

      const WrapperPatternComponent = () => {
        return (
          <Menu>
            <MenuButton data-testid="menu-button">
              Options
            </MenuButton>
            <MenuList data-testid="menu-list">
              <Submenu>
                <SubmenuToggle data-testid="submenu-toggle-wrapper">
                  <MenuItem data-testid="submenu-toggle">
                    <Flex alignItems="center" justifyContent="space-between" width="100%">
                      <Text>Submenu</Text>
                    </Flex>
                  </MenuItem>
                </SubmenuToggle>
                <SubmenuList data-testid="submenu-list">
                  <MenuItem data-testid="submenu-item-1">Submenu item 1</MenuItem>
                </SubmenuList>
              </Submenu>
            </MenuList>
          </Menu>
        );
      };

      render(<WrapperPatternComponent />);

      const menuButton = screen.getByTestId('menu-button');

      // Open the menu
      await user.click(menuButton);
      expect(await screen.findByRole('menu')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByTestId('menu-list')).toHaveFocus();
      });

      // The wrapper should have role="presentation"
      const submenuToggleWrapper = screen.getByTestId('submenu-toggle-wrapper');
      expect(submenuToggleWrapper).toHaveAttribute('role', 'presentation');
      expect(submenuToggleWrapper).toHaveAttribute('aria-haspopup', 'menu');

      // The inner MenuItem should have role="menuitem"
      const submenuToggle = screen.getByTestId('submenu-toggle');
      expect(submenuToggle).toHaveAttribute('role', 'menuitem');

      // Navigate to the submenu toggle
      await user.keyboard('[ArrowDown]');
      await act(() => new Promise(resolve => requestAnimationFrame(resolve)));

      await waitFor(() => {
        expect(submenuToggle).toHaveFocus();
      });

      // Press ArrowRight to open submenu
      await user.keyboard('[ArrowRight]');

      // The submenu should be open
      await waitFor(() => {
        expect(screen.getByTestId('submenu-list')).toBeInTheDocument();
      });

      // The wrapper should have aria-expanded="true"
      await waitFor(() => {
        expect(submenuToggleWrapper).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });

  describe('SubmenuToggle with portal', () => {
    // NOTE: Test that uses fake timers must run last to avoid test isolation issues
    afterEach(() => {
      jest.useRealTimers();
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
                <SubmenuToggle>
                  {({ getSubmenuToggleProps }) => (
                    <MenuItem data-testid="submenu-toggle" {...getSubmenuToggleProps()}>
                      <Flex alignItems="center" justifyContent="space-between" width="100%">
                        <Text>Submenu</Text>
                      </Flex>
                    </MenuItem>
                  )}
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
          <Button data-testid="outside-button">Outside</Button>
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
                <SubmenuToggle>
                  {({ getSubmenuToggleProps }) => (
                    <MenuItem data-testid="submenu-toggle" {...getSubmenuToggleProps()}>
                      <Flex alignItems="center" justifyContent="space-between" width="100%">
                        <Text>Submenu</Text>
                      </Flex>
                    </MenuItem>
                  )}
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

    it('should close submenu when mouse leaves both toggle and content', async () => {
      jest.useFakeTimers();
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

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
                <SubmenuToggle>
                  {({ getSubmenuToggleProps }) => (
                    <MenuItem data-testid="submenu-toggle" {...getSubmenuToggleProps()}>
                      <Flex alignItems="center" justifyContent="space-between" width="100%">
                        <Text>Submenu</Text>
                      </Flex>
                    </MenuItem>
                  )}
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

      // Move to submenu content
      const submenuList = screen.getByTestId('submenu-list');
      await user.hover(submenuList);

      // The submenu should still be open
      expect(screen.getByTestId('submenu-list')).toBeInTheDocument();

      // Move mouse away from submenu
      await user.unhover(submenuList);

      // Advance timers to trigger the close timeout
      jest.advanceTimersByTime(150);

      // The submenu should be closed after the timeout
      await waitFor(() => {
        expect(screen.queryByTestId('submenu-list')).not.toBeInTheDocument();
      });
    });
  });
});
