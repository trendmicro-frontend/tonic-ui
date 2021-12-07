import layout from '../../src/shared/styled-system/config/layout';

describe('layout', () => {
  test('style props', () => {
    const style = layout({
      width: 24,
      height: 24,
      minWidth: 16,
      minHeight: 16,
      maxWidth: 32,
      maxHeight: 32,
      overflow: 'hidden',
      overflowX: 'auto',
      overflowY: 'auto',
      display: 'block',
      verticalAlign: 'middle',
    });

    expect(style).toEqual({
      width: 24,
      height: 24,
      minWidth: 16,
      minHeight: 16,
      maxWidth: 32,
      maxHeight: 32,
      overflow: 'hidden',
      overflowX: 'auto',
      overflowY: 'auto',
      display: 'block',
      verticalAlign: 'middle',
    });
  });

  test('shorthand style props', () => {
    const style = layout({
      width: 16,
      height: 16,
      w: 24,
      h: 24,
    });

    expect(style).toEqual({
      width: 24,
      height: 24,
    });
  });

  test('responsive layout styles', () => {
    const style = layout({
      width: ['100%', '50%', '25%'],
      minHeight: 32,
      maxWidth: 768,
    });

    expect(style).toEqual({
      width: '100%',
      maxWidth: 768,
      minHeight: 32,
      '@media screen and (min-width: 40em)': {
        width: '50%',
      },
      '@media screen and (min-width: 52em)': {
        width: '25%',
      },
    });
  });

  test('returns the n-th element in `theme.sizes`', () => {
    const style = layout({
      theme: {
        sizes: [24, 48, 96],
      },
      width: 1,
      height: 1,
    });

    expect(style).toEqual({
      width: 48,
      height: 48,
    });
  });
});
