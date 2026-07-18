import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { VisuallyHidden } from '@tonic-ui/react/src';
import React from 'react';

describe('VisuallyHidden', () => {
  it('should render correctly', async () => {
    const { container } = render(
      <VisuallyHidden>Hidden Content</VisuallyHidden>
    );

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should render the content but visually hidden', () => {
    const { getByText } = render(
      <VisuallyHidden>Hidden Content</VisuallyHidden>
    );
    const content = getByText('Hidden Content');

    // Check that the content is in the document
    expect(content).toBeInTheDocument();

    // Check that the content is visually hidden
    const styles = window.getComputedStyle(content);
    expect(styles.position).toBe('absolute');
    expect(styles.width).toBe('1px');
    expect(styles.height).toBe('1px');
    expect(styles.padding).toBe('0px');
    expect(styles.border).toBe('0px');
    expect(styles.overflow).toBe('hidden');
    expect(styles.clipPath).toBe('inset(50%)');
    expect(styles.whiteSpace).toBe('nowrap');
  });
});
