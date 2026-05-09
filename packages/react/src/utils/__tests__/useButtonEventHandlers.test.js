import { screen, fireEvent } from '@testing-library/react';
import { Box } from '@tonic-ui/react/src';
import { render } from '@tonic-ui/react/test-utils/render';
import useButtonEventHandlers from '../useButtonEventHandlers';

function TestButtonBox({ disabled, onActivate }) {
  const handlers = useButtonEventHandlers({ disabled, onActivate });
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

describe('useButtonEventHandlers', () => {
  test('calls onActivate on mouse click when not disabled', () => {
    const onActivate = jest.fn();
    render(<TestButtonBox onActivate={onActivate} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onActivate).toHaveBeenCalledTimes(1);
  });

  test('does not call onActivate on mouse click when disabled', () => {
    const onActivate = jest.fn();
    render(<TestButtonBox disabled onActivate={onActivate} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onActivate).not.toHaveBeenCalled();
  });

  test('prevents default and stops propagation when disabled on click', () => {
    const onActivate = jest.fn();
    render(<TestButtonBox disabled onActivate={onActivate} />);
    const button = screen.getByRole('button');
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefault = jest.spyOn(event, 'preventDefault');
    const stopPropagation = jest.spyOn(event, 'stopPropagation');
    button.dispatchEvent(event);
    expect(preventDefault).toHaveBeenCalled();
    expect(stopPropagation).toHaveBeenCalled();
  });

  test('calls onActivate on Enter key press (no repeat)', () => {
    const onActivate = jest.fn();
    render(<TestButtonBox onActivate={onActivate} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter', repeat: false });
    expect(onActivate).toHaveBeenCalledTimes(1);
  });

  test('does not call onActivate on repeated Enter key press', () => {
    const onActivate = jest.fn();
    render(<TestButtonBox onActivate={onActivate} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter', repeat: true });
    expect(onActivate).not.toHaveBeenCalled();
  });

  test('does not call onActivate on Enter key when disabled', () => {
    const onActivate = jest.fn();
    render(<TestButtonBox disabled onActivate={onActivate} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter', repeat: false });
    expect(onActivate).not.toHaveBeenCalled();
  });

  test('calls onActivate on Space key down (no repeat)', () => {
    const onActivate = jest.fn();
    render(<TestButtonBox onActivate={onActivate} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ', repeat: false });
    expect(onActivate).toHaveBeenCalledTimes(1);
  });

  test('does not call onActivate on repeated Space key down', () => {
    const onActivate = jest.fn();
    render(<TestButtonBox onActivate={onActivate} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ', repeat: true });
    expect(onActivate).not.toHaveBeenCalled();
  });

  test('does not call onActivate on Space key when disabled', () => {
    const onActivate = jest.fn();
    render(<TestButtonBox disabled onActivate={onActivate} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ', repeat: false });
    expect(onActivate).not.toHaveBeenCalled();
  });
});
