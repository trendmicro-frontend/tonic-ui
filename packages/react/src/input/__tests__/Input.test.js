import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Input } from '@tonic-ui/react/src';
import React from 'react';

describe('Input', () => {
  it('should render correctly', async () => {
    const { container } = render(
      <Input />
    );
    await testA11y(container, {
      axeOptions: {
        rules: {
          label: { enabled: false },
        },
      },
    });
  });

  it('should render correctly with disabled attribute', () => {
    render(<Input data-testid="input-disabled" disabled />);
    expect(screen.getByTestId('input-disabled')).toHaveAttribute('aria-disabled', 'true');
  });

  it('should render correctly with error attributes', () => {
    render(<Input data-testid="input-error" error />);
    expect(screen.getByTestId('input-error')).toHaveAttribute('aria-invalid', 'true');
  });

  it('should render correctly with readonly attributes', () => {
    render(<Input data-testid="input-readonly" readOnly />);
    expect(screen.getByTestId('input-readonly')).toHaveAttribute('aria-readonly', 'true');
  });

  it('should render correctly with required attributes', () => {
    render(<Input data-testid="input-required" required />);
    expect(screen.getByTestId('input-required')).toHaveAttribute('aria-required', 'true');
  });

  it('should call the onChange function', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <Input data-testid="input" onChange={onChange} />
    );
    const input = screen.getByTestId('input');
    await user.type(input, 'hello');
    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveDisplayValue('hello');
  });

  it('should render correct border color for normal state', async () => {
    const user = userEvent.setup();
    render(
      <Input data-testid="input" />
    );
    const input = screen.getByTestId('input');
    const initialBorderColor = '#c9c9c9';
    const focusBorderColor = '#1e5ede';

    // initial
    expect(input).toHaveStyle({ 'border-color': initialBorderColor });

    // focus
    await user.click(input);
    expect(input).toHaveStyle({ 'border-color': focusBorderColor });

    // blur
    await user.click(document.body);
    expect(input).toHaveStyle({ 'border-color': initialBorderColor });
  });

  it('should render correct border color for invalid state', async () => {
    const user = userEvent.setup();
    render(
      <Input data-testid="input" required />
    );
    const input = screen.getByTestId('input');
    const errorBorderColor = '#e52630';
    const focusBorderColor = '#1e5ede';

    // error
    expect(input).toHaveStyle({ 'border-color': errorBorderColor });

    // focus
    await user.click(input);
    expect(input).toHaveStyle({ 'border-color': focusBorderColor });

    // blur
    await user.click(document.body);
    expect(input).toHaveStyle({ 'border-color': errorBorderColor });
  });
});
