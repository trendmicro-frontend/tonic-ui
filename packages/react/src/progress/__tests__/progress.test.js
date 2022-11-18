import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { LinearProgress } from '@tonic-ui/react/src';
import * as React from 'react';

describe('LinearProgress', () => {
  it('should render correctly', async () => {
    const { container } = render(
      <>
        <LinearProgress aria-label="usage" size="xs" value={20} />
        <LinearProgress aria-label="usage" size="sm" value={40} />
        <LinearProgress aria-label="usage" size="md" value={60} />
        <LinearProgress aria-label="usage" size="lg" value={80} />
      </>
    );
    await testA11y(container);
  });

  it('should have the proper aria and role attributes', () => {
    const { getByRole, rerender } = render(
      <LinearProgress
        aria-label="usage"
        size="sm"
        variant="determinate"
        value={20}
      />
    );

    let progress = getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuemin', '0');
    expect(progress).toHaveAttribute('aria-valuemax', '100');
    expect(progress).toHaveAttribute('aria-valuenow', '20');
    expect(progress).toHaveAttribute('aria-label', 'usage');
    expect(progress).not.toHaveAttribute('aria-valuetext');

    // rerender as indeterminate
    rerender(<LinearProgress aria-label="in progress" size="sm" variant="indeterminate" />);

    progress = getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuemin', '0');
    expect(progress).toHaveAttribute('aria-valuemax', '100');
    expect(progress).not.toHaveAttribute('aria-valuenow');
    expect(progress).toHaveAttribute('aria-label', 'in progress');
  });
});
