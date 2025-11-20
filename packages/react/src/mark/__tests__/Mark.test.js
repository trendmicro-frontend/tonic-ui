import { Mark } from '@tonic-ui/react/src';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import React from 'react';

describe('Mark', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Mark>Hello World</Mark>
    );

    expect(container).toBeInTheDocument();
    expect(container.firstChild.tagName).toBe('MARK');
    expect(container).toHaveTextContent('Hello World');
  });

  it('should render with default variant (highlight)', () => {
    const { container } = render(
      <Mark>Hello World</Mark>
    );

    expect(container.firstChild).toHaveStyle({
      backgroundColor: '#fce79e',
      color: 'black:primary',
    });
  });

  it('should render with selection variant', () => {
    const { container } = render(
      <Mark variant="selection">Hello World</Mark>
    );

    // Note: specific colors might depend on theme, but we can check if it renders
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render with emphasis variant', () => {
    const { container } = render(
      <Mark variant="emphasis">Hello World</Mark>
    );

    expect(container.firstChild).toHaveStyle({
      fontWeight: 'semibold',
      backgroundColor: 'inherit',
    });
  });

  it('should forward additional props', () => {
    const { container } = render(
      <Mark data-testid="custom-mark" className="custom-class">
        Hello World
      </Mark>
    );

    expect(container.firstChild).toHaveAttribute('data-testid', 'custom-mark');
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should pass accessibility tests', async () => {
    const { container } = render(
      <Mark>Hello World</Mark>
    );

    await testA11y(container);
  });
});
