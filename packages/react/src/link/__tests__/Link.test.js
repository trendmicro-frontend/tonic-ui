import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Link } from '@tonic-ui/react/src';
import { AngleRightIcon } from '@tonic-ui/react-icons/src';
import React from 'react';

describe('Link', () => {
  it('should render correctly', async () => {
    const { container } = render(
      <>
        {/* Basic link */}
        <Link href="https://github.com/trendmicro-frontend/tonic-ui">
          GitHub
        </Link>

        {/* Link with target */}
        <Link
          href="https://github.com/trendmicro-frontend/tonic-ui"
          target="_blank"
        >
          GitHub (new tab)
        </Link>

        {/* Link with text decoration */}
        <Link href="/home" textDecoration="underline">
          Home
        </Link>

        {/* Disabled link */}
        <Link href="/disabled" disabled>
          Disabled Link
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

});
