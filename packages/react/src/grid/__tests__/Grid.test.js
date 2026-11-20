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
  expect(grid).toHaveStyleRule('row-gap', 'var(--tonic-sizes-3x)', { media: '(width >= 40rem)' });
  expect(grid).toHaveStyleRule('column-gap', 'var(--tonic-sizes-1x)');
});

test('applies deprecated grid gap props with responsive size tokens', () => {
  const warning = jest.spyOn(console, 'error').mockImplementation(() => {});
  try {
    render(
      <Grid data-testid="grid" gridGap="4x" gridRowGap={{ _: '2x', sm: '3x' }} gridColumnGap="1x" />
    );

    const grid = screen.getByTestId('grid');
    expect(grid).toHaveStyleRule('grid-gap', 'var(--tonic-sizes-4x)');
    expect(grid).toHaveStyleRule('grid-row-gap', 'var(--tonic-sizes-2x)');
    expect(grid).toHaveStyleRule('grid-row-gap', 'var(--tonic-sizes-3x)', { media: '(width >= 40rem)' });
    expect(grid).toHaveStyleRule('grid-column-gap', 'var(--tonic-sizes-1x)');
    expect(warning).toHaveBeenCalledTimes(3);
    expect(warning).toHaveBeenCalledWith(expect.stringContaining("'gridGap' is deprecated"));
    expect(warning).toHaveBeenCalledWith(expect.stringContaining("'gridRowGap' is deprecated"));
    expect(warning).toHaveBeenCalledWith(expect.stringContaining("'gridColumnGap' is deprecated"));
  } finally {
    warning.mockRestore();
  }
});
