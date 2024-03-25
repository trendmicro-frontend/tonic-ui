import * as moduleExport from '@tonic-ui/react-base/src';

test('should match expected exports', () => {
  const expectedExports = [
    // box
    'Box',
  ];
  const receivedExports = Object.keys(moduleExport);

  expect(receivedExports.sort()).toEqual(expectedExports.sort());
});
