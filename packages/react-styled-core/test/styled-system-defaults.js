import React from 'react';
import renderer from 'react-test-renderer';
import serializer, { matchers } from 'jest-emotion';
import styled from '@emotion/styled';
import Box from '../src/Box';

expect.extend(matchers);
expect.addSnapshotSerializer(serializer);

const render = el => renderer.create(el).toJSON();
const toPixel = (x) => (x > 0) ? `${x}px` : '0';

/**
 * Some style props include default, fallback scales if not defined
 * in the theme object.
 */
describe('styled system defaults', () => {
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
