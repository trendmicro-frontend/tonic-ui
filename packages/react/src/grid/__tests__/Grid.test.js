import React from 'react';
import { render, screen } from '../../../test-utils/render';
import Grid from '../Grid';

test('applies inherited gap styles and resolves responsive size tokens', () => {
  render(
    <Grid data-testid="grid" gap="4x" rowGap={{ _: '2x', sm: '3x' }} columnGap="1x" />
  );

  const grid = screen.getByTestId('grid');
  expect(grid).toHaveStyleRule('gap', 'var(--tonic-sizes-4x)');
  expect(grid).toHaveStyleRule('row-gap', 'var(--tonic-sizes-2x)');
  expect(grid).toHaveStyleRule('row-gap', 'var(--tonic-sizes-3x)', { media: '(min-width:600px)' });
  expect(grid).toHaveStyleRule('column-gap', 'var(--tonic-sizes-1x)');
});

test('does not apply legacy grid gap props', () => {
  render(
    <Grid data-testid="grid" gridGap="16px" gridRowGap="8px" gridColumnGap="12px" />
  );

  const grid = screen.getByTestId('grid');
  expect(grid).not.toHaveStyleRule('grid-gap', '16px');
  expect(grid).not.toHaveStyleRule('grid-row-gap', '8px');
  expect(grid).not.toHaveStyleRule('grid-column-gap', '12px');
});
