import React from 'react';
import renderer from 'react-test-renderer';
import serializer, { matchers } from 'jest-emotion';
import Box from '../../src/Box';

expect.extend(matchers);
expect.addSnapshotSerializer(serializer);

const render = el => renderer.create(el).toJSON();
const toPixel = (x) => {
  return (x > 0) ? `${x}px` : '0';
};

describe('styled system defaults', () => {
  /**
   * https://github.com/styled-system/styled-system/blob/master/packages/space/src/index.js
   */
  test('default space for margin and padding', () => {
    const space = [0, 4, 8, 16, 32, 64, 128, 256, 512];
    const json = render(
      <>
        {space.map((value, key) => (
          <Box key={key} m={key} p={key} />
        ))}
      </>
    );
    space.forEach((value, key) => {
      expect(json[key]).toHaveStyleRule('margin', toPixel(value));
      expect(json[key]).toHaveStyleRule('padding', toPixel(value));
    });
  });

  /**
   * https://github.com/styled-system/styled-system/blob/master/packages/typography/src/index.js
   */
  test('default fontSizes', () => {
    const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 72];
    const json = render(
      <>
        {fontSizes.map((value, key) => (
          <Box key={key} fontSize={key} />
        ))}
      </>
    );
    fontSizes.forEach((value, key) => {
      expect(json[key]).toHaveStyleRule('font-size', toPixel(value));
    });
  });
});
