import * as moduleExport from '..';

test('should match expected exports', () => {
  const receivedExports = Object.keys(moduleExport);
  const expectedExports = [
    'pseudoClassSelector',
    'pseudoElementSelector',
    'sx',
    'system',
  ];

  expect(receivedExports.sort()).toEqual(expectedExports.sort());
});
