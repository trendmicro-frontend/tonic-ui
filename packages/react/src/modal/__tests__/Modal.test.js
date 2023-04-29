import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
} from '@tonic-ui/react/src';
import React, { useCallback, useRef, useState } from 'react';

describe('Modal', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { baseElement } = render((
      <Modal isOpen onClose={jest.fn()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    ), renderOptions);

    expect(baseElement).toMatchSnapshot();

    // Test baseElement because the modal is rendered in a portal
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
      <Modal isOpen onClose={jest.fn()}>
        <ModalOverlay />
        <ModalContent data-testid="modal-content">
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
          <ModalCloseButton data-testid="modal-close-button" />
        </ModalContent>
      </Modal>
    );

    const modalContent = screen.getByTestId('modal-content');
    const modalCloseButton = screen.getByTestId('modal-close-button');
    expect(modalContent).toHaveAttribute('aria-modal', 'true');
    expect(modalContent).toHaveAttribute('role', 'dialog');
    expect(modalCloseButton).toHaveAttribute('aria-label', 'Close');
  });

  it('should fire `onClose` when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Modal isOpen onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalCloseButton data-testid="modal-close-button" />
        </ModalContent>
      </Modal>
    );

    await user.click(screen.getByTestId('modal-close-button'));
    expect(onClose).toHaveBeenCalled();
  });

  it('should close when pressing the escape key', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Modal
        closeOnEsc
        ensureFocus
        isOpen
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
        </ModalContent>
      </Modal>
    );

    await user.keyboard('[Escape]');
    expect(onClose).toHaveBeenCalled();
  });

  it('should close when clicking outside the modal', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Modal
        closeOnOutsideClick
        isOpen
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
        </ModalContent>
      </Modal>
    );

    const dialog = await screen.findByRole('dialog');
    await user.click(dialog.parentElement);
    expect(onClose).toHaveBeenCalled();
  });

  it('should ensure proper focus management when opening and closing the modal', async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const [isOpen, setIsOpen] = useState(false);
      const openModal = useCallback(() => setIsOpen(true), []);
      const closeModal = useCallback(() => setIsOpen(false), []);
      const buttonRef = useRef(null);
      const inputRef = useRef(null);

      return (
        <>
          <Button
            data-testid="button"
            onClick={openModal}
            ref={buttonRef}
          >
            Open
          </Button>
          <Modal
            ensureFocus
            finalFocusRef={buttonRef}
            initialFocusRef={inputRef}
            isOpen={isOpen}
            onClose={closeModal}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal header</ModalHeader>
              <ModalBody>
                <Text>Modal body</Text>
                <Input data-testid="input" ref={inputRef} />
              </ModalBody>
              <ModalCloseButton data-testid="modal-close-button" />
            </ModalContent>
          </Modal>
        </>
      );
    };

    render(<TestComponent />);

    const button = screen.getByTestId('button');

    // The button should not have focus at start
    expect(button).not.toHaveFocus();

    // Open the modal
    await user.click(button);

    // The input should have focus
    expect(screen.getByTestId('input')).toHaveFocus();

    // Close the modal
    await user.click(screen.getByTestId('modal-close-button'));

    // Wait for the button to be focused
    await waitFor(() => {
      expect(button).toHaveFocus();
    });
  });
});
