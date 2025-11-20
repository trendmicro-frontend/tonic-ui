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

  it('should render with "highlight" variant', () => {
    const { container } = render(
      <Mark variant="highlight">Hello World</Mark>
    );

    expect(container.firstChild).toHaveStyleRule('background-color', '#fce79e');
    expect(container.firstChild).toHaveStyleRule('color', 'var(--tonic-colors-black-primary)');
  });

  it('should render with "emphasis" variant', () => {
    const { container } = render(
      <Mark variant="emphasis">Hello World</Mark>
    );

    expect(container.firstChild).toHaveStyleRule('font-weight', 'var(--tonic-fontWeights-semibold)');
    expect(container.firstChild).toHaveStyleRule('background-color', 'inherit');
  });

  it('should render with "selection" variant', () => {
    const { container } = render(
      <Mark variant="selection">Hello World</Mark>
    );

    expect(container.firstChild).toHaveStyleRule('background-color', 'var(--tonic-colors-blue-60)');
    expect(container.firstChild).toHaveStyleRule('color', 'var(--tonic-colors-white-primary)');
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
