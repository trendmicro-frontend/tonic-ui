import { isModifierArrayEqual } from '../utils';

describe('isModifierArrayEqual', () => {
  it('treats fresh nested arrays and plain objects with equal values as equal', () => {
    const left = [{ name: 'offset', options: { offset: [0, 8] } }];
    const right = [{ name: 'offset', options: { offset: [0, 8] } }];

    expect(isModifierArrayEqual(left, right)).toBe(true);
  });

  it('detects nested value and modifier ordering changes', () => {
    const modifiers = [
      { name: 'flip', enabled: true },
      { name: 'offset', options: { offset: [0, 8] } },
    ];

    expect(isModifierArrayEqual(modifiers, [
      { name: 'flip', enabled: true },
      { name: 'offset', options: { offset: [0, 12] } },
    ])).toBe(false);
    expect(isModifierArrayEqual(modifiers, [...modifiers].reverse())).toBe(false);
  });

  it('compares modifier functions by reference', () => {
    const fn = () => {};

    expect(isModifierArrayEqual([{ name: 'custom', fn }], [{ name: 'custom', fn }])).toBe(true);
    expect(isModifierArrayEqual(
      [{ name: 'custom', fn: () => {} }],
      [{ name: 'custom', fn: () => {} }]
    )).toBe(false);
  });
});
