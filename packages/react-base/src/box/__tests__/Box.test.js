import { ThemeProvider } from '@emotion/react';
import { testA11y } from '../../../test-utils/accessibility';
import { render } from '../../../test-utils/render';
import { Box } from '..';

describe('Box', () => {
  it('should render correctly', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };
    const { container } = render((
      <Box>This is a box</Box>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should work correctly with the `as` prop', () => {
    const { getByText } = render(
      <Box as="a" href="www.example.com">
        Box
      </Box>
    );
    expect(getByText('Box').tagName).toBe('A');
  });
});

describe('Box __sx internal base-style channel', () => {
  // Test 1: __sx applies base styles
  it('should apply base styles from __sx', () => {
    const { container } = render(
      <Box __sx={{ color: 'red' }} />
    );
    expect(container.firstChild).toHaveStyleRule('color', 'red');
  });

  // Test 2: style prop overrides __sx
  it('should allow a style prop to override __sx', () => {
    const { container } = render(
      <Box __sx={{ color: 'red' }} color="blue" />
    );
    expect(container.firstChild).toHaveStyleRule('color', 'blue');
  });

  // Test 3: sx overrides __sx
  it('should allow sx to override __sx', () => {
    const { container } = render(
      <Box __sx={{ color: 'red' }} sx={{ color: 'blue' }} />
    );
    expect(container.firstChild).toHaveStyleRule('color', 'blue');
  });

  // Test 4: __sx not forwarded to DOM
  it('should not forward __sx to the DOM element', () => {
    const { container } = render(
      <Box __sx={{ color: 'red' }} />
    );
    expect(container.firstChild).not.toHaveAttribute('__sx');
  });

  // Test 5: nested-vs-flat limitation — a flat style prop does NOT override a nested base rule
  it('should preserve nested __sx hover rule when overridden by a flat style prop (CSS specificity boundary)', () => {
    const { container } = render(
      <Box __sx={{ '&:hover': { color: 'red' } }} color="blue" />
    );
    // The base hover rule has higher specificity than a flat style prop so it survives
    expect(container.firstChild).toHaveStyleRule('color', 'red', { target: ':hover' });
  });

  // Test 6: nested-vs-nested source order — consumer sx wins over __sx for matching pseudo rules
  it('should let consumer sx override __sx for matching nested/pseudo rules', () => {
    const { container } = render(
      <Box __sx={{ '&:hover': { color: 'red' } }} sx={{ '&:hover': { color: 'blue' } }} />
    );
    expect(container.firstChild).toHaveStyleRule('color', 'blue', { target: ':hover' });
  });

  // Test 7: responsive array in __sx — needs ThemeProvider with breakpoints
  it('should resolve responsive array values in __sx', () => {
    const theme = {
      breakpoints: ['40em', '52em', '64em'],
    };
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Box __sx={{ color: ['red', 'blue'] }} />
      </ThemeProvider>
    );
    // Base value (no media query)
    expect(container.firstChild).toHaveStyleRule('color', 'red');
    // First breakpoint media query value
    expect(container.firstChild).toHaveStyleRule('color', 'blue', {
      media: '(min-width: 40em)',
    });
  });

  // Test 8: __sx as theme => ({...}) function form
  it('should resolve __sx as a theme function at the lowest priority tier', () => {
    const theme = {
      breakpoints: ['40em', '52em', '64em'],
      colors: { primary: 'green' },
    };
    function baseSx(t) { return { color: t.colors.primary }; } // eslint-disable-line @stylistic/max-statements-per-line
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Box __sx={baseSx} /> {/* eslint-disable-line react/jsx-no-bind */}
      </ThemeProvider>
    );
    expect(container.firstChild).toHaveStyleRule('color', 'green');
  });
});
