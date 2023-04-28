import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { SearchInput } from '@tonic-ui/react/src';
import React from 'react';

describe('SearchInput', () => {
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
            <SearchInput
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
      <SearchInput data-testid="input" disabled />
    );
    const inputControl = screen.getByTestId('input');
    const input = inputControl.querySelector('input');
    expect(input).toHaveAttribute('aria-disabled', 'true');
  });

  it('should render correctly with error attributes', () => {
    render(
      <SearchInput data-testid="input" error />
    );
    const inputControl = screen.getByTestId('input');
    const input = inputControl.querySelector('input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should render correctly with readonly attributes', () => {
    render(
      <SearchInput data-testid="input" readOnly />
    );
    const inputControl = screen.getByTestId('input');
    const input = inputControl.querySelector('input');
    expect(input).toHaveAttribute('aria-readonly', 'true');
  });

  it('should render correctly with required attributes', () => {
    render(
      <SearchInput data-testid="input" required />
    );
    const inputControl = screen.getByTestId('input');
    const input = inputControl.querySelector('input');
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  it('should call the onChange function', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <SearchInput data-testid="input" onChange={onChange} />
    );
    const inputControl = screen.getByTestId('input');
    const input = inputControl.querySelector('input');
    await user.type(input, 'hello');
    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveDisplayValue('hello');
  });

  it('should match the border color', async () => {
    const user = userEvent.setup();
    render(
      <SearchInput data-testid="input" />
    );
    const inputControl = screen.getByTestId('input');
    const input = inputControl.querySelector('input');
    const defaultBorderColor = '#c9c9c9';
    const focusBorderColor = '#1e5ede';

    // Test the border color when input is not focused
    expect(inputControl).toHaveStyle({ 'border-color': defaultBorderColor });

    // Test the border color when input is focused
    await user.click(inputControl);
    expect(input).toHaveFocus();
    expect(inputControl).toHaveStyle({ 'border-color': focusBorderColor });

    // Test the border color when input loses focus
    await user.click(document.body);
    expect(document.body).toHaveFocus();
    expect(inputControl).toHaveStyle({ 'border-color': defaultBorderColor });
  });

  it('should match the border color for invalid input', async () => {
    const user = userEvent.setup();
    render(
      <SearchInput data-testid="input" error />
    );
    const inputControl = screen.getByTestId('input');
    const input = inputControl.querySelector('input');
    const errorBorderColor = '#e52630';
    //const focusBorderColor = '#1e5ede';

    expect(input).toBeInvalid();

    // Test the border color when input is in error state
    expect(inputControl).toHaveStyle({ 'border-color': errorBorderColor });

    // Test the border color when input is focused
    await user.click(inputControl);
    expect(input).toHaveFocus();
    //expect(inputControl).toHaveStyle({ 'border-color': focusBorderColor }); // FIXME

    // Test the border color when input loses focus
    await user.click(document.body);
    expect(document.body).toHaveFocus();
    expect(inputControl).toHaveStyle({ 'border-color': errorBorderColor });
  });
});
