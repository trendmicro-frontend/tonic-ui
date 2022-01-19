import * as moduleExport from '../src';

test('should match expected exports', () => {
  const exportedComponents = [
    // date-picker
    'Calendar',
    'DateInput',
    'DatePicker',
    'DatePickerPopper',
    'DatePickerToggle',
  ];

  const exportedHooks = [
    // hooks
  ];

  const exportedSettings = [
    // settings
  ];

  const receivedExports = Object.keys(moduleExport);
  const expectedExports = [
    ...exportedComponents,
    ...exportedHooks,
    ...exportedSettings,
  ];

  expect(receivedExports.sort()).toEqual(expectedExports.sort());
});
