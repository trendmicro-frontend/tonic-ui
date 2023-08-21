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
    const defaultBorderColor = '#5e5e5e'; // [dark] gray:60 / [light] gray:30
    const focusBorderColor = '#1e5ede'; // [dark] blue:60 / [light] blue:60
    const hoverBorderColor = '#578aef'; // [dark] blue:50 / [light] blue:50

    expect(input).toBeValid();
    expect(document.body).toHaveFocus();

    await user.unhover(inputControl);
    expect(inputControl).toHaveStyleRule('border-color', defaultBorderColor);

    await user.hover(inputControl);
    // XXX: Have to use `[data-hover]` to pass the assertion test
    expect(inputControl).toHaveStyleRule('border-color', hoverBorderColor, { target: '[data-hover]' });

    await user.click(inputControl);
    await user.unhover(inputControl);
    expect(input).toHaveFocus();
    expect(inputControl).toHaveStyleRule('border-color', focusBorderColor, { target: ':focus' });
  });

  it('should match the border color for invalid input', async () => {
    const user = userEvent.setup();
    render(
      <SearchInput data-testid="input" error />
    );
    const inputControl = screen.getByTestId('input');
    const input = inputControl.querySelector('input');
    const errorBorderColor = '#f24c4f'; // [dark] red:50 / [light] red:60
    const focusBorderColor = '#1e5ede'; // [dark] blue:60 / [light] blue:60

    expect(input).toBeInvalid();
    expect(document.body).toHaveFocus();

    await user.unhover(inputControl);
    expect(inputControl).toHaveStyleRule('border-color', errorBorderColor);

    await user.hover(inputControl);
    expect(inputControl).toHaveStyleRule('border-color', errorBorderColor, { target: ':hover:has(> input:invalid)' });

    await user.click(inputControl);
    await user.unhover(inputControl);
    expect(input).toHaveFocus();
    expect(inputControl).toHaveStyleRule('border-color', focusBorderColor, { target: ':focus' });
  });
});
