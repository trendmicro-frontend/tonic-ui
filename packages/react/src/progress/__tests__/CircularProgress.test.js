import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { CircularProgress } from '@tonic-ui/react/src';
import React from 'react';

describe('CircularProgress', () => {
  it('renders correctly', async () => {
    const renderOptions = {};
    const { container } = render((
      <>
        <CircularProgress aria-label="loading" size={24} value={20} />
        <CircularProgress aria-label="loading" size={48} value={40} />
        <CircularProgress aria-label="loading" size={96} value={60} />
      </>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should have the proper aria and role attributes', () => {
    const { getByRole, rerender } = render(
      <CircularProgress
        aria-label="loading"
        variant="determinate"
        value={20}
      />
    );

    let progress = getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuemin', '0');
    expect(progress).toHaveAttribute('aria-valuemax', '100');
    expect(progress).toHaveAttribute('aria-valuenow', '20');
    expect(progress).toHaveAttribute('aria-label', 'loading');

    // rerender as indeterminate
    rerender(<CircularProgress aria-label="in progress" variant="indeterminate" />);

    progress = getByRole('progressbar');
    expect(progress).not.toHaveAttribute('aria-valuemin');
    expect(progress).not.toHaveAttribute('aria-valuemax');
    expect(progress).not.toHaveAttribute('aria-valuenow');
    expect(progress).toHaveAttribute('aria-label', 'in progress');
  });

  it('should render with custom thickness and color', () => {
    const { getByRole } = render(
      <CircularProgress
        aria-label="custom"
        thickness={5}
        color="red.600"
        value={50}
        variant="determinate"
      />
    );

    const progress = getByRole('progressbar');
    expect(progress).toBeInTheDocument();

    const track = progress.querySelector('svg circle:first-of-type');
    const indicator = progress.querySelector('svg circle:last-of-type');
    expect(track).toHaveAttribute('stroke-width', '5');
    expect(track).toHaveStyleRule('color', 'var(--tonic-colors-_overlay-thin)');
    expect(indicator).toHaveAttribute('stroke-width', '5');
    expect(indicator).toHaveStyleRule('color', 'var(--tonic-colors-red-600)');
  });

  it('should handle unknown variant gracefully', () => {
    const { getByRole } = render(
      <CircularProgress
        aria-label="unknown variant"
        variant="unknown"
        thickness={5}
      />
    );

    const progress = getByRole('progressbar');
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveAttribute('aria-label', 'unknown variant');

    const track = progress.querySelector('svg circle:first-of-type');
    const indicator = progress.querySelector('svg circle:last-of-type');
    expect(track).toHaveAttribute('stroke-width', '5');
    expect(indicator).toHaveAttribute('stroke-width', '5');
  });
});
