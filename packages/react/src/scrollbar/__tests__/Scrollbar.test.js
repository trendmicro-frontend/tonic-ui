import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Box, Scrollbar } from '@tonic-ui/react/src';
import React from 'react';

describe('Scrollbar', () => {
  it('should render correctly', async () => {
    const TestComponent = () => (
      <Scrollbar
        height={200}
      >
        <Box height={400}>Scrollable content</Box>
      </Scrollbar>
    );

    const { container } = render(<TestComponent />);

    expect(container.querySelector('[data-scrollbar-track="horizontal"]')).toBeInTheDocument();
    expect(container.querySelector('[data-scrollbar-thumb="horizontal"]')).toBeInTheDocument();
    expect(container.querySelector('[data-scrollbar-track="vertical"]')).toBeInTheDocument();
    expect(container.querySelector('[data-scrollbar-thumb="vertical"]')).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should apply scroll overflow on the scroll view and hide the native scrollbar', () => {
    render(
      <Scrollbar height={200}>
        <Box height={400}>Scrollable content</Box>
      </Scrollbar>
    );

    // The scroll view is the parent of the scrollable content.
    const scrollView = screen.getByText('Scrollable content').parentElement;

    expect(scrollView).toHaveStyleRule('overflow-x', 'scroll');
    expect(scrollView).toHaveStyleRule('overflow-y', 'scroll');

    // Hide the native scrollbar across browsers.
    expect(scrollView).toHaveStyleRule('display', 'none', { target: '::-webkit-scrollbar' }); // Chrome, Safari and Opera
    expect(scrollView).toHaveStyleRule('scrollbar-width', 'none'); // Firefox
    expect(scrollView).toHaveStyleRule('-ms-overflow-style', 'none'); // IE and Edge

    // `-webkit-overflow-scrolling` used to be dropped as a non-forwarded plain prop; it now
    // rides the `__sx` channel and is emitted for momentum scrolling on iOS.
    expect(scrollView).toHaveStyleRule('-webkit-overflow-scrolling', 'touch');
  });

  // Real scroll geometry (clamping, controlled `scrollLeft`/`scrollTop`, and
  // restoration after remount) is covered in the browser suite:
  // `packages/react/test/e2e/components/observers.spec.mjs`.
});
