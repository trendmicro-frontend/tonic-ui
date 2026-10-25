import { screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { Box, Collapse } from '@tonic-ui/react/src';
import React from 'react';

// The enter transition measures the rendered content height, which needs real
// layout; that behavior is covered by the browser suite in
// packages/react/test/e2e/components/transitions.spec.mjs. These cases keep the
// deterministic state-to-style mapping that does not depend on layout.
describe('Collapse', () => {
  const boxHeight = 100;

  it('applies correct styles when entered', () => {
    render(
      <Collapse in={true} data-testid="collapse">
        <Box height={boxHeight} />
      </Collapse>
    );

    const collapse = screen.getByTestId('collapse');
    expect(collapse).toHaveStyleRule('height', 'auto');
    expect(collapse).toHaveStyleRule('opacity', '1');
    expect(collapse).toHaveStyleRule('transition', 'height 300ms cubic-bezier(0.4, 0, 0.2, 1),opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)');
    expect(collapse).not.toHaveStyleRule('visibility', 'hidden');
  });

  it('applies correct styles when exiting', () => {
    const { rerender } = render(
      <Collapse in={true} data-testid="collapse">
        <Box height={boxHeight} />
      </Collapse>
    );

    rerender(
      <Collapse in={false} data-testid="collapse">
        <Box height={boxHeight} />
      </Collapse>
    );

    const collapse = screen.getByTestId('collapse');
    expect(collapse).toHaveStyleRule('height', '0');
    expect(collapse).toHaveStyleRule('opacity', '0');
    expect(collapse).toHaveStyleRule('overflow', 'hidden');
    expect(collapse).toHaveStyleRule('transition', 'height 300ms cubic-bezier(0.4, 0, 0.2, 1),opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)');
    expect(collapse).not.toHaveStyleRule('visibility', 'hidden');
  });

  it('applies correct styles when exited', () => {
    render(
      <Collapse in={false} data-testid="collapse">
        <Box height={boxHeight} />
      </Collapse>
    );

    const collapse = screen.getByTestId('collapse');
    expect(collapse).toHaveStyleRule('height', '0');
    expect(collapse).toHaveStyleRule('opacity', '0');
    expect(collapse).toHaveStyleRule('transition', 'height 300ms cubic-bezier(0.4, 0, 0.2, 1),opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)');
    expect(collapse).toHaveStyleRule('visibility', 'hidden');
  });
});
