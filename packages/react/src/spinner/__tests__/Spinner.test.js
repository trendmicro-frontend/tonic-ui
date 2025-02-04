import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Spinner } from '@tonic-ui/react/src';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React from 'react';

jest.mock('@tonic-ui/utils', () => ({
  ...jest.requireActual('@tonic-ui/utils'),
  warnDeprecatedProps: jest.fn(),
}));

describe('Spinner', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    const { container } = render(
      <Spinner aria-label="loading" />
    );

    expect(container).toMatchSnapshot();
    await testA11y(container);
  });

  describe('size prop', () => {
    const sizes = {
      xs: { diameter: 16, thickness: 2 },
      sm: { diameter: 32, thickness: 2 },
      md: { diameter: 48, thickness: 4 },
      lg: { diameter: 64, thickness: 4 },
      xl: { diameter: 80, thickness: 4 },
    };

    Object.entries(sizes).forEach(([size, { diameter, thickness }]) => {
      it(`should render correctly with size="${size}"`, () => {
        const { container } = render(<Spinner size={size} />);
        const svg = container.querySelector('svg');
        const track = container.querySelector('svg circle:first-of-type');
        const indicator = container.querySelector('svg circle:last-of-type');

        expect(svg).toHaveAttribute('viewBox', `0 0 ${diameter} ${diameter}`);
        expect(track).toHaveAttribute('stroke-width', thickness.toString());
        expect(indicator).toHaveAttribute('stroke-width', thickness.toString());
      });
    });

    it('should use default size (md) when invalid size is provided', () => {
      const { container } = render(<Spinner size="invalid" />);
      const svg = container.querySelector('svg');
      const track = container.querySelector('svg circle:first-of-type');
      const indicator = container.querySelector('svg circle:last-of-type');
      const defaultSize = 'md';
      const defaultDiameter = sizes[defaultSize].diameter;

      expect(svg).toHaveAttribute('viewBox', `0 0 ${defaultDiameter} ${defaultDiameter}`);
      expect(track).toHaveAttribute('stroke-width', '4');
      expect(indicator).toHaveAttribute('stroke-width', '4');
    });

    it('should allow thickness override regardless of size', () => {
      const { container } = render(<Spinner size="xs" thickness={6} />);
      const track = container.querySelector('svg circle:first-of-type');
      const indicator = container.querySelector('svg circle:last-of-type');

      // Should use provided thickness instead of size-based thickness
      expect(track).toHaveAttribute('stroke-width', '6');
      expect(indicator).toHaveAttribute('stroke-width', '6');
    });
  });

  describe('deprecated props', () => {
    it('should show warning when using lineColor prop', () => {
      render(<Spinner lineColor="red:60" />);

      expect(warnDeprecatedProps).toHaveBeenCalledWith('lineColor', {
        prefix: 'Spinner:',
        alternative: 'color',
        willRemove: true,
      });
    });

    it('should show warning when using lineWidth prop', () => {
      render(<Spinner lineWidth={4} />);

      expect(warnDeprecatedProps).toHaveBeenCalledWith('lineWidth', {
        prefix: 'Spinner:',
        alternative: 'thickness',
        willRemove: true,
      });
    });

    it('should show warning when using trackWidth prop', () => {
      render(<Spinner trackWidth={4} />);

      expect(warnDeprecatedProps).toHaveBeenCalledWith('trackWidth', {
        prefix: 'Spinner:',
        alternative: 'thickness',
        willRemove: true,
      });
    });

    it('should use lineColor as fallback when color is not provided', () => {
      const { container } = render(<Spinner lineColor="red:60" />);
      const circle = container.querySelector('svg circle:last-of-type');
      expect(circle).toHaveStyle({ color: 'red:60' });
    });

    it('should use the maximum value between lineWidth, trackWidth, and thickness', () => {
      const { container } = render(
        <Spinner
          lineWidth={4}
          trackWidth={6}
          thickness={2}
        />
      );

      // Should use 6 as it's the maximum value
      const track = container.querySelector('svg circle:first-of-type');
      const indicator = container.querySelector('svg circle:last-of-type');
      expect(track).toHaveAttribute('stroke-width', '6');
      expect(indicator).toHaveAttribute('stroke-width', '6');
    });
  });

  describe('default props', () => {
    it('should use default size and thickness', () => {
      const { container } = render(<Spinner />);
      const svg = container.querySelector('svg');
      const track = container.querySelector('svg circle:first-of-type');
      const indicator = container.querySelector('svg circle:last-of-type');

      // Default size is 'md' (48px)
      expect(svg).toHaveAttribute('viewBox', '0 0 48 48');

      // Default thickness for 'md' size is 4
      expect(track).toHaveAttribute('stroke-width', '4');
      expect(indicator).toHaveAttribute('stroke-width', '4');
    });

    it('should use default color', () => {
      const { container } = render(<Spinner />);
      const indicator = container.querySelector('svg circle:last-of-type');
      expect(indicator).toHaveStyle({ color: 'blue:60' });
    });
  });
});
