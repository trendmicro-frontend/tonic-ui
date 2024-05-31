import position from '../position';

const defaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

const defaultThemeWithCSSVariables = {
  ...defaultTheme,
  config: {
    prefix: 'tonic',
    useCSSVariables: true,
  },
  __cssVariableMap: {
    '--tonic-space-0': 0,
    '--tonic-space-1': 4,
    '--tonic-space-2': 8,
    '--tonic-space-3': 16,
    '--tonic-space-4': 32,
    '--tonic-space-5': 64,
    '--tonic-space-6': 128,
    '--tonic-space-7': 256,
    '--tonic-space-8': 512,
  },
};

test('returns position styles', () => {
  const style = position({
    inset: '4px 8px',
    insetBlock: '3px 10px',
    insetBlockEnd: '10px',
    insetBlockStart: '3px',
    insetInline: '3px 10px',
    insetInlineEnd: '10px',
    insetInlineStart: '3px',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1000,
  });
  expect(style).toEqual({
    inset: '4px 8px',
    insetBlock: '3px 10px',
    insetBlockEnd: '10px',
    insetBlockStart: '3px',
    insetInline: '3px 10px',
    insetInlineEnd: '10px',
    insetInlineStart: '3px',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1000,
  });
});

test('returns positive theme values', () => {
  const style = position({
    theme: { ...defaultTheme },
    top: 1,
    right: 2,
    bottom: 3,
    left: 4,
  });
  expect(style).toEqual({ top: 4, right: 8, bottom: 16, left: 32 });
});

test('returns negative theme values', () => {
  const style = position({
    theme: { ...defaultTheme },
    top: -1,
    right: -2,
    bottom: -3,
    left: -4,
  });
  expect(style).toEqual({ top: -4, right: -8, bottom: -16, left: -32 });
});

test('returns positive theme values using CSS variables', () => {
  const style = position({
    theme: { ...defaultThemeWithCSSVariables },
    top: 1,
    right: 2,
    bottom: 3,
    left: 4,
  });
  expect(style).toEqual({
    top: 'var(--tonic-space-1)',
    right: 'var(--tonic-space-2)',
    bottom: 'var(--tonic-space-3)',
    left: 'var(--tonic-space-4)',
  });
});

test('returns negative theme values using CSS variables', () => {
  const style = position({
    theme: { ...defaultThemeWithCSSVariables },
    top: -1,
    right: -2,
    bottom: -3,
    left: -4,
  });
  expect(style).toEqual({
    top: 'calc(0 - var(--tonic-space-1))',
    right: 'calc(0 - var(--tonic-space-2))',
    bottom: 'calc(0 - var(--tonic-space-3))',
    left: 'calc(0 - var(--tonic-space-4))',
  });
});

test('returns positive pixel values', () => {
  const style = position({
    top: '1px',
    right: '2px',
    bottom: '3px',
    left: '4px',
  });
  expect(style).toEqual({
    top: '1px',
    right: '2px',
    bottom: '3px',
    left: '4px',
  });
});

test('returns negative pixel values', () => {
  const style = position({
    top: '-1px',
    right: '-2px',
    bottom: '-3px',
    left: '-4px',
  });
  expect(style).toEqual({
    top: '-1px',
    right: '-2px',
    bottom: '-3px',
    left: '-4px',
  });
});
