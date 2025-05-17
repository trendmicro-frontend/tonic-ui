import { screen, fireEvent } from '@testing-library/react';
import { Box } from '@tonic-ui/react/src';
import { render } from '@tonic-ui/react/test-utils/render';
import React from 'react';
import useInteractiveActionHandlers from '../useInteractiveActionHandlers';

function TestButtonBox({ disabled, onAction }) {
  const handlers = useInteractiveActionHandlers({ disabled, onAction });
  return (
    <Box
      role="button"
      tabIndex={!disabled ? '0' : undefined}
      {...handlers}
    >
      Click me
    </Box>
  );
}

describe('useInteractiveActionHandlers', () => {
  test('calls onAction on mouse click when not disabled', () => {
    const onAction = jest.fn();
    render(<TestButtonBox onAction={onAction} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  test('does not call onAction on mouse click when disabled', () => {
    const onAction = jest.fn();
    render(<TestButtonBox disabled onAction={onAction} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onAction).not.toHaveBeenCalled();
  });

  test('prevents default behavior and stops propagation when disabled on click', () => {
    const onAction = jest.fn();
    render(<TestButtonBox disabled onAction={onAction} />);
    const button = screen.getByRole('button');

    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    const preventDefault = jest.spyOn(event, 'preventDefault');
    const stopPropagation = jest.spyOn(event, 'stopPropagation');

    button.dispatchEvent(event);
    expect(preventDefault).toHaveBeenCalled();
    expect(stopPropagation).toHaveBeenCalled();
  });

  test('calls onAction on Enter key press when not disabled', () => {
    const onAction = jest.fn();
    render(<TestButtonBox onAction={onAction} />);
    const button = screen.getByRole('button');

    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  test('does not call onAction on Enter key press when disabled', () => {
    const onAction = jest.fn();
    render(<TestButtonBox disabled onAction={onAction} />);
    const button = screen.getByRole('button');

    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(onAction).not.toHaveBeenCalled();
  });

  test('calls onAction on Space key up when not disabled', () => {
    const onAction = jest.fn();
    render(<TestButtonBox onAction={onAction} />);
    const button = screen.getByRole('button');

    // keyDown prevents scroll but does not fire action
    fireEvent.keyDown(button, { key: ' ', code: 'Space', charCode: 32 });
    expect(onAction).not.toHaveBeenCalled();

    fireEvent.keyUp(button, { key: ' ', code: 'Space', charCode: 32 });
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  test('does not call onAction on Space key up when disabled', () => {
    const onAction = jest.fn();
    render(<TestButtonBox disabled onAction={onAction} />);
    const button = screen.getByRole('button');

    fireEvent.keyUp(button, { key: ' ', code: 'Space', charCode: 32 });
    expect(onAction).not.toHaveBeenCalled();
  });
});
