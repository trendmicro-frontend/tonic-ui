import moduleExport from '@tonic-ui/changelog-github/src';

test('should match expected exports', () => {
  const expectedExports = [
    'getDependencyReleaseLine',
    'getReleaseLine',
  ];
  const receivedExports = Object.keys(moduleExport);

  expect(receivedExports.sort()).toEqual(expectedExports.sort());
});
