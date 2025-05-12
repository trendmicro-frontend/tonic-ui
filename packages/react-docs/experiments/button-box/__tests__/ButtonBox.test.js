/* @jest-environment jsdom */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ButtonBox from '../ButtonBox';

describe('ButtonBox', () => {
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<ButtonBox onClick={handleClick}>Click Me</ButtonBox>);
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled and clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<ButtonBox disabled onClick={handleClick}>Click Me</ButtonBox>);
    fireEvent.click(getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('calls onClick when pressing Enter', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<ButtonBox onClick={handleClick}>Click Me</ButtonBox>);
    fireEvent.keyDown(getByRole('button'), { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when pressing Space key (keyUp)', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<ButtonBox onClick={handleClick}>Click Me</ButtonBox>);
    fireEvent.keyUp(getByRole('button'), { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick on Enter key repeat', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<ButtonBox onClick={handleClick}>Click Me</ButtonBox>);
    fireEvent.keyDown(getByRole('button'), { key: 'Enter', repeat: true });
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not call onClick on Space key repeat', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<ButtonBox onClick={handleClick}>Click Me</ButtonBox>);
    fireEvent.keyUp(getByRole('button'), { key: ' ', repeat: true });
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('calls onKeyDown and onKeyUp props', () => {
    const handleKeyDown = jest.fn();
    const handleKeyUp = jest.fn();
    const { getByRole } = render(
      <ButtonBox onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>Test</ButtonBox>
    );
    const button = getByRole('button');
    fireEvent.keyDown(button, { key: 'a' });
    fireEvent.keyUp(button, { key: 'a' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
    expect(handleKeyUp).toHaveBeenCalledTimes(1);
  });

  it('should not include tabIndex attribute when disabled', () => {
    const { getByRole } = render(<ButtonBox disabled>Disabled</ButtonBox>);
    expect(getByRole('button')).not.toHaveAttribute('tabindex');
  });

  it('has default tabIndex=0 when not disabled', () => {
    const { getByRole } = render(<ButtonBox>Enabled</ButtonBox>);
    expect(getByRole('button')).toHaveAttribute('tabindex', '0');
  });

  it('uses provided tabIndex when not disabled', () => {
    const { getByRole } = render(<ButtonBox tabIndex={2}>Custom Tab</ButtonBox>);
    expect(getByRole('button')).toHaveAttribute('tabindex', '2');
  });
});
