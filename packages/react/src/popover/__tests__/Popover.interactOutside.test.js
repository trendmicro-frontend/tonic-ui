import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@tonic-ui/react/src';
import React from 'react';

const renderPopover = ({ popoverProps = {}, contentProps = {} } = {}) => {
  return render(
    <>
      <div data-testid="outside">Outside</div>
      <Popover {...popoverProps}>
        <PopoverTrigger data-testid="popover-trigger">
          <Button>Trigger</Button>
        </PopoverTrigger>
        <PopoverContent data-testid="popover-content" {...contentProps}>
          <button type="button" data-testid="inside-button">Inside</button>
        </PopoverContent>
      </Popover>
    </>
  );
};

describe('Popover outside interaction', () => {
  it('closes when clicking a non-focusable target outside the trigger and content', async () => {
    const user = userEvent.setup();
    const onBlur = jest.fn();
    const onClose = jest.fn();
    const onInteractOutside = jest.fn();

    renderPopover({
      popoverProps: {
        defaultIsOpen: true,
        returnFocusOnClose: false,
        onClose,
        onInteractOutside,
      },
      contentProps: {
        onBlur,
      },
    });

    const content = await screen.findByTestId('popover-content');
    await waitFor(() => {
      expect(content).toHaveFocus();
    });

    // Prevent the default mousedown behavior so the click does not move focus
    // away from the content, which means no blur event is fired.
    const outsideElement = screen.getByTestId('outside');
    outsideElement.addEventListener('mousedown', (event) => event.preventDefault());
    await user.click(outsideElement);

    expect(onBlur).not.toHaveBeenCalled();
    expect(onInteractOutside).toHaveBeenCalledTimes(1);
    expect(onInteractOutside.mock.calls[0][0].target).toBe(outsideElement);
    expect(onClose).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
    });
  });

  it('invokes `onInteractOutside` without closing when `closeOnInteractOutside` is false', async () => {
    const onClose = jest.fn();
    const onInteractOutside = jest.fn();

    renderPopover({
      popoverProps: {
        closeOnInteractOutside: false,
        defaultIsOpen: true,
        onClose,
        onInteractOutside,
      },
    });

    await screen.findByTestId('popover-content');
    fireEvent.click(screen.getByTestId('outside'));

    expect(onInteractOutside).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByTestId('popover-content')).toBeInTheDocument();
  });

  it('does not close when `onInteractOutside` calls `event.preventDefault()`', async () => {
    const onClose = jest.fn();
    const onInteractOutside = jest.fn((event) => event.preventDefault());

    renderPopover({
      popoverProps: {
        defaultIsOpen: true,
        onClose,
        onInteractOutside,
      },
    });

    await screen.findByTestId('popover-content');
    fireEvent.click(screen.getByTestId('outside'));

    expect(onInteractOutside).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByTestId('popover-content')).toBeInTheDocument();
  });

  it('does not treat clicks on the trigger or content as outside interactions', async () => {
    const onInteractOutside = jest.fn();

    renderPopover({
      popoverProps: {
        defaultIsOpen: true,
        onInteractOutside,
      },
    });

    const popoverContent = await screen.findByTestId('popover-content');
    fireEvent.click(popoverContent);
    fireEvent.click(screen.getByTestId('inside-button'));
    expect(onInteractOutside).not.toHaveBeenCalled();
    expect(screen.getByTestId('popover-content')).toBeInTheDocument();

    // The trigger toggles the popover closed without being reported as an
    // outside interaction
    fireEvent.click(screen.getByTestId('popover-trigger'));
    expect(onInteractOutside).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
    });
  });

  it('does not invoke callbacks when the popover is closed', async () => {
    const onInteractOutside = jest.fn();

    renderPopover({
      popoverProps: {
        onInteractOutside,
      },
    });

    const outsideElement = screen.getByTestId('outside');
    fireEvent.click(outsideElement);
    expect(onInteractOutside).not.toHaveBeenCalled();

    // Open the popover and close it by clicking outside
    fireEvent.click(screen.getByTestId('popover-trigger'));
    await screen.findByTestId('popover-content');
    fireEvent.click(outsideElement);
    expect(onInteractOutside).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
    });

    // No listeners remain attached while closed
    fireEvent.click(outsideElement);
    expect(onInteractOutside).toHaveBeenCalledTimes(1);
  });

  it('does not close or invoke callbacks for hover-triggered popovers', async () => {
    const onClose = jest.fn();
    const onInteractOutside = jest.fn();

    renderPopover({
      popoverProps: {
        defaultIsOpen: true,
        onClose,
        onInteractOutside,
        trigger: 'hover',
      },
    });

    await screen.findByTestId('popover-content');
    fireEvent.click(screen.getByTestId('outside'));

    expect(onInteractOutside).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByTestId('popover-content')).toBeInTheDocument();
  });

  it('does not invoke callbacks when the popover is disabled', () => {
    const onInteractOutside = jest.fn();

    renderPopover({
      popoverProps: {
        defaultIsOpen: true,
        disabled: true,
        onInteractOutside,
      },
    });

    expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('outside'));
    expect(onInteractOutside).not.toHaveBeenCalled();
  });

  it('keeps the user-provided `onBlur` handler without closing on blur', async () => {
    const onBlur = jest.fn();
    const onInteractOutside = jest.fn();

    renderPopover({
      popoverProps: {
        defaultIsOpen: true,
        onInteractOutside,
      },
      contentProps: {
        onBlur,
      },
    });

    const popoverContent = await screen.findByTestId('popover-content');
    fireEvent.focusOut(popoverContent);

    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onInteractOutside).not.toHaveBeenCalled();
    expect(screen.getByTestId('popover-content')).toBeInTheDocument();
  });
});
