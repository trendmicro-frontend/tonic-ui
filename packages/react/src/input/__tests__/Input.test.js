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
    const defaultBorderColor = '#5e5e5e'; // [dark] gray:60 / [light] gray:30
    const focusBorderColor = '#1e5ede'; // [dark] blue:60 / [light] blue:60
    const hoverBorderColor = '#578aef'; // [dark] blue:50 / [light] blue:50

    expect(input).toBeValid();
    expect(document.body).toHaveFocus();

    await user.unhover(input);
    expect(input).toHaveStyleRule('border-color', defaultBorderColor);

    await user.hover(input);
    // XXX: Have to use `[data-hover]` to pass the assertion test
    expect(input).toHaveStyleRule('border-color', hoverBorderColor, { target: '[data-hover]' });

    await user.click(input);
    await user.unhover(input);
    expect(input).toHaveFocus();
    expect(input).toHaveStyleRule('border-color', focusBorderColor, { target: ':focus' });
  });
});
