import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import {
  Button,
  Input,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  Text,
} from '@tonic-ui/react/src';
import React, { useCallback, useRef, useState } from 'react';

describe('Drawer', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { baseElement } = render((
      <Drawer
        isOpen
        onClose={jest.fn()}
        placement="right"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Drawer header</DrawerHeader>
          <DrawerBody>Drawer body</DrawerBody>
          <DrawerFooter>Drawer footer</DrawerFooter>
          <DrawerCloseButton />
        </DrawerContent>
      </Drawer>
    ), renderOptions);

    expect(baseElement).toMatchSnapshot();

    // Test baseElement because the drawer is rendered in a portal
    await testA11y(baseElement, {
      axeOptions: {
        rules: {
          // ARIA dialog and alertdialog nodes should have an accessible name (aria-dialog-name)
          'aria-dialog-name': { enabled: false },
        },
      },
    });
  });

  it('should have the proper ARIA attributes', () => {
    render(
      <Drawer
        isOpen
        onClose={jest.fn()}
        placement="right"
      >
        <DrawerOverlay />
        <DrawerContent data-testid="drawer-content">
          <DrawerHeader>Drawer header</DrawerHeader>
          <DrawerBody>Drawer body</DrawerBody>
          <DrawerFooter>Drawer footer</DrawerFooter>
          <DrawerCloseButton data-testid="drawer-close-button" />
        </DrawerContent>
      </Drawer>
    );

    const drawerContent = screen.getByTestId('drawer-content');
    const drawerCloseButton = screen.getByTestId('drawer-close-button');
    expect(drawerContent).toHaveAttribute('aria-modal', 'true');
    expect(drawerContent).toHaveAttribute('role', 'dialog');
    expect(drawerCloseButton).toHaveAttribute('aria-label', 'Close');
  });

  it('should fire `onClose` when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Drawer
        isOpen
        onClose={onClose}
        placement="right"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Drawer header</DrawerHeader>
          <DrawerCloseButton data-testid="drawer-close-button" />
        </DrawerContent>
      </Drawer>
    );

    await user.click(screen.getByTestId('drawer-close-button'));
    expect(onClose).toHaveBeenCalled();
  });

  it('should close when pressing the escape key', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Drawer
        closeOnEsc
        ensureFocus
        isOpen
        onClose={onClose}
        placement="right"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Drawer header</DrawerHeader>
          <DrawerBody>Drawer body</DrawerBody>
        </DrawerContent>
      </Drawer>
    );

    await user.keyboard('[Escape]');
    expect(onClose).toHaveBeenCalled();
  });

  it('should close when clicking outside the drawer', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Drawer
        closeOnOutsideClick
        isOpen
        onClose={onClose}
        placement="right"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Drawer header</DrawerHeader>
          <DrawerBody>Drawer body</DrawerBody>
        </DrawerContent>
      </Drawer>
    );

    const dialog = await screen.findByRole('dialog');
    await user.click(dialog.parentElement);
    expect(onClose).toHaveBeenCalled();
  });

  it('should ensure proper focus management when opening and closing the drawer', async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const [isOpen, setIsOpen] = useState(false);
      const openDrawer = useCallback(() => setIsOpen(true), []);
      const closeDrawer = useCallback(() => setIsOpen(false), []);
      const buttonRef = useRef(null);
      const inputRef = useRef(null);

      return (
        <>
          <Button
            data-testid="button"
            onClick={openDrawer}
            ref={buttonRef}
          >
            Open
          </Button>
          <Drawer
            ensureFocus
            finalFocusRef={buttonRef}
            initialFocusRef={inputRef}
            isOpen={isOpen}
            onClose={closeDrawer}
            placement="right"
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader>Drawer header</DrawerHeader>
              <DrawerBody>
                <Text>Drawer body</Text>
                <Input data-testid="input" ref={inputRef} />
              </DrawerBody>
              <DrawerCloseButton data-testid="drawer-close-button" />
            </DrawerContent>
          </Drawer>
        </>
      );
    };

    render(<TestComponent />);

    const button = screen.getByTestId('button');

    // The button should not have focus at start
    expect(button).not.toHaveFocus();

    // Open the drawer
    await user.click(button);

    // The input should have focus
    expect(screen.getByTestId('input')).toHaveFocus();

    // Close the drawer
    await user.click(screen.getByTestId('drawer-close-button'));

    // Wait for the button to be focused
    await waitFor(() => {
      expect(button).toHaveFocus();
    });
  });
});
