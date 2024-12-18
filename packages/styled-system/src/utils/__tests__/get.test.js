import get from '../get';

describe('get function tests', () => {
  describe('Default Value Handling', () => {
    const obj = { a: { b: { c: 42 } } };
    const defaultValue = 'default';

    test('returns default value for missing paths', () => {
      expect(get(obj, 'a.b.c.d', defaultValue)).toBe(defaultValue);
      expect(get(obj, ['a', 'b', 'c', 'd'], defaultValue)).toBe(defaultValue);
      expect(get(obj, 'a.b.x', defaultValue)).toBe(defaultValue);
    });

    test('returns default value for null or undefined input', () => {
      expect(get(obj, null, defaultValue)).toBe(defaultValue);
      expect(get(obj, undefined, defaultValue)).toBe(defaultValue);
      expect(get(null, 'a.b.c', defaultValue)).toBe(defaultValue);
      expect(get(undefined, 'a.b.c', defaultValue)).toBe(defaultValue);
    });

    test('returns default value for empty or undefined paths', () => {
      expect(get(obj, '', defaultValue)).toBe(defaultValue);
      expect(get(obj, ['a', 'b', 'x'], defaultValue)).toBe(defaultValue);
      expect(get({ a: { b: undefined } }, 'a.b', defaultValue)).toBe(defaultValue);
    });
  });

  describe('Value Retrieval', () => {
    test('returns a deeply nested value', () => {
      const result = get(
        {
          colors: {
            blue: ['#0cf', '#0be', '#09d', '#07c'],
          },
        },
        'colors.blue.3'
      );
      expect(result).toBe('#07c');
    });

    test('supports fallback values', () => {
      const result = get({}, 'hi', 'nope');
      expect(result).toBe('nope');
    });

    test('handles number indices in arrays', () => {
      const result = get([1, 2, 3], 0);
      expect(result).toBe(1);
    });

    test('returns 0 index items from arrays', () => {
      const result = get(['a', 'b', 'c'], 0);
      expect(result).toBe('a');
    });
  });

  describe('Edge Case Handling', () => {
    test('handles undefined values gracefully', () => {
      const result = get({}, undefined);
      expect(result).toBe(undefined);
    });

    test('handles null values gracefully', () => {
      const result = get({}, null);
      expect(result).toBe(undefined);
    });
  });
});
