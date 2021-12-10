import position from './position';

const defaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
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
    inset: 4,
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
