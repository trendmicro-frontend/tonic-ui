import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Input } from '@tonic-ui/react/src';
import React from 'react';

describe('Input', () => {
  it('should render correctly', async () => {
    const sizes = ['sm', 'md', 'lg'];
    const variants = ['outline', 'filled', 'flush', 'unstyled'];
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <>
        {sizes.map(size => (
          variants.map(variant => (
            <Input
              data-testid={`input-${size}-${variant}`}
              key={`input-${size}-${variant}`}
              size={size}
              variant={variant}
            />
          ))
        ))}
      </>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container, {
      axeOptions: {
        rules: {
          label: { enabled: false },
        },
      },
    });
  });

  it('should render correctly with disabled attribute', () => {
    render(
      <Input data-testid="input" disabled />
    );
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('aria-disabled', 'true');
  });

  it('should render correctly with error attributes', () => {
    render(
      <Input data-testid="input" error />
    );
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should render correctly with readonly attributes', () => {
    render(
      <Input data-testid="input" readOnly />
    );
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('aria-readonly', 'true');
  });

  it('should render correctly with required attributes', () => {
    render(
      <Input data-testid="input" required />
    );
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('aria-required', 'true');
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

  it('should match the border color', async () => {
    const user = userEvent.setup();
    render(
      <Input data-testid="input" />
    );
    const input = screen.getByTestId('input');
    const initialBorderColor = '#c9c9c9';
    const focusBorderColor = '#1e5ede';

    // Test the border color when input is not focused
    expect(input).toHaveStyle({ 'border-color': initialBorderColor });

    // Test the border color when input is focused
    await user.click(input);
    expect(input).toHaveFocus();
    expect(input).toHaveStyle({ 'border-color': focusBorderColor });

    // Test the border color when input loses focus
    await user.click(document.body);
    expect(document.body).toHaveFocus();
    expect(input).toHaveStyle({ 'border-color': initialBorderColor });
  });

  it('should match the border color for invalid input', async () => {
    const user = userEvent.setup();
    render(
      <Input data-testid="input" error />
    );
    const input = screen.getByTestId('input');
    const errorBorderColor = '#e52630';
    const focusBorderColor = '#1e5ede';

    // Test the border color when input is in error state
    expect(input).toHaveStyle({ 'border-color': errorBorderColor });

    // Test the border color when input is focused
    await user.click(input);
    expect(input).toHaveFocus();
    expect(input).toHaveStyle({ 'border-color': focusBorderColor });

    // Test the border color when input loses focus
    await user.click(document.body);
    expect(document.body).toHaveFocus();
    expect(input).toHaveStyle({ 'border-color': errorBorderColor });
  });
});
