import { render, screen } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { LinearProgress } from '@tonic-ui/react/src';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React from 'react';

jest.mock('@tonic-ui/utils', () => ({
  ...jest.requireActual('@tonic-ui/utils'),
  warnDeprecatedProps: jest.fn(),
}));

describe('LinearProgress', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    const renderOptions = {};
    const { container } = render((
      <>
        <LinearProgress aria-label="loading" value={20} />
        <LinearProgress aria-label="loading" value={40} />
        <LinearProgress aria-label="loading" value={60} />
        <LinearProgress aria-label="loading" value={80} />
      </>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should have the proper aria and role attributes', () => {
    const { getByRole, rerender } = render(
      <LinearProgress
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
    rerender(<LinearProgress aria-label="in progress" variant="indeterminate" />);

    progress = getByRole('progressbar');
    expect(progress).not.toHaveAttribute('aria-valuemin', '0');
    expect(progress).not.toHaveAttribute('aria-valuemax', '100');
    expect(progress).not.toHaveAttribute('aria-valuenow');
    expect(progress).toHaveAttribute('aria-label', 'in progress');
  });

  it('should render with custom colors', () => {
    // Custom color
    render(
      <LinearProgress
        data-testid="linear-progress-1"
        aria-label="custom color"
        color="red:60"
        value={50}
        variant="determinate"
      />
    );

    const progress = screen.getByTestId('linear-progress-1');
    expect(progress).toHaveStyleRule('background-color', 'rgba(255, 255, 255, 0.12)');
    const progressBar = progress.firstChild;
    expect(progressBar).toHaveStyleRule('background', '#e52630');

    // Gradient colors
    render(
      <LinearProgress
        data-testid="linear-progress-2"
        aria-label="gradient"
        color={['blue:60', 'teal:40']}
        value={50}
        variant="determinate"
      />
    );

    const gradientProgress = screen.getByTestId('linear-progress-2');
    expect(gradientProgress).toHaveStyleRule('background-color', 'rgba(255, 255, 255, 0.12)');
    const gradientProgressBar = gradientProgress.firstChild;
    expect(gradientProgressBar).toHaveStyleRule('background', 'linear-gradient(90deg,#1e5ede,#04caa1)');
  });

  describe('deprecated props', () => {
    it('should show warning when using size prop', () => {
      render(<LinearProgress size="sm" />);

      expect(warnDeprecatedProps).toHaveBeenCalledWith('size', {
        prefix: 'LinearProgress:',
        alternative: 'height',
        willRemove: true,
      });
    });
  });
});
