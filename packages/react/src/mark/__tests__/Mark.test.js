import { Mark } from '@tonic-ui/react/src';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { render } from '@tonic-ui/react/test-utils/render';
import React from 'react';

describe('Mark', () => {
  it('should render correctly', async () => {
    const { container } = render(
      <Mark>Hello World</Mark>
    );

    expect(container).toBeInTheDocument();
    expect(container.firstChild.tagName).toBe('MARK');
    expect(container).toHaveTextContent('Hello World');

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should render with "highlight" variant', () => {
    const { container } = render(
      <Mark variant="highlight">Hello World</Mark>
    );

    expect(container.firstChild).toHaveStyleRule('background-color', 'var(--tonic-colors-_highlight)');
    expect(container.firstChild).toHaveStyleRule('color', 'var(--tonic-colors-text-_fixed-light-accent)');
  });

  it('should render with "emphasis" variant', () => {
    const { container } = render(
      <Mark variant="emphasis">Hello World</Mark>
    );

    expect(container.firstChild).toHaveStyleRule('font-weight', 'var(--tonic-fontWeights-semibold)');
  });

  it('should render Mark with custom background and text colors', () => {
    const { container } = render(
      <Mark
        sx={{
          backgroundColor: 'background.medium',
          color: 'text.accent',
        }}
      >
        Hello World
      </Mark>
    );

    expect(container.firstChild).toHaveStyleRule('background-color', 'var(--tonic-colors-background-medium)');
    expect(container.firstChild).toHaveStyleRule('color', 'var(--tonic-colors-text-accent)');
  });
});
