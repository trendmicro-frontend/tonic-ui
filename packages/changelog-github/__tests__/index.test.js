import moduleExport from '../src';

test('should match expected exports', () => {
  const expectedExports = [
    'getDependencyReleaseLine',
    'getReleaseLine',
  ];
  const receivedExports = Object.keys(moduleExport);

  expect(receivedExports.sort()).toEqual(expectedExports.sort());
});
