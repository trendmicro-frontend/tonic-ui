import { ensurePlainObject } from 'ensure-type';
import _get from 'lodash.get';

const createPalette = (paletteMap, theme) => {
  // Use `JSON.parse` to create a new structure from the string representation
  const colorStyle = JSON.parse(JSON.stringify(ensurePlainObject(paletteMap)));
  const regex = /([a-zA-Z]+:\w+)/g;
  (function parserColorPalette(obj) {
    Object.keys(obj).map((key) => {
      const value = obj[key];
      if (typeof value === 'string') {
        obj[key] = obj[key].replace(regex, match => _get(theme, `colors.${match}`, match));
      } else {
        parserColorPalette(obj[key]);
      }
      return;
    });
  }(colorStyle));

  return colorStyle;
};

export default createPalette;
