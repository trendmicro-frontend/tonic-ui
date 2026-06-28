import * as moduleExport from '@tonic-ui/theme/src';

test('should match expected exports', () => {
  const expectedExports = [
    'createTheme',
    'default',
  ];
  const receivedExports = Object.keys(moduleExport);

  expect(receivedExports.sort()).toEqual(expectedExports.sort());
});
