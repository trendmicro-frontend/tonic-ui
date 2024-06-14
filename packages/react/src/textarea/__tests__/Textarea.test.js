import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Textarea } from '@tonic-ui/react/src';
import React from 'react';

describe('Textarea', () => {
  it('should render correctly', async () => {
    const variants = ['outline', 'filled', 'unstyled'];
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <>
        {variants.map(variant => (
          <Textarea
            data-testid={`textarea-${variant}`}
            key={`textarea-${variant}`}
            variant={variant}
          />
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
      <Textarea data-testid="textarea" disabled />
    );
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('aria-disabled', 'true');
  });

  it('should render correctly with error attributes', () => {
    render(
      <Textarea data-testid="textarea" error />
    );
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('should render correctly with readonly attributes', () => {
    render(
      <Textarea data-testid="textarea" readOnly />
    );
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('aria-readonly', 'true');
  });

  it('should render correctly with required attributes', () => {
    render(
      <Textarea data-testid="textarea" required />
    );
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('aria-required', 'true');
  });

  it('should call the onChange function', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <Textarea data-testid="textarea" onChange={onChange} />
    );
    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveDisplayValue('');
    await user.type(textarea, 'hello');
    expect(onChange).toHaveBeenCalled();
    expect(textarea).toHaveDisplayValue('hello');
  });

  it('should match the border color', async () => {
    const user = userEvent.setup();
    render(
      <Textarea data-testid="textarea" />
    );
    const textarea = screen.getByTestId('textarea');
    const defaultBorderColor = '#5e5e5e'; // [dark] gray:60 / [light] gray:30
    const focusBorderColor = '#1e5ede'; // [dark] blue:60 / [light] blue:60
    const hoverBorderColor = '#578aef'; // [dark] blue:50 / [light] blue:50

    expect(textarea).toBeValid();
    expect(document.body).toHaveFocus();

    await user.unhover(textarea);
    expect(textarea).toHaveStyleRule('border-color', defaultBorderColor);

    await user.hover(textarea);
    // XXX: Have to use `[data-hover]` to pass the assertion test
    expect(textarea).toHaveStyleRule('border-color', hoverBorderColor, { target: '[data-hover]' });

    await user.click(textarea);
    await user.unhover(textarea);
    expect(textarea).toHaveFocus();
    expect(textarea).toHaveStyleRule('border-color', focusBorderColor, { target: ':focus' });
  });
});
