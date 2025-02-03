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
        color="red:60"
        value={50}
        variant="determinate"
      />
    );

    const progress = getByRole('progressbar');
    const circle = progress.querySelector('circle');

    expect(circle).toHaveAttribute('stroke-width', '5');
    expect(progress).toBeInTheDocument();
  });

  /*
  it('should warn when determinate variant is used without value prop', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <CircularProgress
        aria-label="error case"
        variant="determinate"
        value={undefined}
      />
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'CircularProgress: You need to provide a value prop when using the determinate variant.'
    );

    consoleSpy.mockRestore();
  });
  */
});
