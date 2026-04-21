import { createRef } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { LinkButton } from '@tonic-ui/react/src';

describe('LinkButton', () => {
  it('should render correctly', async () => {
    const { container } = render(
      <>
        <LinkButton variant="default">
          default link
        </LinkButton>
        <LinkButton variant="inline">
          inline link
        </LinkButton>
        <LinkButton variant="subtle">
          subtle link
        </LinkButton>
        <LinkButton variant="default" disabled>
          default link (disabled)
        </LinkButton>
        <LinkButton variant="inline" disabled>
          inline link (disabled)
        </LinkButton>
        <LinkButton variant="subtle" disabled>
          subtle link (disabled)
        </LinkButton>
      </>
    );

    expect(container).toMatchSnapshot();
    await testA11y(container);
  });

  it('should handle click events when not disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <LinkButton onClick={handleClick}>
        Test LinkButton
      </LinkButton>
    );

    const button = screen.getByRole('button', { name: /test linkbutton/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should prevent click events when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <LinkButton onClick={handleClick} disabled>
        Disabled LinkButton
      </LinkButton>
    );

    const button = screen.getByRole('button', { name: /disabled linkbutton/i });
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should have correct accessibility attributes when disabled', () => {
    render(
      <LinkButton disabled>
        Disabled LinkButton
      </LinkButton>
    );

    const button = screen.getByRole('button', { name: /disabled linkbutton/i });
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toBeDisabled();
  });

  it('should render as button element', () => {
    render(<LinkButton>Test LinkButton</LinkButton>);
    const button = screen.getByRole('button', { name: /test linkbutton/i });
    expect(button.tagName).toBe('BUTTON');
  });

  it('should forward ref correctly', () => {
    const ref = createRef();
    render(
      <LinkButton ref={ref}>
        Test LinkButton
      </LinkButton>
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('should handle deprecated textDecoration prop and show warning', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <LinkButton textDecoration="underline" data-testid="button">
        deprecated textDecoration button
      </LinkButton>
    );

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();

    // Should show deprecation warning
    expect(consoleSpy).toHaveBeenCalledWith(
      `LinkButton: 'textDecoration' is deprecated. Use 'variant="inline"' instead.`
    );

    consoleSpy.mockRestore();
  });

  it('should apply subtle variant styles correctly', () => {
    render(
      <LinkButton variant="subtle" data-testid="button">
        subtle variant button
      </LinkButton>
    );

    const button = screen.getByTestId('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyleRule('text-decoration', 'underline');

    // :hover
    expect(button).toHaveStyleRule('color', 'var(--tonic-colors-blue-40)', { target: ':hover' });
    expect(button).toHaveStyleRule('text-decoration', 'underline', { target: ':hover' });

    // :active
    expect(button).toHaveStyleRule('color', 'var(--tonic-colors-blue-60)', { target: ':active' });
    expect(button).toHaveStyleRule('text-decoration', 'underline', { target: ':active' });
  });

  it('should render with custom props', () => {
    render(
      <LinkButton
        className="custom-class"
        id="test-button"
        type="submit"
        data-testid="button"
      >
        Custom LinkButton
      </LinkButton>
    );

    const button = screen.getByTestId('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveAttribute('id', 'test-button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should handle keyboard events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <LinkButton onClick={handleClick}>
        Test LinkButton
      </LinkButton>
    );

    const button = screen.getByRole('button', { name: /test linkbutton/i });

    // Test Enter key
    button.focus();
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Test Space key
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('should not handle keyboard events when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <LinkButton onClick={handleClick} disabled>
        Disabled LinkButton
      </LinkButton>
    );

    // Test Enter key
    await user.keyboard('{Enter}');
    expect(handleClick).not.toHaveBeenCalled();

    // Test Space key
    await user.keyboard(' ');
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should maintain focus behavior', () => {
    render(
      <LinkButton data-testid="button">
        Focusable LinkButton
      </LinkButton>
    );

    const button = screen.getByTestId('button');
    button.focus();
    expect(button).toHaveFocus();
  });

  it('should not be focusable when disabled', () => {
    render(
      <LinkButton disabled data-testid="button">
        Disabled LinkButton
      </LinkButton>
    );

    const button = screen.getByTestId('button');
    button.focus();
    expect(button).not.toHaveFocus();
  });
});
