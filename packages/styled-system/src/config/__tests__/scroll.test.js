import scroll from '../scroll';

test('returns style objects', () => {
  const styles = scroll({
    scrollBehavior: 'smooth',
    scrollMargin: '1em 0.5em 1em 1em',
    scrollMarginBlock: '1em 0.5em',
    scrollMarginBlockEnd: '1em',
    scrollMarginBlockStart: '1em',
    scrollMarginInline: '1em 0.5em',
    scrollMarginInlineEnd: '1em',
    scrollMarginInlineStart: '1em',
    scrollMarginTop: 0,
    scrollMarginRight: 0,
    scrollMarginBottom: 0,
    scrollMarginLeft: 0,
    scrollPadding: '12px 16px',
    scrollPaddingTop: '12px',
    scrollPaddingRight: '16px',
    scrollPaddingBottom: '12px',
    scrollPaddingLeft: '16px',
    scrollSnapAlign: 'start',
    scrollSnapStop: 'normal',
    scrollSnapType: 'x mandatory',
  });
  expect(styles).toEqual({
    scrollBehavior: 'smooth',
    scrollMargin: '1em 0.5em 1em 1em',
    scrollMarginBlock: '1em 0.5em',
    scrollMarginBlockEnd: '1em',
    scrollMarginBlockStart: '1em',
    scrollMarginInline: '1em 0.5em',
    scrollMarginInlineEnd: '1em',
    scrollMarginInlineStart: '1em',
    scrollMarginTop: 0,
    scrollMarginRight: 0,
    scrollMarginBottom: 0,
    scrollMarginLeft: 0,
    scrollPadding: '12px 16px',
    scrollPaddingTop: '12px',
    scrollPaddingRight: '16px',
    scrollPaddingBottom: '12px',
    scrollPaddingLeft: '16px',
    scrollSnapAlign: 'start',
    scrollSnapStop: 'normal',
    scrollSnapType: 'x mandatory',
  });
});

test('returns aliased values', () => {
  const styles = scroll({
    scrollMarginX: 12,
    scrollMarginY: 8,
    scrollPaddingX: 12,
    scrollPaddingY: 8,
  });
  expect(styles).toEqual({
    scrollMarginTop: 8,
    scrollMarginRight: 12,
    scrollMarginBottom: 8,
    scrollMarginLeft: 12,
    scrollPaddingTop: 8,
    scrollPaddingRight: 12,
    scrollPaddingBottom: 8,
    scrollPaddingLeft: 12,
  });
});

test('scrollMarginX prop overrides scrollMarginRight prop', () => {
  const styles = scroll({
    scrollMarginRight: 4,
    scrollMarginX: 8,
  });
  expect(styles).toEqual({ scrollMarginLeft: 8, scrollMarginRight: 8 });
});

test('scrollMarginY prop overrides scrollMarginTop prop', () => {
  const styles = scroll({
    scrollMarginTop: 4,
    scrollMarginY: 8,
  });
  expect(styles).toEqual({ scrollMarginTop: 8, scrollMarginBottom: 8 });
});

test('scrollPaddingX prop overrides scrollPaddingRight prop', () => {
  const styles = scroll({
    scrollPaddingRight: 4,
    scrollPaddingX: 8,
  });
  expect(styles).toEqual({ scrollPaddingLeft: 8, scrollPaddingRight: 8 });
});

test('scrollPaddingY prop overrides scrollPaddingTop prop', () => {
  const styles = scroll({
    scrollPaddingTop: 4,
    scrollPaddingY: 8,
  });
  expect(styles).toEqual({ scrollPaddingTop: 8, scrollPaddingBottom: 8 });
});
