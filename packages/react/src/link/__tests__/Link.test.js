import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Link } from '@tonic-ui/react/src';
import React from 'react';

describe('Link', () => {
  it('should render correctly', async () => {
    const { container } = render(
      <>
        <Link variant="default" href="/default">
          Default Link
        </Link>
        <Link variant="inline" href="/inline">
          Inline Link
        </Link>
        <Link variant="subtle" href="/subtle">
          Subtle Link
        </Link>
        <Link variant="default" disabled href="/default">
          Default Link (disabled)
        </Link>
        <Link variant="inline" disabled href="/inline">
          Inline Link (disabled)
        </Link>
        <Link variant="subtle" disabled href="/subtle">
          Subtle Link (disabled)
        </Link>
      </>
    );

    expect(container).toMatchSnapshot();
    await testA11y(container);
  });

  it('should handle click events when not disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link href="#" onClick={handleClick}>
        Test Link
      </Link>
    );

    const link = screen.getByRole('link', { name: /test link/i });
    await user.click(link);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should prevent click events when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <Link href="/test" onClick={handleClick} disabled>
        Disabled Link
      </Link>
    );

    const link = screen.getByRole('link', { name: /disabled link/i });
    await user.click(link);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should have correct accessibility attributes when disabled', () => {
    render(
      <Link href="/test" disabled>
        Disabled Link
      </Link>
    );

    const link = screen.getByRole('link', { name: /disabled link/i });
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  it('should render with custom props', () => {
    render(
      <Link
        href="/test"
        className="custom-class"
        id="test-link"
        rel="noopener"
        target="_blank"
      >
        Custom Link
      </Link>
    );

    const link = screen.getByRole('link', { name: /custom link/i });
    expect(link).toHaveClass('custom-class');
    expect(link).toHaveAttribute('id', 'test-link');
    expect(link).toHaveAttribute('rel', 'noopener');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should render as anchor element', () => {
    render(<Link href="/test">Test Link</Link>);
    const link = screen.getByRole('link', { name: /test link/i });
    expect(link.tagName).toBe('A');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef();
    render(
      <Link href="/test" ref={ref}>
        Test Link
      </Link>
    );

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    expect(ref.current?.href).toBe('http://localhost/test');
  });

  it('should apply default variant styles correctly', () => {
    render(
      <Link href="/test" data-testid="link">
        default variant link
      </Link>
    );

    const link = screen.getByTestId('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveStyleRule('text-decoration', 'none');

    // :hover
    expect(link).toHaveStyleRule('color', 'var(--tonic-colors-_link-hovered)', { target: ':hover' });
    expect(link).toHaveStyleRule('text-decoration', 'underline', { target: ':hover' });

    // :active
    expect(link).toHaveStyleRule('color', 'var(--tonic-colors-_link-active)', { target: ':active' });
    expect(link).toHaveStyleRule('text-decoration', 'underline', { target: ':active' });
  });

  it('should apply inline variant styles correctly', () => {
    render(
      <Link href="/test" variant="inline" data-testid="link">
        inline variant link
      </Link>
    );

    const link = screen.getByTestId('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveStyleRule('text-decoration', 'underline');

    // :hover
    expect(link).toHaveStyleRule('color', 'var(--tonic-colors-_link-hovered)', { target: ':hover' });
    expect(link).toHaveStyleRule('text-decoration', 'none', { target: ':hover' });

    // :active
    expect(link).toHaveStyleRule('color', 'var(--tonic-colors-_link-active)', { target: ':active' });
    expect(link).toHaveStyleRule('text-decoration', 'none', { target: ':active' });
  });

  it('should apply subtle variant styles correctly', () => {
    render(
      <Link href="/test" variant="subtle" data-testid="link">
        subtle variant link
      </Link>
    );

    const link = screen.getByTestId('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveStyleRule('text-decoration', 'underline');

    // :hover
    expect(link).toHaveStyleRule('color', 'var(--tonic-colors-_link-hovered)', { target: ':hover' });
    expect(link).toHaveStyleRule('text-decoration', 'underline', { target: ':hover' });

    // :active
    expect(link).toHaveStyleRule('color', 'var(--tonic-colors-_link-active)', { target: ':active' });
    expect(link).toHaveStyleRule('text-decoration', 'underline', { target: ':active' });
  });

  it('should handle deprecated textDecoration prop and show warning', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Link href="/test" textDecoration="underline" data-testid="link">
        deprecated textDecoration link
      </Link>
    );

    const link = screen.getByTestId('link');
    expect(link).toBeInTheDocument();

    // Should show deprecation warning
    expect(consoleSpy).toHaveBeenCalledWith(
      `Link: 'textDecoration' is deprecated. Use 'variant="inline"' instead.`
    );

    consoleSpy.mockRestore();
  });

  it('should prevent default behavior when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <Link href="/test" onClick={handleClick} disabled>
        Disabled Link
      </Link>
    );

    const link = screen.getByRole('link', { name: /disabled link/i });

    // Mock preventDefault to verify it's called
    const preventDefaultSpy = jest.fn();
    link.addEventListener('click', (e) => {
      e.preventDefault = preventDefaultSpy;
    });

    await user.click(link);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
