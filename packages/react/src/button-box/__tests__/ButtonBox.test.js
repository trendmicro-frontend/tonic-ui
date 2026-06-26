/* @jest-environment jsdom */
import userEvent from '@testing-library/user-event';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { fireEvent, render, screen } from '@tonic-ui/react/test-utils/render';
import { ButtonBox } from '@tonic-ui/react/src';
import React from 'react';

describe('ButtonBox', () => {
  it('should render correctly', async () => {
    const { container } = render(<ButtonBox>Click Me</ButtonBox>);
    expect(container).toMatchSnapshot();
    await testA11y(container);
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<ButtonBox onClick={handleClick}>Click Me</ButtonBox>);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when pressing Enter (keyDown)', () => {
    const handleClick = jest.fn();
    render(<ButtonBox onClick={handleClick}>Click Me</ButtonBox>);
    const button = screen.getByRole('button');
    button.focus();
    fireEvent.keyDown(button, { key: 'Enter', repeat: false });
    fireEvent.keyUp(button, { key: 'Enter', repeat: false });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when pressing Space key (keyUp)', () => {
    const handleClick = jest.fn();
    render(<ButtonBox onClick={handleClick}>Click Me</ButtonBox>);
    const button = screen.getByRole('button');
    button.focus();
    fireEvent.keyDown(button, { key: ' ', repeat: false });
    fireEvent.keyUp(button, { key: ' ', repeat: false });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick on Enter key repeat', () => {
    const handleClick = jest.fn();
    render(<ButtonBox onClick={handleClick}>Click Me</ButtonBox>);
    const button = screen.getByRole('button');
    button.focus();
    fireEvent.keyDown(button, { key: 'Enter', repeat: true });
    fireEvent.keyDown(button, { key: 'Enter', repeat: true });
    fireEvent.keyDown(button, { key: 'Enter', repeat: true });
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not call onClick on Space key repeat', () => {
    const handleClick = jest.fn();
    render(<ButtonBox onClick={handleClick}>Click Me</ButtonBox>);
    const button = screen.getByRole('button');
    button.focus();
    fireEvent.keyDown(button, { key: ' ', repeat: true });
    fireEvent.keyDown(button, { key: ' ', repeat: true });
    fireEvent.keyDown(button, { key: ' ', repeat: true });
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('calls onKeyDown and onKeyUp props', async () => {
    const user = userEvent.setup();
    const handleKeyDown = jest.fn();
    const handleKeyUp = jest.fn();
    render(
      <ButtonBox onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
        Test
      </ButtonBox>
    );
    const button = screen.getByRole('button');
    button.focus();
    await user.keyboard('{Enter}');
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
    expect(handleKeyUp).toHaveBeenCalledTimes(1);
  });

  it('should not include tabIndex attribute when disabled', () => {
    render(<ButtonBox disabled>Disabled</ButtonBox>);
    const button = screen.getByRole('button');
    expect(button).not.toHaveAttribute('tabindex');
  });

  it('has default tabIndex=0 when not disabled', () => {
    render(<ButtonBox>Enabled</ButtonBox>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('tabindex', '0');
  });

  it('uses provided tabIndex when not disabled', () => {
    // eslint-disable-next-line jsx-a11y/tabindex-no-positive
    render(<ButtonBox tabIndex={2}>Custom Tab</ButtonBox>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('tabindex', '2');
  });
});
