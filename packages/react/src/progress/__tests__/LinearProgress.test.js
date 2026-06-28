import { render } from '@tonic-ui/react/test-utils/render';
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
    const { getByRole, rerender } = render(
      <LinearProgress
        aria-label="custom color"
        color="red.600"
        value={50}
        variant="determinate"
      />
    );

    let progress = getByRole('progressbar');
    expect(progress).toHaveStyleRule('background-color', 'var(--tonic-colors-_overlay-thin)');
    expect(progress.firstChild).toHaveStyleRule('background', '#dd1128');

    // Gradient colors
    rerender(
      <LinearProgress
        aria-label="gradient"
        color={['blue.600', 'teal.400']}
        value={50}
        variant="determinate"
      />
    );

    progress = getByRole('progressbar');
    expect(progress).toHaveStyleRule('background-color', 'var(--tonic-colors-_overlay-thin)');
    expect(progress.firstChild).toHaveStyleRule('background', 'linear-gradient(90deg,#1362fc,#33bcae)');
  });

  it('should handle unknown variant gracefully', () => {
    const { getByRole } = render(
      <LinearProgress
        aria-label="unknown variant"
        variant="unknown"
      />
    );

    const progress = getByRole('progressbar');
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveAttribute('aria-label', 'unknown variant');
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
