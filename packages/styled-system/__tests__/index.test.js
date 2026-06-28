import * as moduleExport from '../src';

test('should match expected exports', () => {
  const expectedExports = [
    // pseudo
    'pseudoClassSelector',
    'pseudoElementSelector',

    // sx
    'sx',

    // system
    'system',
  ];
  const receivedExports = Object.keys(moduleExport);

  expect(receivedExports.sort()).toEqual(expectedExports.sort());
});
