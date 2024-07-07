import * as moduleExport from '@tonic-ui/react-icons/src';
import * as icons from '@tonic-ui/react-icons/src/icons';

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
