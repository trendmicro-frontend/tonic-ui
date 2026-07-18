import * as moduleExport from '../src';
import * as icons from '../src/icons';

test('should match expected exports', () => {
  const expectedExports = [
    'SVGIcon',
    'createSVGIcon',

    // icons
    ...Object.keys(icons),
  ];
  const receivedExports = Object.keys(moduleExport);

  expect(receivedExports.sort()).toEqual(expectedExports.sort());
});
