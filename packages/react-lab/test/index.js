import * as moduleExport from '../src';

test('should match expected exports', () => {
  const exportedComponents = [
    // date-time-pickers
    'Calendar',
    'DatePicker',
  ];

  const receivedExports = Object.keys(moduleExport);
  const expectedExports = [
    ...exportedComponents,
  ];

  expect(receivedExports.sort()).toEqual(expectedExports.sort());
});
