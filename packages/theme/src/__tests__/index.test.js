import defaultExport, { createTheme } from '@tonic-one/theme/src';

test('should match expected exports', () => {
  const moduleExport = require('../index');

  const expectedExports = [
    'createTheme',
    'default',
  ];

  const receivedExports = Object.keys(moduleExport);

  expect(receivedExports.sort()).toEqual(expectedExports.sort());
});

test('the default export must have all properties defined in the theme object', () => {
  const theme = createTheme('rem');
  expect(theme).toEqual(defaultExport);

  expect(defaultExport).toHaveProperty('borders');
  expect(defaultExport).toHaveProperty('breakpoints');
  expect(defaultExport).toHaveProperty('colors');
  expect(defaultExport).toHaveProperty('fonts');
  expect(defaultExport).toHaveProperty('fontSizes');
  expect(defaultExport).toHaveProperty('fontWeights');
  expect(defaultExport).toHaveProperty('lineHeights');
  expect(defaultExport).toHaveProperty('outlines');
  expect(defaultExport).toHaveProperty('radii');
  expect(defaultExport).toHaveProperty('shadows');
  expect(defaultExport).toHaveProperty('sizes');
  expect(defaultExport).toHaveProperty('space');
  expect(defaultExport).toHaveProperty('zIndices');
});
