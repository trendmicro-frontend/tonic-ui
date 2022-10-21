import getUnitTokens from '../getUnitTokens';

test('invalid length units', () => {
  // length units not specified
  const emptyUnitTokens = getUnitTokens();
  expect(emptyUnitTokens).toEqual({});

  // unsupported length units
  const unsupportedUnitTokens = getUnitTokens('');
  expect(unsupportedUnitTokens).toEqual({});
});

test('absolute length units: px', () => {
  const unitTokens = getUnitTokens('px');

  expect(unitTokens).toEqual({
    '1q': '1px',
    '2q': '2px',
    '3q': '3px',
    '4q': '4px',
    '5q': '5px',
    '6q': '6px',
    '7q': '7px',
    '8q': '8px',
    '9q': '9px',
    '10q': '10px',
    '1h': '2px',
    '2h': '4px',
    '3h': '6px',
    '4h': '8px',
    '5h': '10px',
    '6h': '12px',
    '7h': '14px',
    '8h': '16px',
    '9h': '18px',
    '10h': '20px',
    '1x': '4px',
    '2x': '8px',
    '3x': '12px',
    '4x': '16px',
    '5x': '20px',
    '6x': '24px',
    '7x': '28px',
    '8x': '32px',
    '9x': '36px',
    '10x': '40px',
    '11x': '44px',
    '12x': '48px',
    '13x': '52px',
    '14x': '56px',
    '15x': '60px',
    '16x': '64px',
    '17x': '68px',
    '18x': '72px',
    '19x': '76px',
    '20x': '80px',
    '24x': '96px',
    '32x': '128px',
    '40x': '160px',
    '48x': '192px',
    '56x': '224px',
    '64x': '256px',
  });
});

test('relative length units: rem', () => {
  const unitTokens = getUnitTokens('rem');

  expect(unitTokens).toEqual({
    '1q': '.0625rem',
    '2q': '.125rem',
    '3q': '.1875rem',
    '4q': '.25rem',
    '5q': '.3125rem',
    '6q': '.375rem',
    '7q': '.4375rem',
    '8q': '.5rem',
    '9q': '.5625rem',
    '10q': '.625rem',
    '1h': '.125rem',
    '2h': '.25rem',
    '3h': '.375rem',
    '4h': '.5rem',
    '5h': '.625rem',
    '6h': '.75rem',
    '7h': '.875rem',
    '8h': '1rem',
    '9h': '1.125rem',
    '10h': '1.25rem',
    '1x': '.25rem',
    '2x': '.5rem',
    '3x': '.75rem',
    '4x': '1rem',
    '5x': '1.25rem',
    '6x': '1.5rem',
    '7x': '1.75rem',
    '8x': '2rem',
    '9x': '2.25rem',
    '10x': '2.5rem',
    '11x': '2.75rem',
    '12x': '3rem',
    '13x': '3.25rem',
    '14x': '3.5rem',
    '15x': '3.75rem',
    '16x': '4rem',
    '17x': '4.25rem',
    '18x': '4.5rem',
    '19x': '4.75rem',
    '20x': '5rem',
    '24x': '6rem',
    '32x': '8rem',
    '40x': '10rem',
    '48x': '12rem',
    '56x': '14rem',
    '64x': '16rem',
  });
});
